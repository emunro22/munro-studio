import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { checkBrokenLinks } from "@/lib/linkChecker";

export const maxDuration = 60;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId } = body;
  if (!clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 });

  const clientRows = await sql`SELECT * FROM clients WHERE id = ${clientId}`;
  const client = clientRows[0];
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  if (!client.domain) return NextResponse.json({ error: "Client has no domain" }, { status: 400 });

  const scanRows = await sql`
    SELECT sitemap_urls FROM site_scans WHERE client_id = ${clientId} ORDER BY scanned_at DESC LIMIT 1
  `;
  if (scanRows.length === 0) {
    return NextResponse.json({ error: "Run a site scan first so there's a sitemap to check" }, { status: 400 });
  }

  const result = await checkBrokenLinks(client.domain, scanRows[0].sitemap_urls || []);

  await sql`
    INSERT INTO link_checks (client_id, pages_checked, pages_total, links_checked, links_total, broken_links, partial, duration_ms)
    VALUES (
      ${clientId}, ${result.pagesChecked}, ${result.pagesTotal}, ${result.linksChecked}, ${result.linksTotal},
      ${JSON.stringify(result.brokenLinks)}, ${result.partial}, ${result.durationMs}
    )
  `;

  if (result.brokenLinks.length > 0) {
    const title = `${result.brokenLinks.length} broken link(s) found in a full-site check`;
    const examples = result.brokenLinks
      .slice(0, 8)
      .map((b) => `${b.url} (${b.status || b.error})${b.foundOn?.length ? ` — found on ${b.foundOn[0]}` : ""}`)
      .join("\n");
    const description = `Checked ${result.pagesChecked} of ${result.pagesTotal} pages and ${result.linksChecked} of ${result.linksTotal} unique links${
      result.partial ? " (stopped early to stay within the time budget — re-run to cover more)" : ""
    }.\n\n${examples}`;

    const existingOpenRows = await sql`
      SELECT id FROM insights WHERE client_id = ${clientId} AND status = 'open' AND source = 'link_check'
    `;
    for (const row of existingOpenRows) {
      await sql`UPDATE insights SET status = 'dismissed' WHERE id = ${row.id}`;
    }

    await sql`
      INSERT INTO insights (client_id, category, title, description, priority, status, source)
      VALUES (
        ${clientId}, 'technical', ${title}, ${description},
        ${result.brokenLinks.length >= 5 ? "high" : "medium"}, 'open', 'link_check'
      )
    `;
  }

  return NextResponse.json({ result });
}
