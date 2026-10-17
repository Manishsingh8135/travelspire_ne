"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { Button, Field, Input, Select, formatInr } from "@/components/ds";
import {
  IconAlert,
  IconCalendar,
  IconLock,
  IconMail,
  IconShield,
  IconSpinner,
  IconUsers,
  IconWhatsApp,
} from "@/components/icons";
import type { BookingProduct, BookingTier } from "@/lib/bookings/catalog";
import { trackEvent } from "@/lib/analytics";
import { postToPayU, type HostedCheckoutResponse } from "@/lib/payments/payu/browser";
import { cn } from "@/lib/utils";

/* Checkout: the form on the left, a live order summary on the right. The
   request payload, field rules and PayU hand-off are unchanged — only the
   presentation is Evergreen. */

const dateLabel = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

function formatDeparture(iso: string) {
  if (!iso) return "Choose a date";
  const date = new Date(`${iso}T00:00:00+05:30`);
  return Number.isNaN(date.getTime()) ? iso : dateLabel.format(date);
}

/** "₹25,999 per person", or "₹1,89,999 for 2" when the tier is one price for
 *  the whole party. `short` drops "per person" where the row already says it. */
function priceLabel(tier: BookingTier, short = false) {
  if (tier.partyPrice !== null) return `${formatInr(tier.partyPrice)} for ${tier.fixedTravellers}`;
  return short ? formatInr(tier.unitPrice) : `${formatInr(tier.unitPrice)} per person`;
}

