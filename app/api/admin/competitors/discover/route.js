import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { discoverCompetitors } from "@/lib/competitors";

export const maxDuration = 30;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId } = body;
  if (!clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 });

  const rows = await sql`SELECT * FROM clients WHERE id = ${clientId}`;
  const client = rows[0];
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  try {
    const competitors = await discoverCompetitors(client);
    return NextResponse.json({ competitors });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
