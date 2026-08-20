import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId, category, title, description, priority } = body;

  if (!clientId || !title) {
    return NextResponse.json({ error: "clientId and title are required" }, { status: 400 });
  }

  const rows = await sql`
    INSERT INTO insights (client_id, category, title, description, priority, status, source)
    VALUES (${clientId}, ${category || "seo"}, ${title}, ${description || null}, ${priority || "medium"}, 'open', 'manual')
    RETURNING *
  `;

  return NextResponse.json({ insight: rows[0] }, { status: 201 });
}
