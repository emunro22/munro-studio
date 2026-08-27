import { NextResponse } from "next/server";
import { getStoredReviews } from "@/lib/googleBusinessAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getStoredReviews();
  if (!data || !data.reviews) {
    return NextResponse.json({ connected: false, reviews: [], rating: null, reviewCount: null });
  }
  return NextResponse.json({
    connected: true,
    reviews: data.reviews,
    rating: data.rating,
    reviewCount: data.review_count,
    fetchedAt: data.reviews_fetched_at,
  });
}
