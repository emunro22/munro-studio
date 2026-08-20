import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PATCH(request, { params }) {
  const id = Number(params.id);
  const body = await request.json().catch(() => ({}));
  const { status } = body;

  if (!["open", "in_progress", "done", "dismissed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const rows = await sql`UPDATE insights SET status = ${status} WHERE id = ${id} RETURNING *`;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Insight not found" }, { status: 404 });
  }
  return NextResponse.json({ insight: rows[0] });
}
