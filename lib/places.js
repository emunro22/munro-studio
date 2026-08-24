// Google Places API (legacy Place Details/Find Place endpoints) — pulls
// public star rating, review count, and up to 5 recent review snippets per
// business. Requires GOOGLE_PLACES_API_KEY (Places API enabled + billing on
// a Google Cloud project). No-ops gracefully if unset.

const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

export function placesConfigured() {
  return !!process.env.GOOGLE_PLACES_API_KEY;
}

export async function findPlaceId({ name, domain }) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  const query = `${name} ${domain || ""}`.trim();
  const url = `${PLACES_BASE}/findplacefromtext/json?input=${encodeURIComponent(
    query
  )}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  const candidate = data.candidates?.[0];
  return candidate
    ? { placeId: candidate.place_id, matchedName: candidate.name, matchedAddress: candidate.formatted_address }
    : null;
}

export async function textSearchPlaces({ query }) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !query) return [];

  const url = `${PLACES_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    return [];
  }

  return (data.results || []).slice(0, 8).map((r) => ({
    placeId: r.place_id,
    name: r.name,
    address: r.formatted_address,
    rating: r.rating ?? null,
    reviewCount: r.user_ratings_total ?? null,
  }));
}

export async function fetchPlaceDetails(placeId) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !placeId) return null;

  const url = `${PLACES_BASE}/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=name,website,types,rating,user_ratings_total,formatted_address&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") {
    return { error: data.status, errorMessage: data.error_message || null };
  }

  const result = data.result || {};
  return {
    name: result.name ?? null,
    website: result.website ?? null,
    types: result.types || [],
    rating: result.rating ?? null,
    reviewCount: result.user_ratings_total ?? null,
    address: result.formatted_address ?? null,
  };
}

export async function fetchPlaceReviews(placeId) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !placeId) return null;

  const url = `${PLACES_BASE}/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=rating,user_ratings_total,reviews,name&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") {
    return { error: data.status, errorMessage: data.error_message || null };
  }

  const result = data.result || {};
  return {
    rating: result.rating ?? null,
    reviewCount: result.user_ratings_total ?? null,
    reviews: (result.reviews || []).map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
      time: r.time,
    })),
  };
}
