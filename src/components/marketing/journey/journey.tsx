import { Eyebrow } from "@/components/ui";
import { Section } from "@/components/marketing/section";
import { IMAGE_BLUR } from "@/lib/image-blur";
import { JourneyLoop, type LoopStage } from "./journey-loop";

/**
 * Section 7 — THE LOOP (rebuilt per 08-blueprint/14 §7 + the de-shadcn law).
 * Server shell: resolves the server-only blur placeholders and renders the
 * compact intro strip; the sticky scrollytelling stage is the client child.
 */

const STAGES: LoopStage[] = [
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

export function Journey() {
  const stages = STAGES.map((s) => ({ ...s, blur: IMAGE_BLUR[s.src] }));

  return (
    <Section tone="paper" padded={false} id="journey" aria-labelledby="journey-heading">
      {/* Intro strip — compact, content-dominant (title left · dek right). */}
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow tone="muted" ornament>
              The Journey
            </Eyebrow>
            <h2
              id="journey-heading"
              className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
            >
              Every great trip is <span className="italic text-secondary">a loop.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-pretty text-muted-foreground sm:text-lg lg:pb-2 lg:text-right">
            Five movements, one circle — and at the end, someone else&apos;s spark catches.
            <span className="mt-2 block font-mono text-[11px] tracking-[0.25em] uppercase">
              Scroll the route ↓
            </span>
          </p>
        </div>
      </div>

      <JourneyLoop stages={stages} />
    </Section>
  );
}
