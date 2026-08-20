import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { scanClient, scanAllClients } from "@/lib/scanRunner";

export const maxDuration = 60;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  if (body.clientId) {
    const rows = await sql`SELECT * FROM clients WHERE id = ${body.clientId}`;
    const client = rows[0];
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    if (!client.domain) return NextResponse.json({ error: "Client has no domain to scan" }, { status: 400 });
    const result = await scanClient(client);
    return NextResponse.json({ result });
  }

  const results = await scanAllClients();
  return NextResponse.json({ results });
}
