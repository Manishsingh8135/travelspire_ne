import type { Metadata } from "next";
import Link from "next/link";
import { PurchaseEvent } from "@/components/analytics/purchase-event";
import { ButtonLink, Container, Heading, Section, buttonVariants } from "@/components/ds";
import {
  IconAlert,
  IconArrowLeft,
  IconCheckCircle,
  IconClock,
  IconClose,
  IconWhatsApp,
  type Icon,
} from "@/components/icons";
import { getPaymentReceipt, type PaymentReceipt } from "@/lib/payments/payu/store";
import { createWhatsAppURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Payment Status",
  description: "Check the verification status of a Travelspire tour payment.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

type StatusKind = "success" | "failed" | "processing" | "review";

function getStatusKind(receipt: PaymentReceipt | null): StatusKind {
  if (!receipt) return "review";
  if (receipt.status === "success") return "success";
  if (receipt.status === "failed") return "failed";
  if (["created", "redirected", "pending"].includes(receipt.status)) {
    return "processing";
  }
  return "review";
}

function formatAmount(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amountPaise / 100);
}

const statusCopy: Record<
  StatusKind,
  { label: string; title: string; body: string; next: string[]; Icon: Icon; tone: string }
> = {
  success: {
    label: "Payment confirmed",
    title: "You're booked. Thank you.",
    body: "PayU has confirmed the payment and it matches your booking. Your receipt is on its way to your email.",
    next: [
      "Check your inbox (and spam) for the receipt.",
      "We'll message you on WhatsApp within a day with your trip plan and permit steps.",
      "Keep the booking reference below for anything you ask us.",
    ],
    Icon: IconCheckCircle,
    tone: "bg-positive-soft text-positive",
  },
  failed: {
    label: "Payment not completed",
    title: "No money was taken.",
    body: "PayU tells us this attempt didn't go through. Your booking details are safe with us — you can try again whenever you're ready.",
    next: [
      "If money left your account, it is usually reversed automatically within 5–7 working days.",
      "Ask us on WhatsApp and we'll reopen payment for you.",
    ],
    Icon: IconClose,
    tone: "bg-critical-soft text-critical",
  },
  processing: {
    label: "Still confirming",
    title: "We're confirming your payment.",
    body: "PayU hasn't sent a final answer yet. This usually takes a few minutes.",
    next: [
      "Please don't pay a second time.",
      "Refresh this page in a few minutes.",
      "Still unsure after an hour? Send us the transaction ID below.",
    ],
    Icon: IconClock,
    tone: "bg-caution-soft text-caution",
  },
  review: {
    label: "Needs a quick check",
    title: "We need to check this one by hand.",
    body: "We couldn't read a final result for this payment. Our team will confirm it with PayU.",
    next: ["Please don't pay again until we've checked.", "Send us the transaction ID below on WhatsApp — we'll reply the same day."],
    Icon: IconAlert,
    tone: "bg-caution-soft text-caution",
  },
};

export default async function PaymentStatusPage({ searchParams }: { searchParams: Promise<{ txnid?: string | string[] }> }) {
  const query = await searchParams;
  const transactionId = typeof query.txnid === "string" && /^[A-Z0-9-]{8,25}$/i.test(query.txnid) ? query.txnid : "";

  let receipt: PaymentReceipt | null = null;
  if (transactionId) {
    try {
      receipt = await getPaymentReceipt(transactionId);
    } catch {
      receipt = null;
    }
  }

  const kind = getStatusKind(receipt);
  const copy = statusCopy[kind];
  const booking = receipt ? (Array.isArray(receipt.tour_bookings) ? receipt.tour_bookings[0] : receipt.tour_bookings) : null;
  const supportUrl = createWhatsAppURL({
    customMessage: `Hi Travelspire, please check my PayU payment.\n\nTransaction ID: ${transactionId || "not available"}${booking?.reference ? `\nBooking reference: ${booking.reference}` : ""}`,
  });

  return (
    <Section spacing="none" className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container size="prose" className="font-ui">
        {kind === "success" && receipt && booking ? (
          <PurchaseEvent
            transactionId={transactionId}
            value={receipt.expected_amount_paise / 100}
            itemId={booking.tour_slug}
            itemName={booking.tour_name}
          />
        ) : null}
        <Link href="/all-tours" className="inline-flex items-center gap-2 text-small font-medium text-fg-muted hover:text-fg">
          <IconArrowLeft size={18} />
          All tours
        </Link>

        <div className="mt-8 rounded-panel border border-line bg-surface shadow-e2">
          <div className="p-6 sm:p-8">
            <span className={cn("inline-grid size-12 place-items-center rounded-card", copy.tone)}>
              <copy.Icon size={26} />
            </span>
            <p className="mt-6 text-eyebrow uppercase text-fg-subtle">{copy.label}</p>
            <Heading as="h1" size="h2" className="mt-2">
              {copy.title}
            </Heading>
            <p className="mt-3 text-body text-fg-muted">{copy.body}</p>

            <h2 className="mt-8 text-h4 text-fg">What happens next</h2>
            <ul className="mt-3 space-y-2.5">
              {copy.next.map((line) => (
                <li key={line} className="flex gap-3 text-body text-fg-muted">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid border-t border-line bg-canvas-subtle sm:grid-cols-2">
            <div className="p-5 sm:p-6">
              <dt className="text-small text-fg-subtle">Transaction ID</dt>
              <dd className="mt-1 break-all text-body font-medium text-fg tabular-nums">{transactionId || "Not available"}</dd>
            </div>
            <div className="border-t border-line p-5 sm:border-l sm:border-t-0 sm:p-6">
              <dt className="text-small text-fg-subtle">Amount</dt>
              <dd className="mt-1 text-body font-medium text-fg tabular-nums">
                {receipt ? formatAmount(receipt.expected_amount_paise) : "Being confirmed"}
              </dd>
            </div>
            {booking ? (
              <div className="border-t border-line p-5 sm:col-span-2 sm:p-6">
                <dt className="text-small text-fg-subtle">Booking</dt>
                <dd className="mt-1 text-body text-fg">
                  <span className="font-semibold">{booking.reference}</span>
                  <span className="text-fg-subtle"> · </span>
                  {booking.tour_name}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-sm text-small text-fg-subtle">
              Keep the transaction ID — it lets us check your payment without ever asking for card or bank details.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={supportUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "shrink-0" })}>
                <IconWhatsApp />
                Message us
              </a>
              {kind === "success" ? (
                <ButtonLink href="/permits" variant="secondary">
                  Permit guide
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
