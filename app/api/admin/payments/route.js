import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId, amount, paidAt, notes } = body;

  if (!amount || !paidAt) {
    return NextResponse.json({ error: "amount and paidAt are required" }, { status: 400 });
  }

  const rows = await sql`
    INSERT INTO payments (client_id, amount, paid_at, notes)
    VALUES (${clientId || null}, ${amount}, ${paidAt}, ${notes || null})
    RETURNING *
  `;

  return NextResponse.json({ payment: rows[0] }, { status: 201 });
}
