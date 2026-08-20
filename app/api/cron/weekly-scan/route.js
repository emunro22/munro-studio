import { NextResponse } from "next/server";
import { scanAllClients } from "@/lib/scanRunner";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await scanAllClients();
  return NextResponse.json({ ranAt: new Date().toISOString(), results });
}
