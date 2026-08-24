import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { scanCompetitors, buildCompetitorInsights } from "@/lib/competitors";

export const maxDuration = 60;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId } = body;
  if (!clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 });

  const clientRows = await sql`SELECT * FROM clients WHERE id = ${clientId}`;
  const client = clientRows[0];
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { competitors, results } = await scanCompetitors(client);
  if (competitors.length === 0) {
    return NextResponse.json({ scanned: 0, insightsInserted: 0 });
  }

  const [latestClientScanRows, latestClientReviewRows, latestCompetitorScanRows] = await Promise.all([
    sql`SELECT * FROM site_scans WHERE client_id = ${clientId} ORDER BY scanned_at DESC LIMIT 1`,
    sql`SELECT * FROM review_snapshots WHERE client_id = ${clientId} ORDER BY fetched_at DESC LIMIT 1`,
    sql`
      SELECT DISTINCT ON (competitor_id) *
      FROM competitor_scans
      WHERE competitor_id = ANY(${competitors.map((c) => c.id)})
      ORDER BY competitor_id, scanned_at DESC
    `,
  ]);

  const competitorScans = latestCompetitorScanRows
    .filter((row) => !row.error)
    .map((row) => ({ competitorId: row.competitor_id, scan: row }));

  const gapInsights = buildCompetitorInsights(
    client,
    latestClientScanRows[0] || null,
    latestClientReviewRows[0] || null,
    competitorScans
  );

  const existingOpenRows = await sql`
    SELECT title FROM insights WHERE client_id = ${clientId} AND status = 'open' AND source = 'competitor_scan'
  `;
  const existingTitles = new Set(existingOpenRows.map((r) => r.title));

  let insightsInserted = 0;
  for (const insight of gapInsights) {
    if (existingTitles.has(insight.title)) continue;
    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (${clientId}, ${insight.category}, ${insight.title}, ${insight.description}, ${insight.priority}, 'open', ${insight.source})
    `;
    insightsInserted++;
  }

  return NextResponse.json({ scanned: results.length, insightsInserted });
}
