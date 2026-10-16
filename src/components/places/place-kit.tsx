import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  KeyFacts,
  Lead,
  Section,
  buttonVariants,
  type Crumb,
  type KeyFact,
} from "@/components/ds";
import { IconArrowRight, IconArrowUpRight, IconClock, IconWhatsApp } from "@/components/icons";
import { cn } from "@/lib/utils";

/* Building blocks shared by the place guides (Anini, Dibang Valley, Dambuk,
   Roing) and the Anini road guide. Built only from Evergreen tokens, so every
   piece works in light and dark. */

/* ── PlaceHero ─────────────────────────────────────────────────────────
   Same split as the tour hero: name, one honest paragraph and the four facts
   people scan for, beside the best photograph. */
export function PlaceHero({
  crumbs,
  eyebrow,
  title,
  lead,
  facts,
  image,
  imageAlt,
  primary,
  whatsappHref,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  facts: KeyFact[];
  image: string;
  imageAlt: string;
  primary?: { label: string; href: string };
  whatsappHref: string;
}) {
  return (
    <Section spacing="none" className="pb-10 pt-6 md:pb-14 md:pt-8">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="space-y-4">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Heading as="h1" size="h1">
                {title}
              </Heading>
              <Lead className="max-w-[48ch]">{lead}</Lead>
            </div>
            <KeyFacts items={facts} layout="grid" />
            <div className="flex flex-wrap gap-3">
              {primary ? (
                <ButtonLink href={primary.href} size="lg">
                  {primary.label}
                  <IconArrowRight />
                </ButtonLink>
              ) : null}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: primary ? "secondary" : "primary", size: "lg" })}
              >
                <IconWhatsApp />
                Plan a trip
              </a>
            </div>
          </div>
          <div className="relative order-1 -mx-5 aspect-[4/3] overflow-hidden bg-canvas-subtle sm:mx-0 sm:rounded-panel lg:order-2 lg:aspect-[5/4]">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── ExperienceGrid ────────────────────────────────────────────────────
   Things to do. Text sits below the photo so it reads on every image; the
   meta line answers "how long / when" before anyone has to ask. */
export type Experience = {
  title: string;
  story: string;
  meta?: string;
  tag?: string;
  image: string;
  imageAlt: string;
  href?: string;
};

