import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { exchangeCodeForTokens } from "@/lib/googleBusinessAuth";

export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get("google_oauth_state")?.value;

  const redirectTo = (status) => {
    const res = NextResponse.redirect(new URL(`/admin/revenue?google_connect=${status}`, request.url));
    res.cookies.delete("google_oauth_state");
    return res;
  };

  if (error) return redirectTo("denied");
  if (!code || !state || !expectedState || state !== expectedState) return redirectTo("invalid");

  try {
    const tokens = await exchangeCodeForTokens(code);
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    await sql`
      INSERT INTO google_business_auth (id, refresh_token, access_token, access_token_expires_at, connected_at)
      VALUES (1, ${tokens.refresh_token}, ${tokens.access_token}, ${expiresAt.toISOString()}, now())
      ON CONFLICT (id) DO UPDATE SET
        refresh_token = COALESCE(EXCLUDED.refresh_token, google_business_auth.refresh_token),
        access_token = EXCLUDED.access_token,
        access_token_expires_at = EXCLUDED.access_token_expires_at,
        connected_at = now()
    `;
    return redirectTo("success");
  } catch {
    return redirectTo("error");
  }
}
