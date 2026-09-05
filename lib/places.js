// Google Places API (New) - pulls public star rating, review count, and up to
// five recent review snippets per business. Requires GOOGLE_PLACES_API_KEY
// with "Places API (New)" enabled and billing on a Google Cloud project.
// No-ops gracefully if unset.
//
// This deliberately uses the NEW endpoints (places.googleapis.com/v1) rather
// than the legacy maps.googleapis.com/maps/api/place ones: Google no longer
// lets fresh Cloud projects enable the legacy Places API at all, so legacy
// calls come back REQUEST_DENIED even with a perfectly valid key.

const PLACES_V1 = "https://places.googleapis.com/v1";

export function placesConfigured() {
  return !!process.env.GOOGLE_PLACES_API_KEY;
}

function normalizeHost(url) {
  if (!url) return null;
  try {
    const host = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.toLowerCase();
    return host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function domainsLikelyMatch(a, b) {
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

// The new API signals failure with an HTTP status plus a google.rpc.Status
// body. Flatten that into the { error, errorMessage } shape the rest of the
// codebase already checks for.
function toError(res, data) {
  return {
    error: data?.error?.status || `HTTP_${res.status}`,
    errorMessage: data?.error?.message || null,
  };
}

async function placesRequest(path, { fieldMask, body } = {}) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const res = await fetch(`${PLACES_V1}${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, ...toError(res, data) };
  return { ok: true, data };
}

export async function findPlaceId({ name, domain }) {
  if (!placesConfigured()) return null;

  const query = `${name} ${domain || ""}`.trim();
  const results = await textSearchPlaces({ query });
  const candidate = results[0];
  if (!candidate) return null;

  // Verify the candidate's own website actually matches this client's domain
  // before accepting it - text search will happily return a same-named
  // business in a different city (confirmed in practice: this previously
  // matched real clients to businesses in Exeter, Rotherham, and elsewhere,
  // purely on name similarity). No verifiable website match means no
  // auto-match - better to leave it blank than silently wrong.
  if (domain) {
    const details = await fetchPlaceDetails(candidate.placeId);
    const clientHost = normalizeHost(domain);
    const candidateHost = normalizeHost(details?.website);
    if (!domainsLikelyMatch(clientHost, candidateHost)) {
      return null;
    }
  }

  return { placeId: candidate.placeId, matchedName: candidate.name, matchedAddress: candidate.address };
}

export async function textSearchPlaces({ query }) {
  if (!placesConfigured() || !query) return [];

  const result = await placesRequest("/places:searchText", {
    fieldMask: "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
    body: { textQuery: query, maxResultCount: 8 },
  });
  if (!result.ok) return [];

  return (result.data.places || []).slice(0, 8).map((p) => ({
    placeId: p.id,
    name: p.displayName?.text ?? null,
    address: p.formattedAddress ?? null,
    rating: p.rating ?? null,
    reviewCount: p.userRatingCount ?? null,
  }));
}

export async function fetchPlaceDetails(placeId) {
  if (!placesConfigured() || !placeId) return null;

  const result = await placesRequest(`/places/${encodeURIComponent(placeId)}`, {
    fieldMask: "displayName,websiteUri,types,rating,userRatingCount,formattedAddress",
  });
  if (!result.ok) return { error: result.error, errorMessage: result.errorMessage };

  const place = result.data;
  return {
    name: place.displayName?.text ?? null,
    website: place.websiteUri ?? null,
    types: place.types || [],
    rating: place.rating ?? null,
    reviewCount: place.userRatingCount ?? null,
    address: place.formattedAddress ?? null,
  };
}

export async function fetchPlaceReviews(placeId) {
  if (!placesConfigured() || !placeId) return null;

  const result = await placesRequest(`/places/${encodeURIComponent(placeId)}`, {
    fieldMask: "displayName,rating,userRatingCount,reviews",
  });
  if (!result.ok) return { error: result.error, errorMessage: result.errorMessage };

  const place = result.data;
  return {
    name: place.displayName?.text ?? null,
    rating: place.rating ?? null,
    reviewCount: place.userRatingCount ?? null,
    // Places caps this at five reviews per place - that is the whole API, not
    // a quota we can raise. originalText is preferred over text so we show
    // what the reviewer actually wrote rather than Google's translation.
    reviews: (place.reviews || []).map((r) => ({
      author: r.authorAttribution?.displayName || "Google user",
      authorPhoto: r.authorAttribution?.photoUri || null,
      rating: r.rating ?? null,
      text: r.originalText?.text || r.text?.text || "",
      relativeTime: r.relativePublishTimeDescription || null,
      time: r.publishTime || null,
    })),
  };
}
