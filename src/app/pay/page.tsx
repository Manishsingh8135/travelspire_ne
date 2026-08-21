import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { PaymentAccessForm } from "@/components/payments/payment-access-form";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Secure Tour Payment",
  description:
    "Open a confirmed Travelspire North-East booking and continue to secure PayU Hosted Checkout.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

const paymentSteps = [
  {
    number: "01",
    title: "Confirm the trip",
    text: "We first lock the departure date, room mix, vehicle, traveller count and written inclusions.",
  },
  {
    number: "02",
    title: "Receive private access",
    text: "Travelspire sends one booking reference and one private payment code for the exact confirmed amount.",
  },
  {
    number: "03",
    title: "Pay on PayU",
    text: "The amount is signed by our server. PayU shows the available methods and securely processes the payment.",
  },
] as const;

export default function SecurePaymentPage() {
  return (
    <div className="min-h-screen bg-[#07110f] text-[#f6efe2]">
      <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 md:px-10 lg:px-16 lg:pb-32 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[15rem] top-0 h-[36rem] w-[36rem] rounded-full bg-[#a95437]/15 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[14rem] bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#2f6550]/20 blur-[120px]"
        />

        <div className="relative mx-auto w-full max-w-[1500px]">
          <Link
            href="/tours/mechuka-dong-anini-tour-package#pricing"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to tour pricing
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-7 lg:pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e59a67]">
                Travelspire secure payment
              </p>
              <h1 className="mt-5 max-w-[12ch] text-[clamp(3.25rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.06em]">
                Confirm first. Pay with clarity.
              </h1>
              <p className="mt-7 max-w-[42rem] text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                This page does not sell an unverified seat. It opens only after
                a Travelspire trip specialist confirms the exact departure and
                sends private payment access for your booking.
              </p>

              <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {paymentSteps.map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-3 py-6 sm:grid-cols-[3.5rem_12rem_1fr] sm:items-start sm:gap-5"
                  >
                    <span className="font-mono text-xs text-[#d7b978]">
                      {step.number}
                    </span>
                    <strong className="text-sm font-semibold text-[#f6efe2]">
                      {step.title}
                    </strong>
                    <span className="text-sm leading-6 text-white/50">
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: FileCheck2, text: "Server-fixed amount" },
                  { icon: ShieldCheck, text: "Verified callback" },
                  { icon: BadgeCheck, text: "Gateway reconciliation" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2.5 border-l border-[#d7b978]/35 pl-3 text-xs text-white/58"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#d7b978]"
                    />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <PaymentAccessForm />

              <div className="mt-5 flex flex-col gap-3 rounded-[12px] bg-white/[0.045] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-white/80">
                    Do not have private payment access?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/42">
                    Confirm your dates and final quote with the trip team first.
                  </p>
                </div>
                <a
                  href={createGrandCircuitInquiryURL({ kind: "dates" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[9px] bg-[#e8d8b8] px-4 text-xs font-bold text-[#102019] transition-colors hover:bg-white"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Confirm first
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
