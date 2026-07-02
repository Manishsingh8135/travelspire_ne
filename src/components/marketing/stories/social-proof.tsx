import Image from "next/image";
import { Quote } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

// Illustrative moments (new.md §15) — honest scenarios of what the platform makes
// possible, grounded in real NE photography. NOT fabricated reviews with fake
// names/faces/stars. Swap in real traveller stories as they land.
const FEATURED = {
  kicker: "On the road",
  place: "The road to Tawang",
  text: "A landslide shuts the way to Tawang. Instead of a dead end, you get a new route, a tea stop, and a story worth telling.",
  src: "/images/places/tawang/Tawang_2.JPG",
  alt: "Snow and prayer flags at Sela Pass on the road to Tawang, Arunachal Pradesh",
};

const MOMENTS = [
  {
    kicker: "The stay",
    place: "A homestay in Ziro",
    text: "You arrive a stranger in Ziro. You leave with a family, a recipe, and a standing invitation to come back.",
    src: "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    alt: "Bamboo homes among cosmos flowers and paddy fields in Ziro Valley, Arunachal Pradesh",
  },
  {
    kicker: "The first big trip",
    place: "Somewhere in Arunachal",
    text: "You'd never have attempted Arunachal alone. With the map, the permits and Mei in your pocket, you did — and you'd do it again.",
    src: "/images/places/dambuk/Dambuk_2.jpg",
    alt: "A motorcycle traveller at a riverside camp in Dambuk, Arunachal Pradesh",
  },
];

/**
 * Section 15 — Social Proof. Not five-star ratings — stories (new.md §15). A
 * featured cinematic moment plus two postcard scenarios, each grounded in real
 * photography. Honest illustrations of what the platform makes possible.
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
        <div className="max-w-2xl">
          <Eyebrow tone="muted" ornament>
            Stories
          </Eyebrow>
          <h2
            id="moments-heading"
            className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            Not reviews. <span className="italic text-secondary">Stories.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Not a wall of five-star ratings — the moments that actually matter. The kind of thing
            that happens when the Northeast finally has a guide.
          </p>
        </div>

        {/* featured cinematic moment */}
        <Reveal amount={0.2} className="mt-12">
          <figure className="relative flex min-h-[22rem] items-end overflow-hidden rounded-3xl ring-1 ring-black/5 sm:min-h-[26rem]">
            <Image
              src={FEATURED.src}
              alt={FEATURED.alt}
              fill
              sizes="(min-width: 1024px) 88rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/10"
            />
            <figcaption className="relative max-w-2xl p-7 sm:p-10">
              <Quote className="size-8 text-pine-300/70" aria-hidden />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-pretty text-mist-50 sm:text-3xl">
                {FEATURED.text}
              </blockquote>
              <div className="mt-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-mist-200/80 uppercase">
                <span className="text-pine-300">{FEATURED.kicker}</span>
                <span aria-hidden className="h-px w-6 bg-mist-200/30" />
                {FEATURED.place}
              </div>
            </figcaption>
          </figure>
        </Reveal>

        {/* supporting postcards */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.kicker} delay={i * 0.08} amount={0.2}>
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 640px) 44vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-6 sm:p-7">
                  <Quote className="size-6 text-secondary/40" aria-hidden />
                  <blockquote className="mt-3 font-display text-xl leading-snug text-pretty text-foreground/90">
                    {m.text}
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    <span className="text-secondary">{m.kicker}</span>
                    <span aria-hidden className="h-px w-6 bg-border" />
                    {m.place}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
