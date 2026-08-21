"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

type CheckoutResponse = {
  action?: string;
  method?: string;
  transactionId?: string;
  fields?: Record<string, string>;
  error?: string;
};

const PAYU_ENDPOINTS = new Set([
  "https://test.payu.in/_payment",
  "https://secure.payu.in/_payment",
]);

function postToPayU(payload: CheckoutResponse) {
  if (
    !payload.action ||
    payload.method !== "POST" ||
    !payload.fields ||
    !PAYU_ENDPOINTS.has(payload.action)
  ) {
    throw new Error("The secure checkout response was not valid.");
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = payload.action;
  form.style.display = "none";
  form.setAttribute("aria-hidden", "true");

  Object.entries(payload.fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export function PaymentAccessForm() {
  const [reference, setReference] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payments/payu/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, paymentCode, termsAccepted }),
      });
      const payload = (await response.json()) as CheckoutResponse;

      if (!response.ok) {
        throw new Error(payload.error || "We could not open secure checkout.");
      }

      postToPayU(payload);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "We could not open secure checkout.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[16px] bg-[#f4ead7] p-5 text-[#14221c] shadow-[0_36px_80px_-48px_rgba(0,0,0,0.95)] sm:p-7 lg:p-8"
    >
      <div className="flex items-start justify-between gap-5 border-b border-[#172b21]/10 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#965136]">
            Private payment access
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Open your confirmed booking
          </h2>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#17372b] text-[#f4ead7] shadow-[0_14px_24px_-18px_rgba(0,0,0,0.9)]">
          <LockKeyhole aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#4a5c53]">
            Booking reference
          </span>
          <input
            name="reference"
            value={reference}
            onChange={(event) => setReference(event.target.value.toUpperCase())}
            required
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="TSMDA-8F2C14A90D7B"
            className="mt-2 min-h-[3.25rem] w-full rounded-[10px] border border-[#17372b]/15 bg-[#fffaf0] px-4 font-mono text-sm uppercase tracking-[0.035em] text-[#14221c] outline-none transition-[border-color,box-shadow] placeholder:text-[#718078]/60 focus:border-[#38644f] focus:ring-4 focus:ring-[#38644f]/10"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#4a5c53]">
            32-character payment code
          </span>
          <input
            name="paymentCode"
            value={paymentCode}
            onChange={(event) =>
              setPaymentCode(
                event.target.value.replace(/[\s-]/g, "").toUpperCase(),
              )
            }
            required
            minLength={32}
            maxLength={32}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="Paste the private code"
            className="mt-2 min-h-[3.25rem] w-full rounded-[10px] border border-[#17372b]/15 bg-[#fffaf0] px-4 font-mono text-sm uppercase tracking-[0.055em] text-[#14221c] outline-none transition-[border-color,box-shadow] placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-[#718078]/60 focus:border-[#38644f] focus:ring-4 focus:ring-[#38644f]/10"
          />
          <span className="mt-2 block text-xs leading-5 text-[#66756d]">
            We send both details only after dates, rooms, vehicle and final
            amount are confirmed.
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-[10px] bg-[#e8ddc8] p-3.5">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded-[4px] border-[#17372b]/30 text-[#17372b] focus:ring-[#38644f]"
          />
          <span className="text-xs leading-5 text-[#526158]">
            I reviewed the confirmed quote and accept the{" "}
            <Link
              href="/booking-policy"
              target="_blank"
              className="font-semibold text-[#294f3d] underline decoration-[#294f3d]/35 underline-offset-2"
            >
              booking and refund policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              className="font-semibold text-[#294f3d] underline decoration-[#294f3d]/35 underline-offset-2"
            >
              terms
            </Link>
            .
          </span>
        </label>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 rounded-[10px] bg-[#a4432f]/10 px-4 py-3 text-sm leading-5 text-[#8f3727]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !termsAccepted}
        className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[#17372b] px-5 text-sm font-bold text-white shadow-[0_20px_32px_-22px_rgba(0,0,0,0.95)] transition-colors hover:bg-[#244d3c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17372b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
            Opening secure checkout…
          </>
        ) : (
          <>
            Continue to PayU
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#66756d]">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-[#2d604a]"
        />
        Your payment method is entered on PayU&apos;s hosted checkout.
        Travelspire does not collect or store card numbers, CVV or UPI PINs.
      </p>
    </form>
  );
}
