"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const AwfRouteMapInner = dynamic(() => import("./awf-route-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[inherit] w-full items-center justify-center bg-[#0a120e]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ece4d0]/40">
        Unfolding the map…
      </p>
    </div>
  ),
});

export function AwfRouteMap() {
  return (
    <section
      aria-labelledby="awf-map-title"
      className="border-t border-[#e8dcc0]/[0.07] bg-[#0a120e] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              The real map
            </p>
            <h2
              id="awf-map-title"
              className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f3ecdc]"
            >
              See it against{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                the mountains
              </span>
            </h2>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-[#ece4d0]/60 sm:text-lg sm:leading-8">
              Every milestone from the ribbon, pinned on the terrain it crosses.
              Tap one for its kilometre and a Google Maps link.
            </p>
          </div>
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#ece4d0]/45">
            <MapPin aria-hidden="true" className="h-4 w-4 text-[#d8c59d]" />
            Dibrugarh → Anini · NH-313
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[20px] border border-[#e8dcc0]/[0.1] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(243,236,220,0.06)]">
          <div className="h-[26rem] sm:h-[30rem] lg:h-[34rem]">
            <AwfRouteMapInner />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8dcc0]/[0.08] bg-[#0b1512] px-5 py-3.5 sm:px-7">
            <p className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ece4d0]/55">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-[#d8c59d]" />
                Milestone
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-px w-6 bg-[#d8c59d]/80" />
                Indicative route
              </span>
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#ece4d0]/35">
              The road follows the valleys — straight lines are for maps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
