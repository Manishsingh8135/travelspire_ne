import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { aniniNextPlaces, aniniSeasons, aniniStays } from "@/data/places/anini";
import { createTripPlanningURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const seasonTones: Record<string, { bar: string; text: string; label: string }> = {
  best: { bar: "bg-[#d8c59d]", text: "text-[#dfcfab]", label: "Best window" },
  good: { bar: "bg-[#a9b39a]", text: "text-[#c3cdb5]", label: "Good, cold" },
  caution: { bar: "bg-[#b87e5a]", text: "text-[#d3a280]", label: "Travel with care" },
  avoid: { bar: "bg-white/[0.12]", text: "text-white/[0.35]", label: "Monsoon — avoid" },
};

export function AniniSeasons() {
  return (
    <section
      aria-labelledby="anini-seasons-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Season strip */}
          <div className="lg:col-span-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
              When to go
            </p>
            <h2
              id="anini-seasons-title"
              className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.96] tracking-[-0.05em]"
            >
              Twelve months,{" "}
              <span className="font-serif font-normal italic text-[#76533e]">
                honestly graded
              </span>
            </h2>

            <div className="mt-10">
              <div className="grid grid-cols-12 gap-1" role="list" aria-label="Month by month travel grading">
                {aniniSeasons.map((season) => (
                  <div key={season.month} role="listitem" className="group">
                    <div
                      className={cn(
                        "h-16 rounded-[4px] transition-transform duration-200 group-hover:-translate-y-1 sm:h-20",
                        seasonTones[season.tone].bar,
                      )}
                    />
                    <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.1em] text-[#5a655e]">
                      {season.month}
                    </p>
                    <p className="mt-1 hidden text-center text-[10px] leading-3.5 text-[#7a7263] opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
                      {season.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {(["best", "good", "caution", "avoid"] as const).map((tone) => (
                  <p key={tone} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a655e]">
                    <span className={cn("h-2.5 w-2.5 rounded-[3px]", seasonTones[tone].bar)} />
                    {seasonTones[tone].label}
                  </p>
                ))}
              </div>
              <p className="mt-6 max-w-[46rem] text-sm leading-6 text-[#526057]">
                Our pick: <strong className="font-semibold text-[#17221b]">late October to November</strong> —
                post-monsoon clarity, golden grasslands, kiwi harvest. September is
                festival month: beautiful, wet, and absolutely worth it with the right
                driver. June to August, we simply don&apos;t run leisure trips.
              </p>
            </div>
          </div>

          {/* Stays */}
          <div className="lg:col-span-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
              Where you&apos;ll sleep
            </p>
            <h3 className="font-serif text-3xl font-normal italic tracking-[-0.02em] sm:text-4xl">
              Few beds, good ones
            </h3>
            <div className="mt-7 grid gap-3">
              {aniniStays.map((stay, index) => (
                <article
                  key={stay.type}
                  className="rounded-[14px] bg-[#e7dece] p-6 shadow-[6px_12px_26px_-24px_rgba(37,46,39,0.5)]"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#8b5a40]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[16px] font-semibold tracking-[-0.015em]">{stay.type}</h4>
                  </div>
                  <p className="mt-2.5 text-sm leading-6 text-[#526057]">{stay.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[#7a7263]">
              Festival weekend and peak October sell everything out weeks ahead — lock
              stays the moment your dates are fixed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AniniGo() {
  return (
    <section
      aria-labelledby="anini-go-title"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="rounded-[18px] bg-[#101a14] p-7 sm:p-10 lg:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              Go with us
            </p>
            <h2
              id="anini-go-title"
              className="mt-4 font-serif text-[2.2rem] font-normal italic leading-[1.05] tracking-[-0.02em] text-[#f7f4ec] sm:text-[2.8rem]"
            >
              We drive this road every week. Ride with the people who know it.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-6 text-white/[0.62] sm:text-base sm:leading-7">
              Signature Anini Dibang Valley expedition — 3 days, 2 nights, from
              ₹12,499 per person. Transport, stays, permits and a guide who grew up
              on this road. Festival transfers and private fleet also run all season.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tours/anini-expedition"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#f2ead8] px-6 text-[11px] font-bold uppercase tracking-[0.13em] text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101a14]"
              >
                See the Anini expedition
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href={createTripPlanningURL({ destination: "Anini, Dibang Valley" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/[0.28] px-6 text-[11px] font-bold uppercase tracking-[0.13em] text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.4]">
              Coming for the festival?{" "}
              <Link href="/anini-winter-fest-2026" className="text-[#d8c59d] underline-offset-4 hover:underline">
                Anini Winter Fest 2026 →
              </Link>
            </p>
          </div>

          {/* Next places rail */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.4]">
              Keep going east
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {aniniNextPlaces.map((place) => (
                <Link
                  key={place.name}
                  href={place.href}
                  className="group relative flex min-h-[7.5rem] items-end overflow-hidden rounded-[14px] border border-white/[0.09] bg-[#0b1512] p-5 transition-colors duration-200 hover:border-white/[0.24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
                >
                  <Image
                    src={place.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover opacity-55 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-70 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,15,0.75)_0%,rgba(5,13,15,0.15)_100%)]" />
                  <div className="relative">
                    <p className="flex items-center gap-2 text-lg font-semibold tracking-[-0.02em] text-[#f7f4ec]">
                      {place.name}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-[#d8c59d] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </p>
                    <p className="mt-1 max-w-[34ch] text-xs leading-5 text-white/[0.6]">
                      {place.blurb}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
