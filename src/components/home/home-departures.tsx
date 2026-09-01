import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getActiveDepartures } from "@/data/home/homepage-season";

// A departure board rather than a card rail. Small weak cards buried the one
// thing that matters here — the date — so dates now set the rhythm and each
// row runs the full width with a photograph anchoring it.
export function HomeDepartures() {
  const departures = getActiveDepartures();

  if (departures.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="departures-heading"
      className="bg-paper py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Seasonal departures
            </p>
            <h2
              id="departures-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              On the calendar{" "}
              <span className="font-display font-normal italic text-clay">
                right now.
              </span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[15px] leading-7 text-ink-soft">
            Fixed departures and festival windows — listed while the season
            lasts, and gone the moment it doesn&apos;t.
          </p>
        </header>

        <ul className="border-t border-ink/12">
          {departures.map((departure) => {
            const isTimed = departure.expiresOn !== null;

            return (
              <li key={departure.id} className="border-b border-ink/12">
                <Link
                  href={departure.href}
                  className="group -mx-3 flex items-center gap-4 rounded-[12px] px-3 py-4 transition-colors duration-200 hover:bg-ink/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss sm:gap-6 sm:py-5"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] bg-paper-deep ring-1 ring-ink/[0.06] sm:h-[68px] sm:w-[104px]">
                    <Image
                      src={departure.image}
                      alt={departure.imageAlt}
                      fill
                      sizes="104px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </div>

                  {/* Date column: fixed width on desktop so every row aligns
                      like a board, inline above the title on mobile. */}
                  <div className="min-w-0 flex-1 lg:flex lg:items-center lg:gap-8">
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] lg:w-[9.5rem] lg:shrink-0 lg:text-[11px] ${
                        isTimed ? "text-ember" : "text-ink-faint"
                      }`}
                    >
                      {departure.windowLabel}
                    </p>

                    <div className="min-w-0 lg:flex-1">
                      <h3 className="mt-1 truncate text-[15px] font-medium tracking-[-0.02em] text-ink sm:text-[1.0625rem] lg:mt-0">
                        {departure.title}
                      </h3>
                      <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                        {departure.location}
                        <span aria-hidden="true"> · </span>
                        {departure.duration}
                      </p>
                    </div>

                    <p className="mt-1.5 text-[14px] font-semibold text-ink lg:mt-0 lg:w-[9rem] lg:shrink-0 lg:text-right lg:text-[15px]">
                      {departure.priceHook}
                    </p>
                  </div>

                  <div className="hidden shrink-0 items-center gap-4 sm:flex">
                    <span
                      className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
                        departure.state === "booking"
                          ? "bg-moss text-paper"
                          : "border border-ink/20 text-ink-muted"
                      }`}
                    >
                      {departure.state === "booking"
                        ? "Book online"
                        : "Enquire"}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
