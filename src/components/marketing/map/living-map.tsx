import Link from "next/link";
import type { Route } from "next";
import { Route as RouteIcon, Gem, Home, ShieldCheck, ChevronRight } from "lucide-react";
import { Eyebrow, StatBlock } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { getMappablePlaces, type MapPlace } from "@/server/atlas";
import { env } from "@/lib/env";
import { MapFrame } from "./map-frame";
import { PlaceRail } from "./place-rail";

// What the living map knows — honest product promises (not fake data).
const LAYER_CARDS = [
  {
    icon: RouteIcon,
    title: "Real-time Road Conditions",
    body: "Live updates on road status, landslides and weather.",
  },
  {
    icon: Gem,
    title: "Hidden Places",
    body: "Curated by locals, for explorers who seek more.",
  },
  {
    icon: Home,
    title: "Stays & Experiences",
    body: "Handpicked homestays, guides and authentic experiences.",
  },
  {
    icon: ShieldCheck,
    title: "Permit Zones",
    body: "Know exactly where ILP / PAP is required.",
  },
];

/**
 * Section 5 — The Living Map. Faithful to the inspiration: a slim left column
 * (opener + the intelligence layers + honest stats) beside a dominant map, with
 * a filterable place rail below. The map renders live (Mapbox) wherever a token
 * is set and falls back to a stylised field-journal backdrop otherwise. A
 * content-forward "chapter" that shows the platform's map intelligence and sends
 * motivated explorers into the real map at /explore (new.md §5).
 */
export async function LivingMap() {
  let places: MapPlace[] = [];
  try {
    places = await getMappablePlaces();
  } catch {
    places = [];
  }

  const stats: { value: string; label: string }[] = [
    { value: "8", label: "States" },
    { value: "200+", label: "Tribes" },
    { value: "200+", label: "Languages" },
  ];
  if (places.length > 0) stats.push({ value: String(places.length), label: "Places" });

  return (
    <Section
      tone="forest"
      padded={false}
      id="map"
      aria-labelledby="map-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-10 xl:grid-cols-[24rem_1fr] xl:gap-12">
          {/* left column — opener, layers, stats */}
          <div>
            <Eyebrow tone="onDark" ornament className="text-pine-300">
              The Living Map
            </Eyebrow>
            <h2
              id="map-heading"
              className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl"
            >
              Northeast India,{" "}
              <span className="italic text-pine-300">alive and in your hands.</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-pretty text-mist-200/75">
              More than directions — a living, breathing guide to every road, river, village and
              story. Real-time updates. Local insight. Places only locals know.
            </p>

            {/* layer cards */}
            <div className="mt-8 flex flex-col gap-3">
              {LAYER_CARDS.map(({ icon: Icon, title, body }) => (
                <Link
                  key={title}
                  href={"/explore" as Route}
                  className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-pine-500/15 text-pine-300 ring-1 ring-pine-400/20 [&_svg]:size-4.5">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-mist-50">{title}</span>
                    <span className="mt-0.5 block text-sm text-mist-200/70">{body}</span>
                  </span>
                  <ChevronRight className="mt-1 size-4 shrink-0 text-mist-300/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-mist-100" />
                </Link>
              ))}
            </div>

            {/* stats */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((s) => (
                <StatBlock
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  valueClassName="text-mist-50"
                  labelClassName="text-mist-300"
                />
              ))}
            </div>
          </div>

          {/* the map dominates */}
          <Reveal amount={0.1}>
            <MapFrame places={places} token={env.NEXT_PUBLIC_MAPBOX_TOKEN} />
          </Reveal>
        </div>

        {/* explore-what's-around-you rail */}
        <Reveal className="mt-12 sm:mt-16" amount={0.15}>
          <PlaceRail />
        </Reveal>
      </div>
    </Section>
  );
}
