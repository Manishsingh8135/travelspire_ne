import * as React from "react";
import Image from "next/image";
import {
  Badge,
  Breadcrumbs,
  ButtonLink,
  Heading,
  KeyFacts,
  Lead,
  buttonVariants,
  formatInr,
  type KeyFact,
} from "@/components/ds";
import {
  IconCard,
  IconChat,
  IconCheck,
  IconChevronDown,
  IconInfo,
  IconMinus,
  IconPermit,
  IconShield,
  IconWhatsApp,
} from "@/components/icons";
import { isPartyPriced, tierTravellers, type ExpeditionTierPricing } from "@/lib/expedition-tiers";
import { cn } from "@/lib/utils";

/* Building blocks for the two flagship expedition pages (the 16-day grand
   circuit and Six Days in the Dibang). Same grammar as the tour template —
   facts first, one clear action — with room for what only these products
   have: group-size pricing, region chapters, a summit-day timeline. */

export type ExpeditionTier = ExpeditionTierPricing & {
  badge?: string | null;
  note: string;
  /** Short facts that change with the party size (vehicle, room, best for). */
  details?: { label: string; value: string }[];
};

const bookHref = (slug: string, tierId: string) => `/book/${slug}?tier=${encodeURIComponent(tierId)}`;

/* ── Hero ──────────────────────────────────────────────────────────────── */

export function ExpeditionHero({
  slug,
  crumb,
  badges,
  title,
  lead,
  facts,
  from,
  fromNote,
  defaultTier,
  askHref,
  image,
}: {
  slug: string;
  crumb: string;
  badges: { label: string; tone?: React.ComponentProps<typeof Badge>["tone"] }[];
  title: React.ReactNode;
  lead: string;
  facts: KeyFact[];
  from: number;
  fromNote: string;
  defaultTier: string;
  askHref: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="pb-10 pt-6 md:pb-14 md:pt-8">
      <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
        {/* The page's JSON-LD graph already carries the BreadcrumbList. */}
        <Breadcrumbs
          schema={false}
          items={[
            { label: "Home", href: "/" },
            { label: "Tours", href: "/all-tours" },
            { label: crumb, href: `/tours/${slug}` },
          ]}
        />
        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <Badge key={b.label} tone={b.tone}>
                  {b.label}
                </Badge>
              ))}
            </div>
            <div className="space-y-4">
              <Heading as="h1" size="h1">
                {title}
              </Heading>
              <Lead className="max-w-[46ch]">{lead}</Lead>
            </div>
            <KeyFacts items={facts} layout="grid" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <p className="font-ui text-small text-fg-muted">
                From
                <span className="block text-h2 font-semibold text-fg tabular-nums">{formatInr(from)}</span>
                <span className="block text-caption text-fg-subtle">{fromNote}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={bookHref(slug, defaultTier)} size="lg">
                  Book online
                </ButtonLink>
                <a
                  href={askHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                >
                  <IconWhatsApp />
                  Ask a question
                </a>
              </div>
            </div>
          </div>
          <div className="relative order-1 -mx-5 aspect-[4/3] overflow-hidden bg-canvas-subtle sm:mx-0 sm:rounded-panel lg:order-2 lg:aspect-[5/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Route line ────────────────────────────────────────────────────────── */

export function RouteLine({ stops, className }: { stops: string[]; className?: string }) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-2 font-ui text-small", className)} aria-label="Route">
      {stops.map((stop, i) => (
        <li key={`${stop}-${i}`} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-control border px-2.5 py-1",
              i === 0 || i === stops.length - 1
                ? "border-brand/40 bg-brand-soft font-semibold text-brand"
                : "border-line text-fg-muted",
            )}
          >
            {stop}
          </span>
          {i < stops.length - 1 ? <span aria-hidden className="h-px w-3 bg-line-strong" /> : null}
        </li>
      ))}
    </ol>
  );
}

/* ── Day list (explicit day numbers, so region chapters can split it) ──── */

export type ExpeditionDay = {
  day: number;
  title: string;
  meta?: string[];
  paragraphs: string[];
  stops?: { name: string; note?: string }[];
  note?: string;
};

