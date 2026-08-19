import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { valleyNextPlaces } from "@/data/places/dibang-valley";
import { createTripPlanningURL } from "@/lib/whatsapp";

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