export function BookingCheckoutForm({
  product,
  minDepartureDate,
  initialTierId,
  isTestMode = false,
  image,
  imageAlt,
  whatsappHref,
  className,
}: {
  product: BookingProduct;
  /** Earliest sellable departure today (India time), resolved on the server. */
  minDepartureDate: string;
  initialTierId?: string;
  isTestMode?: boolean;
  image?: string;
  imageAlt?: string;
  whatsappHref: string;
  className?: string;
}) {
  const firstTier = product.tiers.find((tier) => tier.id === initialTierId) ?? product.tiers[0];
  const [tierId, setTierId] = useState(firstTier.id);
  const tier = product.tiers.find((item) => item.id === tierId) ?? firstTier;
  const [travellers, setTravellers] = useState(tier.fixedTravellers ?? tier.minTravellers);
  const [departureDate, setDepartureDate] = useState(() => {
    const preset = product.defaultDepartureDate;
    if (preset === null) return "";
    // A festival's first day may already be behind us mid-festival.
    return preset >= minDepartureDate ? preset : minDepartureDate;
  });
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = useMemo(
    () => tier.partyPrice ?? tier.unitPrice * travellers,
    [tier.partyPrice, tier.unitPrice, travellers],
  );
  const groupPriced = tier.fixedTravellers !== null;
  const dateFixed = product.fixedDepartureDate !== null;

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
      trackEvent("begin_checkout", {
        currency: "INR",
        value: total,
        items: [
          {
            item_id: product.slug,
            item_name: product.name,
            item_variant: tierId,
            quantity: travellers,
          },
        ],
      });
      postToPayU(payload);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We could not create this booking.");
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-10 font-ui lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-14", className)}
    >
      <div className="order-2 space-y-10 lg:order-1">
        <fieldset className="space-y-5">
          <legend className="text-h3 text-fg">Your trip</legend>
          {product.tiers.length > 1 ? (
            <Field label="Package" htmlFor="booking-tier">
              <Select id="booking-tier" value={tierId} onChange={(event) => selectTier(event.target.value)}>
                {product.tiers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {priceLabel(item)}
                  </option>
                ))}
              </Select>
            </Field>
          ) : (
            <div className="space-y-1.5">
              <p className="text-small font-medium text-fg">Package</p>
              <p className="rounded-control border border-line bg-canvas-subtle px-3.5 py-2.5 text-body text-fg">
                {tier.name} · {priceLabel(tier)}
              </p>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Travellers"
              htmlFor="booking-travellers"
              hint={
                groupPriced
                  ? `This price is for a group of exactly ${tier.fixedTravellers}.`
                  : `Between ${tier.minTravellers} and ${tier.maxTravellers} people.`
              }
            >
              <Input
                id="booking-travellers"
                type="number"
                inputMode="numeric"
                required
                min={tier.minTravellers}
                max={tier.maxTravellers}
                value={travellers}
                disabled={groupPriced}
                onChange={(event) => setTravellers(Number(event.target.value))}
                aria-describedby="booking-travellers-hint"
              />
            </Field>
            <Field
              label="Departure date"
              htmlFor="booking-date"
              hint={dateFixed ? "This departure runs on a fixed date." : "The day you leave from the starting point."}
            >
              <Input
                id="booking-date"
                type="date"
                required
                min={minDepartureDate}
                max={product.departureWindow.latest ?? undefined}
                value={departureDate}
                disabled={dateFixed}
                onChange={(event) => setDepartureDate(event.target.value)}
                aria-describedby="booking-date-hint"
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-10">
          <legend className="sr-only">Your details</legend>
          <div aria-hidden className="text-h3 text-fg">
            Your details
          </div>
          <p className="-mt-2 text-small text-fg-muted">
            We use these for your receipt and to reach you about the trip — nothing else.
          </p>
          <Field label="First name" htmlFor="booking-name">
            <Input
              id="booking-name"
              required
              minLength={2}
              maxLength={60}
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" htmlFor="booking-email" hint="Your receipt goes here.">
              <Input
                id="booking-email"
                type="email"
                required
                maxLength={50}
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby="booking-email-hint"
              />
            </Field>
            <Field label="Phone" htmlFor="booking-phone" hint="Ideally the number you use on WhatsApp.">
              <Input
                id="booking-phone"
                type="tel"
                required
                minLength={10}
                maxLength={20}
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-describedby="booking-phone-hint"
              />
            </Field>
          </div>
        </fieldset>

        <div className="space-y-5 border-t border-line pt-8">
          <label className="flex cursor-pointer items-start gap-3 text-small text-fg-muted">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 rounded-[0.3rem] border-line-strong bg-surface text-brand focus:ring-2 focus:ring-focus focus:ring-offset-0"
            />
            <span>
              I confirm the package and date above and accept the{" "}
              <Link href="/booking-policy" target="_blank" className="font-medium text-brand underline underline-offset-4">
                booking and refund policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-and-conditions" target="_blank" className="font-medium text-brand underline underline-offset-4">
                terms
              </Link>
              .
            </span>
          </label>

          {error ? (
            <p
              role="alert"
              className="flex gap-3 rounded-r-card border-l-[3px] border-critical bg-critical-soft px-4 py-3 text-small text-fg"
            >
              <IconAlert size={18} className="mt-0.5 shrink-0 text-critical" />
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? <IconSpinner className="animate-spin" /> : <IconLock />}
            {isSubmitting ? "Opening PayU…" : `Pay ${formatInr(total)} securely`}
          </Button>
          <p className="text-small text-fg-subtle">
            You&apos;ll finish on PayU&apos;s secure page and come straight back here.
            {isTestMode ? " Test mode: no real charge." : null}
          </p>
        </div>
      </div>

      <aside aria-label="Order summary" className="order-1 lg:sticky lg:top-24 lg:order-2">
        <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-e2">
          {image ? (
            <div className="relative hidden aspect-[16/9] bg-canvas-subtle lg:block">
              <Image src={image} alt={imageAlt ?? ""} fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <div className="p-5 sm:p-6">
            <p className="text-eyebrow uppercase text-fg-subtle">Order summary</p>
            <p className="mt-2 text-h4 text-fg">{product.name}</p>
            <dl className="mt-5 space-y-3 border-t border-line pt-5 text-small">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-fg-subtle">Package</dt>
                <dd className="text-right font-medium text-fg">{tier.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-fg-subtle">
                  <IconCalendar size={16} />
                  Departure
                </dt>
                <dd className={cn("text-right font-medium", departureDate ? "text-fg" : "text-fg-subtle")}>
                  {formatDeparture(departureDate)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-fg-subtle">
                  <IconUsers size={16} />
                  Travellers
                </dt>
                <dd className="font-medium text-fg tabular-nums">{travellers}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-fg-subtle">{tier.partyPrice === null ? "Price per person" : "Price"}</dt>
                <dd className="font-medium text-fg tabular-nums">{priceLabel(tier, true)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5">
              <p className="text-small text-fg-muted">Total to pay now</p>
              <p className="text-h2 font-semibold text-fg tabular-nums" aria-live="polite">
                {formatInr(total)}
              </p>
            </div>
          </div>
          <ul className="hidden space-y-3 border-t border-line bg-canvas-subtle px-5 py-5 text-small text-fg-muted sm:px-6 lg:block">
            <li className="flex gap-2.5">
              <IconShield size={18} className="mt-px shrink-0 text-positive" />
              The price you see is the price you pay — no extras at checkout.
            </li>
            <li className="flex gap-2.5">
              <IconLock size={18} className="mt-px shrink-0 text-positive" />
              Card and UPI details go only to PayU. We never see them.
            </li>
            <li className="flex gap-2.5">
              <IconMail size={18} className="mt-px shrink-0 text-positive" />
              Your receipt arrives by email as soon as the payment clears.
            </li>
          </ul>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 hidden items-center gap-2 text-small font-medium text-fg-muted transition-colors hover:text-fg lg:inline-flex"
        >
          <IconWhatsApp size={18} />
          A question before you pay? Ask us on WhatsApp
        </a>
      </aside>
    </form>
  );
}
