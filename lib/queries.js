import { sql } from "./db";
import { mostRecentMonday, weekBefore } from "./dates";

export async function getClientsWithStats() {
  const clients = await sql`SELECT * FROM clients ORDER BY plan_type, name`;

  // Bucketed by explicit calendar weeks (not just "latest two rows"), so a
  // client with no entry yet for the current week still shows last week's
  // number instead of an older one.
  const thisWeek = mostRecentMonday();
  const lastWeek = weekBefore(thisWeek);
  const metricRows = await sql`
    SELECT client_id, page_views,
      CASE WHEN week_start = ${thisWeek} THEN 'this' WHEN week_start = ${lastWeek} THEN 'last' END AS bucket
    FROM weekly_metrics
    WHERE week_start IN (${thisWeek}, ${lastWeek})
  `;
  const metricsByClient = {};
  for (const row of metricRows) {
    metricsByClient[row.client_id] = metricsByClient[row.client_id] || {};
    if (row.bucket === "this") metricsByClient[row.client_id].thisWeekViews = row.page_views;
    if (row.bucket === "last") metricsByClient[row.client_id].lastWeekViews = row.page_views;
  }

  const insightCounts = await sql`
    SELECT client_id, priority, COUNT(*)::int AS count
    FROM insights WHERE status = 'open' GROUP BY client_id, priority
  `;
  const insightsByClient = {};
  for (const row of insightCounts) {
    insightsByClient[row.client_id] = insightsByClient[row.client_id] || {};
    insightsByClient[row.client_id][row.priority] = row.count;
  }

  const reviews = await sql`
    SELECT DISTINCT ON (client_id) client_id, rating, review_count, fetched_at
    FROM review_snapshots ORDER BY client_id, fetched_at DESC
  `;
  const reviewsByClient = Object.fromEntries(reviews.map((r) => [r.client_id, r]));

  const scans = await sql`
    SELECT DISTINCT ON (client_id) client_id, scanned_at, status_code, error
    FROM site_scans ORDER BY client_id, scanned_at DESC
  `;
  const scansByClient = Object.fromEntries(scans.map((s) => [s.client_id, s]));

  return clients.map((c) => ({
    ...c,
    thisWeekViews: metricsByClient[c.id]?.thisWeekViews ?? null,
    lastWeekViews: metricsByClient[c.id]?.lastWeekViews ?? null,
    openInsightCounts: insightsByClient[c.id] || {},
    latestReview: reviewsByClient[c.id] || null,
    latestScan: scansByClient[c.id] || null,
  }));
}

export async function getClientDetail(slug) {
  const clientRows = await sql`SELECT * FROM clients WHERE slug = ${slug}`;
  const client = clientRows[0];
  if (!client) return null;

  const [metricsHistory, insights, scanHistory, reviewHistory, competitors, linkCheckHistory] = await Promise.all([
    sql`SELECT * FROM weekly_metrics WHERE client_id = ${client.id} ORDER BY week_start DESC LIMIT 26`,
    sql`SELECT * FROM insights WHERE client_id = ${client.id} ORDER BY
        CASE priority WHEN 'critical' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
        created_at DESC`,
    sql`SELECT * FROM site_scans WHERE client_id = ${client.id} ORDER BY scanned_at DESC LIMIT 12`,
    sql`SELECT * FROM review_snapshots WHERE client_id = ${client.id} ORDER BY fetched_at DESC LIMIT 12`,
    sql`SELECT * FROM competitors WHERE client_id = ${client.id} ORDER BY created_at ASC`,
    sql`SELECT * FROM link_checks WHERE client_id = ${client.id} ORDER BY checked_at DESC LIMIT 1`,
  ]);

  const latestCompetitorScans = competitors.length
    ? await sql`
        SELECT DISTINCT ON (competitor_id) *
        FROM competitor_scans
        WHERE competitor_id = ANY(${competitors.map((c) => c.id)})
        ORDER BY competitor_id, scanned_at DESC
      `
    : [];
  const scanByCompetitor = Object.fromEntries(latestCompetitorScans.map((s) => [s.competitor_id, s]));
  const competitorsWithScans = competitors.map((c) => ({ ...c, latestScan: scanByCompetitor[c.id] || null }));

  return {
    client,
    metricsHistory,
    insights,
    scanHistory,
    reviewHistory,
    competitors: competitorsWithScans,
    latestLinkCheck: linkCheckHistory[0] || null,
  };
}

export async function getClientOptions() {
  return sql`SELECT id, name, slug FROM clients ORDER BY name`;
}

export async function getSettings() {
  const rows = await sql`SELECT * FROM app_settings WHERE id = 1`;
  return rows[0] || { stripe_fee_percent: 1.5, stripe_fee_fixed: 0.2 };
}

export async function getRevenueData() {
  const [settings, payments, monthlyClients] = await Promise.all([
    getSettings(),
    // Year/month/display-date extracted in SQL (not re-parsed from the
    // returned value in JS) — DATE columns come back through the driver as
    // JS Date objects that get timezone-shifted, which previously caused a
    // real bucketing bug; this sidesteps it, especially important for the
    // 1st-of-month dates used by monthly revenue entries.
    sql`
      SELECT p.*, c.name AS client_name, c.slug AS client_slug,
        EXTRACT(YEAR FROM p.paid_at)::int AS paid_year,
        EXTRACT(MONTH FROM p.paid_at)::int AS paid_month,
        TO_CHAR(p.paid_at, 'DD Mon YYYY') AS paid_at_display
      FROM payments p LEFT JOIN clients c ON c.id = p.client_id
      ORDER BY p.paid_at DESC, p.id DESC
    `,
    sql`SELECT id, name, slug, monthly_fee FROM clients WHERE plan_type = 'monthly_seo' AND status = 'active' AND monthly_fee IS NOT NULL`,
  ]);

  return { settings, payments, monthlyClients };
}
