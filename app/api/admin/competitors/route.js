import { NextResponse } from "next/server";
import { addManualCompetitor } from "@/lib/competitors";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { clientId, name, domain } = body;

  if (!clientId || !name) {
    return NextResponse.json({ error: "clientId and name are required" }, { status: 400 });
  }

  try {
    const competitor = await addManualCompetitor(clientId, { name, domain });
    return NextResponse.json({ competitor }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