export function ExperienceGrid({ items, className }: { items: readonly Experience[]; className?: string }) {
  // Three columns on desktop never leave an orphan: with one card over, the
  // first and last cards run double width; with two over, the first does.
  const rem = items.length % 3;
  const wide = (i: number) => (rem === 1 && (i === 0 || i === items.length - 1)) || (rem === 2 && i === 0);
  return (
    <ul className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, i) => {
        const body = (
          <>
            <span
              className={cn(
                "relative block aspect-[4/3] overflow-hidden rounded-card bg-canvas-subtle",
                wide(i) && "lg:aspect-[8/3]",
              )}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes={wide(i) ? "(min-width: 1024px) 820px, (min-width: 640px) 45vw, 92vw" : "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </span>
            <span className="mt-4 block font-ui">
              {item.tag ? <span className="block text-small font-medium text-highlight">{item.tag}</span> : null}
              <span className="mt-1 flex items-start justify-between gap-3">
                <span className="text-h3 text-fg transition-colors group-hover:text-brand">{item.title}</span>
                {item.href ? <IconArrowUpRight size={20} className="mt-1 shrink-0 text-fg-subtle" /> : null}
              </span>
              <span className="mt-2 block text-body text-fg-muted">{item.story}</span>
              {item.meta ? (
                <span className="mt-3 flex items-center gap-1.5 text-small text-fg-subtle">
                  <IconClock size={16} className="shrink-0" />
                  {item.meta}
                </span>
              ) : null}
            </span>
          </>
        );
        return (
          <li key={item.title} className={cn(wide(i) && "lg:col-span-2")}>
            {item.href ? (
              <Link href={item.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas">
                {body}
              </Link>
            ) : (
              <div className="group">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ── SeasonStrip ───────────────────────────────────────────────────────
   Twelve months, honestly graded. Colour carries the grade, the word under
   it carries the reason; a legend makes the code explicit. */
export type SeasonTone = "best" | "good" | "caution" | "avoid";
export type SeasonMonth = { month: string; tone: SeasonTone; label: string };

const toneBar: Record<SeasonTone, string> = {
  best: "bg-positive",
  good: "bg-positive/45",
  caution: "bg-caution",
  avoid: "bg-line-strong",
};

const toneName: Record<SeasonTone, string> = {
  best: "Best window",
  good: "Good",
  caution: "Go with care",
  avoid: "Monsoon — avoid",
};

export function SeasonLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 font-ui text-small text-fg-muted", className)}>
      {(Object.keys(toneName) as SeasonTone[]).map((tone) => (
        <li key={tone} className="flex items-center gap-2">
          <span aria-hidden className={cn("h-2.5 w-5 rounded-full", toneBar[tone])} />
          {toneName[tone]}
        </li>
      ))}
    </ul>
  );
}

export function SeasonStrip({ months, className }: { months: readonly SeasonMonth[]; className?: string }) {
  return (
    <div className={className}>
      <ol className="grid grid-cols-3 gap-x-3 gap-y-6 font-ui sm:grid-cols-4 lg:grid-cols-12 lg:gap-x-2">
        {months.map((m) => (
          <li key={m.month}>
            <span aria-hidden className={cn("block h-2 rounded-full", toneBar[m.tone])} />
            <span className="mt-3 block text-small font-semibold text-fg">{m.month}</span>
            <span className="mt-0.5 block text-caption text-fg-muted">{m.label}</span>
            <span className="sr-only"> — {toneName[m.tone]}</span>
          </li>
        ))}
      </ol>
      <SeasonLegend className="mt-8 border-t border-line pt-5" />
    </div>
  );
}

/* ── MonthTable ────────────────────────────────────────────────────────
   The detailed version of the strip for regions with two climates: each
   month opens to show the low valley and the high valley side by side, plus
   our call. Native <details>, so the detail is in the HTML. */
export type MonthDetail = SeasonMonth & {
  low: { temp: string; state: string };
  high: { temp: string; state: string };
  weSay: string;
};

export function MonthTable({
  months,
  lowLabel,
  highLabel,
  className,
}: {
  months: readonly MonthDetail[];
  lowLabel: string;
  highLabel: string;
  className?: string;
}) {
  const full = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <ol className={cn("border-t border-line font-ui", className)}>
      {months.map((m, i) => (
        <li key={m.month} className="border-b border-line">
          <details className="group">
            <summary className="grid cursor-pointer list-none grid-cols-[1.25rem_7rem_1fr_auto] items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
              <span aria-hidden className={cn("h-2.5 w-2.5 rounded-full", toneBar[m.tone])} />
              <span className="text-body font-semibold text-fg">{full[i] ?? m.month}</span>
              <span className="text-body text-fg-muted">
                {m.label}
                <span className="sr-only"> — {toneName[m.tone]}</span>
              </span>
              <IconArrowRight size={18} className="text-fg-subtle transition-transform duration-200 group-open:rotate-90" />
            </summary>
            <div className="grid gap-6 pb-6 pl-8 md:grid-cols-3">
              {[
                { label: lowLabel, ...m.low },
                { label: highLabel, ...m.high },
              ].map((side) => (
                <div key={side.label}>
                  <p className="text-small font-semibold text-fg">{side.label}</p>
                  <p className="mt-1 text-small text-fg-subtle tabular-nums">{side.temp}</p>
                  <p className="mt-1.5 text-small text-fg-muted">{side.state}</p>
                </div>
              ))}
              <div>
                <p className="text-small font-semibold text-highlight">Our call</p>
                <p className="mt-1.5 text-small text-fg-muted">{m.weSay}</p>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

/* ── SplitStory ────────────────────────────────────────────────────────
   One idea told in prose beside one photograph. */
export function SplitStory({
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt,
  reverse,
}: {
  eyebrow: string;
  title: React.ReactNode;
  paragraphs: readonly string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={cn(reverse && "lg:order-2")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-3 max-w-[18ch]">{title}</Heading>
        <div className="mt-6 max-w-prose space-y-4 font-ui text-body-lg text-fg-muted">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-canvas-subtle">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
      </div>
    </div>
  );
}

/* ── FactList ──────────────────────────────────────────────────────────
   Practical answers in two columns, separated by hairlines. */
export function FactList({ items, className }: { items: readonly { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("grid gap-x-10 border-t border-line font-ui sm:grid-cols-2", className)}>
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
          <dt className="text-small font-semibold text-fg">{item.label}</dt>
          <dd className="text-small text-fg-muted">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── StayList ──────────────────────────────────────────────────────── */
export function StayList({ items, className }: { items: readonly { type: string; body: string }[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-8 font-ui md:grid-cols-3", className)}>
      {items.map((stay, i) => (
        <li key={stay.type} className="border-t border-line pt-5">
          <span className="text-small font-semibold text-highlight tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 text-h4 text-fg">{stay.type}</h3>
          <p className="mt-1.5 text-body text-fg-muted">{stay.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── NumberedList ──────────────────────────────────────────────────────
   Things to do without photographs — used where we have no honest picture
   of the place, rather than borrowing one from somewhere else. */
export function NumberedList({
  items,
  className,
}: {
  items: readonly { title: string; story: string; meta?: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-x-10 gap-y-10 font-ui md:grid-cols-2", className)}>
      {items.map((item, i) => (
        <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line pt-6">
          <span className="text-h3 font-semibold text-highlight tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-h3 text-fg">{item.title}</h3>
            <p className="mt-2 text-body text-fg-muted">{item.story}</p>
            {item.meta ? (
              <p className="mt-3 flex items-center gap-1.5 text-small text-fg-subtle">
                <IconClock size={16} className="shrink-0" />
                {item.meta}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── NextPlaces ────────────────────────────────────────────────────────
   Where to go next — compact link rows with a thumbnail. */
export type NextPlace = { name: string; blurb: string; href: string; image: string };

export function NextPlaces({ places, className }: { places: readonly NextPlace[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {places.map((place) => (
        <li key={place.href + place.name}>
          <Link
            href={place.href}
            className="group flex h-full items-center gap-4 rounded-card border border-line bg-surface p-3 pr-4 font-ui transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <span className="relative size-20 shrink-0 overflow-hidden rounded-control bg-canvas-subtle">
              <Image src={place.image} alt="" fill sizes="80px" className="object-cover" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-body font-semibold text-fg group-hover:text-brand">
                {place.name}
                <IconArrowUpRight size={16} className="shrink-0 text-fg-subtle" />
              </span>
              <span className="mt-0.5 block text-small text-fg-muted">{place.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ── QuoteBlock ────────────────────────────────────────────────────── */
export function QuoteBlock({ children, source, className }: { children: React.ReactNode; source: string; className?: string }) {
  return (
    <figure className={cn("border-l-2 border-brand pl-6", className)}>
      <blockquote className="font-display text-h2 font-normal italic leading-snug text-fg">{children}</blockquote>
      <figcaption className="mt-4 font-ui text-small text-fg-subtle">{source}</figcaption>
    </figure>
  );
}
