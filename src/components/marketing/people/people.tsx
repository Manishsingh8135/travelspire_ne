import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import type { Route } from "next";
import { Home, Compass, Binoculars, HeartHandshake, Palette, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";

const ROLES = [
  { icon: Home, label: "Hosts", note: "Homestays that treat you like family." },
  { icon: Compass, label: "Guides", note: "Locals who know every bend and story." },
  { icon: Binoculars, label: "Scouts", note: "The eyes on roads, weather and secret spots." },
  { icon: HeartHandshake, label: "Families", note: "Kitchens, courtyards and open doors." },
  { icon: Palette, label: "Artisans", note: "Weavers, carvers and keepers of craft." },
];

/**
 * Section 11 — The People. The soul of the platform (new.md §11): the hosts,
 * guides, scouts, families and artisans who make the Northeast unforgettable.
 * Portraits are real NE people, honestly captioned (currently Hornbill Festival
 * photography — swap in real host/guide/artisan portraits as the network grows).
 */
export function People() {
  return (
    <Section
      tone="paper"
      id="people"
      aria-labelledby="people-heading"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* portrait collage */}
          <Reveal amount={0.2} className="relative">
            <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl ring-1 ring-black/5">
              <Photo
                src="/images/places/hornbill/Hornbill_women.PNG"
                alt="Naga women in traditional attire and beaded jewellery at the Hornbill Festival, Kohima, Nagaland"
                fill
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-charcoal-950/55 px-3 py-1 font-mono text-[10px] tracking-wider text-mist-100 uppercase ring-1 ring-white/15 backdrop-blur-sm">
                Hornbill Festival · Nagaland
              </span>
            </div>
            {/* secondary portrait, overlapping */}
            <div className="absolute -right-2 -bottom-8 hidden aspect-square w-40 overflow-hidden rounded-2xl ring-4 ring-background sm:block lg:w-48">
              <Photo
                src="/images/places/hornbill/Hornbill_2.WEBP"
                alt="A Naga warrior in traditional dress and headgear at the Hornbill Festival, Nagaland"
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* copy + roles */}
          <div>
            <Eyebrow tone="muted" ornament>
              The People
            </Eyebrow>
            <h2
              id="people-heading"
              className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl"
            >
              Meet the people who make it{" "}
              <span className="italic text-secondary">unforgettable.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
              Behind every route and every stay are the hosts, guides, scouts, families and artisans
              of the Northeast — the real reason you&apos;ll want to come back.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {ROLES.map(({ icon: Icon, label, note }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/15 [&_svg]:size-4.5">
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
              href={"/explore" as Route}
              className="group mt-8 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-foreground uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Meet the community
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
