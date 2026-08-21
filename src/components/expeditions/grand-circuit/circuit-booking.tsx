import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BedDouble,
  Check,
  CreditCard,
  Footprints,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  circuitExcluded,
  circuitIncluded,
  circuitPomoExtension,
  circuitPricing,
  circuitStay,
} from "@/data/expeditions/mechuka-dong-anini";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";

export function CircuitBooking() {
  return (
    <>
      <section
        id="pricing"
        aria-labelledby="pricing-title"
        className="scroll-mt-24 bg-[#0a1612] text-[#f7f0e4]"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-32 xl:px-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e59a67]">
                Package pricing
              </p>
              <h2
                id="pricing-title"
                className="mt-4 max-w-[12ch] text-[clamp(2.9rem,6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.055em]"
              >
                {circuitPricing.title}
              </h2>
            </div>
            <p className="max-w-[34rem] text-base leading-7 text-white/[0.55] lg:col-span-4">
              {circuitPricing.standfirst}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {circuitPricing.tiers.map((tier, index) => (
              <article
                key={tier.id}
                className={`relative flex min-h-[21rem] flex-col rounded-[16px] p-5 shadow-[0_32px_58px_-42px_rgba(0,0,0,1)] sm:p-6 ${
                  index === 0
                    ? "bg-[#f0e2c5] text-[#142019]"
                    : "bg-[#13231c] text-[#f7f0e4]"
                }`}
              >
                <div className="flex min-h-7 items-start justify-between gap-3">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.17em] ${
                      index === 0 ? "text-[#8d4e31]" : "text-[#d6b473]"
                    }`}
                  >
                    {tier.label}
                  </p>
                  {tier.badge && (
                    <span
                      className={`rounded-[8px] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.13em] shadow-[0_9px_18px_-12px_rgba(0,0,0,0.9)] ${
                        index === 0
                          ? "bg-[#8d4e31] text-[#fff4e8]"
                          : tier.id === "private"
                            ? "bg-[#bcd7d2] text-[#122c28]"
                            : "bg-[#cbd6b9] text-[#24311d]"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="mt-8 font-mono text-[2.75rem] leading-none tracking-[-0.075em] sm:text-[3rem]">
                  {circuitPricing.currency}
                  {tier.price.toLocaleString("en-IN")}
                </p>
                <p
                  className={`mt-2 text-xs ${index === 0 ? "text-[#405048]" : "text-white/[0.48]"}`}
                >
                  per person · 12 nights / 13 days
                </p>

                <p
                  className={`mt-6 text-sm leading-6 ${index === 0 ? "text-[#405048]" : "text-white/[0.56]"}`}
                >
                  {tier.note}
                </p>

                <a
                  href={createGrandCircuitInquiryURL({
                    kind: "tier",
                    label: tier.label,
                    size: tier.size,
                    price: tier.price,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${tier.label} pricing on WhatsApp (opens in a new tab)`}
                  className={`mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] px-4 pt-0 text-[12px] font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${
                    index === 0
                      ? "bg-[#19352a] text-white shadow-[0_16px_28px_-20px_rgba(0,0,0,0.9)] hover:bg-[#25493a] focus-visible:ring-[#19352a]"
                      : "bg-[#e8d9bb] text-[#102019] shadow-[0_16px_28px_-20px_rgba(0,0,0,0.95)] hover:bg-white focus-visible:ring-white"
                  }`}
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Enquire for {tier.size === 2 ? "two" : tier.size}
                </a>
              </article>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 text-xs leading-5 text-white/[0.48] lg:grid-cols-3">
            {circuitPricing.fineprint.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e59a67]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/booking-policy"
            className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#e8d8b8] underline decoration-[#e8d8b8]/40 underline-offset-4 transition-colors hover:text-white"
          >
            Read booking, cancellation and refund terms before paying
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>

          <div className="mt-10 grid overflow-hidden rounded-[14px] bg-[#10251d] shadow-[0_34px_64px_-46px_rgba(0,0,0,1)] lg:grid-cols-12">
            <div className="border-b border-white/[0.08] p-6 sm:p-7 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d6b473]">
                Secure online payment
              </p>
              <h3 className="mt-3 max-w-[15ch] text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
                Confirm the road before you pay for it.
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/[0.48]">
                No open-ended Pay Now button. We first confirm your exact date,
                room plan, vehicle and written quote.
              </p>
            </div>

            <ol className="divide-y divide-white/[0.08] border-b border-white/[0.08] sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-5 lg:border-b-0 lg:border-r">
              {[
                {
                  icon: BadgeCheck,
                  number: "01",
                  title: "Trip confirmed",
                  text: "Final quote locked",
                },
                {
                  icon: KeyRound,
                  number: "02",
                  title: "Private access",
                  text: "Reference + code",
                },
                {
                  icon: CreditCard,
                  number: "03",
                  title: "Pay on PayU",
                  text: "50% advance",
                },
              ].map((step) => (
                <li key={step.number} className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <step.icon
                      aria-hidden="true"
                      className="h-4 w-4 text-[#d6b473]"
                    />
                    <span className="font-mono text-[9px] text-white/[0.28]">
                      {step.number}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold text-white/[0.82]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-white/[0.38]">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col justify-center p-6 sm:p-7 lg:col-span-3">
              <p className="text-xs leading-5 text-white/[0.45]">
                Already received both details from Travelspire?
              </p>
              <Link
                href="/pay"
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#e8d9bb] px-5 text-xs font-bold text-[#102019] shadow-[0_18px_28px_-21px_rgba(0,0,0,0.95)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Open secure payment
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.12em] text-white/[0.28]">
                PayU Hosted Checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="package-scope"
        aria-labelledby="scope-title"
        className="bg-[#ece4d5] text-[#14221c]"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-32 xl:px-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#965136]">
                Before you pay
              </p>
              <h2
                id="scope-title"
                className="mt-4 max-w-[13ch] text-[clamp(2.9rem,6vw,5.7rem)] font-medium leading-[0.92] tracking-[-0.055em]"
              >
                Know exactly what travels with you.
              </h2>
            </div>
            <p className="max-w-[33rem] text-base leading-7 text-[#536159] lg:col-span-4">
              No icon-cloud ambiguity: the base price covers the written items
              below. Anything outside that list belongs in the final quote.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[16px] bg-[#f8f4eb] p-6 shadow-[0_28px_55px_-44px_rgba(29,43,35,0.75)] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#294b3b] text-white shadow-[0_11px_20px_-14px_rgba(0,0,0,0.9)]">
                  <Check aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  Included
                </h3>
              </div>
              <ul className="mt-7 divide-y divide-[#183025]/10">
                {circuitIncluded.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-5"
                  >
                    <span className="text-sm font-semibold text-[#26372f]">
                      {item.name}
                    </span>
                    <span className="text-sm leading-6 text-[#68746e]">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[16px] bg-[#e2d8c7] p-6 shadow-[0_28px_55px_-44px_rgba(29,43,35,0.7)] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#8f5238] text-white shadow-[0_11px_20px_-14px_rgba(0,0,0,0.9)]">
                  <X aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  Not included
                </h3>
              </div>
              <ul className="mt-7 divide-y divide-[#183025]/10">
                {circuitExcluded.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-5"
                  >
                    <span className="text-sm font-semibold text-[#26372f]">
                      {item.name}
                    </span>
                    <span className="text-sm leading-6 text-[#68746e]">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-5">
            <article className="rounded-[16px] bg-[#173027] p-6 text-[#f7f0e4] shadow-[0_28px_55px_-44px_rgba(0,0,0,0.95)] sm:p-8 lg:col-span-2">
              <BedDouble
                aria-hidden="true"
                className="h-6 w-6 text-[#d4b676]"
              />
              <h3 className="mt-6 text-3xl font-medium leading-tight tracking-[-0.045em]">
                {circuitStay.title}
              </h3>
              <p className="mt-5 text-sm leading-6 text-white/[0.58]">
                {circuitStay.body}
              </p>
              <ul className="mt-6 space-y-3">
                {circuitStay.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-xs leading-5 text-white/[0.68]"
                  >
                    <ShieldCheck
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#d4b676]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[16px] bg-[#a95437] p-6 text-[#fff7ed] shadow-[0_28px_55px_-44px_rgba(70,24,10,0.9)] sm:p-8 lg:col-span-3">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffe0b7]">
                <Footprints aria-hidden="true" className="h-4 w-4" />
                {circuitPomoExtension.kicker}
              </p>
              <h3 className="mt-5 max-w-[17ch] text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[0.96] tracking-[-0.05em]">
                {circuitPomoExtension.title}
              </h3>
              <p className="mt-6 max-w-[45rem] text-[0.95rem] leading-7 text-white/[0.78]">
                {circuitPomoExtension.body}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={createGrandCircuitInquiryURL({
                    kind: "pomo-extension",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#fff0d5] px-5 text-[12px] font-bold text-[#472316] shadow-[0_15px_25px_-18px_rgba(50,18,8,0.9)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Quote the extension
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                </a>
                <Link
                  href={circuitPomoExtension.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-black/[0.15] px-5 text-[12px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.24)] transition-colors hover:bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {circuitPomoExtension.linkLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
