import { Mail, MessageCircle, Phone } from "lucide-react";
import { awfContact } from "@/data/festivals/anini-winter-fest";
import { createAwfInquiryURL } from "@/lib/whatsapp";

export function AwfFinalCta() {
  return (
    <section
      aria-labelledby="awf-cta-title"
      className="border-t border-white/[0.08] bg-[#050d0f] py-24 text-white sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
          19–20 September 2026 · Anini, Dibang Valley
        </p>
        <h2
          id="awf-cta-title"
          className="mt-6 max-w-[16ch] text-[clamp(2.9rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#f7f4ec]"
        >
          The road to Anini is{" "}
          <span className="font-serif font-normal italic text-[#dfcfab]">
            the first chapter.
          </span>
        </h2>
        <p className="mt-7 max-w-[34rem] text-base leading-7 text-white/[0.62] sm:text-lg sm:leading-8">
          Seats on the convoy and the fleet go fast around festival weekend.
          One message is all it takes — we&apos;ve driven this road for years.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={createAwfInquiryURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#f2ead8] px-7 text-[12px] font-bold uppercase tracking-[0.13em] text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f]"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Plan my festival journey
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:pl-4">
            <a
              href={awfContact.phonePrimaryHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/[0.85] underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-[#d8c59d]" />
              {awfContact.phonePrimary}
            </a>
            <a
              href={awfContact.phoneSecondaryHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/[0.85] underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-[#d8c59d]" />
              {awfContact.phoneSecondary}
            </a>
            <a
              href={`mailto:${awfContact.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/[0.85] underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <Mail aria-hidden="true" className="h-4 w-4 text-[#d8c59d]" />
              {awfContact.email}
            </a>
          </div>
        </div>

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.35]">
          Official Travel &amp; Taxi Partner · Anini Winter Fest 5.0 · Travelspire Northeast
        </p>
      </div>
    </section>
  );
}
