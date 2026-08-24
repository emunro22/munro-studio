import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { runCompetitorScan } from "@/lib/competitors";

export const maxDuration = 60;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId } = body;
  if (!clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 });

  const clientRows = await sql`SELECT * FROM clients WHERE id = ${clientId}`;
  const client = clientRows[0];
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const result = await runCompetitorScan(client);
  return NextResponse.json(result);
}
