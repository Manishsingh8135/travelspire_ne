import type { ItineraryDay } from "@/lib/tours/itinerary";
import { Tent, HomestayHut } from "@/components/icons/field-icons";
import { cn } from "@/lib/cn";

/**
 * The day-by-day journal (08-blueprint/05 §3.4) — the dossier's heart. No
 * boxes: each day is typography structured by hairline rules on a dotted
 * spine. Route strip + bracket meta chips, sightseeing as ◆-separated mono
 * tokens (never flattened to prose — the NO-DOWNGRADE law), and the overnight
 * ledger row ALWAYS last. Days past `collapseAfter` fold into a pure-CSS
 * <details> — zero JS, crawlable, keyboard-native.
 */

const TAG_STYLE: Record<string, string> = {
  sunrise: "text-accent",
  trek: "text-danger",
};

function metaChips(day: ItineraryDay): string[] {
  const drive = [
    day.distanceKm ? `${day.distanceKm} KM` : null,
    day.driveTime ? day.driveTime.toUpperCase() : null,
  ].filter(Boolean);
  const chips: string[] = [];
  if (drive.length) chips.push(drive.join(" · "));
  if (day.tripTime) chips.push(`TRIP ${day.tripTime.toUpperCase()}`);
  return chips;
}

function OvernightRow({ overnight }: { overnight: NonNullable<ItineraryDay["overnight"]> }) {
  const type = overnight.type;
  const Icon = type === "camp" || type === "tent" ? Tent : HomestayHut;
  return (
    <p className="mt-5 flex items-center gap-2.5 border-t border-dotted border-border-default pt-3.5">
      {type ? (
        <Icon aria-hidden className="size-4 shrink-0 text-secondary" />
      ) : (
        <span aria-hidden className="font-mono text-sm leading-none text-secondary">
          ☾
        </span>
      )}
      <span className="font-mono text-[11px] tracking-[0.16em] text-foreground uppercase">
        Night — {overnight.name}
        {type ? <span className="text-muted-foreground"> · {type}</span> : null}
      </span>
    </p>
  );
}

function DayEntry({ day, isLast }: { day: ItineraryDay; isLast: boolean }) {
  const chips = metaChips(day);
  return (
    <li className="relative grid gap-x-6 gap-y-2 border-t border-border-subtle py-8 sm:grid-cols-[76px_minmax(0,1fr)] sm:py-9">
      {/* the spine — dotted, with a tick at each day */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 left-[3px] hidden w-px border-l border-dotted border-border-strong sm:block",
          isLast ? "h-9" : "bottom-0",
        )}
      />
      <span
        aria-hidden
        className="absolute top-[38px] left-0 hidden size-[7px] rounded-full border border-border-strong bg-background sm:block"
      />

      <div className="flex items-baseline gap-2 sm:block sm:pl-6">
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Day
        </span>
        <span className="font-mono text-2xl leading-none font-medium tabular-nums sm:mt-1 sm:block sm:text-[1.75rem]">
          {String(day.dayNo).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          {day.route ? (
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-secondary uppercase">
              {day.route.from} → {day.route.to}
            </p>
          ) : (
            <span aria-hidden />
          )}
          {chips.length || day.tags.length ? (
            <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground tabular-nums uppercase">
              {chips.map((chip) => (
                <span key={chip}>[ {chip} ]</span>
              ))}
              {day.tags.map((tag) => (
                <span key={tag} className={cn("font-semibold", TAG_STYLE[tag])}>
                  [ {tag} ]
                </span>
              ))}
            </p>
          ) : null}
        </div>

        <h3 className="mt-1.5 font-display text-xl leading-snug font-medium text-balance sm:text-[1.4rem]">
          {day.title}
        </h3>

        {day.summary ? (
          <p className="mt-2 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
            {day.summary}
          </p>
        ) : null}

        {day.sightseeing.length ? (
          <p className="mt-3.5 max-w-2xl font-mono text-[11px] leading-[1.9] tracking-widest text-foreground/75 uppercase">
            {day.sightseeing.map((item, i) => (
              <span key={`${item.name}-${i}`}>
                {i > 0 ? (
                  <span aria-hidden className="mx-2 text-secondary/60">
                    ◆
                  </span>
                ) : null}
                {item.name}
              </span>
            ))}
          </p>
        ) : null}

        {day.overnight ? <OvernightRow overnight={day.overnight} /> : null}
      </div>
    </li>
  );
}

export function DayJournal({
  days,
  collapseAfter = 6,
  className,
}: {
  days: ItineraryDay[];
  collapseAfter?: number;
  className?: string;
}) {
  if (days.length === 0) return null;
  const visible = days.length > collapseAfter ? days.slice(0, collapseAfter - 1) : days;
  const folded = days.length > collapseAfter ? days.slice(collapseAfter - 1) : [];

  return (
    <div className={className}>
      <ol className="flex flex-col">
        {visible.map((day, i) => (
          <DayEntry key={day.dayNo} day={day} isLast={folded.length === 0 && i === visible.length - 1} />
        ))}
      </ol>
      {folded.length ? (
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-center gap-3 border-t border-border-subtle py-4 font-mono text-[11px] tracking-[0.2em] text-secondary uppercase transition-colors outline-none select-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show all {days.length} days ↓</span>
            <span className="hidden group-open:inline">Show fewer days ↑</span>
          </summary>
          <ol className="flex flex-col" start={folded[0]?.dayNo}>
            {folded.map((day, i) => (
              <DayEntry key={day.dayNo} day={day} isLast={i === folded.length - 1} />
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}
