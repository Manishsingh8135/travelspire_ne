import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { homeHero } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function HomeHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: homeHero.images.desktop.src,
    alt: homeHero.images.alt,
    width: homeHero.images.desktop.width,
    height: homeHero.images.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: homeHero.images.mobile.src,
    alt: homeHero.images.alt,
    width: homeHero.images.mobile.width,
    height: homeHero.images.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="100vw"
        />
        <img
          {...mobileImageProps}
          alt={homeHero.images.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Contrast only where the text needs it. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,11,0.55)_0%,rgba(3,10,11,0.08)_30%,rgba(3,10,11,0.45)_58%,rgba(3,10,11,0.96)_100%)] md:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(4,11,13,0.45)_0%,rgba(4,11,13,0.05)_32%,rgba(4,11,13,0.42)_64%,rgba(4,11,13,0.95)_100%)] md:block" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,11,13,0.45)_0%,rgba(4,11,13,0.1)_45%,transparent_72%)] md:block" />

      {/* Top-right coordinates */}
      <div className="absolute right-6 top-24 z-10 hidden text-right md:right-12 md:top-28 md:block lg:right-20 xl:right-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
          Home base
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/[0.5]">
          {homeHero.coordinates}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-8 pt-32 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-6 md:pb-8">
          <div className="max-w-[980px]">
            <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#eee6d3] sm:mb-5 sm:text-[11px]">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#d8c59d]" />
              {homeHero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="text-[clamp(2.9rem,12vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#fffdf7] [text-shadow:0_3px_32px_rgba(0,0,0,0.7)] md:text-[clamp(4.5rem,7vw,7.5rem)] md:font-medium"
            >
              <span className="block">{homeHero.title}</span>
              <span className="mt-1 block font-serif text-[0.62em] font-normal italic tracking-[-0.03em] text-[#f0dfb8] md:mt-2 md:text-[#dfcfab]">
                {homeHero.highlightedTitle}
              </span>
            </h1>

            <p className="mt-5 max-w-[36rem] text-[0.95rem] font-medium leading-6 text-white/[0.88] [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:font-normal md:leading-8 md:text-white/[0.74]">
              {homeHero.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="grid max-w-[31rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                <Link
                  href="/all-tours"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  Explore all tours
                </Link>

                <a
                  href={createTripPlanningURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Plan your trip with Travelspire NE on WhatsApp (opens in a new tab)"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Plan my trip
                </a>
              </div>

              <Link
                href="#destinations-heading"
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#eee6d3] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
              >
                <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
                Explore destinations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
