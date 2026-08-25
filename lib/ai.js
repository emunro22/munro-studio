// Turns this week's raw scan + competitor signals into a narrative report using
// Claude. Gracefully no-ops if ANTHROPIC_API_KEY isn't set — the rule-based
// insights from lib/scan.js and lib/competitors.js work fine on their own.

export async function generateAiSummary({ client, scan, autoInsights, competitors = [], gapInsights = [], reviews = null }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const findings = autoInsights.length
    ? autoInsights.map((i) => `- [${i.priority}] ${i.title}: ${i.description}`).join("\n")
    : "- No new technical issues found this week.";

  const ownReview = reviews && !reviews.error ? reviews : null;
  const reviewLine = ownReview
    ? `This business currently has ${ownReview.rating ?? "?"}★ from ${ownReview.reviewCount ?? "?"} Google reviews.`
    : "No Google review data available for this business yet.";

  const competitorLines = competitors.length
    ? competitors
        .map((c) => `- ${c.name}: ${c.rating ?? "?"}★, ${c.reviewCount ?? "?"} reviews`)
        .join("\n")
    : null;

  const gapLines = gapInsights.length
    ? gapInsights.map((g) => `- ${g.title}: ${g.description}`).join("\n")
    : null;

  const competitorSection = competitorLines
    ? `\nTracked local competitors:\n${competitorLines}\n${gapLines ? `\nCompetitor gap analysis already computed:\n${gapLines}\n` : ""}`
    : "\nNo competitors are being tracked for this client yet, so skip competitive comparisons entirely rather than guessing at who the competition might be.";

  const prompt = `You are an SEO/GEO/AEO consultant writing an internal report for a web design agency about one of their clients, in the style of a sharp competitive analysis (scored categories, specific named comparisons, concrete recommendations) rather than a generic checklist.

Client: ${client.name} (${client.domain})
Plan: ${client.plan_type === "monthly_seo" ? "paying monthly for ongoing SEO" : "one-time paid build, no SEO retainer yet"}
${reviewLine}
${competitorSection}

This week's automated technical scan found:
${findings}

Homepage signals: title="${scan.title || "(none)"}", word count=${scan.wordCount}, status=${scan.statusCode}.

Write a report of roughly 400-600 words with this structure:
1. A short scored assessment across Website, Local SEO, Google Presence, Conversion Potential, and Competitive Position (each out of 10, one line of justification each). If there's no competitor data, still score the other categories and just skip "Competitive Position" or note it can't be scored yet.
2. What's working well right now, specifically (not generic praise).
3. Named competitor comparisons using the real numbers given above, if any were provided — do not invent competitor names or numbers that weren't given to you.
4. 2-3 concrete, specific page/content ideas grounded in the actual gap-analysis findings above (if any were given) — not generic "write more content" advice.
5. A short prioritized action list (3-5 items, most impactful first).

Formatting: plain text only, this is rendered in a plain white-space:pre-wrap block, not markdown — no #, *, or ** syntax. Use short label lines and line breaks for structure instead (e.g. a line like "WEBSITE: 8/10 — ..." on its own). Do not repeat the raw scan findings verbatim; synthesize them into a coherent, specific narrative.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1400,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}
