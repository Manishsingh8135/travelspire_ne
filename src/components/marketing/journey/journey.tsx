import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { CompassRose } from "@/components/marketing/decor/compass-rose";
import { cn } from "@/lib/cn";

type Stage = {
  n: string;
  key: string;
  title: string;
  body: string;
  note: string;
  place: string;
  src: string;
  alt: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    key: "Dream",
    title: "It starts with a spark.",
    body: "A reel at midnight, a photo from a friend — and the Northeast lodges itself in your head and refuses to leave.",
    note: "Where every journey is born",
    place: "Dzükou Valley · Nagaland",
    src: "/images/places/hornbill/Dzoku_1.webp",
    alt: "Rare pink Dzükou lilies blooming across the emerald hills of Dzükou Valley, Nagaland",
  },
  {
    n: "02",
    key: "Plan",
    title: "Shape it into a plan.",
    body: "Routes, permits, stays, weather, timing — the chaos becomes a single clear line on the map, with Mei and the living map doing the heavy lifting.",
    note: "Chaos, made simple",
    place: "Dong · Arunachal Pradesh",
    src: "/images/places/dong-new/dong-new-portrait-2.jpg",
    alt: "A traveller looking out over green mountains from a tent at Dong, Arunachal Pradesh",
  },
  {
    n: "03",
    key: "Go",
    title: "Hit the road.",
    body: "Offline maps, live road alerts and local scouts keep you moving — through the passes, the fog and the places the highway forgot.",
    note: "Where it gets real",
    place: "Dambuk · Arunachal Pradesh",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside adventure camp in Dambuk, Arunachal Pradesh",
  },
  {
    n: "04",
    key: "Remember",
    title: "Keep the light.",
    body: "Every sunrise, every stranger-turned-friend, every wrong turn that became the best part — gathered into a memory book that's yours to keep.",
    note: "The trip, made permanent",
    place: "Dzükou Valley · Nagaland",
    src: "/images/places/hornbill/Dzoku_3.jpg",
    alt: "Golden sunrise over the rolling hills of Dzükou Valley with tents in the foreground, Nagaland",
  },
  {
    n: "05",
    key: "Share",
    title: "Pass the spark on.",
    body: "You post one photo. A friend in a distant city stops scrolling. And somewhere, quietly, the next journey begins.",
    note: "And the loop closes",
    place: "Hornbill Festival · Nagaland",
    src: "/images/places/hornbill/Hornbill_women.PNG",
    alt: "Naga women in traditional attire and beaded jewellery at the Hornbill Festival, Kohima, Nagaland",
  },
];

/**
 * Section 7 — The Entire Journey. The philosophy, told as a journey you scroll
 * (new.md §7): five full-photo story bands threaded on a field-journal spine,
 * with big chapter numbers, passport-stamp overlays, place captions and field
 * notes — closing on a loop finale. Dream → Plan → Go → Remember → Share → and
 * it begins again.
 */
export function Journey() {
  return (
    <Section
      tone="paper"
      padded={false}
      id="journey"
      aria-labelledby="journey-heading"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <div className="relative mx-auto max-w-2xl text-center">
          <CompassRose className="pointer-events-none absolute -top-6 right-2 hidden w-16 text-secondary/15 sm:block lg:-right-10 lg:w-20" />
          <Eyebrow tone="muted" ornament className="justify-center">
            The Journey
          </Eyebrow>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            Every great trip is <span className="italic text-secondary">a loop.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            It begins long before the road and echoes long after. Dream, plan, go, remember,
            share — and somewhere, someone else&apos;s spark catches. This is the circle Travelspire
            is built around.
          </p>
        </div>

        {/* the journey */}
        <div className="relative mt-16 sm:mt-24">
          {/* spine */}
          <div
            aria-hidden
            className="absolute top-2 bottom-24 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-border lg:block"
          />

          <div className="flex flex-col gap-16 sm:gap-24">
            {STAGES.map((stage, i) => {
              const photoRight = i % 2 === 1;
              return (
                <Reveal
                  key={stage.key}
                  amount={0.25}
                  className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-20"
                >
                  {/* spine node */}
                  <span className="absolute top-1/2 left-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background font-mono text-sm font-medium text-secondary ring-1 ring-border lg:flex">
                    {stage.n}
                  </span>

                  {/* photo */}
                  <div className={cn("relative", photoRight && "lg:order-2")}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                      <Image
                        src={stage.src}
                        alt={stage.alt}
                        fill
                        sizes="(min-width: 1024px) 44vw, 100vw"
                        loading={i < 2 ? undefined : "lazy"}
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/55 via-transparent to-charcoal-950/10"
                      />
                      <StampBadge
                        topText={stage.key}
                        bottomText="CHAPTER"
                        className="absolute top-4 right-4 size-16 text-mist-50/75"
                      />
                      <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-charcoal-950/55 px-3 py-1 font-mono text-[10px] tracking-wider text-mist-100 uppercase ring-1 ring-white/15 backdrop-blur-sm">
                        {stage.place}
                      </span>
                    </div>
                  </div>

                  {/* text */}
                  <div className={cn(photoRight && "lg:order-1")}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-5xl leading-none font-medium text-secondary/25 sm:text-6xl">
                        {stage.n}
                      </span>
                      <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                        {stage.key}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
                      {stage.body}
                    </p>
                    <p className="mt-5 flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] text-secondary uppercase">
                      <span aria-hidden className="h-px w-7 bg-secondary/50" />
                      {stage.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* loop finale */}
          <Reveal amount={0.4} className="relative mt-16 flex flex-col items-center text-center sm:mt-20">
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-secondary/10 text-secondary ring-1 ring-secondary/20">
              <RotateCcw className="size-6" />
            </span>
            <p className="mt-6 font-display text-2xl leading-tight font-medium text-balance sm:text-3xl">
              The journey never really ends.
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Dream · Plan · Go · Remember · Share
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
