"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Sparkles } from "lucide-react";
import { awfArtists, awfGenres, awfMeta } from "@/data/festivals/anini-winter-fest";
import { cn } from "@/lib/utils";

type DayFilter = "all" | 1 | 2;

const dayTabs: { value: DayFilter; label: string }[] = [
  { value: "all", label: "All artists" },
  { value: 1, label: "Day 1 · Sat 19" },
  { value: 2, label: "Day 2 · Sun 20" },
];

export function AwfLineup() {
  const [day, setDay] = useState<DayFilter>("all");

  const artists =
    day === "all" ? awfArtists : awfArtists.filter((artist) => artist.day === day);

  return (
    <section
      id="lineup"
      aria-labelledby="awf-lineup-title"
      className="relative overflow-hidden bg-[#050d0f] py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        {/* Section header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              Artists · 2026
            </p>
            <h2
              id="awf-lineup-title"
              className="max-w-[14ch] text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
            >
              Two stages.{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                Zero barriers.
              </span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter artists by day"
            className="flex flex-wrap gap-2"
          >
            {dayTabs.map((tab) => (
              <button
                key={String(tab.value)}
                role="tab"
                aria-selected={day === tab.value}
                onClick={() => setDay(tab.value)}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]",
                  day === tab.value
                    ? "border-[#eadfc8] bg-[#eadfc8] text-[#07100d]"
                    : "border-white/[0.22] text-white/[0.72] hover:border-white/50 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Artist grid */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {artists.map((artist) => (
            <article
              key={`${artist.name}-${artist.day}`}
              className={cn(
                "group relative flex min-h-[13rem] flex-col justify-between overflow-hidden rounded-[16px] border p-6 transition-colors duration-300 sm:p-7",
                artist.headliner
                  ? "border-[#d8c59d]/45 bg-[#141d16] sm:col-span-2 lg:col-span-1"
                  : artist.tba
                    ? "border-dashed border-white/[0.22] bg-white/[0.02]"
                    : "border-white/[0.1] bg-[#0b1512] hover:border-white/[0.24]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                    artist.headliner ? "text-[#d8c59d]" : "text-white/[0.45]",
                  )}
                >
                  {artist.headliner ? "Headliner" : artist.genre}
                </p>
                <span className="rounded-full border border-white/[0.14] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.6]">
                  Day {artist.day}
                </span>
              </div>

              <div className="mt-8">
                <h3
                  className={cn(
                    "text-[1.9rem] font-medium leading-[1.02] tracking-[-0.035em] text-[#f7f4ec] sm:text-[2.1rem]",
                    artist.tba && "font-serif italic text-white/[0.55]",
                  )}
                >
                  {artist.name}
                </h3>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/[0.5]">
                  {artist.headliner ? `${artist.genre} · ` : ""}
                  {artist.origin}
                </p>
              </div>

              {artist.headliner && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#d8c59d]/[0.08] blur-2xl"
                />
              )}
            </article>
          ))}

          {/* Lineup growing card */}
          <a
            href={awfMeta.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[13rem] flex-col justify-between rounded-[16px] border border-[#d8c59d]/25 bg-[#101a14] p-6 transition-colors duration-300 hover:border-[#d8c59d]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8] sm:p-7"
          >
            <p className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Lineup growing
            </p>
            <div className="mt-8">
              <p className="max-w-[24ch] text-[1.25rem] font-medium leading-6 tracking-[-0.02em] text-[#f7f4ec]">
                More artists announced soon — follow{" "}
                <span className="font-serif italic text-[#dfcfab]">@anini_winter_fest</span>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/[0.55] transition-colors group-hover:text-white">
                <Instagram aria-hidden="true" className="h-3.5 w-3.5" />
                Follow the festival
              </p>
            </div>
          </a>
        </div>

        {/* Verification stamp — festival-owned facts, linked not mirrored */}
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.4]">
          <span>
            As announced by the festival · last verified {awfMeta.lineupVerified}
          </span>
          <a
            href={awfMeta.officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#d8c59d] underline-offset-4 transition-colors hover:text-[#eadfc8] hover:underline"
          >
            Official lineup
            <span aria-hidden="true">↗</span>
          </a>
        </p>

        {/* Genre strip */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.4]">
            Sounds of the valley
          </span>
          {awfGenres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-white/[0.14] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/[0.66]"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Atmosphere band */}
        <div className="relative mt-12 h-[16rem] overflow-hidden rounded-[18px] sm:h-[20rem] lg:mt-14">
          <Image
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2000&q=70"
            alt="Stage lights over a festival crowd at dusk"
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,15,0.75)_0%,transparent_45%,rgba(5,13,15,0.35)_100%)]" />
          <p className="absolute bottom-6 left-6 max-w-[26ch] font-serif text-2xl font-normal italic leading-snug text-[#f2ead8] sm:bottom-8 sm:left-8 sm:text-3xl">
            “Come for the festival. Stay for the valley.”
          </p>
        </div>
      </div>
    </section>
  );
}
