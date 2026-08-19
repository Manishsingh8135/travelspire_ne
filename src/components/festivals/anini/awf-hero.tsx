import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle, ShieldCheck } from "lucide-react";
import { awfHeroImages, awfMeta } from "@/data/festivals/anini-winter-fest";
import { createAwfInquiryURL } from "@/lib/whatsapp";

const heroStats = [
  { value: "19–20 Sep", label: "Two days · 2026" },
  { value: "2", label: "Open-air stages" },
  { value: awfMeta.elevation, label: "Festival altitude" },
  { value: "235 km", label: "The road from Roing" },
];

export function AwfHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: awfHeroImages.desktop.src,
    alt: awfHeroImages.alt,
    width: awfHeroImages.desktop.width,
    height: awfHeroImages.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: awfHeroImages.mobile.src,
    alt: awfHeroImages.alt,
    width: awfHeroImages.mobile.width,
    height: awfHeroImages.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="awf-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={awfHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Light maps — keep the valley visible, protect the type */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.62)_0%,rgba(4,11,13,0.12)_30%,rgba(4,11,13,0.55)_62%,rgba(4,11,13,0.97)_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,11,13,0.55)_0%,rgba(4,11,13,0.15)_45%,transparent_75%)] md:block" />

      {/* Top-left partner mark */}
      <div className="absolute left-5 top-24 z-10 sm:left-8 md:left-10 md:top-28 lg:left-16 xl:left-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#d8c59d]/30 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7d9b8] backdrop-blur-sm sm:text-[10px]">
          <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#d8c59d]" />
          Official Travel &amp; Taxi Partner — Travelspire NE
        </p>
      </div>

      {/* Top-right coordinates */}
      <div className="absolute right-6 top-24 z-10 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          {awfMeta.location}
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
          {awfMeta.coordinates.lat}°N · {awfMeta.coordinates.lng}°E · Elev {awfMeta.elevation}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-32 sm:px-8 sm:pb-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:pb-10">
          <div className="max-w-[980px]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#eee6d3] sm:mb-5 sm:text-[11px]">
              {awfMeta.dates.label} · Anini, Arunachal Pradesh
            </p>

            <h1
              id="awf-hero-title"
              className="text-[clamp(2.9rem,12vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#f7f4ec] md:text-[clamp(4.5rem,7vw,7.5rem)]"
            >
              <span className="block">Anini Winter Fest</span>
              <span className="mt-1 block font-serif text-[0.62em] font-normal italic tracking-[-0.03em] text-[#dfcfab] md:mt-2">
                where the road ends, the music begins
              </span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-6 text-white/[0.74] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Two days of indie, folk and tribal-fusion under Dibang Valley&apos;s
              unpolluted skies — and the journey there, handled by the team that
              knows every bend of NH-313.
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="grid max-w-[31rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                <a
                  href={createAwfInquiryURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Plan your Anini Winter Fest journey on WhatsApp (opens in a new tab)"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Plan Your Journey
                </a>

                <Link
                  href="#lineup"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  Explore the Festival
                </Link>
              </div>

              <Link
                href="#transport"
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#eee6d3] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
              >
                Festival transport from ₹5,499 · shared convoy
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <dl
          aria-label="Festival quick facts"
          className="grid w-full grid-cols-4 gap-2 border-t border-white/[0.12] pt-3 sm:gap-4 sm:pt-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col px-1 py-3 text-center sm:py-4 md:px-0 md:text-left"
            >
              <dt className="order-2 mt-0.5 text-[8px] font-medium uppercase leading-3 tracking-[0.1em] text-white/[0.55] sm:text-[9px] sm:tracking-[0.14em] md:text-[10px]">
                {stat.label}
              </dt>
              <dd className="order-1 text-lg font-medium tracking-[-0.03em] text-[#f7f4ec] sm:text-xl md:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
