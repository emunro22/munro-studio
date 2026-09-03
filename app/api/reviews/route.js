import { NextResponse } from "next/server";
import { getReviewsForDisplay } from "@/lib/ownReviews";

export const dynamic = "force-dynamic";

export async function GET() {
  // Refreshes from Google itself when the stored copy is stale, so the site
  // stays current whether or not the daily cron ever fires.
  const data = await getReviewsForDisplay();

  if (!data?.reviews?.length) {
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
