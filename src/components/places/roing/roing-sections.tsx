import Image from "next/image";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";
import { roingExperiences, roingHeroFacts, roingHeroImages, roingMeta } from "@/data/places/roing";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function RoingHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: roingHeroImages.desktop.src,
    alt: roingHeroImages.alt,
    width: roingHeroImages.desktop.width,
    height: roingHeroImages.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: roingHeroImages.mobile.src,
    alt: roingHeroImages.alt,
    width: roingHeroImages.mobile.width,
    height: roingHeroImages.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="roing-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={roingHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.6)_0%,rgba(4,11,13,0.12)_30%,rgba(4,11,13,0.55)_62%,rgba(4,11,13,0.97)_100%)]" />

      <div className="absolute left-5 top-24 z-10 sm:left-8 md:left-10 md:top-28 lg:left-16 xl:left-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d9b8]">
          {roingMeta.region} · {roingMeta.state}
        </p>
      </div>
      <div className="absolute right-6 top-24 z-10 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          Destination guide
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
          {roingMeta.identity}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-32 sm:px-8 sm:pb-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:pb-10">
          <div className="max-w-[980px]">
            <h1
              id="roing-hero-title"
              className="text-[clamp(3rem,13vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#f7f4ec] md:text-[clamp(4.5rem,7.5vw,8rem)]"
            >
              <span className="block">Roing</span>
              <span className="mt-2 block font-serif text-[0.44em] font-normal italic tracking-[-0.02em] text-[#dfcfab]">
                {roingMeta.heroLine}
              </span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-6 text-white/[0.74] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Mile zero of the NH-313 climb. Last fuel, last full network, first
              checkpoint — and, if you give it a night, still lakes, old fort walls
              and foothill light worth far more than a drive-through.
            </p>

            <div className="mt-6 grid max-w-[31rem] grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
              <a
                href={createTripPlanningURL({ destination: "Roing, Lower Dibang Valley" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan a Roing trip on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Plan This Trip
              </a>
              <Link
                href="#roing-experiences"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
                See Roing
              </Link>
            </div>
          </div>
        </div>

        <dl
          aria-label="Roing quick facts"
          className="grid w-full grid-cols-4 gap-2 border-t border-white/[0.12] pt-3 sm:gap-4 sm:pt-4"
        >
          {roingHeroFacts.map((fact) => (
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

export function RoingExperiences() {
  return (
    <section
      id="roing-experiences"
      aria-labelledby="roing-experiences-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            Why stop here
          </p>
          <h2
            id="roing-experiences-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            More than{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              a fuel stop
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          {roingExperiences.map((experience) => (
            <article
              key={experience.index}
              className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[18px] bg-[#0b1512] text-white shadow-[10px_22px_44px_-26px_rgba(35,47,39,0.5)] sm:min-h-[32rem]"
            >
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_30%,rgba(5,13,15,0.35)_58%,rgba(5,13,15,0.92)_100%)]" />
              <div className="relative p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
                  {experience.index}
                </p>
                <h3 className="mt-2.5 font-serif text-[1.9rem] font-normal italic leading-[1.05] tracking-[-0.02em] text-[#f7f4ec] sm:text-[2.2rem]">
                  {experience.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.95rem] leading-6 text-white/[0.78] sm:text-base sm:leading-7">
                  {experience.story}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 border-t border-white/[0.18] pt-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e7d9b8]">
                  {experience.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
