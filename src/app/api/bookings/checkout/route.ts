import { NextResponse } from "next/server";
import { z } from "zod";
import {
  departureDateProblem,
  resolveBookingPrice,
} from "@/lib/bookings/catalog";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  createPaymentAccessTokenHash,
  createPayUTransactionId,
} from "@/lib/payments/payu/crypto";
import { createHostedCheckoutPayload } from "@/lib/payments/payu/hosted-checkout";
import {
  issueTourBooking,
  PaymentStoreError,
  startPayUPayment,
} from "@/lib/payments/payu/store";
import {
  getPayUConfig,
  PayUConfigurationError,
} from "@/lib/payments/payu/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  tierId: z.string().trim().min(1).max(80),
  travellers: z.number().int().min(1).max(30),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  firstName: z.string().trim().min(2).max(60),
  email: z.string().trim().toLowerCase().email().max(50),
  phone: z
    .string()
    .transform((value) => value.replace(/[^0-9]/g, ""))
    .pipe(z.string().min(10).max(15)),
  termsAccepted: z.literal(true),
  website: z.string().max(0).optional(),
});

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

// Each accepted request writes a booking and a payment attempt, so cap how
// fast one client can create them.
const CHECKOUT_LIMIT = { limit: 8, windowMs: 10 * 60 * 1000 };

function isRealCalendarDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === isoDate
  );
}

export async function POST(request: Request) {
  const limited = rateLimit(`checkout:${clientIp(request)}`, CHECKOUT_LIMIT);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many booking attempts. Please wait a few minutes." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Retry-After": String(limited.retryAfterSeconds),
        },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return noStoreJson(
      { error: "Check the booking details and try again." },
      400,
    );
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return noStoreJson(
      { error: "Complete every required booking detail." },
      400,
    );
  }

  if (!isRealCalendarDate(parsed.data.departureDate)) {
    return noStoreJson({ error: "Choose a valid future departure date." }, 400);
  }

  const resolved = resolveBookingPrice({
    slug: parsed.data.slug,
    tierId: parsed.data.tierId,
    travellers: parsed.data.travellers,
  });
  if (!resolved) {
    return noStoreJson(
      { error: "That package or traveller count is no longer available." },
      409,
    );
  }

  const dateProblem = departureDateProblem(
    resolved.product,
    parsed.data.departureDate,
  );
  if (dateProblem) return noStoreJson({ error: dateProblem }, 409);

  try {
    // Fail on a misconfigured or locked gateway before anything is written,
    // so a 503 never leaves an orphan booking behind.
    getPayUConfig();
    const booking = await issueTourBooking({
      tourSlug: resolved.product.slug,
      tourName: resolved.product.name,
      packageTierId: resolved.tier.id,
      travellers: parsed.data.travellers,
      departureDate: parsed.data.departureDate,
      customerFirstName: parsed.data.firstName,
      customerEmail: parsed.data.email,
      customerPhone: parsed.data.phone,
      totalAmountPaise: resolved.totalAmountPaise,
    });

    const attempt = await startPayUPayment({
      reference: booking.booking_reference,
      accessTokenHash: createPaymentAccessTokenHash(booking.payment_code),
      transactionId: createPayUTransactionId(),
      termsVersion: "booking-and-terms-full-payment-2026-08-21",
    });

    return noStoreJson(createHostedCheckoutPayload(attempt));
  } catch (error) {
    if (
      error instanceof PayUConfigurationError ||
      (error instanceof PaymentStoreError &&
        error.code === "PAYMENT_DATABASE_NOT_CONFIGURED")
    ) {
      return noStoreJson(
        {
          error:
            "Secure booking is being configured. Please contact Travelspire.",
        },
        503,
      );
    }

    return noStoreJson(
      { error: "We could not create the booking. No payment was taken." },
      500,
    );
  }
}
