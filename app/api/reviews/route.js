import { NextResponse } from "next/server";
import { getStoredReviews } from "@/lib/googleBusinessAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  // Whatever Google returned on the last pull, nothing else. Places gives back
  // up to five reviews per call; those five are what the site shows.
  const data = await getStoredReviews();

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
