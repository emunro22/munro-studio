// Diagnostic for the Google reviews pull. Run it before deploying to confirm
// the key and Place ID actually work:
//
//   npm run reviews:check                      -> uses GOOGLE_PLACE_ID
//   npm run reviews:check -- "Munro Studio Glasgow"  -> searches for a Place ID
//
// Everything here goes through Places API (New) - the same calls the site
// makes - so a pass here means the site will pull reviews too.

const API = "https://places.googleapis.com/v1";
const key = process.env.GOOGLE_PLACES_API_KEY;

async function call(path, { fieldMask, body }) {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": fieldMask,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function search(query) {
  const { ok, data } = await call("/places:searchText", {
    fieldMask: "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
    body: { textQuery: query, maxResultCount: 5 },
  });
  if (!ok) {
    console.error(`Search failed: ${data.error?.status || "?"} - ${data.error?.message || "no message"}`);
    process.exit(1);
  }
  console.log(`Matches for "${query}":\n`);
  for (const p of data.places || []) {
    console.log(`  ${p.displayName?.text}  ${p.rating ?? "?"}★ (${p.userRatingCount ?? 0})`);
    console.log(`    ${p.formattedAddress || "service area - no public address"}`);
    console.log(`    Place ID: ${p.id}\n`);
  }
  console.log("Set the right one as GOOGLE_PLACE_ID, then run this again with no argument.");
}

async function details(placeId) {
  const { ok, status, data } = await call(`/places/${encodeURIComponent(placeId)}`, {
    fieldMask: "displayName,formattedAddress,rating,userRatingCount,reviews",
  });
  if (!ok) {
    console.error(`Failed (HTTP ${status}): ${data.error?.status || "?"} - ${data.error?.message || "no message"}`);
    if (data.error?.status === "PERMISSION_DENIED") {
      console.error("\nUsually means Places API (New) is not enabled on the project, or the key is restricted.");
    }
    process.exit(1);
  }

  console.log(`${data.displayName?.text} - ${data.formattedAddress || "service-area business (no public address)"}`);
  console.log(`${data.rating ?? "?"}★ from ${data.userRatingCount ?? 0} reviews\n`);
  const reviews = data.reviews || [];
  console.log(`Google returned ${reviews.length} review(s) (5 is the API maximum):\n`);
  for (const r of reviews) {
    const author = r.authorAttribution?.displayName || "Google user";
    const text = (r.originalText?.text || r.text?.text || "").replace(/\s+/g, " ");
    console.log(`  ${r.rating}★  ${author}  (${r.relativePublishTimeDescription})`);
    console.log(`    ${text.slice(0, 140)}${text.length > 140 ? "…" : ""}\n`);
  }
}

async function main() {
  if (!key) {
    console.error("GOOGLE_PLACES_API_KEY is not set (add it to .env.local).");
    process.exit(1);
  }

  const query = process.argv.slice(2).join(" ").trim();
  if (query) return search(query);

  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!placeId) {
    console.error('GOOGLE_PLACE_ID is not set. Find it with: npm run reviews:check -- "Munro Studio Glasgow"');
    process.exit(1);
  }
  return details(placeId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
