import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { getRegions } from "@/server/atlas";
import type { Region } from "@/lib/supabase/types";

// The breadth of the atlas — the encyclopedic keywords the section is built to
// surface (new.md §14: "almost Wikipedia, but gorgeous").
const TOPICS = [
  "Villages",
  "Tribes",
  "Languages",
  "Food",
  "Festivals",
  "History",
  "Roads",
  "Wildlife",
  "Flora",
  "Monasteries",
  "Crafts",
  "Culture",
];

/**
 * Section 14 — The Atlas. The SEO powerhouse (new.md §14): a gorgeous index of
 * the Northeast — every region deep-linked to its real atlas page, over the
 * encyclopedic sweep of what the atlas documents.
 */
export async function Atlas() {
  let regions: Region[] = [];
  try {
    regions = await getRegions();
  } catch {
    regions = [];
  }

  return (
    <Section
      tone="forest"
      padded={false}
      id="atlas"
      aria-labelledby="atlas-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow tone="onDark" ornament className="text-pine-300">
            The Atlas
          </Eyebrow>
          <h2
            id="atlas-heading"
            className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl"
          >
            The Northeast, <span className="italic text-pine-300">documented.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-mist-200/75">
            Villages, tribes, languages, food, festivals, roads, wildlife, monasteries — a living
            encyclopedia of the region, growing every week.
          </p>
        </div>

        {/* regions — real, deep-linked */}
        {regions.length > 0 ? (
          <div className="mt-12">
            <p className="font-mono text-xs tracking-[0.2em] text-mist-300 uppercase">
              Explore by region
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {regions.map((region, i) => (
                <Reveal key={region.slug} delay={(i % 4) * 0.04} amount={0.2}>
                  <Link
                    href={`/${region.slug}` as Route}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors duration-200 outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-display text-lg font-medium text-mist-50">
                      {region.name}
                    </span>
                    <ArrowUpRight className="size-4 text-mist-300/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pine-300" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {/* topics — the encyclopedic sweep */}
        <div className="mt-10">
          <p className="font-mono text-xs tracking-[0.2em] text-mist-300 uppercase">
            In the Atlas
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {TOPICS.map((topic) => (
              <li key={topic}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-mist-200">
                  <span aria-hidden className="size-1.5 rounded-full bg-pine-300/70" />
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={"/explore" as Route}
          className="group mt-10 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-mist-100 uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open the full Atlas
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
