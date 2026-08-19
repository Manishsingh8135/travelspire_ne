import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck, Signal } from "lucide-react";
import { awfJourneySteps, awfRouteStops, awfTravelTips } from "@/data/festivals/anini-winter-fest";

export function AwfJourney() {
  return (
    <section
      aria-labelledby="awf-journey-title"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            Journey planning
          </p>
          <h2
            id="awf-journey-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            Getting there is{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              half the festival
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/[0.6] sm:text-lg sm:leading-8">
            Anini is remote — that is the point. Plan ahead, travel slow, arrive
            transformed. And ride with the people who run this road every week.
          </p>
        </div>

        {/* ILP callout */}
        <div className="mt-12 flex flex-col gap-5 rounded-[16px] border border-[#d8c59d]/25 bg-[#101a14] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#d8c59d]/[0.12]">
              <ShieldCheck aria-hidden="true" className="h-5 w-5 text-[#d8c59d]" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8c59d]">
                ILP required for all visitors
              </p>
              <p className="mt-2 max-w-[52ch] text-sm leading-6 text-white/[0.66] sm:text-base sm:leading-7">
                Inner Line Permit is mandatory for non-Arunachal visitors — make sure
                &ldquo;Dibang Valley&rdquo; is mentioned on it. Every Travelspire
                transfer and package includes permit assistance.
              </p>
            </div>
          </div>
          <Link
            href="/permits/arunachal-pradesh-ilp"
            className="inline-flex min-h-11 flex-none items-center justify-center gap-2 rounded-[10px] border border-[#d8c59d]/40 px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e7d9b8] transition-colors duration-200 hover:bg-[#d8c59d]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
          >
            Read our ILP guide
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Steps */}
          <div className="lg:col-span-5">
            <ol className="grid gap-3">
              {awfJourneySteps.map((step) => (
                <li
                  key={step.index}
                  className="rounded-[14px] border border-white/[0.09] bg-[#0b1512] p-6 sm:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#d8c59d]">
                      {step.index}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.42]">
                      {step.meta}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-[#f7f4ec] sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-white/[0.58] sm:text-[0.95rem] sm:leading-7">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* NH-313 route timeline */}
          <div className="lg:col-span-7">
            <div className="rounded-[18px] border border-white/[0.09] bg-[#0b1512] p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl font-normal italic tracking-[-0.02em] text-[#dfcfab] sm:text-3xl">
                  The way to Anini
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">
                  NH-313 · Roing → Anini · 235 km · 6–7 hrs
                </p>
              </div>

              <ol className="mt-8">
                {awfRouteStops.map((stop, index) => (
                  <li key={stop.name} className="relative flex gap-5 pb-6 last:pb-0">
                    {index < awfRouteStops.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[5px] top-4 h-full w-px bg-white/[0.12]"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={
                        index === awfRouteStops.length - 1
                          ? "mt-1.5 h-[11px] w-[11px] flex-none rounded-full bg-[#d8c59d]"
                          : "mt-1.5 h-[11px] w-[11px] flex-none rounded-full border border-white/[0.3] bg-[#0b1512]"
                      }
                    />
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="w-14 flex-none font-mono text-[11px] font-semibold tracking-[0.06em] text-[#d8c59d]/80">
                        {stop.km === 0 ? "KM 0" : `${stop.km}k`}
                      </span>
                      <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#f7f4ec]">
                        {stop.name}
                        {stop.alt && (
                          <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/[0.4]">
                            {stop.alt}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 text-xs leading-5 text-white/[0.5]">
                        {stop.note}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-6 inline-flex items-start gap-2.5 rounded-[10px] bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/[0.55]">
                <Signal aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-[#d8c59d]" />
                Only Airtel and BSNL work on NH-313 — Jio has no coverage. Offline maps
                before Roing; never drive after sunset.
              </p>
            </div>
          </div>
        </div>

        {/* Travel tips */}
        <ul className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {awfTravelTips.map((tip) => (
            <li
              key={tip}
              className="flex items-center gap-3 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[13px] font-medium text-white/[0.7]"
            >
              <Check aria-hidden="true" className="h-4 w-4 flex-none text-[#d8c59d]" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
