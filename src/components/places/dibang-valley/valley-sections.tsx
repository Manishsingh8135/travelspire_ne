import Image from "next/image";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { valleyChapters, valleyHeroFacts, valleyHeroImages, valleyMeta, valleyRiver } from "@/data/places/dibang-valley";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function ValleyHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: valleyHeroImages.desktop.src,
    alt: valleyHeroImages.alt,
    width: valleyHeroImages.desktop.width,
    height: valleyHeroImages.desktop.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: valleyHeroImages.mobile.src,
    alt: valleyHeroImages.alt,
    width: valleyHeroImages.mobile.width,
    height: valleyHeroImages.mobile.height,
    quality: 85,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="valley-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#050d0f] text-white"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={valleyHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,13,0.6)_0%,rgba(4,11,13,0.12)_30%,rgba(4,11,13,0.55)_62%,rgba(4,11,13,0.97)_100%)]" />

      <div className="absolute left-5 top-24 z-10 sm:left-8 md:left-10 md:top-28 lg:left-16 xl:left-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d9b8]">
          {valleyMeta.region}
        </p>
      </div>
      <div className="absolute right-6 top-24 z-10 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          Regional guide
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
          {valleyMeta.identity}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-32 sm:px-8 sm:pb-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:pb-10">
          <div className="max-w-[1020px]">
            <h1
              id="valley-hero-title"
              className="text-[clamp(3rem,12vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#f7f4ec] md:text-[clamp(4rem,6.8vw,7.5rem)]"
            >
              <span className="block">Dibang Valley</span>
              <span className="mt-2 block font-serif text-[0.46em] font-normal italic tracking-[-0.02em] text-[#dfcfab]">
                {valleyMeta.heroLine}
              </span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-6 text-white/[0.74] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              India&apos;s largest district and its emptiest — a foothill world of orange
              orchards and ferry-town memory below, a high world of cloud passes and
              silent plateaus above. This is the whole map, in one place.
            </p>

            <div className="mt-6 grid max-w-[31rem] grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
              <a
                href={createTripPlanningURL({ destination: "Dibang Valley region" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan a Dibang Valley trip on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Plan This Trip
              </a>
              <Link
                href="#valley-chapters"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f] sm:px-6 sm:text-sm"
              >
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
                Explore the Valley
              </Link>
            </div>
          </div>
        </div>

        <dl
          aria-label="Dibang Valley quick facts"
          className="grid w-full grid-cols-4 gap-2 border-t border-white/[0.12] pt-3 sm:gap-4 sm:pt-4"
        >
          {valleyHeroFacts.map((fact) => (
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

export function ValleyChapters() {
  return (
    <section
      id="valley-chapters"
      aria-labelledby="valley-chapters-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            The valley, chapter by chapter
          </p>
          <h2
            id="valley-chapters-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            Six places,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              one river
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5a5344]">
            Dibang isn&apos;t a single destination — it&apos;s a sequence. These are its
            chapters, arranged the way you&apos;ll actually travel them: low to high,
            easy to wild.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          {valleyChapters.map((chapter) => (
            <Link
              key={chapter.index}
              href={chapter.href}
              className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[18px] bg-[#0b1512] text-white shadow-[10px_22px_44px_-26px_rgba(35,47,39,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17221b] sm:min-h-[32rem]"
            >
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_30%,rgba(5,13,15,0.35)_58%,rgba(5,13,15,0.92)_100%)]" />
              <div className="relative p-7 sm:p-9">
                <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
                  {chapter.index} · {chapter.tag}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
                <h3 className="mt-2.5 font-serif text-[1.9rem] font-normal italic leading-[1.05] tracking-[-0.02em] text-[#f7f4ec] sm:text-[2.2rem]">
                  {chapter.name}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-6 text-white/[0.78] sm:text-base sm:leading-7">
                  {chapter.story}
                </p>
                <p className="mt-4 border-t border-white/[0.18] pt-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e7d9b8]">
                  {chapter.meta}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValleyRiver() {
  return (
    <section aria-labelledby="valley-river-title" className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-8 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 xl:px-24">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] lg:aspect-[3/4]">
          <Image
            src={valleyRiver.image}
            alt={valleyRiver.imageAlt}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            One thread through everything
          </p>
          <h2
            id="valley-river-title"
            className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.05em] text-[#f7f4ec]"
          >
            The river that{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">draws the map</span>
          </h2>
          <div className="mt-7 space-y-5">
            {valleyRiver.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-8 text-white/[0.72] sm:text-lg sm:leading-9">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
