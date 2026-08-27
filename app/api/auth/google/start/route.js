import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { buildAuthUrl, oauthConfigured } from "@/lib/googleBusinessAuth";

// Not under /api/admin/ (the redirect URI is registered with Google as a fixed
// path), so auth is checked explicitly here rather than via middleware.
export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!oauthConfigured()) {
    return NextResponse.json({ error: "GOOGLE_OAUTH_CLIENT_ID / SECRET not configured" }, { status: 400 });
  }

  const state = crypto.randomUUID();
  const res = NextResponse.redirect(buildAuthUrl(state));
  res.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
