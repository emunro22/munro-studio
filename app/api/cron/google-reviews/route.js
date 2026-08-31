import { NextResponse } from "next/server";
import { fetchAndStoreReviews } from "@/lib/googleBusinessAuth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetchAndStoreReviews();
    return NextResponse.json({ ranAt: new Date().toISOString(), result });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
