import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveBookingPrice } from "@/lib/bookings/catalog";
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
import { PayUConfigurationError } from "@/lib/payments/payu/config";

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

export async function POST(request: Request) {
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

  const departureDate = new Date(`${parsed.data.departureDate}T00:00:00Z`);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (Number.isNaN(departureDate.getTime()) || departureDate < today) {
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

  if (
    resolved.product.fixedDepartureDate !== null &&
    parsed.data.departureDate !== resolved.product.fixedDepartureDate
  ) {
    return noStoreJson(
      { error: "That departure date is not available for this package." },
      409,
    );
  }

  try {
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
