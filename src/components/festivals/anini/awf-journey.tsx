import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import {
  awfJourneySteps,
  awfTravelTips,
} from "@/data/festivals/anini-winter-fest";

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
          <p className="mt-6 max-w-[36rem] text-base leading-7 text-white/[0.6] sm:text-lg sm:leading-8">
            The route story above shows every bend. This is the shorter version:
            the four decisions to make before you leave home.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-[16px] border border-[#d8c59d]/25 bg-[#101a14] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#d8c59d]/[0.12]">
              <ShieldCheck
                aria-hidden="true"
                className="h-5 w-5 text-[#d8c59d]"
              />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8c59d]">
                ILP required for non-Arunachal visitors
              </p>
              <p className="mt-2 max-w-[52ch] text-sm leading-6 text-white/[0.66] sm:text-base sm:leading-7">
                Make sure &ldquo;Dibang Valley&rdquo; is mentioned on your
                permit. Every Travelspire transfer and package includes permit
                assistance.
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

        <div className="mt-14 flex items-end justify-between gap-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
              The essential sequence
            </p>
            <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#f7f4ec] sm:text-3xl">
              Four decisions. Then the road.
            </h3>
          </div>
          <p className="hidden max-w-[28ch] text-right text-xs leading-5 text-white/[0.42] sm:block">
            Exact halts and road protocols live in the dedicated guide, not
            repeated across this page.
          </p>
        </div>

        <ol className="-mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {awfJourneySteps.map((step) => (
            <li
              key={step.index}
              className="w-[82vw] max-w-[21rem] shrink-0 snap-start rounded-[14px] border border-white/[0.09] bg-[#0b1512] p-6 sm:w-auto sm:max-w-none sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#d8c59d]">
                  {step.index}
                </span>
                <span className="text-right text-[8px] font-semibold uppercase tracking-[0.12em] text-white/[0.42]">
                  {step.meta}
                </span>
              </div>
              <h4 className="mt-5 text-xl font-medium tracking-[-0.025em] text-[#f7f4ec]">
                {step.title}
              </h4>
              <p className="mt-3 text-sm leading-6 text-white/[0.58]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Link
            href="/guides/dibrugarh-to-anini"
            className="group flex min-h-[12rem] flex-col justify-between rounded-[16px] bg-[#e5d7b6] p-6 text-[#10211a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] sm:p-8 lg:col-span-5"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#73543f]">
              The definitive road guide
            </p>
            <div className="mt-8 flex items-end justify-between gap-5">
              <div>
                <p className="font-serif text-3xl font-normal italic tracking-[-0.03em] sm:text-4xl">
                  The Way to Anini
                </p>
                <p className="mt-2 text-sm text-[#405148]">
                  Nine chapters · every major halt · road protocols
                </p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </Link>

          <ul className="grid grid-cols-2 gap-2.5 lg:col-span-7">
            {awfTravelTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-3.5 py-3.5 text-[11px] font-medium leading-5 text-white/[0.68] sm:gap-3 sm:px-4 sm:text-[13px]"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 flex-none text-[#d8c59d] sm:h-4 sm:w-4"
                />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
