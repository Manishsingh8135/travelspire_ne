import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSeasonalFeature } from "@/data/home/homepage-season";

export function HomeSeasonalFeature() {
  const feature = getSeasonalFeature();

  return (
    <section
      aria-labelledby="seasonal-feature-heading"
      className="bg-paper-deep py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-5 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 xl:px-24">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-paper ring-1 ring-ink/[0.06] lg:aspect-[16/11]">
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
            {feature.label}
          </p>
          <h2
            id="seasonal-feature-heading"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
          >
            {feature.headline}{" "}
            <span className="font-display font-normal italic text-clay">
              {feature.highlightedHeadline}
            </span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-[15px] leading-7 text-ink-soft">
            {feature.body}
          </p>
          <Link
            href={feature.href}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-moss px-6 text-[13px] font-semibold text-paper shadow-cta transition-colors duration-200 hover:bg-moss-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper-deep sm:text-sm"
          >
            {feature.ctaLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
