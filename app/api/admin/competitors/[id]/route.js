import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function DELETE(request, { params }) {
  const id = Number(params.id);
  await sql`DELETE FROM competitors WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
