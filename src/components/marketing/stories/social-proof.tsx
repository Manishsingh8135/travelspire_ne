import { Quote } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

// Illustrative moments (new.md §15) — the kind of thing that happens when the
// Northeast has a guide. Written as honest scenarios, NOT fabricated reviews
// with fake names/faces/stars. Replace with real traveller stories as they land.
const MOMENTS = [
  {
    kicker: "On the road",
    text: "A landslide shuts the way to Tawang. Instead of a dead end, you get a new route, a tea stop, and a story worth telling.",
  },
  {
    kicker: "The homestay",
    text: "You arrive a stranger in Ziro. You leave with a family, a recipe, and a standing invitation to come back.",
  },
  {
    kicker: "The first big trip",
    text: "You'd never have attempted Arunachal alone. With the map, the permits and Mei in your pocket, you did — and you'd do it again.",
  },
];

/**
 * Section 15 — Social Proof. Not five-star ratings — stories (new.md §15). The
 * moments that actually matter, told as honest scenarios of what the platform
 * makes possible (no fabricated testimonials).
 */
export function SocialProof() {
  return (
    <Section
      tone="paper"
      padded={false}
      id="moments"
      aria-labelledby="moments-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="muted" ornament className="justify-center">
            Stories
          </Eyebrow>
          <h2
            id="moments-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl"
          >
            Not reviews. <span className="italic text-secondary">Stories.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Not a wall of five-star ratings — the moments that actually matter. This is the kind of
            thing that happens when the Northeast finally has a guide.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {MOMENTS.map((moment, i) => (
            <Reveal key={moment.kicker} delay={i * 0.08} amount={0.2}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <Quote className="size-7 text-secondary/40" aria-hidden />
                <blockquote className="mt-4 font-display text-xl leading-snug text-pretty text-foreground/90">
                  {moment.text}
                </blockquote>
                <figcaption className="mt-6 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  {moment.kicker}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
