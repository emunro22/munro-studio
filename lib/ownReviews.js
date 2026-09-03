// Munro Studio's own Google reviews, for the marketing site's review marquee.
//
// Two possible sources, in order of preference:
//
//  1. Places API (New) + our own Place ID (GOOGLE_PLACE_ID). Just an API key,
//     no approval process, works today. Capped at five reviews by Google.
//  2. Business Profile API over OAuth (lib/googleBusinessAuth.js). Returns
//     every review, but Google only grants access to projects approved
//     through their Business Profile API application form.
//
// Both land in the same google_business_auth row, so /api/reviews and the
// admin panel do not care which one filled it in.

import { sql } from "./db";
import { fetchPlaceReviews, placesConfigured } from "./places";
import { fetchAndStoreReviews as fetchViaBusinessProfile, getValidAccessToken } from "./googleBusinessAuth";

export function ownPlaceId() {
  return process.env.GOOGLE_PLACE_ID || null;
}

export function placesReviewsConfigured() {
  return placesConfigured() && !!ownPlaceId();
}

async function fetchViaPlaces() {
  const placeId = ownPlaceId();
  const data = await fetchPlaceReviews(placeId);

  if (!data) throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  if (data.error) {
    throw new Error(
      `Places API returned ${data.error}${data.errorMessage ? `: ${data.errorMessage}` : ""}`
    );
  }

  const reviews = (data.reviews || []).map((r) => ({
    name: r.author,
    rating: r.rating,
    text: r.text,
    time: r.time,
    relativeTime: r.relativeTime,
  }));

  await sql`
    INSERT INTO google_business_auth (id, reviews, rating, review_count, reviews_fetched_at, location_name, connected_at)
    VALUES (1, ${JSON.stringify(reviews)}, ${data.rating}, ${data.reviewCount}, now(), ${data.name}, now())
    ON CONFLICT (id) DO UPDATE SET
      reviews = EXCLUDED.reviews,
      rating = EXCLUDED.rating,
      review_count = EXCLUDED.review_count,
      reviews_fetched_at = EXCLUDED.reviews_fetched_at,
      location_name = COALESCE(EXCLUDED.location_name, google_business_auth.location_name),
      connected_at = COALESCE(google_business_auth.connected_at, EXCLUDED.connected_at)
  `;


  return { reviews, rating: data.rating, reviewCount: data.reviewCount, source: "places" };
}

export async function fetchAndStoreOwnReviews() {
  if (placesReviewsConfigured()) {
    return fetchViaPlaces();
  }

  // No Place ID set — fall back to Business Profile OAuth if it is connected.
  const hasOauth = await getValidAccessToken().catch(() => null);
  if (hasOauth) {
    const result = await fetchViaBusinessProfile();
    return { ...result, source: "business-profile" };
  }

  throw new Error(
    placesConfigured()
      ? "Set GOOGLE_PLACE_ID to Munro Studio's Google Place ID to pull reviews"
      : "Set GOOGLE_PLACES_API_KEY (Places API New) and GOOGLE_PLACE_ID to pull reviews"
  );
}
