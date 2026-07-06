import Link from "next/link";
import { BookMarked, Award, NotebookPen, MapPinned, ArrowRight, Leaf } from "lucide-react";
import { Eyebrow, StampBadge, StatBlock } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const PERKS = [
  { icon: BookMarked, label: "Explorer Passport", note: "Every trip stamped and kept." },
  { icon: Award, label: "Badges", note: "Earned for tribes, treks and festivals." },
  { icon: NotebookPen, label: "Memory Books", note: "Your journeys, written for keeps." },
  { icon: MapPinned, label: "Maps Completed", note: "Watch the Northeast fill in." },
];

// Illustrative sample passport — an example of what a journey becomes, not a
// live user's data (labelled "Sample passport" below).
const SAMPLE = [
  { value: "48", label: "Villages" },
  { value: "18", label: "Tribes" },
  { value: "12", label: "Festivals" },
  { value: "6", label: "States" },
];

/**
 * Section 12 — Community. The Explorer Passport turns every journey into
 * something you keep and show off — stamps, badges, memory books, a map slowly
 * filling in (new.md §12). The sample passport creates the "I want that" pull.
 */
export function Community() {
  return (
    <Section tone="forest" id="community" aria-labelledby="community-heading">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* copy + perks */}
          <div>
            <Eyebrow tone="pine" ornament>
              Community
            </Eyebrow>
            <h2
              id="community-heading"
              className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance sm:text-5xl lg:text-6xl"
            >
              Every journey earns its{" "}
              <span className="italic text-accent">stamps.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
              Your Explorer Passport keeps every trip — the villages, the tribes, the festivals —
              as badges, memory books and a map that slowly fills in. Travel that adds up to
              something.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {PERKS.map(({ icon: Icon, label, note }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-pine-500/15 text-secondary ring-1 ring-pine-400/20 [&_svg]:size-4.5">
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{note}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="#membership"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm font-medium tracking-wide text-accent uppercase transition-colors duration-200 outline-none hover:bg-accent/10 hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start your Passport
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* passport card */}
          <Reveal amount={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-card p-6 shadow-deep sm:p-8">
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-marigold-300 to-marigold-500 text-charcoal-950">
                    <Leaf className="size-4" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    Explorer Passport
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  Travelspire · NE
                </span>
              </div>

              {/* holder */}
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-pine-500/20 font-display text-lg font-medium text-pine-200 ring-1 ring-pine-400/25">
                  A
                </span>
                <div>
                  <p className="font-display text-lg font-medium">An Explorer</p>
                  <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    Member since 2024
                  </p>
                </div>
              </div>

              {/* stats */}
              <div className="mt-6 grid grid-cols-4 gap-3 border-y border-border-subtle py-5">
                {SAMPLE.map((s) => (
                  <StatBlock
                    key={s.label}
                    value={s.value}
                    label={s.label}
                    valueClassName="text-foreground text-2xl"
                    labelClassName="text-muted-foreground text-[10px]"
                  />
                ))}
              </div>

              {/* stamps */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <StampBadge
                    topText="TAWANG"
                    bottomText="EXPLORED"
                    className="size-16 text-accent/70"
                  />
                  <StampBadge
                    topText="HORNBILL"
                    bottomText="FESTIVAL"
                    className="size-16 text-secondary/70"
                  />
                  <StampBadge
                    topText="ZIRO"
                    bottomText="APATANI"
                    className="size-16 text-muted-foreground/60"
                  />
                </div>
                <span className="font-mono text-[10px] tracking-wider text-subtle-foreground uppercase">
                  Sample passport
                </span>
              </div>

              {/* map progress */}
              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  <span>Map of the Northeast</span>
                  <span className="text-secondary">62% complete</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-pine-400 to-marigold-300" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
