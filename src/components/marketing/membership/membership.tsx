import Link from "next/link";
import type { Route } from "next";
import { Check, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const UNLOCKS = [
  "The hidden map & secret routes",
  "Offline maps and guides",
  "Mei, your travel companion",
  "Explorer Passport & memory books",
  "Exclusive local intel",
  "Priority support on the road",
];

/**
 * Section 16 — Membership. Elegant, not salesy (new.md §16). One tier — the
 * Explorer — with everything the premium layers unlock. Gold-accented to match
 * the Passport; honest framing (start free, upgrade when ready) with no
 * fabricated price.
 */
export function Membership() {
  return (
    <Section
      tone="forest"
      padded={false}
      id="membership"
      aria-labelledby="membership-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* copy */}
          <div>
            <Eyebrow tone="onDark" ornament className="text-marigold-300">
              Membership
            </Eyebrow>
            <h2
              id="membership-heading"
              className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl"
            >
              Become an <span className="italic text-marigold-300">Explorer.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-pretty text-mist-200/75">
              Explore the Northeast free for as long as you like. When you&apos;re ready to go
              deeper, the Explorer membership unlocks the layers the locals live by.
            </p>
            <Link
              href={"/explore" as Route}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-marigold-400/40 px-6 py-3 text-sm font-medium tracking-wide text-marigold-300 uppercase transition-colors duration-200 outline-none hover:bg-marigold-400/10 hover:text-marigold-200 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Become an Explorer
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-3 font-mono text-[11px] tracking-wider text-mist-300/70 uppercase">
              Start free · upgrade when you&apos;re ready
            </p>
          </div>

          {/* unlock card */}
          <Reveal amount={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-marigold-400/25 bg-charcoal-900 p-7 shadow-2xl sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full"
                style={{ background: "radial-gradient(closest-side, oklch(0.8 0.15 75 / 0.14), transparent)" }}
              />
              <p className="font-mono text-xs tracking-[0.2em] text-marigold-300 uppercase">
                The Explorer
              </p>
              <p className="mt-2 font-display text-2xl font-medium text-mist-50">
                Everything, unlocked.
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {UNLOCKS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-mist-100">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-marigold-400/15 text-marigold-300 [&_svg]:size-3.5">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
