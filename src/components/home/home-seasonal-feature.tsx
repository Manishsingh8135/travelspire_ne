import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSeasonalFeature } from "@/data/home/homepage-season";

export function HomeSeasonalFeature() {
  const feature = getSeasonalFeature();

  return (
    <section
      aria-labelledby="seasonal-feature-heading"
      className="bg-[#f6f1e7] py-20 text-[#152019] sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-5 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-16 xl:px-24">
        <div className="relative overflow-hidden rounded-[16px] lg:col-span-7">
          <div className="relative aspect-[4/3] lg:aspect-[16/11]">
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
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#87543a]">
            {feature.label}
          </p>
          <h2
            id="seasonal-feature-heading"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
          >
            {feature.headline}{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              {feature.highlightedHeadline}
            </span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-[15px] leading-7 text-[#5a655e]">
            {feature.body}
          </p>
          <Link
            href={feature.href}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-[#17241d] px-6 text-[13px] font-semibold text-[#f5efe2] shadow-[7px_12px_26px_-16px_rgba(9,18,12,0.8)] transition-colors duration-200 hover:bg-[#2b3a31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a] sm:text-sm"
          >
            {feature.ctaLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
