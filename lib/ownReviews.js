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
import { mergeReviews } from "./siteReviews";
import { fetchPlaceReviews, placesConfigured } from "./places";
import {
  fetchAndStoreReviews as fetchViaBusinessProfile,
  getValidAccessToken,
  getStoredReviews,
} from "./googleBusinessAuth";

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


  // The homepage shows exactly these five; /reviews shows the full archive, so
  // union them in there too rather than letting Google rotation lose them.
  await mergeReviews(reviews, "places").catch(() => {});

  return { reviews, rating: data.rating, reviewCount: data.reviewCount, source: "places" };
}

export async function fetchAndStoreOwnReviews() {
  if (placesReviewsConfigured()) {
    return fetchViaPlaces();
  }

  // No Place ID set - fall back to Business Profile OAuth if it is connected.
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

// How long a stored pull stays good before the next page view refreshes it.
const MAX_AGE_MINUTES = 180;

// The reviews the site should display, refreshing them first if the stored copy
// has gone stale.
//
// The daily Vercel cron is a backstop, not the mechanism: it only fires if
// CRON_SECRET is set (Vercel sends no Authorization header without it, and the
// route 401s), it only runs on production, and a single failed run means the
// site silently serves month-old reviews. Refreshing on read means the data is
// never more than MAX_AGE_MINUTES behind Google regardless of whether the cron
// ever fires, and a Google outage just serves the last good copy rather than
// breaking the page.
export async function getReviewsForDisplay() {
  let stored = await getStoredReviews();

  const fetchedAt = stored?.reviews_fetched_at ? new Date(stored.reviews_fetched_at) : null;
  const ageMinutes = fetchedAt ? (Date.now() - fetchedAt.getTime()) / 60000 : Infinity;

  if (ageMinutes > MAX_AGE_MINUTES) {
    try {
      await fetchAndStoreOwnReviews();
      stored = await getStoredReviews();
    } catch {
      // Google unreachable or misconfigured - serve what we already have.
    }
  }

  if (!stored?.reviews?.length) return stored;

  // Google picks these five by relevance, not recency, and Places API (New) has
  // no sort parameter (the legacy API had reviews_sort=newest; this one dropped
  // it). We cannot change *which* five it returns, but we can at least show the
  // ones we get newest first.
  const reviews = [...stored.reviews].sort(
    (a, b) => new Date(b.time || 0) - new Date(a.time || 0)
  );

  return { ...stored, reviews };
}
