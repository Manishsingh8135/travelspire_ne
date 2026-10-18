import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { runDaily } from "@/lib/bookings/trip-messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Vercel Cron calls this every morning (vercel.json) with
// "Authorization: Bearer $CRON_SECRET". `?dry=1` lists what would be sent
// without sending or recording anything.

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function GET(request: Request) {
  if (!authorized(request)) return new NextResponse("Unauthorized", { status: 401 });

  const dryRun = new URL(request.url).searchParams.get("dry") === "1";
  try {
    const result = await runDaily({ dryRun });
    return NextResponse.json({ dryRun, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Daily trip job failed", error);
    return NextResponse.json({ error: "Daily job failed" }, { status: 500 });
  }
}
