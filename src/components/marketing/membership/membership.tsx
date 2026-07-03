import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import type { Route } from "next";
import { Check, ArrowRight } from "lucide-react";
import { Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const LAYERS = [
  "The hidden map & secret routes",
  "Offline maps and guides",
  "Mei, your travel companion",
  "Explorer Passport & memory books",
  "Exclusive local intel",
  "Priority support on the road",
];

/**
 * Section 16 — Membership. Elegant, not salesy (new.md §16). One tier — the
 * Explorer — as a premium split feature: an aspirational golden-hour scene
 * beside the pitch and the layers Explorers get. Gold-accented to match the
 * Passport; honest "start free" framing, no fabricated price, gold outline CTA.
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
        <Reveal amount={0.15}>
          <div className="overflow-hidden rounded-3xl border border-marigold-400/25 bg-charcoal-900 shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* aspirational scene */}
              <div className="relative min-h-[16rem] lg:min-h-[34rem]">
                <Photo
                  src="/images/places/hornbill/Dzoku_3.jpg"
                  alt="Golden sunrise over the rolling hills of Dzükou Valley with tents in the foreground, Nagaland"
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-charcoal-950/20 lg:bg-gradient-to-r lg:from-charcoal-950/10 lg:to-charcoal-900/70"
                />
                <StampBadge
                  topText="THE EXPLORER"
                  bottomText="MEMBER"
                  className="absolute top-6 left-6 size-20 text-marigold-300/70"
                />
              </div>

              {/* pitch + layers */}
              <div className="relative p-8 sm:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, oklch(0.8 0.15 75 / 0.12), transparent)",
                  }}
                />
                <div className="relative">
                  <Eyebrow tone="onDark" ornament className="text-marigold-300">
                    Membership
                  </Eyebrow>
                  <h2
                    id="membership-heading"
                    className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance text-mist-50 sm:text-5xl"
                  >
                    Become an <span className="italic text-marigold-300">Explorer.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-base text-pretty text-mist-200/75">
                    Explore the Northeast free for as long as you like. When you&apos;re ready to go
                    deeper, the Explorer membership gives you the layers the locals live by.
                  </p>

                  <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                    {LAYERS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-mist-100">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-marigold-400/15 text-marigold-300 [&_svg]:size-3.5">
                          <Check />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={"/explore" as Route}
                    className="group mt-9 inline-flex items-center gap-2 rounded-full border border-marigold-400/40 px-6 py-3 text-sm font-medium tracking-wide text-marigold-300 uppercase transition-colors duration-200 outline-none hover:bg-marigold-400/10 hover:text-marigold-200 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Become an Explorer
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <p className="mt-3 font-mono text-[11px] tracking-wider text-mist-300/70 uppercase">
                    Start free · upgrade when you&apos;re ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
