import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";
import { aniniHeroFacts, aniniHeroImages, aniniMeta } from "@/data/places/anini";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function AniniHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: aniniHeroImages.desktop.src,
    alt: aniniHeroImages.alt,
    width: aniniHeroImages.desktop.width,
    height: aniniHeroImages.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: aniniHeroImages.mobile.src,
    alt: aniniHeroImages.alt,
    width: aniniHeroImages.mobile.width,
    height: aniniHeroImages.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="anini-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={aniniHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.6)_0%,rgba(4,11,13,0.1)_30%,rgba(4,11,13,0.55)_62%,rgba(4,11,13,0.97)_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,11,13,0.5)_0%,rgba(4,11,13,0.12)_45%,transparent_75%)] md:block" />

      {/* Eyebrow + coordinates */}
      <div className="absolute left-5 top-24 z-10 sm:left-8 md:left-10 md:top-28 lg:left-16 xl:left-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d9b8]">
          {aniniMeta.region} · {aniniMeta.state}
        </p>
      </div>
      <div className="absolute right-6 top-24 z-10 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          Destination guide
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
          {aniniMeta.coordinates.lat}°N · {aniniMeta.coordinates.lng}°E · Elev {aniniMeta.elevationM.toLocaleString()} m
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-32 sm:px-8 sm:pb-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:pb-10">
          <div className="max-w-[980px]">
            <h1
              id="anini-hero-title"
              className="text-[clamp(3.4rem,14vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#f7f4ec] md:text-[clamp(5rem,8vw,8.5rem)]"
            >
              <span className="block">Anini</span>
              <span className="mt-2 block font-serif text-[0.42em] font-normal italic tracking-[-0.02em] text-[#dfcfab]">
                the quietest headquarters in India
              </span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-6 text-white/[0.74] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              A plateau at 1,970 m between the Dri and Mathun rivers, capital of
              India&apos;s least-visited district — where forests outnumber people,
              rivers have never seen a dam, and the night sky has never known smog.
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="grid max-w-[31rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                <a
                  href={createTripPlanningURL({ destination: "Anini, Dibang Valley" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Plan an Anini trip on WhatsApp (opens in a new tab)"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Plan This Trip
                </a>
                <Link
                  href="#anini-experiences"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
                >
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  See the Valley
                </Link>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/[0.5]">
                Home ground of the Idu Mishmi · reached over the 2,655 m Mayodia Pass
              </p>
            </div>
          </div>
        </div>

        <dl
          aria-label="Anini quick facts"
          className="grid w-full grid-cols-4 gap-2 border-t border-white/[0.12] pt-3 sm:gap-4 sm:pt-4"
        >
          {aniniHeroFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col px-1 py-3 text-center sm:py-4 md:px-0 md:text-left"
            >
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

export function AniniManifesto() {
  return (
    <section aria-label="Why Anini" className="bg-[#050d0f] pb-20 pt-4 text-white sm:pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 md:px-10">
        <p className="font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal italic leading-[1.25] tracking-[-0.02em] text-[#eee6d3]">
          “Most places on the map are destinations. Anini is still a
          <span className="text-[#d8c59d]"> journey</span> — 235 kilometres of
          cloud pass, river gorges and suspension bridges stand between it and
          the rest of India, and that is precisely what has kept it
          <span className="text-[#d8c59d]"> worth arriving at</span>.”
        </p>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.4]">
          Travelspire field notes · Dibang Valley
        </p>
      </div>
    </section>
  );
}
