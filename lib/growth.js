// Pure, no-DB-write "ideas to get more views" - computed fresh from whatever
// weekly numbers exist so far, rather than stored insights that go stale.
// `metricsHistory` is weekly_metrics rows ordered newest-first.

const UNIVERSAL_IDEAS = [
  {
    title: "Ask every happy customer for a Google review",
    description:
      "Review count and recency are one of the strongest local-pack ranking factors for trades/local businesses. A quick text with a review link after each job compounds fast.",
  },
  {
    title: "Post to Google Business Profile weekly",
    description:
      "A photo of recent work or a short update to GBP is free, takes two minutes, and directly increases how often the listing surfaces in Maps and local search.",
  },
];

export function buildGrowthIdeas(metricsHistory) {
  if (!metricsHistory || metricsHistory.length === 0) {
    return [
      {
        title: "Log this week's numbers to unlock trend-based ideas",
        description:
          "Once a couple of weeks of page views are logged, this panel will suggest specific actions based on whether traffic is rising, flat, or falling.",
      },
      ...UNIVERSAL_IDEAS,
    ];
  }

  const withViews = metricsHistory.filter((m) => m.page_views != null);
  if (withViews.length < 2) {
    return [
      {
        title: "One more week of data will unlock a trend read",
        description: "With only one week logged there's nothing to compare against yet. Log next week's figure too.",
      },
      ...UNIVERSAL_IDEAS,
    ];
  }

  const [latest, prev] = withViews;
  const pct = prev.page_views ? Math.round(((latest.page_views - prev.page_views) / prev.page_views) * 100) : 0;

  const recent4 = withViews.slice(0, 4);
  const prior4 = withViews.slice(4, 8);
  const recentAvg = recent4.reduce((s, m) => s + m.page_views, 0) / recent4.length;
  const priorAvg = prior4.length ? prior4.reduce((s, m) => s + m.page_views, 0) / prior4.length : null;

  const ideas = [];

  if (pct <= -15) {
    ideas.push({
      title: `Page views dropped ${Math.abs(pct)}% week-over-week, worth a quick check`,
      description:
        "Check the technical scan panel for a regression (title/meta changed, site slow, or an error status), confirm nothing changed on the Google Business Profile, and search the business's main keyword to see if a competitor jumped ahead.",
    });
  } else if (pct >= 15) {
    ideas.push({
      title: `Page views are up ${pct}%: good moment to press the advantage`,
      description:
        "Whatever drove this (a promo, a review push, a seasonal search spike) is worth repeating. Ask recent visitors who converted for a review now while the experience is fresh.",
    });
  } else {
    ideas.push({
      title: "Traffic is roughly flat week-over-week",
      description:
        "Flat isn't bad, but it means nothing new is pulling in search visibility. A fresh photo/blog post, a new location page, or a small local ad test are the usual levers to break a plateau.",
    });
  }

  if (priorAvg != null) {
    const trendPct = Math.round(((recentAvg - priorAvg) / priorAvg) * 100);
    if (trendPct <= -10) {
      ideas.push({
        title: `Longer trend: down ${Math.abs(trendPct)}% over the last month`,
        description:
          "A single bad week is noise; a month-long decline usually means a ranking or listing issue. Worth a manual Google search for the top service + location keyword to confirm the ranking position hasn't slipped.",
      });
    } else if (trendPct >= 10) {
      ideas.push({
        title: `Longer trend: up ${trendPct}% over the last month`,
        description: "Sustained growth over a month is a real signal, a good time to consider raising this client's retainer scope or using it as a case study for new client pitches.",
      });
    }
  }

  return [...ideas, ...UNIVERSAL_IDEAS];
}
