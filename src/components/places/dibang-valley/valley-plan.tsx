import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { valleyNextPlaces, valleySeasons } from "@/data/places/dibang-valley";
import { createTripPlanningURL } from "@/lib/whatsapp";

const SEASON_TONES: Record<string, string> = {
  best: "bg-[#274435]",
  good: "bg-[#5f7a4d]",
  caution: "bg-[#c1993f]",
  avoid: "bg-[#b06b52]",
};

export function ValleySeasons() {
  return (
    <section aria-labelledby="valley-seasons-title" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            The whole valley, month by month
          </p>
          <h2
            id="valley-seasons-title"
            className="text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            One calendar,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">two altitudes</span>
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[16px] border border-[#d5c9ae] bg-[#faf7f0] lg:mt-14">
          <ol className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12">
            {valleySeasons.map((season) => (
              <li
                key={season.month}
                className="flex min-h-[7.5rem] flex-col justify-between border-[#e2d9c3] p-3.5 odd:border-r sm:min-h-[9rem] sm:border-r"
              >
                <span className={`h-1.5 w-6 rounded-full ${SEASON_TONES[season.tone]}`} aria-hidden="true" />
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em]">{season.month}</p>
                  <p className="mt-1 text-[10.5px] font-medium leading-4 text-[#6c6552]">{season.label}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e2d9c3] px-4 py-3.5">
            {(
              [
                ["best", "Best window"],
                ["good", "Good"],
                ["caution", "Possible with care"],
                ["avoid", "Monsoon — avoid"],
              ] as const
            ).map(([tone, label]) => (
              <span key={tone} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a5344]">
                <span className={`h-2 w-2 rounded-full ${SEASON_TONES[tone]}`} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-[#5a5344]">
          The low valley and the high valley run on the same clock but different weather:
          when Mayodia is buried in snow, Dambuk is in harvest. We sequence every route
          so you get both at their best.
        </p>
      </div>
    </section>
  );
}

export function ValleyGo() {
  return (
    <>
      <section aria-labelledby="valley-go-title" className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              The whole region, one plan
            </p>
            <h2
              id="valley-go-title"
              className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
            >
              Do the valley{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">properly</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/[0.72]">
              Orchards to plateau, one permit, one driver who knows every kilometre.
              Tell us your dates and how wild you want to go — we&apos;ll build the route.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={createTripPlanningURL({ destination: "Dibang Valley region" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan a Dibang Valley trip on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#f2ead8] px-6 text-sm font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f]"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Plan on WhatsApp
              </a>
              <Link
                href="/places/anini"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/[0.38] px-6 text-sm font-medium text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f]"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                Start with Anini
              </Link>
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.4]">
              Replies within hours, not days
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="valley-next-title" className="border-t border-white/[0.08] bg-[#050d0f] py-20 text-white sm:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2
              id="valley-next-title"
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#f7f4ec]"
            >
              Go{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">deeper</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {valleyNextPlaces.map((place) => (
              <Link
                key={place.href}
                href={place.href}
                className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[16px] bg-[#0b1512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                    Next
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
        </div>
      </section>
    </>
  );
}
