import { NextResponse } from "next/server";
import { fetchAndStoreReviews } from "@/lib/googleBusinessAuth";

export async function POST() {
  try {
    const result = await fetchAndStoreReviews();
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
