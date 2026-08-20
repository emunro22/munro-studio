import { sql } from "./db";

export async function getClientsWithStats() {
  const clients = await sql`SELECT * FROM clients ORDER BY plan_type, name`;

  const metrics = await sql`
    SELECT DISTINCT ON (client_id) client_id, week_start, page_views, visitors,
      LAG(page_views) OVER (PARTITION BY client_id ORDER BY week_start) AS prev_page_views,
      LAG(visitors) OVER (PARTITION BY client_id ORDER BY week_start) AS prev_visitors
    FROM weekly_metrics
    ORDER BY client_id, week_start DESC
  `;
  const metricsByClient = Object.fromEntries(metrics.map((m) => [m.client_id, m]));

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
    latestMetric: metricsByClient[c.id] || null,
    openInsightCounts: insightsByClient[c.id] || {},
    latestReview: reviewsByClient[c.id] || null,
    latestScan: scansByClient[c.id] || null,
  }));
}

export async function getClientDetail(slug) {
  const clientRows = await sql`SELECT * FROM clients WHERE slug = ${slug}`;
  const client = clientRows[0];
  if (!client) return null;

  const [metricsHistory, insights, scanHistory, reviewHistory] = await Promise.all([
    sql`SELECT * FROM weekly_metrics WHERE client_id = ${client.id} ORDER BY week_start DESC LIMIT 26`,
    sql`SELECT * FROM insights WHERE client_id = ${client.id} ORDER BY
        CASE priority WHEN 'critical' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
        created_at DESC`,
    sql`SELECT * FROM site_scans WHERE client_id = ${client.id} ORDER BY scanned_at DESC LIMIT 12`,
    sql`SELECT * FROM review_snapshots WHERE client_id = ${client.id} ORDER BY fetched_at DESC LIMIT 12`,
  ]);

  return { client, metricsHistory, insights, scanHistory, reviewHistory };
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
    sql`
      SELECT p.*, c.name AS client_name, c.slug AS client_slug
      FROM payments p LEFT JOIN clients c ON c.id = p.client_id
      ORDER BY p.paid_at DESC, p.id DESC
    `,
    sql`SELECT id, name, slug, monthly_fee FROM clients WHERE plan_type = 'monthly_seo' AND status = 'active' AND monthly_fee IS NOT NULL`,
  ]);

  return { settings, payments, monthlyClients };
}
