import {
  Sparkles,
  Radio,
  ShieldCheck,
  Heart,
  Leaf,
  CalendarCheck,
  Home,
  HeartHandshake,
  Headphones,
} from "lucide-react";
import { Eyebrow, StampBadge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { MeiPhone } from "./mei-phone";
import { MeiItinerary } from "./mei-itinerary";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Hyperlocal Intelligence",
    body: "Trained on real local knowledge, not just the internet.",
  },
  {
    icon: Radio,
    title: "Real-time Updates",
    body: "Roads, weather, landslides and festivals.",
  },
  {
    icon: ShieldCheck,
    title: "Permit & Safety Support",
    body: "ILP / PAP guidance and travel safety, simplified.",
  },
  {
    icon: Heart,
    title: "Curated for You",
    body: "Trips designed around your pace, taste and interests.",
  },
];

// Honest promises, not fabricated adoption numbers (dropped the mockup's
// 50K+ / 98% / 4.9★). These are commitments the product can stand behind.
const TRUST = [
  { icon: HeartHandshake, label: "Backed by locals" },
  { icon: Radio, label: "Real-time intel" },
  { icon: ShieldCheck, label: "Permits handled" },
  { icon: Headphones, label: "24/7 on the road" },
];

/** Small floating "Mei is checking…" context card that overlaps the phone. */
function ContextCard({
  icon: Icon,
  label,
  value,
  note,
  className,
}: {
  icon: typeof Leaf;
  label: string;
  value: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={`w-44 rounded-2xl border border-border-subtle bg-card p-3.5 shadow-lift ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-secondary" />
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

/**
 * Section 6 — Meet Mei. Introduce a companion, not "an AI" (new.md §6): a warm
 * opener + capability list beside a scripted chat that builds a real 7-day
 * Guwahati→Tawang plan, with floating "live intel" cards and the itinerary it
 * produces. An honest preview of a planned feature — no fabricated adoption
 * stats, no fake human identity for Mei.
 */
export function Mei() {
  return (
    <Section tone="forest" id="mei" aria-labelledby="mei-heading">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <div className="max-w-2xl">
          <Eyebrow tone="pine" ornament>
            Meet Mei · Travel Companion
          </Eyebrow>
          <h2
            id="mei-heading"
            className="mt-4 font-display text-4xl leading-[1.03] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            <span className="block">Plan smarter. Travel deeper.</span>
            <span className="italic text-secondary">With Mei, who knows Northeast like a local.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
            From permits to the best sunrise spots, hidden stays to real road conditions — Mei
            crafts journeys that are personal, practical and unforgettable.
          </p>
        </div>

        {/* demo */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-6">
          {/* capabilities + quote */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <ul className="flex flex-col gap-5">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-pine-500/15 text-secondary ring-1 ring-pine-400/20 [&_svg]:size-4.5">
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-medium">{title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-border-subtle bg-card p-4 shadow-panel">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-pine-400 to-pine-600 text-charcoal-950">
                  <Leaf className="size-4" />
                </span>
                <span className="font-mono text-[11px] tracking-wider text-secondary uppercase">
                  Mei
                </span>
              </div>
              <p className="mt-2.5 text-sm text-pretty italic">
                {"“Hi, I'm Mei. Think of me as your friend from the Northeast — I'll help you plan, guide and support you, every step of the way.”"}
              </p>
            </div>
          </div>

          {/* the chat — the star */}
          <div className="relative lg:col-span-5">
            <Reveal amount={0.15}>
              <MeiPhone />
            </Reveal>
            <ContextCard
              icon={CalendarCheck}
              label="Best Time"
              value="Oct – Mar"
              note="Clear views & pleasant weather"
              className="absolute top-24 left-0 hidden lg:block"
            />
            <ContextCard
              icon={Home}
              label="Stay"
              value="Zemithang Homestay"
              note="Cozy · great host family"
              className="absolute right-0 bottom-28 hidden lg:block"
            />
          </div>

          {/* the plan */}
          <div className="lg:col-span-4">
            <Reveal amount={0.1} delay={0.05}>
              <MeiItinerary />
            </Reveal>
          </div>
        </div>

        {/* trust band */}
        <Reveal className="mt-14 sm:mt-16" amount={0.2}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pine-900 to-pine-950 px-6 py-8 text-mist-50 sm:px-10">
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-center gap-5">
                <StampBadge
                  topText="BACKED BY LOCALS"
                  bottomText="DRIVEN BY TRUST"
                  className="hidden size-20 shrink-0 text-pine-300/70 sm:block"
                />
                <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
                  {TRUST.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm text-mist-100">
                      <span
                        aria-hidden
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-mist-50/10 text-pine-200 ring-1 ring-white/10 [&_svg]:size-4"
                      >
                        <Icon />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="shrink-0 font-display text-xl leading-tight font-medium text-balance text-pine-100 italic sm:text-2xl">
                You explore. Mei handles the rest.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
