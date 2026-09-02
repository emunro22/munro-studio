// Finds and scans nearby competitors (via Google Places Text Search + the
// same regex site scanner used for clients) and turns the gap between a
// client and its competitors into insight rows. Manual-trigger only — not
// part of the weekly cron — to keep Places API cost and scan time bounded.

import { sql } from "./db";
import { scanSite } from "./scan";
import { textSearchPlaces, fetchPlaceDetails, placesConfigured } from "./places";

const MAX_AUTO_COMPETITORS = 5;
const CONCURRENCY = 4;

function normalizeDomain(website) {
  if (!website) return null;
  try {
    const host = new URL(website).hostname;
    return host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

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

export async function discoverCompetitors(client) {
  if (!placesConfigured()) throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  if (!client.trade || !client.location) {
    throw new Error("Client needs a trade and location set before competitors can be found");
  }

  const candidates = await textSearchPlaces({ query: `${client.trade} in ${client.location}` });
  const filtered = candidates
    .filter((c) => c.placeId && c.placeId !== client.google_place_id)
    .slice(0, MAX_AUTO_COMPETITORS);

  const details = await mapWithConcurrency(filtered, CONCURRENCY, (c) => fetchPlaceDetails(c.placeId));

  const inserted = [];
  for (let i = 0; i < filtered.length; i++) {
    const candidate = filtered[i];
    const detail = details[i];
    const domain = detail && !detail.error ? normalizeDomain(detail.website) : null;
    if (domain && domain === client.domain) continue;

    const rows = await sql`
      INSERT INTO competitors (client_id, place_id, name, domain, address, rating, review_count, source)
      VALUES (
        ${client.id}, ${candidate.placeId}, ${candidate.name}, ${domain}, ${candidate.address},
        ${candidate.rating}, ${candidate.reviewCount}, 'auto'
      )
      ON CONFLICT (client_id, place_id) WHERE place_id IS NOT NULL DO UPDATE SET
        name = EXCLUDED.name,
        domain = COALESCE(EXCLUDED.domain, competitors.domain),
        address = EXCLUDED.address,
        rating = EXCLUDED.rating,
        review_count = EXCLUDED.review_count
      RETURNING *
    `;
    inserted.push(rows[0]);
  }

  return inserted;
}

export async function addManualCompetitor(clientId, { name, domain }) {
  if (!name) throw new Error("Competitor name is required");
  const cleanDomain = domain ? normalizeDomain(domain.startsWith("http") ? domain : `https://${domain}`) : null;

  const rows = await sql`
    INSERT INTO competitors (client_id, name, domain, source)
    VALUES (${clientId}, ${name}, ${cleanDomain}, 'manual')
    RETURNING *
  `;
  return rows[0];
}

async function scanOneCompetitor(competitor) {
  let refreshedRating = competitor.rating;
  let refreshedReviewCount = competitor.review_count;
  if (competitor.place_id && placesConfigured()) {
    const detail = await fetchPlaceDetails(competitor.place_id).catch(() => null);
    if (detail && !detail.error) {
      refreshedRating = detail.rating;
      refreshedReviewCount = detail.reviewCount;
      await sql`UPDATE competitors SET rating = ${detail.rating}, review_count = ${detail.reviewCount} WHERE id = ${competitor.id}`;
    }
  }

  if (!competitor.domain) {
    return { competitorId: competitor.id, scan: null, skipped: "no domain on file" };
  }

  const scan = await scanSite(competitor.domain);

  await sql`
    INSERT INTO competitor_scans (
      competitor_id, status_code, response_ms, title, meta_description, word_count,
      has_viewport_meta, has_schema_ld, has_noindex, has_canonical, has_open_graph,
      has_faq_schema, has_llms_txt, has_custom_not_found, has_privacy_policy, has_terms_page,
      has_clear_cta, has_favicon, has_html_lang, has_contact_form,
      has_about_page, has_product_schema, has_organization_schema,
      has_ecommerce_signals, has_video_content, has_lazy_video,
      has_descriptive_image_names, has_large_uncompressed_images,
      sitemap_url_count, sitemap_urls, image_count, images_missing_alt,
      internal_link_count, has_robots_txt, has_sitemap, rating, review_count, error
    ) VALUES (
      ${competitor.id}, ${scan.statusCode}, ${scan.responseMs}, ${scan.title}, ${scan.metaDescription},
      ${scan.wordCount}, ${scan.hasViewportMeta}, ${scan.hasSchemaLd}, ${scan.hasNoindex}, ${scan.hasCanonical},
      ${scan.hasOpenGraph}, ${scan.hasFaqSchema}, ${scan.hasLlmsTxt}, ${scan.hasCustomNotFound},
      ${scan.hasPrivacyPolicy}, ${scan.hasTermsPage}, ${scan.hasClearCta},
      ${scan.hasFavicon}, ${scan.hasHtmlLang}, ${scan.hasContactForm},
      ${scan.hasAboutPage}, ${scan.hasProductSchema}, ${scan.hasOrganizationSchema}, ${scan.hasEcommerceSignals},
      ${scan.hasVideoContent}, ${scan.hasLazyVideo},
      ${scan.hasDescriptiveImageNames}, ${scan.hasLargeUncompressedImages},
      ${scan.sitemapUrlCount},
      ${JSON.stringify(scan.sitemapUrls || [])}, ${scan.imageCount},
      ${scan.imagesMissingAlt}, ${scan.internalLinkCount}, ${scan.hasRobotsTxt}, ${scan.hasSitemap},
      ${refreshedRating}, ${refreshedReviewCount}, ${scan.error}
    )
  `;

  return { competitorId: competitor.id, scan };
}

export async function scanCompetitors(client) {
  const competitors = await sql`SELECT * FROM competitors WHERE client_id = ${client.id}`;
  const results = await mapWithConcurrency(competitors, CONCURRENCY, (c) =>
    scanOneCompetitor(c).catch((err) => ({ competitorId: c.id, error: String(err && err.message ? err.message : err) }))
  );
  return { competitors, results };
}

// Postgres NUMERIC columns (e.g. `rating`) come back from the driver as
// strings, not numbers — summing those with `+` silently does string
// concatenation instead of arithmetic. Coerce explicitly before reducing.
function average(nums) {
  const valid = nums
    .filter((n) => n != null)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (!valid.length) return null;
  return valid.reduce((s, n) => s + n, 0) / valid.length;
}

// Boilerplate path segments that show up on almost every site and carry no
// competitive signal — filtered out before comparing sitemap topics.
const JUNK_SEGMENTS = new Set([
  "page", "category", "categories", "tag", "tags", "author", "authors", "feed", "feeds",
  "wp-content", "wp-json", "wp-admin", "wp-includes", "wp-sitemap", "cart", "checkout",
  "account", "my-account", "login", "register", "signup", "privacy", "privacy-policy",
  "terms", "terms-conditions", "terms-and-conditions", "cookie", "cookies", "cookie-policy",
  "sitemap", "index", "default", "home", "amp", "search", "404", "thank-you", "thanks",
  "contact", "contact-us", "about", "about-us", "blog", "news", "post", "posts", "archive",
  "archives", "en", "en-gb", "en-us", "uk",
]);
const STOPWORDS = new Set(["a", "an", "the", "and", "or", "of", "for", "in", "on", "at", "to", "with", "our", "your", "we", "us"]);

function humanizeSegment(segment) {
  return decodeURIComponent(segment)
    .replace(/\.(html?|php|aspx?)$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .toLowerCase();
}

// Turns a list of sitemap URL paths into a Map of normalized topic -> display
// label, using each URL's last path segment (where CMSs put the meaningful
// slug) as a proxy for "what this page is about" — cheap, no extra fetches.
// Any path segment matching one of these means the whole URL is editorial
// content (a blog post, news item, etc.), not a structural service/area page —
// its last segment is usually a one-off headline, not a repeatable topic, and
// surfacing those as "pages competitors have that you don't" is actively misleading.
const BLOG_PATH_SEGMENTS = new Set([
  "blog", "blogs", "daily-blog", "news", "article", "articles", "press", "insights",
  "stories", "updates", "case-study", "case-studies", "guides", "guide",
]);

function extractTopics(urls) {
  const topics = new Map();
  for (const url of urls || []) {
    const segments = String(url).split("/").filter(Boolean);
    if (segments.length === 0) continue;
    if (segments.some((s) => BLOG_PATH_SEGMENTS.has(s.toLowerCase()))) continue;
    const humanized = humanizeSegment(segments[segments.length - 1]);
    if (!humanized) continue;
    const words = humanized.split(" ").filter((w) => w && !STOPWORDS.has(w) && !/^\d+$/.test(w));
    // Long slugs are almost always one-off editorial headlines that slipped past
    // the blog-path check (e.g. a different CMS layout) rather than a real page type.
    if (words.length === 0 || words.length > 6) continue;
    const key = words.join(" ");
    if (key.length < 3 || JUNK_SEGMENTS.has(key) || words.every((w) => JUNK_SEGMENTS.has(w))) continue;
    if (!topics.has(key)) topics.set(key, key);
  }
  return topics;
}

// Pure gap-analysis: takes the client's own latest scan/review plus each
// competitor's latest scan (already joined with rating/review_count), and
// returns insight objects — same shape as buildAutoInsights.
export function buildCompetitorInsights(client, clientScan, clientReview, competitorScans) {
  const insights = [];
  const add = (category, priority, title, description) =>
    insights.push({ category, priority, title, description, source: "competitor_scan" });

  const withDomain = competitorScans.filter((c) => c.scan);
  if (withDomain.length === 0) return insights;

  const competitorReviewCounts = withDomain.map((c) => c.scan.review_count);
  const competitorRatings = withDomain.map((c) => c.scan.rating);
  const avgReviewCount = average(competitorReviewCounts);
  const avgRating = average(competitorRatings);

  const clientReviewCount = clientReview?.review_count ?? null;
  const clientRating = clientReview?.rating ?? null;

  if (avgReviewCount != null && clientReviewCount != null && clientReviewCount < avgReviewCount * 0.6) {
    add(
      "competitor",
      "high",
      "Falling behind nearby competitors on Google reviews",
      `Nearby competitors average ~${Math.round(avgReviewCount)} reviews; this client has ${clientReviewCount}. Review count is one of the strongest local-pack ranking factors, so push review requests harder.`
    );
  }

  if (avgRating != null && clientRating != null && clientRating < avgRating - 0.3) {
    add(
      "competitor",
      "medium",
      "Google rating below the local average",
      `Nearby competitors average ${avgRating.toFixed(1)}★; this client is at ${Number(clientRating).toFixed(1)}★. Worth checking recent reviews for a fixable recurring complaint.`
    );
  }

  const faqCount = withDomain.filter((c) => c.scan.has_faq_schema).length;
  if (!clientScan?.has_faq_schema && faqCount > 0) {
    add(
      "aeo",
      "medium",
      `${faqCount} of ${withDomain.length} nearby competitors have FAQ structured data and this client doesn't`,
      "FAQPage schema is one of the clearest ways to get quoted by AI answer engines. Competitors with it have an edge in AI Overviews and chat-based search."
    );
  }

  const sitemapCounts = withDomain.map((c) => c.scan.sitemap_url_count).filter((n) => n != null);
  const avgSitemapCount = average(sitemapCounts);
  if (avgSitemapCount != null && clientScan?.sitemap_url_count != null && clientScan.sitemap_url_count < avgSitemapCount * 0.5) {
    add(
      "competitor",
      "medium",
      "Competitors have significantly more indexed pages",
      `Nearby competitors average ~${Math.round(avgSitemapCount)} sitemap URLs; this client has ${clientScan.sitemap_url_count}. Consider adding more service/location pages to cover the same ground.`
    );
  }

  const avgResponseMs = average(withDomain.map((c) => c.scan.response_ms));
  if (avgResponseMs != null && clientScan?.response_ms != null && clientScan.response_ms > avgResponseMs * 1.5 && clientScan.response_ms > 1500) {
    add(
      "competitor",
      "low",
      "Homepage is slower than nearby competitors",
      `This site responds in ~${clientScan.response_ms}ms vs a ~${Math.round(avgResponseMs)}ms competitor average. Page speed is a ranking factor and affects conversion rate too.`
    );
  }

  const topicCompetitorCount = new Map();
  const topicLabel = new Map();
  const nearMeExamples = [];
  let competitorsWithTopics = 0;
  for (const c of withDomain) {
    const topics = extractTopics(c.scan.sitemap_urls);
    if (topics.size > 0) competitorsWithTopics++;
    for (const [key, label] of topics) {
      topicCompetitorCount.set(key, (topicCompetitorCount.get(key) || 0) + 1);
      if (!topicLabel.has(key)) topicLabel.set(key, label);
      if (/\bnear\b/.test(label)) nearMeExamples.push({ competitor: c.name, topic: label });
    }
  }
  // Real competitor sitemaps are often missing or broken (a plain sitemap.xml
  // fetch, no rendering) — with few usable ones, requiring agreement across 2+
  // would almost never fire, so the bar adapts to how much data actually came back.
  const topicThreshold = competitorsWithTopics >= 3 ? 2 : 1;
  const clientTopics = new Set(extractTopics(clientScan?.sitemap_urls).keys());
  const missingTopics = [...topicCompetitorCount.entries()]
    .filter(([key, count]) => count >= topicThreshold && !clientTopics.has(key))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([key, count]) => (count > 1 ? `${topicLabel.get(key)} (${count} competitors)` : topicLabel.get(key)));

  if (missingTopics.length > 0) {
    add(
      "competitor",
      "medium",
      "Competitors have pages/topics this site doesn't",
      `Nearby competitor sitemaps show dedicated pages for: ${missingTopics.join(", ")}. This site has none. Worth checking whether these are real services/areas this business covers; if so, a dedicated page for each is a quick way to compete for that search term. (Based on ${competitorsWithTopics} of ${withDomain.length} competitors having a readable sitemap.)`
    );
  }

  const seenNearMeTopics = new Set();
  const nearMeList = [];
  for (const ex of nearMeExamples) {
    if (clientTopics.has(ex.topic) || seenNearMeTopics.has(ex.topic)) continue;
    seenNearMeTopics.add(ex.topic);
    nearMeList.push(ex);
    if (nearMeList.length >= 6) break;
  }

  if (nearMeList.length > 0) {
    add(
      "geo",
      "high",
      'Competitors have "near me" / near-town landing pages this site doesn\'t',
      `Found in competitor sitemaps: ${nearMeList.map((e) => `"${e.topic}" (${e.competitor})`).join(", ")}. These hyper-local, high-intent pages are one of the best-converting page types for local trades, worth building equivalents for this business's real coverage area.`
    );
  }

  return insights;
}

// Scans a client's existing competitors, runs the gap analysis, and inserts any
// new (deduped against open competitor_scan insights) findings. Shared by the
// single-client scan route and the "run for every client" bulk action.
export async function runCompetitorScan(client) {
  const { competitors, results } = await scanCompetitors(client);
  if (competitors.length === 0) return { scanned: 0, insightsInserted: 0 };

  const [latestClientScanRows, latestClientReviewRows, latestCompetitorScanRows] = await Promise.all([
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

  const gapInsights = buildCompetitorInsights(
    client,
    latestClientScanRows[0] || null,
    latestClientReviewRows[0] || null,
    competitorScans
  );

  const existingOpenRows = await sql`
    SELECT title FROM insights WHERE client_id = ${client.id} AND status = 'open' AND source = 'competitor_scan'
  `;
  const existingTitles = new Set(existingOpenRows.map((r) => r.title));

  let insightsInserted = 0;
  for (const insight of gapInsights) {
    if (existingTitles.has(insight.title)) continue;
    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (${client.id}, ${insight.category}, ${insight.title}, ${insight.description}, ${insight.priority}, 'open', ${insight.source})
    `;
    insightsInserted++;
  }

  const failed = results.filter((r) => r.error).length;
  return { scanned: results.length - failed, failed, insightsInserted };
}

// Discovers + scans competitors for every eligible client (active, has a domain,
// has trade + location set). Manual-trigger only, same reasoning as scanAllClients
// in scanRunner.js — kept off the weekly cron to bound Places API cost and runtime.
export async function discoverAndScanAllClients() {
  const clients = await sql`
    SELECT * FROM clients
    WHERE status = 'active' AND domain IS NOT NULL AND domain <> ''
      AND trade IS NOT NULL AND trade <> '' AND location IS NOT NULL AND location <> ''
  `;

  return mapWithConcurrency(clients, 6, async (client) => {
    try {
      await discoverCompetitors(client);
      const result = await runCompetitorScan(client);
      return { clientId: client.id, ...result };
    } catch (err) {
      return { clientId: client.id, error: String(err && err.message ? err.message : err) };
    }
  });
}
