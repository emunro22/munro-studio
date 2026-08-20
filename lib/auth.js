// Signed, stateless session cookie for the single-user admin portal.
// Uses Web Crypto (not Node's `crypto` module) so this works unchanged in both
// Edge middleware and Node.js API routes.

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

async function importKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expires);
  const key = await importKey(secret);
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(sigBuffer)}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d+$/.test(payload)) return false;
  if (Date.now() > Number(payload)) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  const key = await importKey(secret);
  const expectedBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedHex = toHex(expectedBuffer);

  if (expectedHex.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expectedHex.length; i++) {
    diff |= expectedHex.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
