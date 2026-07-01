import { Sparkles, Map, Compass, BookOpen, Share2, RotateCcw } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const STAGES = [
  {
    n: "01",
    key: "Dream",
    icon: Sparkles,
    body: "A reel, a photo, a story — and the Northeast lodges itself in your head.",
  },
  {
    n: "02",
    key: "Plan",
    icon: Map,
    body: "Routes, permits, stays and timing — shaped with Mei and the living map.",
  },
  {
    n: "03",
    key: "Go",
    icon: Compass,
    body: "Offline maps, road alerts and local scouts keep you moving out there.",
  },
  {
    n: "04",
    key: "Remember",
    icon: BookOpen,
    body: "Your trip becomes a memory book — of places, people and moments.",
  },
  {
    n: "05",
    key: "Share",
    icon: Share2,
    body: "Friends catch the spark from your journey — and their own begins.",
  },
];

/**
 * Section 7 — The Entire Journey. The philosophy in one image: Dream → Plan →
 * Go → Remember → Share, a loop that feeds the next traveller's spark (new.md
 * §7). A paper "chapter" (rhythm break after two dark sections): five stages
 * threaded on a field-journal trail that circles back to the start.
 */
export function Journey() {
  return (
    <Section
      tone="paper"
      padded={false}
      id="journey"
      aria-labelledby="journey-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="muted" ornament className="justify-center">
            The Journey
          </Eyebrow>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl"
          >
            Every journey is <span className="italic text-secondary">a loop.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Dream it, plan it, go, remember, share — and somewhere, someone else&apos;s spark
            catches. Travelspire is built around the whole circle, not just the booking.
          </p>
        </div>

        {/* the loop */}
        <div className="relative mt-14 sm:mt-16">
          {/* desktop trail line threading the nodes */}
          <div
            aria-hidden
            className="absolute top-7 right-[10%] left-[10%] hidden border-t border-dashed border-border lg:block"
          />

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.key}
                  delay={i * 0.08}
                  amount={0.4}
                  className="relative flex flex-col items-center text-center"
                >
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-card text-secondary ring-1 ring-border [&_svg]:size-6">
                    <Icon />
                  </span>
                  <span className="mt-4 font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {s.n}
                  </span>
                  <span className="mt-1 font-display text-2xl font-medium">{s.key}</span>
                  <span className="mt-2 max-w-[15rem] text-sm text-pretty text-muted-foreground">
                    {s.body}
                  </span>
                </Reveal>
              );
            })}
          </div>

          {/* loop-back note */}
          <Reveal
            delay={0.1}
            className="mt-12 flex items-center justify-center gap-2.5 text-secondary"
          >
            <RotateCcw className="size-4" />
            <span className="font-mono text-xs tracking-[0.18em] uppercase">
              …and the journey begins again
            </span>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
