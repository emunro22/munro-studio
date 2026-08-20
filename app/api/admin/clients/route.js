import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getClientsWithStats } from "@/lib/queries";

export async function GET() {
  const data = await getClientsWithStats();
  return NextResponse.json({ clients: data });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, domain, plan_type, status } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const rows = await sql`
    INSERT INTO clients (name, slug, domain, plan_type, status)
    VALUES (${name}, ${slug}, ${domain || null}, ${plan_type || "fully_paid"}, ${status || "active"})
    ON CONFLICT (slug) DO NOTHING
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "A client with that name already exists" }, { status: 409 });
  }

  return NextResponse.json({ client: rows[0] }, { status: 201 });
}
