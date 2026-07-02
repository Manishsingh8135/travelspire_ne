import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowUpRight,
  ArrowRight,
  Home,
  Users,
  Languages,
  UtensilsCrossed,
  PartyPopper,
  Scroll,
  Route as RouteIcon,
  Bird,
  Sprout,
  Landmark,
  Palette,
  Drama,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, StampBadge, StatBlock } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { getRegions } from "@/server/atlas";
import type { Region } from "@/lib/supabase/types";

// The eight states of the Northeast — a reference index. Descriptors are
// grounded facts, not evocation. Published states deep-link to their atlas page.
const STATES = [
  { name: "Arunachal Pradesh", blurb: "Monasteries, high passes and the last villages before the border." },
  { name: "Assam", blurb: "Tea gardens, the Brahmaputra and the gateway to the region." },
  { name: "Meghalaya", blurb: "Living-root bridges and the wettest hills on earth." },
  { name: "Nagaland", blurb: "Sixteen tribes, the Hornbill Festival and Dzükou's blooms." },
  { name: "Manipur", blurb: "Loktak's floating islands and the Manipuri classical arts." },
  { name: "Mizoram", blurb: "Blue hills, bamboo forests and the Chapchar Kut." },
  { name: "Tripura", blurb: "Palaces, temples and the Ujjayanta legacy." },
  { name: "Sikkim", blurb: "Kanchenjunga, gompas and high Himalayan trails." },
];

const TOPICS: { icon: LucideIcon; label: string; blurb: string }[] = [
  { icon: Home, label: "Villages", blurb: "Hamlets, homestays and the last settlements." },
  { icon: Users, label: "Tribes", blurb: "200+ communities and their living customs." },
  { icon: Languages, label: "Languages", blurb: "The most linguistically dense region in India." },
  { icon: UtensilsCrossed, label: "Food", blurb: "Smoked meats, fermented greens, rice beer." },
  { icon: PartyPopper, label: "Festivals", blurb: "Hornbill, Ziro, Chapchar Kut and more." },
  { icon: Scroll, label: "History", blurb: "Kingdoms, migrations and border stories." },
  { icon: RouteIcon, label: "Roads", blurb: "Passes, conditions and the great rides." },
  { icon: Bird, label: "Wildlife", blurb: "Hornbills, red pandas, one-horned rhinos." },
  { icon: Sprout, label: "Flora", blurb: "Orchids, rhododendrons and rare blooms." },
  { icon: Landmark, label: "Monasteries", blurb: "Gompas, stupas and Buddhist trails." },
  { icon: Palette, label: "Crafts", blurb: "Weaves, cane, bamboo and metalwork." },
  { icon: Drama, label: "Culture", blurb: "Music, dance and the way of life." },
];

/**
 * Section 14 — The Atlas. The SEO powerhouse (new.md §14): the Northeast as a
 * gorgeous living field guide. A featured region, honest by-the-numbers, a
 * reference index of all eight states (published ones deep-linked to real atlas
 * pages) and the encyclopedic topic taxonomy.
 */
