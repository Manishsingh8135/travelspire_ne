import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeWiderNortheast, type HomeWiderState } from "@/data/home/homepage";

// ─── State card ────────────────────────────────────────────────────────────
// A tall image plate, the photograph running edge to edge. Resting state
// shows only the state name over a soft scrim; on hover or keyboard focus the
// scrim deepens and the card opens in two beats — the one-line character
// first, then a filled button rather than a bare text link.
function StateCard({ state }: { state: HomeWiderState }) {
  return (
    <Link
      href={state.href}
      aria-label={`${state.name} — ${state.linkLabel}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[16px] bg-ink-band shadow-card transition-[box-shadow] duration-300 ease-out hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <Image
        src={state.image}
        alt={state.imageAlt}
        fill
        sizes="(min-width: 1280px) 178px, (min-width: 1024px) 12.5vw, (min-width: 640px) 34vw, 58vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        loading="lazy"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.74)_0%,rgba(14,26,21,0.42)_26%,rgba(14,26,21,0.10)_50%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.95)_0%,rgba(14,26,21,0.84)_40%,rgba(14,26,21,0.52)_68%,rgba(14,26,21,0.16)_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4">
        <h3 className="text-[1.125rem] font-medium leading-tight tracking-[-0.02em] text-paper">
          {state.name}
        </h3>

        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-2.5 text-[12px] leading-[1.6] text-paper/[0.88]">
              {state.whyGo}
            </p>
            <span className="mt-3.5 inline-flex min-h-9 items-center gap-1.5 rounded-[7px] bg-paper px-3.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-200 group-hover:bg-white">
              {state.linkLabel}
              <ArrowUpRight
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// The eight states we run in, sat directly under the hero — this is the first
// thing after the photograph, so it answers "where do you go?" before the
// page has asked anything else.
export function HomeStatesRail() {
  return (
    <section
      aria-labelledby="states-heading"
      className="border-t border-ink/[0.08] bg-paper py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="max-w-[46rem]">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
            Where we run
          </p>
          <h2
            id="states-heading"
            className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
          >
            Seven sisters{" "}
            <span className="font-display font-normal italic text-clay">
              and Sikkim.
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[15px] leading-7 text-ink-soft">
            The whole Northeast, from our home ground in Arunachal out to the
            states we reach through festivals and permits.
          </p>
        </header>

        <ul className="rail mt-12 -mx-5 gap-4 px-5 pb-1 scroll-pl-5 sm:mt-14 sm:-mx-8 sm:px-8 sm:scroll-pl-8 md:-mx-10 md:px-10 md:scroll-pl-10 lg:mx-0 lg:grid lg:grid-cols-8 lg:gap-4 lg:px-0 xl:gap-5">
          {homeWiderNortheast.map((state) => (
            <li
              key={state.name}
              className="w-[58vw] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:shrink"
            >
              <StateCard state={state} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
