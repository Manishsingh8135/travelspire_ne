import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EmailDeliveryError,
  escapeHtml,
  getEmailSettings,
  sendEmail,
} from "@/lib/email/resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .transform((value) => value || undefined),
  subject: z.string().trim().min(5).max(100),
  message: z.string().trim().min(10).max(1000),
  // Honeypot: hidden from people, filled in by naive bots.
  website: z.string().max(0).optional(),
});

const CONTACT_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0", ...headers },
  });
}

export async function POST(request: Request) {
  const limited = rateLimit(`contact:${clientIp(request)}`, CONTACT_LIMIT);
  if (!limited.ok) {
    return json(
      { error: "Too many messages. Please wait a few minutes or WhatsApp us." },
      429,
      { "Retry-After": String(limited.retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Check the form and try again." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Check the form and try again." }, 400);
  }

  const { name, email, phone, subject, message } = parsed.data;
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone ?? "—"],
    ["Subject", subject],
  ] as const;

  try {
    const { internalRecipients } = getEmailSettings();
    await sendEmail({
      idempotencyKey: `travelspire-contact-${randomUUID()}`,
      to: internalRecipients,
      replyTo: email,
      subject: `Website enquiry: ${subject}`,
      text: `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${message}`,
      html: `<!doctype html><html><body style="margin:0;background:#f3ead9;color:#14221c;font-family:Arial,sans-serif"><div style="max-width:640px;margin:0 auto;padding:32px 18px"><div style="background:#102019;color:#f6efe2;padding:22px 26px;border-radius:14px 14px 0 0"><p style="margin:0;color:#d7b978;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Travelspire North-East · Website</p><h1 style="margin:8px 0 0;font-size:24px">New enquiry</h1></div><div style="background:#fffaf0;padding:26px;border-radius:0 0 14px 14px"><table style="width:100%;border-collapse:collapse">${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:8px 0;color:#68756e;font-size:13px;width:90px">${escapeHtml(label)}</td><td style="padding:8px 0;font-weight:600;font-size:13px">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table><p style="margin:20px 0 0;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</p><p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #ded4c2;color:#66756d;font-size:12px">Reply to this email to answer ${escapeHtml(name)} directly.</p></div></div></body></html>`,
    });
  } catch (error) {
    if (error instanceof EmailDeliveryError) {
      console.error("Contact enquiry could not be delivered", error.message);
    } else {
      console.error("Contact enquiry failed", error);
    }
    return json(
      {
        error:
          "We couldn't send your message right now. Please WhatsApp or call us — we reply fast.",
      },
      502,
    );
  }

  return json({ ok: true });
}
