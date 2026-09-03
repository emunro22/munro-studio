import { NextResponse } from "next/server";
import { fetchAndStoreOwnReviews } from "@/lib/ownReviews";

export async function POST() {
  try {
    const result = await fetchAndStoreOwnReviews();
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
