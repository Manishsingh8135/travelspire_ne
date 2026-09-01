import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { homeHero } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

// Full-bleed and full-height, running underneath the navbar. These valleys
// only read as vast at this scale, so nothing is inset and nothing frames it —
// the photograph is the page until you scroll off it.
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink-band text-paper"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={homeHero.images.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Many stops rather than two: across a full viewport a two-stop
          gradient bands visibly. Contrast lands only where type sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.90)_0%,rgba(14,26,21,0.78)_12%,rgba(14,26,21,0.54)_28%,rgba(14,26,21,0.28)_44%,rgba(14,26,21,0.10)_60%,rgba(14,26,21,0.14)_82%,rgba(14,26,21,0.42)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(14,26,21,0.52)_0%,rgba(14,26,21,0.18)_40%,transparent_70%)] md:block"
      />

      <div className="absolute right-5 top-24 z-10 hidden text-right sm:right-8 md:right-10 md:top-28 md:block lg:right-16 xl:right-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">
          Home base
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/50">
          {homeHero.coordinates}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-8 pt-32 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-4 md:pb-6">
          <div className="max-w-[62rem]">
            <p className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85 sm:mb-5 sm:text-[11px]">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
              {homeHero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="text-[clamp(2.6rem,10.5vw,4.6rem)] font-medium leading-[0.93] tracking-[-0.05em] text-paper [text-shadow:0_3px_34px_rgba(14,26,21,0.72)] md:text-[clamp(4rem,6.6vw,7rem)]"
            >
              <span className="block">{homeHero.title}</span>
              <span className="mt-1 block font-display text-[0.95em] font-normal italic tracking-[-0.02em] text-[#F2E5C8] md:mt-2">
                {homeHero.highlightedTitle}
              </span>
            </h1>

            <p className="mt-5 max-w-[36rem] text-[0.95rem] leading-7 text-paper/[0.88] [text-shadow:0_2px_18px_rgba(14,26,21,0.85)] sm:mt-6 md:text-lg md:leading-8 md:text-paper/[0.8]">
              {homeHero.description}
            </p>

            <div className="mt-7 grid max-w-[31rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3 md:mt-9">
              <Link
                href="/all-tours"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-paper px-4 text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:px-6 sm:text-sm"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                Explore all tours
              </Link>

              <a
                href={createTripPlanningURL()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan your trip with Travelspire NE on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-paper/40 bg-ink/10 px-4 text-[13px] font-medium text-paper backdrop-blur-[2px] transition-colors duration-200 hover:border-paper/80 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:px-6 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Plan my trip
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-paper/[0.14] pt-4">
          <Link
            href="#destinations"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
          >
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
            Explore destinations
          </Link>

          <p className="hidden text-right font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45 sm:block">
            {homeHero.imageCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
