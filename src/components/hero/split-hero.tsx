import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

type HeroStat = {
  value: string;
  label: string;
};

type HeroImage = {
  src: string;
  width: number;
  height: number;
  location: string;
  region: string;
};

export type SplitHeroData = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  planTripCta: {
    text: string;
    href: string;
  };
  festivalCta: {
    text: string;
    href: string;
  };
  images: {
    alt: string;
    desktop: HeroImage;
    mobile: HeroImage;
  };
  stats: HeroStat[];
};

interface SplitHeroProps {
  data: SplitHeroData;
}

export function SplitHero({ data }: SplitHeroProps) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: data.images.desktop.src,
    alt: data.images.alt,
    width: data.images.desktop.width,
    height: data.images.desktop.height,
    quality: 90,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: data.images.mobile.src,
    alt: data.images.alt,
    width: data.images.mobile.width,
    height: data.images.mobile.height,
    quality: 90,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07100d] text-white"
    >
      <picture className="absolute inset-0">
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="100vw"
        />
        <img
          {...mobileImageProps}
          alt={data.images.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[51%_center] md:object-[54%_center]"
        />
      </picture>

      {/* Mobile and desktop use different light maps so the landscapes stay visible. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,7,0.48)_0%,rgba(3,9,7,0.08)_26%,rgba(3,9,7,0.58)_55%,rgba(3,9,7,0.98)_100%)] md:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(3,9,7,0.93)_0%,rgba(3,9,7,0.79)_37%,rgba(3,9,7,0.28)_67%,rgba(3,9,7,0.12)_100%)] md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,6,0.48)_0%,transparent_24%,transparent_67%,rgba(2,8,6,0.78)_100%)]" />

      <div className="absolute right-6 top-24 z-10 flex items-center gap-3 text-right sm:right-10 md:right-12 md:top-28 lg:right-20 xl:right-28">
        <div className="md:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
            {data.images.mobile.location}
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.55]">
            {data.images.mobile.region}
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
            {data.images.desktop.location}
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/[0.55]">
            {data.images.desktop.region}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-24 sm:px-8 sm:pb-8 md:px-10 md:pt-28 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-end pb-7 md:items-center md:pb-8 md:pt-8">
          <div className="max-w-[880px]">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#eee6d3] sm:text-[11px]">
                {data.eyebrow}
              </p>
            </div>

            <h1
              id="home-hero-title"
              className="max-w-[22ch] text-[clamp(2.65rem,11vw,4.35rem)] font-medium leading-[0.93] tracking-[-0.055em] text-[#f7f4ec] md:text-[clamp(4rem,6vw,6.35rem)]"
            >
              <span className="block">{data.title}</span>
              <span className="mt-1 block font-serif font-normal italic tracking-[-0.045em] text-[#dfcfab] md:mt-2">
                {data.highlightedTitle}
              </span>
            </h1>

            <p className="mt-5 max-w-[39rem] text-[0.95rem] leading-6 text-white/[0.72] sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              {data.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="grid max-w-[31rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                <Link
                  href={data.cta.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#f2ead8] px-3 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100d] sm:px-6 sm:text-sm"
                >
                  <span className="sm:hidden">Start Journey</span>
                  <span className="hidden sm:inline">{data.cta.text}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>

                <Link
                  href={data.planTripCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${data.planTripCta.text} on WhatsApp (opens in a new tab)`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/[0.38] bg-black/10 px-3 text-[13px] font-medium text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100d] sm:px-6 sm:text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  {data.planTripCta.text}
                </Link>
              </div>

              <Link
                href={data.festivalCta.href}
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#eee6d3] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
              >
                {data.festivalCta.text}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <dl
          aria-label="Travelspire experience statistics"
          className="grid w-full grid-cols-4 gap-2 sm:gap-4"
        >
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col px-1 py-3.5 text-center sm:py-4 md:px-0 md:py-5 md:text-left"
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
