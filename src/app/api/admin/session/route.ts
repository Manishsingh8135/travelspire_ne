import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, isAdminEmail, SESSION_SECONDS } from "@/lib/admin/auth";
import { verifyEmailToken } from "@/lib/bookings/signing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Opened from the sign-in email: swaps the 15-minute link for a session. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const email = verifyEmailToken("admin-login", token);
  const session = email && isAdminEmail(email) ? createSessionToken(email) : null;

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login?expired=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
