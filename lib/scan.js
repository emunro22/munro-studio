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

    const anchors = [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
    const anchorMatches = (pattern) => anchors.some(([, href, text]) => pattern.test(href) || pattern.test(stripTags(text)));
    const hasPrivacyPolicy = anchorMatches(/privacy/i);
    const hasTermsPage = anchorMatches(/terms/i);
    const hasTelLink = /href=["']tel:/i.test(html);
    const hasCtaPhrase = /call now|get a quote|book now|request a quote|get in touch|call today/i.test(stripTags(html));
    const hasClearCta = hasTelLink || hasCtaPhrase;
    const hasFavicon = /<link[^>]+rel=["'](?:shortcut icon|icon)["']/i.test(html);
    const hasHtmlLang = /<html\b[^>]*\blang=["'][a-zA-Z-]+["']/i.test(html);
    // Structural only - never submitted, just checks a form exists and looks usable.
    const formBlocks = [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((m) => m[0]);
    const hasContactForm = formBlocks.some(
      (form) => /\brequired\b/i.test(form) && /<button\b|<input[^>]+type=["']submit["']/i.test(form)
    );

    const hasAboutPage = anchorMatches(/about/i);
    const hasProductSchema = ldJsonBlocks.some((block) => /"@type"\s*:\s*"Product"/i.test(block));
    const hasOrganizationSchema = ldJsonBlocks.some((block) =>
      /"@type"\s*:\s*"(Organization|LocalBusiness|AutomotiveBusiness|AutoRepair|AutoDealer|Store|FoodEstablishment|Restaurant|ProfessionalService|HomeAndConstructionBusiness|MovingCompany)"/i.test(
        block
      )
    );
    const hasEcommerceSignals = /add to cart|add to basket|buy now|checkout|shopping cart/i.test(stripTags(html));

    const videoTags = [...html.matchAll(/<video\b[^>]*>/gi)].map((m) => m[0]);
    const videoIframes = [...html.matchAll(/<iframe\b[^>]*>/gi)]
      .map((m) => m[0])
      .filter((tag) => /youtube|vimeo|wistia/i.test(tag));
    const hasVideoContent = videoTags.length > 0 || videoIframes.length > 0;
    const hasLazyVideo =
      hasVideoContent &&
      videoTags.every((tag) => /preload=["']none["']|loading=["']lazy["']/i.test(tag)) &&
      videoIframes.every((tag) => /loading=["']lazy["']/i.test(tag));

    const imageMatches = [...html.matchAll(/<img\b[^>]*>/gi)];
    const imageCount = imageMatches.length;
    const imagesMissingAlt = imageMatches.filter((m) => !/\balt=["'][^"']+["']/i.test(m[0])).length;
    const internalLinkCount = (html.match(/<a\b[^>]+href=/gi) || []).length;

    const imageSrcs = imageMatches
      .map((m) => extractTag(m[0], /\bsrc=["']([^"']*)["']/i))
      .filter(Boolean);
    const genericNameImages = imageSrcs.filter((src) => {
      const filename = src.split("/").pop().split("?")[0];
      return /^(img|dsc|image|photo|screenshot)[-_]?\d+\.[a-z]+$/i.test(filename);
    }).length;
    const hasDescriptiveImageNames = imageSrcs.length === 0 || genericNameImages / imageSrcs.length < 0.5;

    // Bounded, cheap proxy for "images are compressed" - checks a handful of
    // real image response sizes rather than downloading/decoding every image.
    let hasLargeUncompressedImages = false;
    try {
      const sampleUrls = imageSrcs
        .slice(0, 8)
        .map((src) => {
          try {
            return new URL(src, url).toString();
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      const sizes = await Promise.all(
        sampleUrls.map((imgUrl) =>
          fetchWithTimeout(imgUrl, { method: "HEAD" }, 4000)
            .then((r) => Number(r.headers.get("content-length")) || 0)
            .catch(() => 0)
        )
      );
      hasLargeUncompressedImages = sizes.some((size) => size > 400_000);
    } catch {
      hasLargeUncompressedImages = false;
    }

    const bodyText = stripTags(html);
    const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;

    let hasRobotsTxt = false;
    let hasSitemap = false;
    let hasLlmsTxt = false;
    let hasCustomNotFound = false;
    let sitemapUrlCount = null;
    let sitemapUrls = [];
    try {
      const origin = new URL(url).origin;
      const [robotsRes, sitemapRes, llmsRes, notFoundRes] = await Promise.all([
        fetchWithTimeout(`${origin}/robots.txt`, {}, 5000).catch(() => null),
        fetchWithTimeout(`${origin}/sitemap.xml`, {}, 5000).catch(() => null),
        fetchWithTimeout(`${origin}/llms.txt`, {}, 5000).catch(() => null),
        fetchWithTimeout(`${origin}/__munro-404-check__`, {}, 5000).catch(() => null),
      ]);
      hasRobotsTxt = !!robotsRes && robotsRes.ok;
      hasSitemap = !!sitemapRes && sitemapRes.ok;
      hasLlmsTxt = !!llmsRes && llmsRes.ok;
      // A custom 404 page returns a real 404 status; a "soft 404" (redirects to
      // or renders the homepage with 200) fails this, which is the point.
      hasCustomNotFound = !!notFoundRes && notFoundRes.status === 404;
      if (hasSitemap) {
        const sitemapXml = await sitemapRes.text();
        const locs = [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
        sitemapUrlCount = locs.length;
        // A sitemap *index* lists other .xml sitemap files rather than pages -
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
      hasCustomNotFound,
      hasPrivacyPolicy,
      hasTermsPage,
      hasClearCta,
      hasFavicon,
      hasHtmlLang,
      hasContactForm,
      hasAboutPage,
      hasProductSchema,
      hasOrganizationSchema,
      hasEcommerceSignals,
      hasVideoContent,
      hasLazyVideo,
      hasDescriptiveImageNames,
      hasLargeUncompressedImages,
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
      hasCustomNotFound: false,
      hasPrivacyPolicy: false,
      hasTermsPage: false,
      hasClearCta: false,
      hasFavicon: false,
      hasHtmlLang: false,
      hasContactForm: false,
      hasAboutPage: false,
      hasProductSchema: false,
      hasOrganizationSchema: false,
      hasEcommerceSignals: false,
      hasVideoContent: false,
      hasLazyVideo: false,
      hasDescriptiveImageNames: false,
      hasLargeUncompressedImages: false,
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

export function buildAutoInsights(scan, previousScan, client = null) {
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
      "The homepage is returning an error status. If this persists it will tank rankings fast, so check immediately."
    );
  }

  if (scan.hasNoindex) {
    add(
      "technical",
      "critical",
      "Page is set to noindex",
      "The homepage has a <meta name=\"robots\" content=\"noindex\"> tag: this tells Google not to show the page in search results at all. If this wasn't intentional, it needs fixing immediately; nothing else on this list matters until it's gone."
    );
  }

  if (!scan.title) {
    add(
      "technical",
      "high",
      "Missing <title> tag",
      "No title tag detected on the homepage. This is one of the strongest on-page ranking signals and it's currently blank."
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
      'Missing <meta name="viewport">: the page may not render properly on mobile, which Google uses for ranking (mobile-first indexing).'
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
      "Add a <link rel=\"canonical\"> tag pointing at the preferred URL for this page. It helps Google avoid treating www/non-www or tracking-parameter variants as duplicate content."
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
      "llms.txt is an emerging convention: a plain-English summary of the business and its services at /llms.txt that AI crawlers (ChatGPT, Claude, Perplexity) check when answering questions. Cheap to add, and few competitors will have one yet."
    );
  }

  if (!scan.hasClearCta) {
    add(
      "technical",
      "high",
      "No clear call-to-action found",
      "No phone (tel:) link or common call-to-action phrasing (\"call now\", \"get a quote\", \"book now\") detected on the homepage. A visitor who's ready to act should never have to hunt for how to contact the business."
    );
  }

  if (!scan.hasPrivacyPolicy) {
    add(
      "technical",
      "medium",
      "No privacy policy link found",
      "No link to a privacy policy detected on the homepage. Expected on any site with a contact form, analytics, or cookies, and a basic trust signal for visitors."
    );
  }

  if (!scan.hasTermsPage) {
    add(
      "technical",
      "low",
      "No terms page link found",
      "No link to terms & conditions detected on the homepage."
    );
  }

  if (!scan.hasFavicon) {
    add(
      "technical",
      "low",
      "No favicon found",
      "No <link rel=\"icon\"> detected. The site will show a generic blank tab icon in browsers and bookmarks, which reads as unpolished."
    );
  }

  if (!scan.hasCustomNotFound) {
    add(
      "technical",
      "low",
      "No custom 404 page",
      "A random non-existent URL didn't return a proper 404. It likely soft-redirects to the homepage instead, which can confuse both users and search engines about which pages actually exist."
    );
  }

  if (!scan.hasHtmlLang) {
    add(
      "technical",
      "low",
      "Missing <html lang> attribute",
      "The <html> tag has no lang attribute: a basic accessibility requirement (screen readers use it to choose pronunciation) that also helps search engines confirm the page's language."
    );
  }

  if (client?.trade) {
    const tradeWords = client.trade.toLowerCase().split(/\s+/).filter((w) => w.length >= 4);
    if (tradeWords.length > 0) {
      const titleLower = (scan.title || "").toLowerCase();
      const metaLower = (scan.metaDescription || "").toLowerCase();
      if (!tradeWords.some((w) => titleLower.includes(w))) {
        add(
          "seo",
          "high",
          "Main keyword missing from title tag",
          `Title is "${scan.title || "(none)"}" and it doesn't contain a word from this client's main service ("${client.trade}"). The title tag is one of the strongest ranking signals; it should lead with what the business actually does.`
        );
      }
      if (!tradeWords.some((w) => metaLower.includes(w))) {
        add(
          "seo",
          "medium",
          "Main keyword missing from meta description",
          `The meta description doesn't mention this client's main service ("${client.trade}"). Google often bolds matching keywords in the search snippet, which improves click-through rate.`
        );
      }
    }
  }

  if (!scan.hasAboutPage) {
    add(
      "technical",
      "low",
      "No About page link found",
      "No link to an About/About Us page detected. A short page about who runs the business builds trust with visitors and gives Google more context for E-E-A-T (experience, expertise, authority, trust) signals."
    );
  }

  if (scan.hasEcommerceSignals && !scan.hasProductSchema) {
    add(
      "seo",
      "medium",
      "Selling online but no Product schema found",
      "The homepage shows signs of online selling (cart/checkout/buy language) but no Product JSON-LD schema was detected. Product schema lets Google show price, availability and star ratings directly in search results."
    );
  }

  if (!scan.hasOrganizationSchema) {
    add(
      "aeo",
      "medium",
      "No Organization/LocalBusiness schema found",
      "Adding Organization or LocalBusiness JSON-LD (name, address, phone, opening hours) is one of the clearest signals AI answer engines and Google use to trust a site enough to cite it as a source, on top of the usual ranking benefit."
    );
  }

  if (scan.hasVideoContent && !scan.hasLazyVideo) {
    add(
      "technical",
      "low",
      "Video content isn't lazy-loaded",
      "Video/embed found without loading=\"lazy\" (or preload=\"none\" for a native <video> tag). It loads immediately even if a visitor never scrolls to it, which slows the page down unnecessarily."
    );
  }

  if (!scan.hasDescriptiveImageNames) {
    add(
      "seo",
      "low",
      "Image filenames aren't descriptive",
      "Several images use generic camera-dump names (e.g. IMG_1234.jpg) instead of descriptive keyword filenames (e.g. car-detailing-glasgow.jpg). Filenames are a minor but free image-search ranking signal."
    );
  }

  if (scan.hasLargeUncompressedImages) {
    add(
      "technical",
      "medium",
      "Some images are large/uncompressed",
      "At least one homepage image is over 400KB. Large uncompressed images are one of the most common causes of slow page loads, worth compressing (TinyPNG, Squoosh, or automatic compression at build time)."
    );
  }

  // "AI answer-engine citation readiness" - the specific combination of signals
  // that determine whether AI tools (ChatGPT, Perplexity, Google AI Overviews)
  // have enough to confidently cite this business as a source.
  const citationSignals = [
    { ok: scan.hasFaqSchema, label: "FAQ/HowTo schema" },
    { ok: scan.hasOrganizationSchema, label: "Organization/LocalBusiness schema" },
    { ok: scan.hasLlmsTxt, label: "llms.txt" },
    { ok: scan.hasHtmlLang, label: "<html lang> attribute" },
    { ok: scan.hasAboutPage, label: "an About page" },
  ];
  const missingCitationSignals = citationSignals.filter((s) => !s.ok);
  if (missingCitationSignals.length > 0) {
    add(
      "aeo",
      missingCitationSignals.length >= 3 ? "high" : "medium",
      `AI citation readiness: ${citationSignals.length - missingCitationSignals.length}/${citationSignals.length} signals present`,
      `Missing: ${missingCitationSignals.map((s) => s.label).join(", ")}. These are the concrete things AI answer engines look for when deciding whether to cite a business directly rather than just a competitor further down the results.`
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
      "Alt text helps accessibility and image search rankings, worth filling in on all content images."
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
      `Homepage took ~${scan.responseMs}ms to respond. Slow pages hurt both rankings and conversion rate: check image sizes, fonts, or third-party scripts.`
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
        `Word count fell from ~${previousScan.wordCount} to ~${scan.wordCount} since the last scan. Check nothing was accidentally removed.`
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
