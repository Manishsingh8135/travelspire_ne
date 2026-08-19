import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BellRing, MessageCircle } from "lucide-react";
import { awfEdition, awfEvergreen, awfMeta } from "@/data/festivals/anini-winter-fest";
import { createTripPlanningURL } from "@/lib/whatsapp";

// Renders only after the festival wraps (awfEdition.status === "past").
// One-line flip in the data file pivots the page into 2027-holder mode.
export function AwfWrappedBanner() {
  if (awfEdition.status !== "past") return null;

  return (
    <section
      aria-label="Festival edition notice"
      className="border-b border-[#d8c59d]/20 bg-[#101a14] px-5 py-4 text-white sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/[0.85]">
          <span className="font-semibold text-[#e7d9b8]">
            {awfMeta.name} {awfMeta.year} has wrapped.
          </span>{" "}
          The {awfEdition.nextYear} edition will be announced on the festival&apos;s
          official channels — and Anini is extraordinary every other day of the year.
        </p>
        <a
          href={createTripPlanningURL({ destination: "Anini, Dibang Valley" })}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask about the next Anini Winter Fest on WhatsApp (opens in a new tab)"
          className="inline-flex min-h-10 flex-none items-center gap-2 rounded-[9px] border border-[#d8c59d]/40 px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#e7d9b8] transition-colors duration-200 hover:bg-[#d8c59d]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
        >
          <BellRing aria-hidden="true" className="h-3.5 w-3.5" />
          Notify me for {awfEdition.nextYear}
        </a>
      </div>
    </section>
  );
}

// Always visible — festival traffic starts feeding the evergreen cluster today.
export function AwfEvergreen() {
  return (
    <section aria-labelledby="awf-evergreen-title" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            After the last encore
          </p>
          <h2
            id="awf-evergreen-title"
            className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            The festival ends.{" "}
            <span className="font-serif font-normal italic text-[#76533e]">Anini doesn&apos;t.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5a5344]">
            Two days of music are the excuse; the valley is the reason. These three
            guides carry everything this page started — the destination, the road,
            and the whole region beyond.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14">
          {awfEvergreen.map((place) => (
            <Link
              key={place.href}
              href={place.href}
              className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[16px] bg-[#0b1512] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17221b]"
            >
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="(min-width: 768px) 31vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_35%,rgba(5,13,15,0.9)_100%)] transition-opacity duration-300 group-hover:opacity-90" />
              <div className="relative p-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8c59d]">
                  Keep exploring
                  <ArrowUpRight aria-hidden="true" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <h3 className="mt-2 font-serif text-[1.8rem] font-normal italic leading-none tracking-[-0.02em] text-[#f7f4ec]">
                  {place.name}
                </h3>
                <p className="mt-2.5 max-w-[30ch] text-sm leading-6 text-white/[0.72]">{place.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center">
          <a
            href={createTripPlanningURL({ destination: "Anini, Dibang Valley" })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Plan an Anini trip any time of year on WhatsApp (opens in a new tab)"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#76533e] underline-offset-4 transition-colors hover:text-[#17221b] hover:underline"
          >
            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
            Or skip the festival entirely — we run Anini all season
          </a>
        </p>
      </div>
    </section>
  );
}
