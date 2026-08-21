import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getPayUConfig,
  PayUConfigurationError,
} from "@/lib/payments/payu/config";
import {
  createPaymentAccessTokenHash,
  createPayUTransactionId,
} from "@/lib/payments/payu/crypto";
import { createHostedCheckoutPayload } from "@/lib/payments/payu/hosted-checkout";
import { PaymentStoreError, startPayUPayment } from "@/lib/payments/payu/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  reference: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9][A-Z0-9-]{5,31}$/),
  paymentCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-F0-9]{32}$/),
  termsAccepted: z.literal(true),
});

const PAYMENT_TERMS_VERSION = "booking-and-terms-2024-11-27";

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
      { error: "Enter the booking reference and payment code we sent you." },
      400,
    );
  }

  const parsed = checkoutSchema.safeParse(json);
  if (!parsed.success) {
    return noStoreJson(
      { error: "Check your booking reference and 32-character payment code." },
      400,
    );
  }

  try {
    getPayUConfig();
    const attempt = await startPayUPayment({
      reference: parsed.data.reference,
      accessTokenHash: createPaymentAccessTokenHash(parsed.data.paymentCode),
      transactionId: createPayUTransactionId(),
      termsVersion: PAYMENT_TERMS_VERSION,
    });
    return noStoreJson(createHostedCheckoutPayload(attempt));
  } catch (error) {
    if (error instanceof PayUConfigurationError) {
      return noStoreJson(
        {
          error:
            "Secure online payment is being configured. Please contact Travelspire for help.",
        },
        503,
      );
    }

    if (error instanceof PaymentStoreError) {
      if (error.code === "BOOKING_LINK_EXPIRED") {
        return noStoreJson(
          {
            error:
              "This private payment code has expired. Ask Travelspire for a fresh code.",
          },
          410,
        );
      }

      if (["BOOKING_NOT_READY", "NO_PAYMENT_DUE"].includes(error.code)) {
        return noStoreJson(
          {
            error:
              "This booking is not ready for payment. Please confirm the departure with Travelspire.",
          },
          409,
        );
      }

      if (
        ["PAYMENT_REVIEW_REQUIRED", "PAYMENT_ALREADY_PROCESSING"].includes(
          error.code,
        )
      ) {
        return noStoreJson(
          {
            error:
              "A payment is already being verified for this booking. Do not pay again; ask Travelspire to check it.",
          },
          409,
        );
      }

      if (error.code === "PAYMENT_DATABASE_NOT_CONFIGURED") {
        return noStoreJson(
          {
            error:
              "Secure online payment is being configured. Please contact Travelspire for help.",
          },
          503,
        );
      }
    }

    return noStoreJson(
      {
        error:
          "We could not open this payment. Check both details or ask Travelspire to resend them.",
      },
      400,
    );
  }
}
