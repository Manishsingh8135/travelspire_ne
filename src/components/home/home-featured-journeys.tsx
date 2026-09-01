import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  homeFeaturedJourneys,
  type HomeFeaturedJourney,
} from "@/data/home/homepage";

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function JourneyCard({ journey }: { journey: HomeFeaturedJourney }) {
  return (
    <Link
      href={journey.href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[16px] bg-paper-deep ring-1 ring-ink/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
    >
      <Image
        src={journey.image}
        alt={journey.imageAlt}
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 80vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.92)_0%,rgba(14,26,21,0.78)_18%,rgba(14,26,21,0.46)_38%,rgba(14,26,21,0.16)_56%,rgba(14,26,21,0.02)_74%,transparent_88%)]"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E4D3AC]">
          {journey.location}
        </p>
        <h3 className="mt-2.5 text-[1.35rem] font-medium leading-tight tracking-[-0.025em] text-paper sm:text-[1.5rem]">
          {journey.title}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
          {journey.duration}
          <span aria-hidden="true"> · </span>
          {journey.difficulty}
        </p>

        <div className="mt-4 flex items-end justify-between gap-4 border-t border-paper/[0.16] pt-3.5">
          <p className="text-[15px] font-semibold text-paper">
            <span className="font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-paper/55">
              from{" "}
            </span>
            {formatPrice(journey.fromPrice)}
          </p>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 flex-none text-paper/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}

export function HomeFeaturedJourneys() {
  return (
    <section
      aria-labelledby="featured-journeys-heading"
      className="bg-paper py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Featured journeys
            </p>
            <h2
              id="featured-journeys-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              The six we would{" "}
              <span className="font-display font-normal italic text-clay">
                put you on first.
              </span>
            </h2>
          </div>
          <Link
            href="/all-tours"
            className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-ink/15 px-5 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-ink/35 hover:bg-ink/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
          >
            See all tours
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </header>

        <div className="rail -mx-5 gap-5 px-5 pb-1 scroll-pl-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-3 lg:gap-6">
          {homeFeaturedJourneys.map((journey) => (
            <div
              key={journey.slug}
              className="w-[80vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <JourneyCard journey={journey} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
