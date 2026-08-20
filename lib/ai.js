// Optional: turns this week's raw scan signals into a short, plain-English
// summary using Claude. Gracefully no-ops if ANTHROPIC_API_KEY isn't set —
// the rule-based insights from lib/scan.js work fine on their own.

export async function generateAiSummary({ client, scan, autoInsights }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const findings = autoInsights.length
    ? autoInsights.map((i) => `- [${i.priority}] ${i.title}: ${i.description}`).join("\n")
    : "- No new technical issues found this week.";

  const prompt = `You are an SEO consultant writing a short weekly note for a web design agency's internal admin dashboard, about one of their clients.

Client: ${client.name} (${client.domain})
Plan: ${client.plan_type === "monthly_seo" ? "paying monthly for ongoing SEO" : "one-time paid build, no SEO retainer yet"}

This week's automated scan found:
${findings}

Homepage signals: title="${scan.title || "(none)"}", word count=${scan.wordCount}, status=${scan.statusCode}.

Write a short update (120-180 words, plain English, no jargon, no headers/markdown) for the agency owner: what's working, what's not, and 2-3 concrete next actions ranked by impact. Do not repeat the raw findings verbatim — synthesize them into a coherent narrative and prioritize.`;

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
        max_tokens: 500,
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
