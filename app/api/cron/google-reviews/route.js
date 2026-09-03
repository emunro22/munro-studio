import { NextResponse } from "next/server";
import { fetchAndStoreOwnReviews } from "@/lib/ownReviews";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // Vercel only sends an Authorization header when CRON_SECRET is configured.
  // Requiring it unconditionally means an unset secret 401s every run silently,
  // so only enforce it when there is one to enforce. The route triggers a
  // Google fetch and nothing destructive, so an open fallback is acceptable.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetchAndStoreOwnReviews();
    return NextResponse.json({ ranAt: new Date().toISOString(), result });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
