// OAuth flow + review fetching for Munro Studio's own Google Business Profile.
// Separate from lib/places.js (which uses a simple API key for public data on
// clients' businesses) — reading reviews via the Business Profile API requires
// the account owner to grant access, hence the full OAuth dance and refresh-
// token storage here.

import { sql } from "./db";

const SCOPE = "https://www.googleapis.com/auth/business.manage";

function getRedirectUri() {
  return process.env.GOOGLE_OAUTH_REDIRECT_URI || "https://munrostudio.co.uk/api/auth/google/callback";
}

export function oauthConfigured() {
  return !!process.env.GOOGLE_OAUTH_CLIENT_ID && !!process.env.GOOGLE_OAUTH_CLIENT_SECRET;
}

export function buildAuthUrl(state) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: getRedirectUri(),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || "Token exchange failed");
  return data; // { access_token, refresh_token, expires_in, ... }
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || "Token refresh failed");
  return data; // { access_token, expires_in, ... } — no new refresh_token issued
}

// Returns a live access token, refreshing (and persisting) it first if the
// stored one has expired. Returns null if nothing is connected yet.
export async function getValidAccessToken() {
  const rows = await sql`SELECT * FROM google_business_auth WHERE id = 1`;
  const row = rows[0];
  if (!row || !row.refresh_token) return null;

  const stillValid = row.access_token && row.access_token_expires_at && new Date(row.access_token_expires_at) > new Date(Date.now() + 60_000);
  if (stillValid) return row.access_token;

  const refreshed = await refreshAccessToken(row.refresh_token);
  const expiresAt = new Date(Date.now() + refreshed.expires_in * 1000);
  await sql`
    UPDATE google_business_auth
    SET access_token = ${refreshed.access_token}, access_token_expires_at = ${expiresAt.toISOString()}
    WHERE id = 1
  `;
  return refreshed.access_token;
}

async function findOwnLocation(accessToken) {
  const accountsRes = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const accountsData = await accountsRes.json();
  if (!accountsRes.ok) throw new Error(accountsData.error?.message || "Failed to list Business Profile accounts");

  for (const account of accountsData.accounts || []) {
    const locRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const locData = await locRes.json();
    if (!locRes.ok) continue;
    const location = (locData.locations || [])[0];
    if (location) {
      return {
        accountId: account.name.replace("accounts/", ""),
        locationId: location.name.replace("locations/", ""),
        locationName: location.title,
      };
    }
  }
  return null;
}

export async function fetchAndStoreReviews() {
  const accessToken = await getValidAccessToken();
  if (!accessToken) throw new Error("Google Business Profile isn't connected yet");

  const rows = await sql`SELECT account_id, location_id FROM google_business_auth WHERE id = 1`;
  let { account_id: accountId, location_id: locationId } = rows[0] || {};

  if (!accountId || !locationId) {
    const found = await findOwnLocation(accessToken);
    if (!found) throw new Error("No Business Profile location found for this Google account");
    accountId = found.accountId;
    locationId = found.locationId;
    await sql`
      UPDATE google_business_auth
      SET account_id = ${found.accountId}, location_id = ${found.locationId}, location_name = ${found.locationName}
      WHERE id = 1
    `;
  }

  const reviewsRes = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const reviewsData = await reviewsRes.json();
  if (!reviewsRes.ok) throw new Error(reviewsData.error?.message || "Failed to fetch reviews");

  const starMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  const reviews = (reviewsData.reviews || []).map((r) => ({
    name: r.reviewer?.displayName || "Google user",
    rating: starMap[r.starRating] || null,
    text: r.comment || "",
    time: r.createTime,
  }));
  const rating = reviews.length ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length : null;

  await sql`
    UPDATE google_business_auth
    SET reviews = ${JSON.stringify(reviews)}, rating = ${rating}, review_count = ${reviewsData.totalReviewCount ?? reviews.length},
        reviews_fetched_at = now()
    WHERE id = 1
  `;

  return { reviews, rating, reviewCount: reviewsData.totalReviewCount ?? reviews.length };
}

export async function getStoredReviews() {
  const rows = await sql`
    SELECT reviews, rating, review_count, reviews_fetched_at, connected_at, location_name,
           (refresh_token IS NOT NULL) AS oauth_connected
    FROM google_business_auth WHERE id = 1
  `;
  return rows[0] || null;
}
