import { NextResponse } from "next/server";
import { z } from "zod";
import { absoluteUrl } from "@/lib/bookings/after-payment";
import { verifyTripToken } from "@/lib/bookings/signing";
import { currentStage, detailsLocked, tripDetailsSchema } from "@/lib/bookings/trip";
import { getBooking, tripOf, updateTrip } from "@/lib/bookings/trip-store";
import { escapeHtml, getEmailSettings, sendEmail } from "@/lib/email/resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z.object({
  reference: z.string().trim().toUpperCase().regex(/^[A-Z0-9][A-Z0-9-]{5,31}$/),
  k: z.string().trim().min(16).max(64),
  details: tripDetailsSchema,
});

const LIMIT = { limit: 10, windowMs: 10 * 60 * 1000 };

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function POST(request: Request) {
  if (!rateLimit(`trip-details:${clientIp(request)}`, LIMIT).ok) {
    return json({ error: "Too many tries. Please wait a few minutes." }, 429);
  }

  let parsed;
  try {
    parsed = requestSchema.safeParse(await request.json());
  } catch {
    return json({ error: "Check the details and try again." }, 400);
  }
  if (!parsed.success) return json({ error: "Check the details and try again." }, 400);

  const { reference, k, details } = parsed.data;
  if (!verifyTripToken(reference, k)) return json({ error: "This trip link isn't valid." }, 403);

  try {
    const booking = await getBooking(reference);
    if (!booking || booking.status !== "paid") return json({ error: "This booking isn't ready for details yet." }, 409);
    if (details.travellers.length !== booking.travellers) {
      return json({ error: `Add details for all ${booking.travellers} travellers.` }, 400);
    }
    if (detailsLocked(currentStage(tripOf(booking)))) {
      return json({ error: "Permits are already done. Message us on WhatsApp to change anything." }, 409);
    }

    const firstTime = !tripOf(booking).details;
    await updateTrip(reference, (trip) => ({
      ...trip,
      details,
      detailsSubmittedAt: new Date().toISOString(),
      // Only move forward: a booking the team has put on hold stays there.
      ...(currentStage(trip) === "paid" ? { stage: "details_received", stageUpdatedAt: new Date().toISOString() } : {}),
    }));

    // Tell the team; a failed email must not fail the customer's save.
    try {
      const names = details.travellers.map((t) => `${t.name} (${t.age}, ${t.gender}, ${t.idType})`);
      await sendEmail({
        idempotencyKey: firstTime ? `travelspire-${reference}-details` : undefined,
        to: getEmailSettings().internalRecipients,
        subject: `${firstTime ? "Traveller details" : "Details updated"} · ${reference} · ${booking.tour_name}`,
        text: `${booking.customer_first_name} ${firstTime ? "sent" : "updated"} traveller details.\n\n${names.join("\n")}\n\nOpen in admin: ${absoluteUrl(`/admin/bookings/${reference}`)}`,
        html: `<p>${escapeHtml(booking.customer_first_name)} ${firstTime ? "sent" : "updated"} traveller details for ${escapeHtml(booking.tour_name)}.</p><ul>${names.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul><p><a href="${absoluteUrl(`/admin/bookings/${reference}`)}">Open in admin</a></p>`,
      });
    } catch (error) {
      console.error("Traveller details email was not sent", error);
    }

    return json({ ok: true });
  } catch {
    return json({ error: "We couldn't save that. Please try again, or send it on WhatsApp." }, 500);
  }
}
