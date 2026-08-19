import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { roingFrames, roingNextPlaces, roingSeasons } from "@/data/places/roing";
import { createTripPlanningURL } from "@/lib/whatsapp";

const SEASON_TONES: Record<string, string> = {
  best: "bg-[#274435]",
  good: "bg-[#5f7a4d]",
  caution: "bg-[#c1993f]",
  avoid: "bg-[#b06b52]",
};

export function RoingFrames() {
  return (
    <section aria-labelledby="roing-frames-title" className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            Field frames
          </p>
          <h2
            id="roing-frames-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            The gateway{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">in six frames</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {roingFrames.map((frame) => (
            <figure
              key={frame.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#0b1512]"
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0)_55%,rgba(5,13,15,0.85)_100%)]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e7d9b8]">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RoingSeasons() {
  return (
    <section aria-labelledby="roing-seasons-title" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            Month by month
          </p>
          <h2
            id="roing-seasons-title"
            className="text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            When the gateway{" "}
            <span className="font-serif font-normal italic text-[#76533e]">opens best</span>
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[16px] border border-[#d5c9ae] bg-[#faf7f0] lg:mt-14">
          <ol className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12">
            {roingSeasons.map((season) => (
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
          Roing follows the low-valley clock: fine most of the year, but in monsoon the
          rivers rise and the onward climb becomes a gamble. October to April is when the
          gateway and the road above it are both at their best.
        </p>
      </div>
    </section>
  );
}

export function RoingGo() {
  return (
    <>
      <section aria-labelledby="roing-go-title" className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              Mile zero, sorted
            </p>
            <h2
              id="roing-go-title"
              className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
            >
              Start in{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">Roing</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/[0.72]">
              We stage every Dibang journey here — permits, fuel, supplies, sleep. Tell us
              your dates and we&apos;ll build the route from this very town, up over the
              pass and into the high valley.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={createTripPlanningURL({ destination: "Roing, Lower Dibang Valley" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Plan a Roing trip on WhatsApp (opens in a new tab)"
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
                The Anini Guide
              </Link>
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.4]">
              Replies within hours, not days
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="roing-next-title" className="border-t border-white/[0.08] bg-[#050d0f] py-20 text-white sm:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2
              id="roing-next-title"
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#f7f4ec]"
            >
              Keep{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">going</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roingNextPlaces.map((place) => (
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
