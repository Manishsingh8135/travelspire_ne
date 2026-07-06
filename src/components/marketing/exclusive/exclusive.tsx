import Link from "next/link";
import type { Route } from "next";
import {
  Lock,
  UtensilsCrossed,
  Sunrise,
  Users,
  Home,
  Route as RouteIcon,
  Landmark,
  Banknote,
  Tent,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/cn";

type Secret = { cat: string; icon: LucideIcon; text: string; locked: boolean };

// Show enough, not everything (new.md §8). A few teasers in the clear; the rest
// blurred behind the Explorer Pass — the blur is the hook. Evocative examples of
// the insider layer, in the spirit of the vision's own list.
const SECRETS: Secret[] = [
  {
    cat: "Food",
    icon: UtensilsCrossed,
    text: "The third house past the church serves the best smoked pork in the valley.",
    locked: false,
  },
  {
    cat: "First Light",
    icon: Sunrise,
    text: "A sunrise ridge ten minutes from town the guidebooks never mention.",
    locked: false,
  },
  {
    cat: "Etiquette",
    icon: Users,
    text: "What to carry — and what to never bring — when a family hosts you.",
    locked: false,
  },
  {
    cat: "Stay",
    icon: Home,
    text: "A two-room homestay that only takes guests by word of mouth.",
    locked: true,
  },
  {
    cat: "Shortcut",
    icon: RouteIcon,
    text: "The back road that skips three hours of highway on the way to Tawang.",
    locked: true,
  },
  {
    cat: "Monastery",
    icon: Landmark,
    text: "A hillside monastery with no signboard, no crowds and no entry gate.",
    locked: true,
  },
  {
    cat: "Cash Only",
    icon: Banknote,
    text: "The village where the ATM is a myth — and exactly how much to carry in.",
    locked: true,
  },
  {
    cat: "Campsite",
    icon: Tent,
    text: "A riverbank camp the locals guard like a family secret.",
    locked: true,
  },
];

function SecretCard({ secret }: { secret: Secret }) {
  const Icon = secret.icon;
  return (
    <div
      className={cn(
        "relative flex min-h-[10.5rem] flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 shadow-panel",
        secret.locked ? "border-accent/25" : "border-border-subtle",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", secret.locked ? "text-accent" : "text-secondary")} />
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          {secret.cat}
        </span>
      </div>

      <p
        className={cn(
          "mt-4 text-[15px] leading-snug text-balance",
          secret.locked && "pointer-events-none blur-[6px] select-none",
        )}
        aria-hidden={secret.locked || undefined}
      >
        {secret.text}
      </p>

      {secret.locked ? (
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent uppercase">
          <Lock className="size-3" />
          Explorer Pass
        </span>
      ) : (
        <span className="mt-4 font-mono text-[10px] tracking-wider text-secondary/80 uppercase">
          Open intel
        </span>
      )}
    </div>
  );
}

/**
 * Section 8 — The Exclusive Layer. The moat: the insider knowledge locals share
 * only with their own — smoked-pork houses, unphotographed sunrises, cash-only
 * villages, shortcuts that save hours. Show enough to create desire, blur the
 * rest behind the Explorer Pass (new.md §8). This is the one sanctioned gold
 * moment: Marigold marks the locks + membership, tying to the Passport.
 */
export function Exclusive() {
  return (
    <Section tone="forest" id="exclusive" aria-labelledby="exclusive-heading">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header — title left, membership CTA right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <Eyebrow tone="pine" ornament>
              The Exclusive Layer
            </Eyebrow>
            <h2
              id="exclusive-heading"
              className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance sm:text-5xl lg:text-6xl"
            >
              The map has a <span className="italic text-accent">hidden layer.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
              The intel locals share only with their own — the shortcuts, the sunrises, the houses
              that never make a listing. Explorers get the key.
            </p>
          </div>
          <Link
            href={"/explore" as Route}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm font-medium tracking-wide text-accent uppercase transition-colors duration-200 outline-none hover:bg-accent/10 hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-ring"
          >
            Become an Explorer
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* the secrets */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECRETS.map((secret, i) => (
            <Reveal key={secret.text} delay={(i % 4) * 0.05} amount={0.2}>
              <SecretCard secret={secret} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
