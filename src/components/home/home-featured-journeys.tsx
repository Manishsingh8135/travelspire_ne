import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFeaturedJourneys } from "@/data/home/homepage";

export function HomeFeaturedJourneys() {
  return (
    <section
      aria-labelledby="featured-tours-heading"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
              Featured journeys
            </p>
            <h2
              id="featured-tours-heading"
              className="max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
            >
              The trips that{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                book out first.
              </span>
            </h2>
          </div>
          <Link
            href="/all-tours"
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-white/[0.22] px-5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/85 transition-colors duration-200 hover:border-[#d8c59d]/60 hover:text-[#f2ead8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
          >
            Explore Northeast India tour packages
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </header>

        {/* Mobile: one card at a time · Desktop: 3-column grid */}
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {homeFeaturedJourneys.map((journey) => (
            <li
              key={journey.slug}
              className="w-[86vw] flex-none snap-start sm:w-[62vw] lg:w-auto"
            >
              <Link
                href={journey.href}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-[#0b1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={journey.image}
                    alt={journey.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 62vw, 86vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d8c59d]/90">
                    {journey.location}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-7 tracking-[-0.02em] text-[#fffdf7]">
                    {journey.title}
                  </h3>
                  <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/[0.5]">
                    {journey.duration}
                    <span aria-hidden="true"> · </span>
                    {journey.difficulty}
                    <span aria-hidden="true"> · </span>
                    {journey.startDate}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
                    <p className="text-sm text-white/[0.72]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/[0.45]">
                        from{" "}
                      </span>
                      <span className="text-base font-semibold text-[#f2ead8]">
                        ₹{journey.fromPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/[0.45]">
                        {" "}
                        / person
                      </span>
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors duration-200 group-hover:text-[#f2ead8]">
                      View journey
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
