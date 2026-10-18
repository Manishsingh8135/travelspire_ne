import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail, LOGIN_LINK_SECONDS } from "@/lib/admin/auth";
import { SITE_URL } from "@/lib/site";
import { signEmailToken } from "@/lib/bookings/signing";
import { escapeHtml, sendEmail } from "@/lib/email/resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

// Always the same answer, so the form never reveals who is on the team list.
const SENT = { message: "If that email is on the team list, a sign-in link is on its way. It works for 15 minutes." };

export async function POST(request: Request) {
  if (!rateLimit(`admin-login:${clientIp(request)}`, LIMIT).ok) {
    return NextResponse.json({ error: "Too many tries. Please wait a few minutes." }, { status: 429 });
  }

  let email: string;
  try {
    email = z.string().trim().toLowerCase().email().max(80).parse((await request.json())?.email);
  } catch {
    return NextResponse.json({ error: "Enter your email." }, { status: 400 });
  }

  if (isAdminEmail(email)) {
    const token = signEmailToken("admin-login", email, LOGIN_LINK_SECONDS);
    if (token) {
      // Production links always use the canonical domain, never the request's
      // Host header, so a forged host can't mint a link that leaks the token.
      const origin = process.env.VERCEL_ENV === "production" ? SITE_URL : new URL(request.url).origin;
      const link = new URL(`/api/admin/session?token=${encodeURIComponent(token)}`, origin).toString();
      try {
        await sendEmail({
          to: [email],
          subject: "Your Travelspire admin sign-in link",
          text: `Sign in to Travelspire admin (works for 15 minutes):\n${link}\n\nIf you didn't ask for this, ignore this email.`,
          html: `<p>Sign in to Travelspire admin. The link works for 15 minutes.</p><p><a href="${escapeHtml(link)}">Sign in</a></p><p style="color:#656C78">If you didn't ask for this, ignore this email.</p>`,
        });
      } catch (error) {
        console.error("Admin sign-in email was not sent", error);
      }
    }
  }

  return NextResponse.json(SENT);
}
