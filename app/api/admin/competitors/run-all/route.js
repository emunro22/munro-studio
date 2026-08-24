import { NextResponse } from "next/server";
import { discoverAndScanAllClients } from "@/lib/competitors";

export const maxDuration = 60;

export async function POST() {
  const results = await discoverAndScanAllClients();
  return NextResponse.json({ results });
}
