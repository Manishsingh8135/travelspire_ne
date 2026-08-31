import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { homeFinalCta } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function HomeFinalCta() {
  return (
    <section
      aria-labelledby="planning-heading"
      className="relative isolate overflow-hidden bg-[#050d0f] text-white"
    >
      <Image
        src={homeFinalCta.image}
        alt={homeFinalCta.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.8)_0%,rgba(4,11,13,0.55)_45%,rgba(4,11,13,0.92)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[80svh] w-full max-w-[1600px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e7d9b8]">
          A human alternative
        </p>
        <h2
          id="planning-heading"
          className="max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7] [text-shadow:0_3px_32px_rgba(0,0,0,0.6)]"
        >
          Not sure which{" "}
          <span className="font-serif font-normal italic text-[#f0dfb8]">
            route fits?
          </span>
        </h2>
        <p className="mt-6 max-w-[34rem] text-[15px] leading-7 text-white/[0.78] [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]">
          Tell us where you want to go, how much time you have and how you
          want to travel. We will help shape the journey honestly.
        </p>

        <div className="mt-8 grid w-full max-w-[26rem] grid-cols-1 gap-2.5 sm:max-w-none sm:grid-cols-2 sm:gap-3">
          <a
            href={createTripPlanningURL()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Talk to a trip planner on WhatsApp (opens in a new tab)"
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-6 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:text-sm"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Talk to a trip planner
          </a>
          <Link
            href="/all-tours"
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-6 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:text-sm"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
            Browse all tours
          </Link>
        </div>
      </div>
    </section>
  );
}
