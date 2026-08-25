import { sql } from "./db";
import { scanSite, buildAutoInsights } from "./scan";
import { generateAiSummary } from "./ai";
import { findPlaceId, fetchPlaceReviews, placesConfigured } from "./places";
import { buildCompetitorInsights } from "./competitors";

const CONCURRENCY = 4;

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function refreshReviews(client) {
  if (!placesConfigured()) return null;

  let placeId = client.google_place_id;
  if (!placeId) {
    const found = await findPlaceId({ name: client.name, domain: client.domain });
    if (found) {
      placeId = found.placeId;
      await sql`UPDATE clients SET google_place_id = ${placeId} WHERE id = ${client.id}`;
    }
  }
  if (!placeId) return null;

  const data = await fetchPlaceReviews(placeId);
  if (!data || data.error) return data || null;

  await sql`
    INSERT INTO review_snapshots (client_id, rating, review_count, reviews)
    VALUES (${client.id}, ${data.rating}, ${data.reviewCount}, ${JSON.stringify(data.reviews)})
  `;
  return data;
}

export async function scanClient(client) {
  const scan = await scanSite(client.domain);

  const previousRows = await sql`
    SELECT title, word_count, status_code FROM site_scans
    WHERE client_id = ${client.id}
    ORDER BY scanned_at DESC LIMIT 1
  `;
  const previous = previousRows[0] || null;
  const previousScan = previous
    ? { title: previous.title, wordCount: previous.word_count, statusCode: previous.status_code }
    : null;

  await sql`
    INSERT INTO site_scans (
      client_id, status_code, response_ms, title, meta_description, h1, word_count,
      has_viewport_meta, has_schema_ld, has_noindex, has_canonical, has_open_graph,
      has_faq_schema, has_llms_txt, has_custom_not_found, has_privacy_policy, has_terms_page,
      has_clear_cta, has_analytics, has_favicon, has_cookie_consent, has_html_lang, has_contact_form,
      sitemap_url_count, sitemap_urls, image_count, images_missing_alt,
      internal_link_count, has_robots_txt, has_sitemap, error
    ) VALUES (
      ${client.id}, ${scan.statusCode}, ${scan.responseMs}, ${scan.title}, ${scan.metaDescription},
      ${scan.h1}, ${scan.wordCount}, ${scan.hasViewportMeta}, ${scan.hasSchemaLd}, ${scan.hasNoindex},
      ${scan.hasCanonical}, ${scan.hasOpenGraph}, ${scan.hasFaqSchema}, ${scan.hasLlmsTxt},
      ${scan.hasCustomNotFound}, ${scan.hasPrivacyPolicy}, ${scan.hasTermsPage}, ${scan.hasClearCta},
      ${scan.hasAnalytics}, ${scan.hasFavicon}, ${scan.hasCookieConsent}, ${scan.hasHtmlLang}, ${scan.hasContactForm},
      ${scan.sitemapUrlCount}, ${JSON.stringify(scan.sitemapUrls || [])}, ${scan.imageCount}, ${scan.imagesMissingAlt}, ${scan.internalLinkCount},
      ${scan.hasRobotsTxt}, ${scan.hasSitemap}, ${scan.error}
    )
  `;

  const autoInsights = buildAutoInsights(scan, previousScan);

  const existingOpenRows = await sql`
    SELECT title FROM insights WHERE client_id = ${client.id} AND status = 'open' AND source = 'auto_scan'
  `;
  const existingTitles = new Set(existingOpenRows.map((r) => r.title));

  let insightsInserted = 0;
  for (const insight of autoInsights) {
    if (existingTitles.has(insight.title)) continue;
    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (${client.id}, ${insight.category}, ${insight.title}, ${insight.description}, ${insight.priority}, 'open', ${insight.source})
    `;
    insightsInserted++;
  }

  let reviews = null;
  try {
    reviews = await refreshReviews(client);
  } catch {
    reviews = null;
  }

  // Read-only: uses whatever competitors/scans already exist for this client
  // (from "Find competitors" / "Scan competitors") to give the AI summary real
  // named comparisons. Never triggers new discovery/scanning itself — that
  // stays manual-only.
  let competitorContext = [];
  let gapInsights = [];
  try {
    const competitors = await sql`SELECT * FROM competitors WHERE client_id = ${client.id}`;
    if (competitors.length > 0) {
      const [latestScanRow, latestReviewRow, latestCompetitorScanRows] = await Promise.all([
        sql`SELECT * FROM site_scans WHERE client_id = ${client.id} ORDER BY scanned_at DESC LIMIT 1`,
        sql`SELECT * FROM review_snapshots WHERE client_id = ${client.id} ORDER BY fetched_at DESC LIMIT 1`,
        sql`
          SELECT DISTINCT ON (competitor_id) *
          FROM competitor_scans
          WHERE competitor_id = ANY(${competitors.map((c) => c.id)})
          ORDER BY competitor_id, scanned_at DESC
        `,
      ]);
      const nameById = Object.fromEntries(competitors.map((c) => [c.id, c.name]));
      const competitorScans = latestCompetitorScanRows
        .filter((row) => !row.error)
        .map((row) => ({ competitorId: row.competitor_id, name: nameById[row.competitor_id] || "A competitor", scan: row }));

      competitorContext = competitors.map((c) => ({
        name: c.name,
        rating: c.rating,
        reviewCount: c.review_count,
      }));
      gapInsights = buildCompetitorInsights(client, latestScanRow[0] || null, latestReviewRow[0] || null, competitorScans);
    }
  } catch {
    competitorContext = [];
    gapInsights = [];
  }

  let aiText = null;
  try {
    aiText = await generateAiSummary({ client, scan, autoInsights, competitors: competitorContext, gapInsights, reviews });
  } catch {
    aiText = null;
  }
  if (aiText) {
    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (${client.id}, 'ai_summary', ${"AI weekly summary — " + new Date().toISOString().slice(0, 10)}, ${aiText}, 'medium', 'open', 'ai')
    `;
  }

  return { clientId: client.id, scan, insightsInserted, aiGenerated: !!aiText, reviews };
}

export async function scanAllClients() {
  const clients = await sql`
    SELECT * FROM clients WHERE domain IS NOT NULL AND domain <> '' AND status = 'active'
  `;
  return mapWithConcurrency(clients, CONCURRENCY, (client) =>
    scanClient(client).catch((err) => ({ clientId: client.id, error: String(err && err.message ? err.message : err) }))
  );
}
