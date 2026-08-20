import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Vercel Web Analytics has no public API for pageview data, so weekly numbers
// are entered by hand here (copy them from the Vercel dashboard) — this
// endpoint upserts one week's numbers per client.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId, weekStart, pageViews, visitors, topPage, bounceRate, notes } = body;

  if (!clientId || !weekStart) {
    return NextResponse.json({ error: "clientId and weekStart are required" }, { status: 400 });
  }

  const rows = await sql`
    INSERT INTO weekly_metrics (client_id, week_start, page_views, visitors, top_page, bounce_rate, notes)
    VALUES (${clientId}, ${weekStart}, ${pageViews ?? null}, ${visitors ?? null}, ${topPage || null}, ${bounceRate ?? null}, ${notes || null})
    ON CONFLICT (client_id, week_start) DO UPDATE SET
      page_views = EXCLUDED.page_views,
      visitors = EXCLUDED.visitors,
      top_page = EXCLUDED.top_page,
      bounce_rate = EXCLUDED.bounce_rate,
      notes = EXCLUDED.notes
    RETURNING *
  `;

  return NextResponse.json({ metric: rows[0] }, { status: 201 });
}
