import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PATCH(request) {
  const body = await request.json().catch(() => ({}));
  const { stripeFeePercent, stripeFeeFixed } = body;

  const rows = await sql`
    UPDATE app_settings SET
      stripe_fee_percent = COALESCE(${stripeFeePercent ?? null}, stripe_fee_percent),
      stripe_fee_fixed = COALESCE(${stripeFeeFixed ?? null}, stripe_fee_fixed)
    WHERE id = 1
    RETURNING *
  `;

  return NextResponse.json({ settings: rows[0] });
}