export function ExpeditionDays({ days, openFirst = true, className }: { days: ExpeditionDay[]; openFirst?: boolean; className?: string }) {
  return (
    <ol className={cn("border-t border-line font-ui", className)}>
      {days.map((day, i) => (
        <li key={day.day} className="border-b border-line">
          <details className="group" open={openFirst && i === 0}>
            <summary className="grid cursor-pointer list-none grid-cols-[3.75rem_1fr_auto] items-baseline gap-3 py-5 sm:grid-cols-[4.5rem_1fr_auto] [&::-webkit-details-marker]:hidden">
              <span className="text-small font-semibold uppercase tracking-[0.08em] text-highlight tabular-nums">
                Day {day.day}
              </span>
              <span className="text-h4 text-fg transition-colors group-hover:text-brand">{day.title}</span>
              <IconChevronDown
                size={20}
                className="translate-y-1 text-fg-subtle transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="pb-6 sm:grid sm:grid-cols-[4.5rem_1fr] sm:gap-3">
              <div className="space-y-4 sm:col-start-2">
                {day.meta?.length ? (
                  <ul className="flex flex-col gap-0.5 text-small text-fg-subtle sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1">
                    {day.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                ) : null}
                {day.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="max-w-prose text-body text-fg-muted">
                    {p}
                  </p>
                ))}
                {day.stops?.length ? (
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {day.stops.map((s) => (
                      <li key={s.name} className="flex gap-2.5 text-small">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-line-strong" />
                        <span>
                          <span className="font-medium text-fg">{s.name}</span>
                          {s.note ? <span className="text-fg-muted"> — {s.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {day.note ? (
                  <p className="flex gap-2 text-small text-fg-muted">
                    <IconInfo size={18} className="mt-px shrink-0 text-notice" />
                    {day.note}
                  </p>
                ) : null}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

/* ── Region chapter header ─────────────────────────────────────────────── */

export function ChapterHeader({
  days,
  place,
  title,
  description,
  image,
}: {
  days: string;
  place: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
}) {
  return (
    <div className="grid gap-5 font-ui sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6">
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-canvas-subtle sm:aspect-[4/3]">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />
      </div>
      <div>
        <p className="text-eyebrow uppercase text-highlight">{days}</p>
        <h3 className="mt-1.5 text-h3 text-fg">{place}</h3>
        <p className="mt-1 text-body font-medium text-fg">{title}</p>
        <p className="mt-1 max-w-prose text-small text-fg-muted">{description}</p>
      </div>
    </div>
  );
}

/* ── Group-size prices ─────────────────────────────────────────────────── */

export function PriceTiers({
  slug,
  tiers,
  days,
  askHref,
  fineprint,
}: {
  slug: string;
  tiers: ExpeditionTier[];
  days: number;
  askHref: (tier: ExpeditionTier) => string;
  fineprint: readonly string[];
}) {
  return (
    <div className="font-ui">
      <ul className="border-t border-line">
        {tiers.map((tier) => (
          <li
            key={tier.id}
            className={cn(
              "grid gap-4 border-b border-line py-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] md:items-center md:gap-8",
              tier.badge === "Best value" && "md:bg-brand-soft/40",
              tier.badge === "Best value" && "-mx-3 rounded-card px-3 md:-mx-4 md:px-4",
            )}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-h4 text-fg">{tier.label}</h3>
                {tier.badge ? <Badge tone={tier.badge === "Best value" ? "brand" : "neutral"}>{tier.badge}</Badge> : null}
              </div>
              <p className="mt-1 text-small text-fg-muted">{tier.note}</p>
              {tier.details?.length ? (
                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-small">
                  {tier.details.map((d) => (
                    <div key={d.label} className="flex gap-1.5">
                      <dt className="text-fg-subtle">{d.label}:</dt>
                      <dd className="text-fg">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
            <div>
              <p className="text-h3 font-semibold text-fg tabular-nums">
                {formatInr(tier.price)}
                <span className="ml-1.5 text-small font-normal text-fg-subtle">
                  {isPartyPriced(tier) ? `total for ${tier.size}` : "per person"}
                </span>
              </p>
              <p className="text-small text-fg-subtle tabular-nums">
                {isPartyPriced(tier)
                  ? `${formatInr(Math.round(tier.price / days))} a day for ${tier.size === 2 ? "both" : `all ${tier.size}`}`
                  : tier.minSize
                    ? `For ${tierTravellers(tier)} travellers · ${formatInr(Math.round(tier.price / days))} a day`
                    : `${formatInr(tier.price * tier.size)} for ${tier.size} · ${formatInr(Math.round(tier.price / days))} a day`}
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonLink href={bookHref(slug, tier.id)} size="sm" className="flex-1 md:flex-none">
                Book
              </ButtonLink>
              <a
                href={askHref(tier)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about the ${tier.label} rate on WhatsApp`}
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <IconWhatsApp />
                Ask
              </a>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-6 space-y-2">
        {fineprint.map((line) => (
          <li key={line} className="flex gap-2.5 text-small text-fg-muted">
            <IconInfo size={18} className="mt-px shrink-0 text-fg-subtle" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Sticky booking panel ──────────────────────────────────────────────── */

export function ExpeditionBookingPanel({
  slug,
  tiers,
  summary,
  askHref,
}: {
  slug: string;
  tiers: ExpeditionTier[];
  summary: string;
  askHref: string;
}) {
  const lead = tiers[0];
  return (
    <div className="rounded-panel border border-line bg-surface p-6 font-ui shadow-e2">
      <p className="text-small text-fg-subtle">From, per person</p>
      <p className="mt-1 text-h2 font-semibold text-fg tabular-nums">{formatInr(lead.price)}</p>
      <p className="mt-1 text-small text-fg-muted">{summary}</p>
      <dl className="mt-5 space-y-2 border-t border-line pt-4 text-small">
        {tiers.map((t) => (
          <div key={t.id} className="flex justify-between gap-3">
            <dt className="text-fg-muted">{t.label}</dt>
            <dd className="font-medium text-fg tabular-nums">
              {formatInr(t.price)}
              {isPartyPriced(t) ? <span className="font-normal text-fg-subtle"> for {t.size}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
      <ButtonLink href={bookHref(slug, lead.id)} size="lg" className="mt-5 w-full">
        <IconCard />
        Book and pay online
      </ButtonLink>
      <a
        href={askHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-2 w-full" })}
      >
        <IconWhatsApp />
        Check dates first
      </a>
      <ul className="mt-6 space-y-3 border-t border-line pt-5 text-small text-fg-muted">
        <li className="flex items-center gap-2.5">
          <IconShield size={18} className="text-fg-subtle" />
          Secure payment through PayU
        </li>
        <li className="flex items-center gap-2.5">
          <IconPermit size={18} className="text-fg-subtle" />
          Permits arranged for you
        </li>
        <li className="flex items-center gap-2.5">
          <IconChat size={18} className="text-fg-subtle" />
          A person replies within a few hours
        </li>
      </ul>
    </div>
  );
}

/* ── Included / not included, with the note that makes each line honest ── */

export function NamedList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly { name: string; note: string }[];
  tone: "include" | "exclude";
}) {
  const Mark = tone === "include" ? IconCheck : IconMinus;
  return (
    <div className="font-ui">
      <h3 className="text-h4 text-fg">{title}</h3>
      <ul className="mt-4 space-y-3.5">
        {items.map((item) => (
          <li key={item.name} className="flex gap-3">
            <Mark
              size={18}
              strokeWidth={2}
              className={cn("mt-[3px] shrink-0", tone === "include" ? "text-positive" : "text-fg-subtle")}
            />
            <span>
              <span className="block text-body font-medium text-fg">{item.name}</span>
              <span className="block text-small text-fg-muted">{item.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Packing chips ─────────────────────────────────────────────────────── */

export function PackList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 font-ui sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-fg-muted">
          <IconCheck size={18} strokeWidth={2} className="mt-[3px] shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Month-by-month season ─────────────────────────────────────────────── */

const seasonTone = {
  best: { cell: "bg-positive", label: "Best" },
  good: { cell: "bg-positive/45", label: "Good" },
  closed: { cell: "bg-fg/10", label: "We don't run it" },
} as const;

export function SeasonStrip({ months }: { months: readonly { month: string; tone: keyof typeof seasonTone; note: string }[] }) {
  return (
    <div className="font-ui">
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {months.map((m) => (
          <li key={m.month} title={m.note}>
            <span className={cn("block h-10 rounded-[0.375rem]", seasonTone[m.tone].cell)} />
            <span className="mt-1.5 block text-center text-caption text-fg-muted">{m.month}</span>
          </li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-small text-fg-muted">
        {(Object.keys(seasonTone) as (keyof typeof seasonTone)[]).map((k) => (
          <li key={k} className="flex items-center gap-2">
            <span aria-hidden className={cn("size-3 rounded-sm", seasonTone[k].cell)} />
            {seasonTone[k].label}
          </li>
        ))}
      </ul>
      <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {months.map((m) => (
          <div key={m.month} className="flex gap-3 border-b border-line pb-3 text-small">
            <dt className="w-10 shrink-0 font-semibold text-fg">{m.month}</dt>
            <dd className="text-fg-muted">{m.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Timeline (a single long day, hour by hour) ────────────────────────── */

export function Timeline({ segments }: { segments: readonly { at: string; title: string; body: string }[] }) {
  return (
    <ol className="relative space-y-7 font-ui">
      <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line-strong" />
      {segments.map((s) => (
        <li key={s.title} className="relative grid grid-cols-[1.25rem_1fr] gap-4">
          <span aria-hidden className="relative z-10 mt-1.5 size-[11px] rounded-full border-2 border-brand bg-canvas" />
          <div>
            <p className="text-small font-semibold text-highlight tabular-nums">{s.at}</p>
            <h3 className="mt-0.5 text-h4 text-fg">{s.title}</h3>
            <p className="mt-1 max-w-prose text-body text-fg-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Stay cards (things you sleep in are objects, so they get a box) ───── */

export function StayCard({
  label,
  title,
  body,
  facts,
  image,
}: {
  label: string;
  title: string;
  body: string;
  facts: readonly { label: string; value: string }[];
  image: { src: string; alt: string };
}) {
  return (
    <article className="overflow-hidden rounded-panel border border-line bg-surface font-ui">
      <div className="relative aspect-[16/9] bg-canvas-subtle">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-eyebrow uppercase text-highlight">{label}</p>
        <h3 className="mt-1.5 text-h3 text-fg">{title}</h3>
        <p className="mt-2 text-body text-fg-muted">{body}</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-small">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-fg-subtle">{f.label}</dt>
              <dd className="font-medium text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
