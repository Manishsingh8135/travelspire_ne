import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";
import {
  sixHeroImages,
  sixMeta,
  sixProfile,
  sixVitals,
} from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";
import { plotPoints, smoothPath } from "./elevation-path";

const SPARK_W = 1000;
const SPARK_H = 54;

export function SixHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: sixHeroImages.desktop.src,
    alt: sixHeroImages.alt,
    width: sixHeroImages.desktop.width,
    height: sixHeroImages.desktop.height,
    quality: 82,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: sixHeroImages.mobile.src,
    alt: sixHeroImages.alt,
    width: sixHeroImages.mobile.width,
    height: sixHeroImages.mobile.height,
    quality: 82,
    sizes: "100vw",
    priority: true,
  });

  const sparkPoints = plotPoints(sixProfile.nodes, {
    width: SPARK_W,
    height: SPARK_H,
    padTop: 6,
    padBottom: 6,
  });
  const sparkLine = smoothPath(sparkPoints);
  const summit = sparkPoints[5];

  return (
    <section
      aria-labelledby="six-hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#070E0D] text-[#F3EEE2]"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          alt={sixHeroImages.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Two stacked washes: a cool top scrim for the rails, a deep floor for the type. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,13,0.78)_0%,rgba(7,14,13,0.16)_26%,rgba(7,14,13,0.62)_60%,rgba(7,14,13,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_18%_78%,rgba(7,14,13,0.72)_0%,transparent_62%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-6 pt-28 sm:px-8 sm:pb-8 md:px-10 md:pt-32 lg:px-16 xl:px-24">
        {/* Top rails */}
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[9px] uppercase leading-4 tracking-[0.2em] text-[#D8BE8B] sm:text-[10px] sm:tracking-[0.24em]">
            {sixMeta.route}
          </p>
          <div className="hidden text-right sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F3EEE2]/90">
              {sixMeta.edition}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#F3EEE2]/50">
              {sixMeta.duration}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-end pb-8 pt-16 md:pb-10">
          <div className="max-w-[62rem]">
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9683A]">
              <span className="h-px w-8 bg-[#C9683A]/70" aria-hidden="true" />
              The Pomo Grassland expedition
            </p>

            <h1
              id="six-hero-title"
              className="text-[clamp(3rem,13vw,5.75rem)] font-medium leading-[0.86] tracking-[-0.06em] text-[#F7F3E9] md:text-[clamp(4.5rem,7.4vw,8rem)]"
            >
              <span className="block">{sixMeta.display}</span>
              <span className="mt-1 block font-serif text-[0.6em] font-normal italic tracking-[-0.02em] text-[#D8BE8B] md:mt-2">
                {sixMeta.serif}
              </span>
            </h1>

            <p className="mt-6 max-w-[40rem] text-[0.95rem] leading-6 text-[#F3EEE2]/[0.76] sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Five nights inside India&apos;s emptiest district, built around one
              twelve-hour morning: headlamps at 3 AM, alpine grassland by late
              morning, down before the light goes. The rest of the week is
              arranged to make that day possible.
            </p>

            <div className="mt-7 grid max-w-[32rem] grid-cols-2 gap-2.5 sm:flex sm:gap-3">
              <a
                href={createAniniSixInquiryURL({ kind: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire about the Anini Pomo Grassland expedition on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#F2EAD8] px-3 text-[13px] font-semibold text-[#07100D] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EAD8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D] sm:px-6 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Hold Six Places
              </a>
              <Link
                href="#day-01"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-[#F3EEE2]/[0.34] bg-black/10 px-3 text-[13px] font-medium text-[#F3EEE2] backdrop-blur-[2px] transition-colors duration-200 hover:border-[#F3EEE2]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EEE2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D] sm:px-6 sm:text-sm"
              >
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
                Read the six days
              </Link>
            </div>
          </div>
        </div>

        {/* Signature: the day-one climb, drawn as a hairline. */}
        <svg
          viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-8 w-full text-[#D8BE8B] sm:h-[54px]"
        >
          <path
            d={sparkLine}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.5}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={summit.x} cy={summit.y} r={3.5} fill="#C9683A" />
        </svg>

        <dl
          aria-label="Expedition quick facts"
          className="grid w-full grid-cols-3 gap-x-2 gap-y-1 border-t border-[#F3EEE2]/[0.14] pt-3 sm:grid-cols-5 sm:gap-4 sm:pt-4"
        >
          {sixVitals.map((vital) => (
            <div
              key={vital.label}
              className="flex flex-col py-2.5 text-left sm:py-3.5"
            >
              <dd className="order-1 flex items-baseline gap-1 font-mono text-lg font-medium tracking-[-0.02em] text-[#F7F3E9] sm:text-xl md:text-[1.6rem]">
                {vital.value}
                <span className="text-[0.5em] uppercase tracking-[0.12em] text-[#D8BE8B]">
                  {vital.unit}
                </span>
              </dd>
              <dt className="order-2 mt-0.5 text-[8.5px] font-medium uppercase leading-3 tracking-[0.1em] text-[#F3EEE2]/[0.52] sm:text-[9px] sm:tracking-[0.14em] md:text-[10px]">
                {vital.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
