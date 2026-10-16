import { IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

/* Day-by-day itinerary. Each day is a native <details> (crawlable, no JS);
   the first days start open so the shape of the trip is visible at once. */
export type ItineraryDay = { title: string; description: string; activities?: string[]; meta?: string };

export function Itinerary({ days, openCount = 2, className }: { days: ItineraryDay[]; openCount?: number; className?: string }) {
  return (
    <ol className={cn("border-t border-line font-ui", className)}>
      {days.map((day, i) => (
        <li key={`${day.title}-${i}`} className="border-b border-line">
          <details className="group" open={i < openCount}>
            <summary className="grid cursor-pointer list-none grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-small font-semibold uppercase tracking-[0.08em] text-highlight tabular-nums">
                Day {i + 1}
              </span>
              <span className="text-h4 text-fg transition-colors group-hover:text-brand">{day.title}</span>
              <IconChevronDown
                size={20}
                className="translate-y-1 text-fg-subtle transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="grid grid-cols-[4.5rem_1fr] gap-3 pb-6">
              <div className="col-start-2 space-y-4">
                {day.meta ? <p className="text-small text-fg-subtle">{day.meta}</p> : null}
                <p className="max-w-prose text-body text-fg-muted">{day.description}</p>
                {day.activities?.length ? (
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {day.activities.map((a) => (
                      <li key={a} className="flex gap-2.5 text-small text-fg-muted">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-line-strong" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
