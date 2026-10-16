import Link from "next/link";
import { formatInr } from "@/components/ds";
import { IconArrowUpRight, IconCheck, IconClock } from "@/components/icons";
import type { CrowdLevel } from "@/data/festivals/hornbill";
import type { TourPackageVariant } from "@/types/tours/tour";
import { cn } from "@/lib/utils";

/* Blocks for the Hornbill hub. Evergreen tokens only, so they hold in light
   and dark like the place kit they sit beside. */

/* ── StatusBoard ───────────────────────────────────────────────────────
   What is confirmed for this edition and what is still awaited, with the
   date we last checked. The honest version of "Hornbill 2026: all details". */
export function StatusBoard({
  items,
  checked,
  className,
}: {
  items: readonly { label: string; value: string; confirmed: boolean }[];
  checked: string;
  className?: string;
}) {
  return (
    <div className={cn("font-ui", className)}>
      <dl className="grid border-t border-line md:grid-cols-2 md:gap-x-10">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[1.25rem_8.5rem_1fr] items-baseline gap-3 border-b border-line py-4">
            {item.confirmed ? (
              <IconCheck size={16} strokeWidth={2.25} className="translate-y-0.5 text-positive" aria-hidden />
            ) : (
              <IconClock size={16} className="translate-y-0.5 text-caution" aria-hidden />
            )}
            <dt className="text-small font-semibold text-fg">
              {item.label}
              <span className="sr-only">{item.confirmed ? " (confirmed)" : " (awaited)"}</span>
            </dt>
            <dd className="text-small text-fg-muted">{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-fg-subtle">
        <span className="inline-flex items-center gap-1.5">
          <IconCheck size={14} strokeWidth={2.25} className="text-positive" aria-hidden /> Confirmed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <IconClock size={14} className="text-caution" aria-hidden /> Awaiting announcement
        </span>
        <span>Last checked {checked}</span>
      </p>
    </div>
  );
}

/* ── CrowdCalendar ─────────────────────────────────────────────────────
   Ten festival days as ten columns. Bar height is the expected crowd, so
   the quiet days read at a glance; the word under it says the same thing. */
const crowdHeight: Record<CrowdLevel, string> = {
  busiest: "h-16",
  busy: "h-12",
  steady: "h-8",
  calmer: "h-5",
};

const crowdTone: Record<CrowdLevel, string> = {
  busiest: "bg-caution",
  busy: "bg-caution/60",
  steady: "bg-positive/45",
  calmer: "bg-positive",
};

const crowdName: Record<CrowdLevel, string> = {
  busiest: "Busiest",
  busy: "Busy",
  steady: "Steady",
  calmer: "Calmer",
};

export function CrowdCalendar({
  days,
  month,
  className,
}: {
  days: readonly { date: string; day: string; crowd: CrowdLevel; note: string }[];
  month: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <ol className="grid grid-cols-5 gap-x-3 gap-y-8 font-ui lg:grid-cols-10 lg:gap-x-2">
        {days.map((d) => (
          <li key={d.date} className="flex flex-col">
            <span className="flex h-16 items-end" aria-hidden>
              <span className={cn("block w-full rounded-t-[0.25rem]", crowdHeight[d.crowd], crowdTone[d.crowd])} />
            </span>
            <span className="mt-3 text-small font-semibold text-fg tabular-nums">
              {d.day} {d.date}
              <span className="sr-only"> {month}</span>
            </span>
            <span className="text-caption text-fg-muted">{crowdName[d.crowd]}</span>
            {d.note ? <span className="mt-1 text-caption text-fg-subtle">{d.note}</span> : null}
          </li>
        ))}
      </ol>
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 font-ui text-small text-fg-muted">
        {(Object.keys(crowdName) as CrowdLevel[]).map((level) => (
          <li key={level} className="flex items-center gap-2">
            <span aria-hidden className={cn("h-2.5 w-5 rounded-full", crowdTone[level])} />
            {crowdName[level]}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── TribeList ─────────────────────────────────────────────────────────
   The seventeen names, set as a quiet two-to-four column list rather than
   chips: they are the content, not filters. */
export function TribeList({ tribes, className }: { tribes: readonly string[]; className?: string }) {
  return (
    <ol className={cn("grid grid-cols-2 gap-x-8 border-t border-line font-ui sm:grid-cols-3 lg:grid-cols-4", className)}>
      {tribes.map((tribe, i) => (
        <li key={tribe} className="flex items-baseline gap-3 border-b border-line py-3">
          <span className="w-6 text-caption text-fg-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-body text-fg">{tribe}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── PackageList ───────────────────────────────────────────────────────
   The product's packages in brief, each linking to its booking tier. The
   full inclusions live on the tour page. */
export function PackageList({
  variants,
  tourHref,
  bookHref,
  className,
}: {
  variants: readonly TourPackageVariant[];
  tourHref: string;
  bookHref: string;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-3", className)}>
      {variants.map((v) => {
        const { days, nights } = v.duration;
        return (
          <li key={v.id}>
            <Link
              href={`${bookHref}?tier=${encodeURIComponent(v.id)}`}
              className="group flex h-full flex-col rounded-panel border border-line bg-surface p-5 font-ui transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:p-6"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-h4 text-fg transition-colors group-hover:text-brand">{v.name}</span>
                <IconArrowUpRight size={18} className="mt-1 shrink-0 text-fg-subtle" />
              </span>
              <span className="mt-1 text-small text-fg-subtle">
                {days} {days === 1 ? "day" : "days"} · {nights} {nights === 1 ? "night" : "nights"}
              </span>
              {v.description ? <span className="mt-3 text-body text-fg-muted">{v.description}</span> : null}
              <span className="mt-auto pt-6 text-small text-fg-subtle">
                From <span className="text-h3 font-semibold text-fg tabular-nums">{formatInr(v.price)}</span> per person
              </span>
            </Link>
          </li>
        );
      })}
      <li className="md:col-span-3">
        <Link href={tourHref} className="font-ui text-small font-medium text-brand underline underline-offset-4">
          Compare everything included in each package
        </Link>
      </li>
    </ul>
  );
}
