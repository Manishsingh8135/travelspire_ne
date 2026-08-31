import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getActiveDepartures } from "@/data/home/homepage-season";

export function HomeDepartures() {
  const departures = getActiveDepartures();

  if (departures.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="departures-heading"
      className="border-t border-white/[0.08] bg-[#050d0f] py-16 text-white sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
              Seasonal departures
            </p>
            <h2
              id="departures-heading"
              className="text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#fffdf7]"
            >
              On the calendar{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                right now.
              </span>
            </h2>
          </div>
          <p className="max-w-[22rem] text-[13px] leading-5 text-white/[0.55]">
            Fixed departures and festival windows — here while the season
            lasts, gone when it doesn&apos;t.
          </p>
        </header>
      </div>

      <div className="relative">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 md:px-10 lg:px-16 xl:px-24 [&::-webkit-scrollbar]:hidden">
          {departures.map((departure) => (
            <li
              key={departure.id}
              className="w-[280px] flex-none snap-start sm:w-[320px]"
            >
              <Link
                href={departure.href}
                className="group flex h-full flex-col rounded-[14px] border border-white/[0.09] bg-[#0b1714] p-5 transition-colors duration-200 hover:border-[#d8c59d]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d8c59d]">
                    {departure.windowLabel}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/[0.4]">
                    {departure.state === "booking" ? "Book online" : "Enquire"}
                  </p>
                </div>
                <h3 className="mt-3.5 text-base font-semibold leading-6 tracking-[-0.015em] text-[#fffdf7]">
                  {departure.title}
                </h3>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/[0.45]">
                  {departure.location}
                  <span aria-hidden="true"> · </span>
                  {departure.duration}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <p className="text-sm font-semibold text-[#f2ead8]">
                    {departure.priceHook}
                  </p>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 flex-none text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d8c59d]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
