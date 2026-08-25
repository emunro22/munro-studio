import { sql } from "./db";
import { scanSite, buildAutoInsights } from "./scan";
import { generateAiSummary } from "./ai";
import { findPlaceId, fetchPlaceReviews, placesConfigured } from "./places";

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
      has_faq_schema, has_llms_txt, sitemap_url_count, sitemap_urls, image_count, images_missing_alt,
      internal_link_count, has_robots_txt, has_sitemap, error
    ) VALUES (
      ${client.id}, ${scan.statusCode}, ${scan.responseMs}, ${scan.title}, ${scan.metaDescription},
      ${scan.h1}, ${scan.wordCount}, ${scan.hasViewportMeta}, ${scan.hasSchemaLd}, ${scan.hasNoindex},
      ${scan.hasCanonical}, ${scan.hasOpenGraph}, ${scan.hasFaqSchema}, ${scan.hasLlmsTxt},
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

  let aiText = null;
  try {
    aiText = await generateAiSummary({ client, scan, autoInsights });
  } catch {
    aiText = null;
  }
  if (aiText) {
    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (${client.id}, 'ai_summary', ${"AI weekly summary — " + new Date().toISOString().slice(0, 10)}, ${aiText}, 'medium', 'open', 'ai')
    `;
  }

  let reviews = null;
  try {
    reviews = await refreshReviews(client);
  } catch {
    reviews = null;
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
