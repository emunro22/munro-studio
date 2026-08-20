import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PATCH(request, { params }) {
  const id = Number(params.id);
  const body = await request.json().catch(() => ({}));
  const allowed = ["name", "domain", "plan_type", "status", "monthly_fee", "notes", "google_place_id"];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const rows = await sql`
    UPDATE clients SET
      name = COALESCE(${updates.name ?? null}, name),
      domain = CASE WHEN ${"domain" in updates} THEN ${updates.domain ?? null} ELSE domain END,
      plan_type = COALESCE(${updates.plan_type ?? null}, plan_type),
      status = COALESCE(${updates.status ?? null}, status),
      monthly_fee = CASE WHEN ${"monthly_fee" in updates} THEN ${updates.monthly_fee ?? null} ELSE monthly_fee END,
      notes = CASE WHEN ${"notes" in updates} THEN ${updates.notes ?? null} ELSE notes END,
      google_place_id = CASE WHEN ${"google_place_id" in updates} THEN ${updates.google_place_id ?? null} ELSE google_place_id END
    WHERE id = ${id}
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }
  return NextResponse.json({ client: rows[0] });
}

export async function DELETE(request, { params }) {
  const id = Number(params.id);
  await sql`DELETE FROM clients WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
