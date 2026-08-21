"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import type { BookingProduct } from "@/lib/bookings/catalog";
import {
  postToPayU,
  type HostedCheckoutResponse,
} from "@/lib/payments/payu/browser";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function localDateString(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function BookingCheckoutForm({
  product,
  initialTierId,
}: {
  product: BookingProduct;
  initialTierId?: string;
}) {
  const firstTier =
    product.tiers.find((tier) => tier.id === initialTierId) ?? product.tiers[0];
  const [tierId, setTierId] = useState(firstTier.id);
  const tier = product.tiers.find((item) => item.id === tierId) ?? firstTier;
  const [travellers, setTravellers] = useState(
    tier.fixedTravellers ?? tier.minTravellers,
  );
  const [departureDate, setDepartureDate] = useState(
    product.defaultDepartureDate ?? "",
  );
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = useMemo(
    () => tier.unitPrice * travellers,
    [tier.unitPrice, travellers],
  );

  function selectTier(nextTierId: string) {
    const nextTier = product.tiers.find((item) => item.id === nextTierId);
    if (!nextTier) return;
    setTierId(nextTierId);
    setTravellers(nextTier.fixedTravellers ?? nextTier.minTravellers);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          tierId,
          travellers,
          departureDate,
          firstName,
          email,
          phone,
          termsAccepted,
          website: "",
        }),
      });
      const payload = (await response.json()) as HostedCheckoutResponse;
      if (!response.ok) {
        throw new Error(payload.error || "We could not open secure checkout.");
      }
      postToPayU(payload);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "We could not create this booking.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[16px] bg-[#f3ead9] text-[#14221c] shadow-[0_38px_80px_-48px_rgba(0,0,0,0.95)]"
    >
      <div className="border-b border-[#17372b]/10 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#965136]">
              Full package payment
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Your booking details
            </h2>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#17372b] text-[#f4ead7]">
            <LockKeyhole aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Package">
            <select
              value={tierId}
              onChange={(event) => selectTier(event.target.value)}
              className="field-control"
            >
              {product.tiers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {inr.format(item.unitPrice)} per person
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Travellers">
              <input
                type="number"
                required
                min={tier.minTravellers}
                max={tier.maxTravellers}
                value={travellers}
                disabled={tier.fixedTravellers !== null}
                onChange={(event) => setTravellers(Number(event.target.value))}
                className="field-control disabled:cursor-not-allowed disabled:bg-[#e4d9c5]"
              />
            </Field>
            <Field label="Departure date">
              <input
                type="date"
                required
                min={localDateString()}
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                className="field-control"
              />
            </Field>
          </div>

          <Field label="First name">
            <input
              required
              minLength={2}
              maxLength={60}
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="field-control"
            />
          </Field>
          <Field label="Email address">
            <input
              type="email"
              required
              maxLength={50}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field-control"
            />
          </Field>
          <Field label="Phone number">
            <input
              type="tel"
              required
              minLength={10}
              maxLength={20}
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="field-control"
            />
          </Field>
        </div>
      </div>

      <div className="bg-[#e6dbc7] p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4 border-b border-[#17372b]/10 pb-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68756e]">
              Total due now
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
              {inr.format(total)}
            </p>
          </div>
          <p className="max-w-[12rem] text-right text-xs leading-5 text-[#68756e]">
            {inr.format(tier.unitPrice)} × {travellers} traveller
            {travellers === 1 ? "" : "s"}
          </p>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#526158]">
          <input
            type="checkbox"
            required
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded-[4px] border-[#17372b]/30 text-[#17372b] focus:ring-[#38644f]"
          />
          <span>
            I confirm the selected package and date and accept the{" "}
            <Link
              href="/booking-policy"
              target="_blank"
              className="font-semibold underline underline-offset-2"
            >
              booking and refund policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              className="font-semibold underline underline-offset-2"
            >
              terms
            </Link>
            .
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-[9px] bg-[#a34d35]/10 p-3 text-xs font-medium text-[#8c3f2b]"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[#17372b] px-5 py-3.5 text-xs font-bold text-white shadow-[0_18px_30px_-22px_rgba(0,0,0,0.9)] transition-colors hover:bg-[#254c3c] disabled:cursor-wait disabled:opacity-65"
        >
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          )}
          {isSubmitting ? "Opening PayU…" : `Pay ${inr.format(total)} securely`}
        </button>
        <p className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#68756e]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#315f4b]" />
          Price verified on our server · PayU hosted checkout
        </p>
      </div>
      <style jsx>{`
        .field-control {
          min-height: 3.15rem;
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(23, 55, 43, 0.15);
          background: #fffaf0;
          padding: 0 1rem;
          color: #14221c;
          outline: none;
        }
        .field-control:focus {
          border-color: #38644f;
          box-shadow: 0 0 0 4px rgba(56, 100, 79, 0.1);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#59685f]">
        {label}
      </span>
      {children}
    </label>
  );
}
