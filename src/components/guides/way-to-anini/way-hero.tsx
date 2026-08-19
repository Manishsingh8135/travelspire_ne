import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";
import { wayHeroFacts, wayHeroImages, wayMeta } from "@/data/guides/way-to-anini";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function WayHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: wayHeroImages.desktop.src,
    alt: wayHeroImages.alt,
    width: wayHeroImages.desktop.width,
    height: wayHeroImages.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: wayHeroImages.mobile.src,
    alt: wayHeroImages.alt,
    width: wayHeroImages.mobile.width,
    height: wayHeroImages.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="way-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={wayHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.6)_0%,rgba(4,11,13,0.12)_30%,rgba(4,11,13,0.55)_62%,rgba(4,11,13,0.97)_100%)]" />

      <div className="absolute left-5 top-24 z-10 sm:left-8 md:left-10 md:top-28 lg:left-16 xl:left-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d9b8]">
          {wayMeta.route}
        </p>
      </div>
      <div className="absolute right-6 top-24 z-10 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          The signature road guide
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
          By the team that drives it weekly
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-32 sm:px-8 sm:pb-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:pb-10">
          <div className="max-w-[1020px]">
            <h1
              id="way-hero-title"
              className="text-[clamp(2.9rem,12vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#f7f4ec] md:text-[clamp(4rem,6.8vw,7.25rem)]"
            >
              <span className="block">The Way</span>
              <span className="mt-2 block font-serif text-[0.62em] font-normal italic tracking-[-0.02em] text-[#dfcfab]">
                to Anini
              </span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-6 text-white/[0.74] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Nine chapters, one river of a road: from Assam&apos;s tea flats over
              India&apos;s longest bridge, through the ILP gate, and up 235 kilometres
              of mountain to the quietest headquarters in the country. This is the
              whole drive — told the way we actually run it.
            </p>

            <div className="mt-6 grid max-w-[31rem] grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
              <a
                href={createTripPlanningURL({ destination: "Dibrugarh to Anini road journey" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan the drive to Anini on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Plan This Drive
              </a>
              <Link
                href="#chapter-01"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
                Begin Chapter One
              </Link>
            </div>
          </div>
        </div>

        <dl
          aria-label="Route quick facts"
          className="grid w-full grid-cols-4 gap-2 border-t border-white/[0.12] pt-3 sm:gap-4 sm:pt-4"
        >
          {wayHeroFacts.map((fact) => (
            <div key={fact.label} className="flex flex-col px-1 py-3 text-center sm:py-4 md:px-0 md:text-left">
              <dt className="order-2 mt-0.5 text-[8px] font-medium uppercase leading-3 tracking-[0.1em] text-white/[0.55] sm:text-[9px] sm:tracking-[0.14em] md:text-[10px]">
                {fact.label}
              </dt>
              <dd className="order-1 text-lg font-medium tracking-[-0.03em] text-[#f7f4ec] sm:text-xl md:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
