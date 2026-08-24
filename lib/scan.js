// Lightweight, dependency-free technical SEO/local-SEO scanner.
// Fetches a client's homepage plus robots.txt/sitemap.xml and extracts signals
// via regex (no headless browser available in a serverless function), then
// turns those signals into plain-English, rule-based recommendations.

const USER_AGENT = "Mozilla/5.0 (compatible; MunroStudioSEOBot/1.0; +https://munrostudio.co.uk)";

async function fetchWithTimeout(url, opts = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...opts,
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, ...(opts.headers || {}) },
    });
  } finally {
    clearTimeout(id);
  }
}

function extractTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&#\d+;|&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function scanSite(rawUrl) {
  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const started = Date.now();

  try {
    const res = await fetchWithTimeout(url, { redirect: "follow" });
    const responseMs = Date.now() - started;
    const html = await res.text();

    const title = extractTag(html, /<title[^>]*>([^<]*)<\/title>/i);
    const metaDescription =
      extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
      extractTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const h1Raw = extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const hasViewportMeta = /<meta[^>]+name=["']viewport["']/i.test(html);
    const hasSchemaLd = /application\/ld\+json/i.test(html);

    const robotsMeta = extractTag(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
    const hasNoindex = /noindex/i.test(robotsMeta || "");
    const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
    const hasOpenGraph = /<meta[^>]+property=["']og:title["']/i.test(html);
    const ldJsonBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
      (m) => m[1]
    );
    const hasFaqSchema = ldJsonBlocks.some((block) => /"@type"\s*:\s*"(FAQPage|HowTo)"/i.test(block));

    const imageMatches = [...html.matchAll(/<img\b[^>]*>/gi)];
    const imageCount = imageMatches.length;
    const imagesMissingAlt = imageMatches.filter((m) => !/\balt=["'][^"']+["']/i.test(m[0])).length;
    const internalLinkCount = (html.match(/<a\b[^>]+href=/gi) || []).length;

    const bodyText = stripTags(html);
    const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;

    let hasRobotsTxt = false;
    let hasSitemap = false;
    let hasLlmsTxt = false;
    let sitemapUrlCount = null;
    let sitemapUrls = [];
    try {
      const origin = new URL(url).origin;
      const [robotsRes, sitemapRes, llmsRes] = await Promise.all([
        fetchWithTimeout(`${origin}/robots.txt`, {}, 5000).catch(() => null),
        fetchWithTimeout(`${origin}/sitemap.xml`, {}, 5000).catch(() => null),
        fetchWithTimeout(`${origin}/llms.txt`, {}, 5000).catch(() => null),
      ]);
      hasRobotsTxt = !!robotsRes && robotsRes.ok;
      hasSitemap = !!sitemapRes && sitemapRes.ok;
      hasLlmsTxt = !!llmsRes && llmsRes.ok;
      if (hasSitemap) {
        const sitemapXml = await sitemapRes.text();
        const locs = [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
        sitemapUrlCount = locs.length;
        // A sitemap *index* lists other .xml sitemap files rather than pages —
        // skip those so topic comparison isn't polluted with filenames.
        sitemapUrls = locs
          .filter((loc) => !/\.xml$/i.test(loc))
          .map((loc) => {
            try {
              return new URL(loc).pathname;
            } catch {
              return null;
            }
          })
          .filter(Boolean)
          .slice(0, 400);
      }
    } catch {
      // best-effort only
    }

    return {
      statusCode: res.status,
      responseMs,
      title,
      metaDescription,
      h1: h1Raw ? stripTags(h1Raw) : null,
      wordCount,
      hasViewportMeta,
      hasSchemaLd,
      hasNoindex,
      hasCanonical,
      hasOpenGraph,
      hasFaqSchema,
      hasLlmsTxt,
      sitemapUrlCount,
      sitemapUrls,
      imageCount,
      imagesMissingAlt,
      internalLinkCount,
      hasRobotsTxt,
      hasSitemap,
      error: null,
    };
  } catch (err) {
    return {
      statusCode: null,
      responseMs: Date.now() - started,
      title: null,
      metaDescription: null,
      h1: null,
      wordCount: 0,
      hasViewportMeta: false,
      hasSchemaLd: false,
      hasNoindex: false,
      hasCanonical: false,
      hasOpenGraph: false,
      hasFaqSchema: false,
      hasLlmsTxt: false,
      sitemapUrlCount: null,
      sitemapUrls: [],
      imageCount: 0,
      imagesMissingAlt: 0,
      internalLinkCount: 0,
      hasRobotsTxt: false,
      hasSitemap: false,
      error: err.name === "AbortError" ? "Timed out" : String(err.message || err),
    };
  }
}

export function buildAutoInsights(scan, previousScan) {
  const insights = [];
  const add = (category, priority, title, description) =>
    insights.push({ category, priority, title, description, source: "auto_scan" });

  if (scan.error) {
    add(
      "technical",
      "critical",
      "Site unreachable",
      `The homepage failed to load during this week's scan: ${scan.error}. Check hosting/DNS immediately.`
    );
    return insights;
  }

  if (scan.statusCode && scan.statusCode >= 400) {
    add(
      "technical",
      "critical",
      `Site returning HTTP ${scan.statusCode}`,
      "The homepage is returning an error status. If this persists it will tank rankings fast — check immediately."
    );
  }

  if (scan.hasNoindex) {
    add(
      "technical",
      "critical",
      "Page is set to noindex",
      "The homepage has a <meta name=\"robots\" content=\"noindex\"> tag — this tells Google not to show the page in search results at all. If this wasn't intentional, it needs fixing immediately; nothing else on this list matters until it's gone."
    );
  }

  if (!scan.title) {
    add(
      "technical",
      "high",
      "Missing <title> tag",
      "No title tag detected on the homepage — this is one of the strongest on-page ranking signals and it's currently blank."
    );
  } else if (scan.title.length < 15 || scan.title.length > 65) {
    add(
      "technical",
      "low",
      "Title tag length not ideal",
      `Current title is ${scan.title.length} characters ("${scan.title}"). Aim for 30-60 characters including the main keyword + location.`
    );
  }

  if (!scan.metaDescription) {
    add(
      "technical",
      "high",
      "Missing meta description",
      "No meta description found. Google will auto-generate a snippet instead of your own, which usually hurts click-through rate."
    );
  }

  if (!scan.hasViewportMeta) {
    add(
      "technical",
      "high",
      "No mobile viewport meta tag",
      'Missing <meta name="viewport"> — the page may not render properly on mobile, which Google uses for ranking (mobile-first indexing).'
    );
  }

  if (!scan.hasSchemaLd) {
    add(
      "seo",
      "medium",
      "No structured data (schema.org) found",
      "Add LocalBusiness / Review / Service JSON-LD so Google can show rich snippets (star ratings, address, hours) in search results."
    );
  }

  if (!scan.hasCanonical) {
    add(
      "technical",
      "low",
      "No canonical tag found",
      "Add a <link rel=\"canonical\"> tag pointing at the preferred URL for this page — it helps Google avoid treating www/non-www or tracking-parameter variants as duplicate content."
    );
  }

  if (!scan.hasOpenGraph) {
    add(
      "aeo",
      "low",
      "No Open Graph tags found",
      "Adding og:title, og:description and og:image helps both social share previews and how AI answer engines (Google AI Overviews, ChatGPT, Perplexity) summarize the page when citing it."
    );
  }

  if (!scan.hasFaqSchema) {
    add(
      "aeo",
      "medium",
      "No FAQ/HowTo structured data found",
      "Add an FAQ section with FAQPage (or HowTo) JSON-LD schema. This is one of the clearest ways to get quoted directly by AI answer engines and Google's AI Overviews, not just ranked as a blue link."
    );
  }

  if (!scan.hasLlmsTxt) {
    add(
      "aeo",
      "low",
      "No llms.txt file found",
      "llms.txt is an emerging convention — a plain-English summary of the business and its services at /llms.txt that AI crawlers (ChatGPT, Claude, Perplexity) check when answering questions. Cheap to add, and few competitors will have one yet."
    );
  }

  if (scan.wordCount < 80) {
    add(
      "technical",
      "critical",
      "Almost no crawlable text content",
      `Only ~${scan.wordCount} words of text detected in the page HTML. If this renders content client-side only (e.g. a React app with no server rendering), search engines may see an empty page.`
    );
  } else if (scan.wordCount < 250) {
    add(
      "content",
      "medium",
      "Thin page content",
      `Only ~${scan.wordCount} words on the homepage. Aim for 300+ words of unique, useful copy to give Google more to rank.`
    );
  }

  if (scan.imageCount > 0 && scan.imagesMissingAlt > 0) {
    add(
      "technical",
      "low",
      `${scan.imagesMissingAlt} image(s) missing alt text`,
      "Alt text helps accessibility and image search rankings — worth filling in on all content images."
    );
  }

  if (!scan.hasSitemap) {
    add(
      "technical",
      "low",
      "No sitemap.xml found",
      "A sitemap helps search engines discover and re-crawl pages faster, especially after updates."
    );
  }

  if (scan.responseMs > 2500) {
    add(
      "technical",
      "medium",
      "Slow homepage response",
      `Homepage took ~${scan.responseMs}ms to respond. Slow pages hurt both rankings and conversion rate — check image sizes, fonts, or third-party scripts.`
    );
  }

  if (previousScan) {
    if (previousScan.title && scan.title && previousScan.title !== scan.title) {
      add(
        "technical",
        "low",
        "Title tag changed since last scan",
        `Was "${previousScan.title}", now "${scan.title}". Confirm this was intentional and still includes the target keyword + location.`
      );
    }
    if (previousScan.wordCount && scan.wordCount < previousScan.wordCount * 0.7) {
      add(
        "content",
        "medium",
        "Page content dropped significantly",
        `Word count fell from ~${previousScan.wordCount} to ~${scan.wordCount} since the last scan — check nothing was accidentally removed.`
      );
    }
    if (previousScan.statusCode === 200 && scan.statusCode && scan.statusCode !== 200) {
      add(
        "technical",
        "critical",
        "Site status changed for the worse",
        `Was returning HTTP 200, now returning HTTP ${scan.statusCode}.`
      );
    }
  }

  return insights;
}
