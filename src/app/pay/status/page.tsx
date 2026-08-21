import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CircleCheck,
  CircleX,
  Clock3,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";
import {
  getPaymentReceipt,
  type PaymentReceipt,
} from "@/lib/payments/payu/store";
import { createWhatsAppURL } from "@/lib/whatsapp";

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

const statusCopy = {
  success: {
    eyebrow: "Verified by PayU",
    title: "Advance received.",
    body: "PayU and our server agree on the transaction ID, signed amount and captured status. Travelspire will now share the updated booking receipt and next steps.",
    icon: CircleCheck,
    iconClass: "bg-[#315f4b] text-[#eff8ef]",
  },
  failed: {
    eyebrow: "Payment not completed",
    title: "No payment was recorded.",
    body: "The verified gateway response says this attempt did not complete. Your confirmed booking remains with Travelspire; ask us to reopen payment when you are ready.",
    icon: CircleX,
    iconClass: "bg-[#9d4934] text-[#fff4e8]",
  },
  processing: {
    eyebrow: "Verification in progress",
    title: "We are confirming the payment.",
    body: "The gateway response is not final yet. Please do not make a second payment. Refresh this page shortly or contact Travelspire with the transaction ID below.",
    icon: Clock3,
    iconClass: "bg-[#b58a48] text-[#21180b]",
  },
  review: {
    eyebrow: "Manual review",
    title: "This payment needs a check.",
    body: "We could not safely confirm a final result from the stored gateway record. Do not pay again until Travelspire checks the transaction ID with PayU.",
    icon: ShieldAlert,
    iconClass: "bg-[#7d5b39] text-[#fff5df]",
  },
} as const;

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ txnid?: string | string[] }>;
}) {
  const query = await searchParams;
  const transactionId =
    typeof query.txnid === "string" && /^[A-Z0-9-]{8,25}$/i.test(query.txnid)
      ? query.txnid
      : "";

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
  const Icon = copy.icon;
  const booking = receipt
    ? Array.isArray(receipt.tour_bookings)
      ? receipt.tour_bookings[0]
      : receipt.tour_bookings
    : null;
  const supportUrl = createWhatsAppURL({
    customMessage: `Hi Travelspire, please check my PayU payment.\n\nTransaction ID: ${transactionId || "not available"}${booking?.reference ? `\nBooking reference: ${booking.reference}` : ""}`,
  });

  return (
    <div className="min-h-screen bg-[#07110f] px-5 pb-24 pt-32 text-[#f6efe2] sm:px-8 sm:pt-36">
      <main className="mx-auto w-full max-w-3xl">
        <Link
          href="/pay"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Secure payment
        </Link>

        <section className="mt-9 overflow-hidden rounded-[16px] bg-[#f3ead9] text-[#14221c] shadow-[0_42px_90px_-52px_rgba(0,0,0,1)]">
          <div className="p-6 sm:p-9 lg:p-11">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-[11px] shadow-[0_15px_24px_-18px_rgba(0,0,0,0.85)] ${copy.iconClass}`}
            >
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.19em] text-[#965136]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(2.7rem,8vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-[38rem] text-sm leading-7 text-[#5c6b63] sm:text-base">
              {copy.body}
            </p>
          </div>

          <dl className="grid border-t border-[#17372b]/10 bg-[#e8ddc9] sm:grid-cols-2">
            <div className="p-5 sm:p-7">
              <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#69766f]">
                Transaction ID
              </dt>
              <dd className="mt-2 break-all font-mono text-sm text-[#20352b]">
                {transactionId || "Not available"}
              </dd>
            </div>
            <div className="border-t border-[#17372b]/10 p-5 sm:border-l sm:border-t-0 sm:p-7">
              <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#69766f]">
                Signed amount
              </dt>
              <dd className="mt-2 font-mono text-sm text-[#20352b]">
                {receipt
                  ? formatAmount(receipt.expected_amount_paise)
                  : "Pending verification"}
              </dd>
            </div>
            {booking && (
              <div className="border-t border-[#17372b]/10 p-5 sm:col-span-2 sm:p-7">
                <dt className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#69766f]">
                  Booking
                </dt>
                <dd className="mt-2 text-sm text-[#20352b]">
                  <span className="font-semibold">{booking.reference}</span>
                  <span className="mx-2 text-[#879087]">·</span>
                  {booking.tour_name}
                </dd>
              </div>
            )}
          </dl>

          <div className="flex flex-col gap-3 border-t border-[#17372b]/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="max-w-md text-xs leading-5 text-[#68756e]">
              Keep the transaction ID. It lets our team reconcile the payment
              without asking for card or bank credentials.
            </p>
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[9px] bg-[#17372b] px-4 text-xs font-bold text-white transition-colors hover:bg-[#254c3c]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Ask Travelspire
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
