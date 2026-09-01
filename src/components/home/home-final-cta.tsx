import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { homeFinalCta } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function HomeFinalCta() {
  return (
    <section
      aria-labelledby="planning-heading"
      className="relative isolate overflow-hidden bg-ink-band text-paper"
    >
      <Image
        src={homeFinalCta.image}
        alt={homeFinalCta.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,21,0.82)_0%,rgba(14,26,21,0.58)_42%,rgba(14,26,21,0.72)_74%,rgba(14,26,21,0.94)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[84svh] w-full max-w-[1600px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E4D3AC]">
          A human alternative
        </p>
        <h2
          id="planning-heading"
          className="max-w-[17ch] text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-paper [text-shadow:0_3px_32px_rgba(14,26,21,0.65)]"
        >
          Not sure which{" "}
          <span className="font-display font-normal italic text-[#F2E5C8]">
            route fits?
          </span>
        </h2>
        <p className="mt-6 max-w-[34rem] text-[15px] leading-7 text-paper/[0.82] [text-shadow:0_2px_18px_rgba(14,26,21,0.85)]">
          Tell us where you want to go, how much time you have and how you want
          to travel. We will help shape the journey honestly.
        </p>

        <div className="mt-9 grid w-full max-w-[26rem] grid-cols-1 gap-2.5 sm:max-w-none sm:grid-cols-2 sm:gap-3">
          <a
            href={createTripPlanningURL()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Talk to a trip planner on WhatsApp (opens in a new tab)"
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-paper px-6 text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:text-sm"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Talk to a trip planner
          </a>
          <Link
            href="/all-tours"
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-paper/40 bg-ink/10 px-6 text-[13px] font-medium text-paper backdrop-blur-[2px] transition-colors duration-200 hover:border-paper/80 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:text-sm"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
            Browse all tours
          </Link>
        </div>
      </div>
    </section>
  );
}
