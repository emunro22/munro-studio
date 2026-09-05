// Full-site broken-link check for a client's own site (not competitors - see
// lib/competitors.js for why that's scoped out). Starts from the sitemap page
// list already captured by scanSite, crawls each page for outbound links, then
// checks every unique link found. Runs against a self-imposed wall-clock
// budget so it degrades honestly (partial results, truthfully labeled) instead
// of risking the platform hard-killing the request mid-run.

const USER_AGENT = "Mozilla/5.0 (compatible; MunroStudioSEOBot/1.0; +https://munrostudio.co.uk)";
const MAX_PAGES = 150;
const MAX_LINKS = 400;
const TIME_BUDGET_MS = 45000;
const PAGE_CONCURRENCY = 8;
const LINK_CONCURRENCY = 10;

async function fetchWithTimeout(url, opts = {}, timeoutMs = 6000) {
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

async function mapWithConcurrency(items, limit, fn) {
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const idx = cursor++;
      await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

function extractLinks(html, baseUrl) {
  const hrefs = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const links = new Set();
  for (const href of hrefs) {
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      links.add(new URL(href, baseUrl).toString());
    } catch {
      // malformed href - skip
    }
  }
  return [...links];
}

// Tries HEAD first (cheap); falls back to GET on failure or a non-ok status,
// since some servers reject HEAD outright even when the page is genuinely fine.
async function checkLinkStatus(url) {
  try {
    const headRes = await fetchWithTimeout(url, { method: "HEAD" }, 5000);
    if (headRes.ok) return { ok: true, status: headRes.status };
  } catch {
    // fall through to GET
  }
  try {
    const getRes = await fetchWithTimeout(url, { method: "GET" }, 5000);
    return { ok: getRes.ok, status: getRes.status };
  } catch (err) {
    return { ok: false, status: null, error: err.name === "AbortError" ? "timeout" : "unreachable" };
  }
}

export async function checkBrokenLinks(domain, sitemapUrls) {
  const started = Date.now();
  const timeLeft = () => TIME_BUDGET_MS - (Date.now() - started);
  const origin = domain.startsWith("http") ? new URL(domain).origin : `https://${domain}`;

  const pages = (sitemapUrls && sitemapUrls.length ? sitemapUrls : ["/"])
    .slice(0, MAX_PAGES)
    .map((p) => {
      try {
        return new URL(p, origin).toString();
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  const pagesTotal = pages.length;

  const linkSources = new Map(); // link URL -> Set of page URLs it was found on
  const broken = [];
  let pagesChecked = 0;
  let partial = false;

  await mapWithConcurrency(pages, PAGE_CONCURRENCY, async (pageUrl) => {
    if (timeLeft() <= 8000) {
      partial = true;
      return;
    }
    pagesChecked++;
    try {
      const res = await fetchWithTimeout(pageUrl, {}, 6000);
      if (!res.ok) {
        broken.push({ type: "page", url: pageUrl, status: res.status, foundOn: [] });
        return;
      }
      const html = await res.text();
      for (const link of extractLinks(html, pageUrl)) {
        if (!linkSources.has(link)) {
          if (linkSources.size >= MAX_LINKS) continue;
          linkSources.set(link, new Set());
        }
        linkSources.get(link).add(pageUrl);
      }
    } catch (err) {
      broken.push({
        type: "page",
        url: pageUrl,
        status: null,
        error: err.name === "AbortError" ? "timeout" : "unreachable",
        foundOn: [],
      });
    }
  });

  const uniqueLinks = [...linkSources.keys()];
  const linksTotal = uniqueLinks.length;
  let linksChecked = 0;

  await mapWithConcurrency(uniqueLinks, LINK_CONCURRENCY, async (link) => {
    if (timeLeft() <= 3000) {
      partial = true;
      return;
    }
    linksChecked++;
    const result = await checkLinkStatus(link);
    if (!result.ok) {
      broken.push({
        type: "link",
        url: link,
        status: result.status,
        error: result.error || null,
        foundOn: [...linkSources.get(link)].slice(0, 3),
      });
    }
  });

  if (pagesChecked < pagesTotal || linksChecked < linksTotal) partial = true;

  return {
    pagesChecked,
    pagesTotal,
    linksChecked,
    linksTotal,
    brokenLinks: broken,
    partial,
    durationMs: Date.now() - started,
  };
}