export async function Atlas() {
  let regions: Region[] = [];
  try {
    regions = await getRegions();
  } catch {
    regions = [];
  }
  const slugByName = new Map(regions.map((r) => [r.name.toLowerCase(), r.slug]));
  const featuredSlug = slugByName.get("arunachal pradesh");

  return (
    <Section
      tone="forest"
      padded={false}
      id="atlas"
      aria-labelledby="atlas-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <div className="relative max-w-2xl">
          <StampBadge
            topText="THE ATLAS"
            bottomText="REAL NORTHEAST"
            className="pointer-events-none absolute -top-2 right-0 hidden size-20 text-pine-300/25 lg:block xl:-right-24"
          />
          <Eyebrow tone="onDark" ornament className="text-pine-300">
            The Atlas
          </Eyebrow>
          <h2
            id="atlas-heading"
            className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl lg:text-6xl"
          >
            The Northeast, <span className="italic text-pine-300">documented.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-mist-200/75">
            Villages, tribes, languages, food, festivals, roads, wildlife, monasteries — a living
            encyclopedia of the region, researched on the ground and growing every week.
          </p>
        </div>

        {/* featured region + by the numbers */}
        <Reveal amount={0.15} className="mt-12 grid gap-5 lg:grid-cols-3">
          <Link
            href={(featuredSlug ? `/${featuredSlug}` : "/explore") as Route}
            className="group relative min-h-[22rem] overflow-hidden rounded-3xl ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-ring lg:col-span-2 lg:min-h-[26rem]"
          >
            <Image
              src="/images/places/anini-new/anini-new-landscape-11.jpeg"
              alt="A river winding past a forested valley near Anini, Arunachal Pradesh"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-charcoal-950/10"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-pine-300 uppercase">
                Featured region
              </p>
              <h3 className="mt-2 font-display text-3xl leading-tight font-medium text-mist-50 sm:text-4xl">
                Arunachal Pradesh
              </h3>
              <p className="mt-2 max-w-md text-sm text-pretty text-mist-200/85 sm:text-base">
                Monasteries, high passes and the last villages before the border — the most
                deeply mapped corner of the atlas.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Monasteries", "Tribes", "Rides", "Festivals"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-charcoal-950/50 px-3 py-1 font-mono text-[10px] tracking-wider text-mist-100 uppercase ring-1 ring-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-mist-50 uppercase">
                Open the region
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* by the numbers */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-mist-300 uppercase">
                By the numbers
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
                <StatBlock value="8" label="States" valueClassName="text-mist-50 text-4xl" labelClassName="text-mist-300" />
                <StatBlock value="200+" label="Tribes" valueClassName="text-mist-50 text-4xl" labelClassName="text-mist-300" />
                <StatBlock value="200+" label="Languages" valueClassName="text-mist-50 text-4xl" labelClassName="text-mist-300" />
                <StatBlock value="1000s" label="Stories" valueClassName="text-mist-50 text-4xl" labelClassName="text-mist-300" />
              </div>
            </div>
            <p className="mt-8 border-t border-white/10 pt-5 font-mono text-[11px] tracking-wider text-pine-300 uppercase">
              Verified on the ground · updated weekly
            </p>
          </div>
        </Reveal>

        {/* the eight states — reference index */}
        <div className="mt-14">
          <p className="font-mono text-xs tracking-[0.2em] text-mist-300 uppercase">
            Explore by state
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STATES.map((state, i) => {
              const slug = slugByName.get(state.name.toLowerCase());
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg font-medium text-mist-50">{state.name}</span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-wider text-mist-400/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-pretty text-mist-200/65">{state.blurb}</p>
                  {slug ? (
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-pine-300 uppercase">
                      In the atlas
                      <ArrowUpRight className="size-3" />
                    </span>
                  ) : (
                    <span className="mt-3 inline-block font-mono text-[10px] tracking-wider text-mist-400/60 uppercase">
                      Mapping in progress
                    </span>
                  )}
                </>
              );
              const base =
                "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5";
              return slug ? (
                <Link
                  key={state.name}
                  href={`/${slug}` as Route}
                  className={`group ${base} transition-colors duration-200 outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ring`}
                >
                  {inner}
                </Link>
              ) : (
                <div key={state.name} className={base}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        {/* topic taxonomy */}
        <div className="mt-14">
          <p className="font-mono text-xs tracking-[0.2em] text-mist-300 uppercase">In the Atlas</p>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map(({ icon: Icon, label, blurb }) => (
              <div key={label} className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-pine-500/12 text-pine-300 ring-1 ring-pine-400/20 [&_svg]:size-4.5">
                  <Icon />
                </span>
                <span>
                  <span className="block font-medium text-mist-50">{label}</span>
                  <span className="mt-0.5 block text-sm text-mist-200/65">{blurb}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={"/explore" as Route}
          className="group mt-12 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-mist-100 uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open the full Atlas
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
