import { NextResponse } from "next/server";
import { getStoredReviews } from "@/lib/googleBusinessAuth";
import { getSiteReviews } from "@/lib/siteReviews";

export const dynamic = "force-dynamic";

export async function GET() {
  // Reviews come from the accumulated set (every review we have ever seen from
  // Google, not just the five in the latest response). The headline rating and
  // total count come from the last live pull, so they stay Google's real
  // numbers even though we hold more review bodies than Google returns at once.
  const [reviews, meta] = await Promise.all([getSiteReviews(), getStoredReviews()]);

  if (!reviews.length) {
    return NextResponse.json({ connected: false, reviews: [], rating: null, reviewCount: null });
  }

  return NextResponse.json({
    connected: true,
    reviews: reviews.map((r) => ({
      name: r.author,
      rating: r.rating,
      text: r.text,
      time: r.published_at,
    })),
    rating: meta?.rating ?? null,
    reviewCount: meta?.review_count ?? reviews.length,
    fetchedAt: meta?.reviews_fetched_at ?? null,
  });
}
