import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

export type RouteStop = { name: string; note?: string | null };

/**
 * A journey as a ribbon (docs-new/07-pages/10 §10): mono place nodes joined by
 * dashed segments. Desktop: horizontal spread. Mobile: vertical timeline —
 * same data, no hover required. Field-journal grammar: the route IS the story.
 */
export function RouteRibbon({
  stops,
  className,
}: {
  stops: RouteStop[];
  className?: string;
}) {
  if (stops.length < 2) return null;
  return (
    <div className={cn("rounded-2xl border border-border-subtle bg-card p-6 shadow-panel sm:p-8", className)}>
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        The route
      </p>

      {/* Desktop — horizontal ribbon */}
      <ol className="mt-6 hidden items-start sm:flex">
        {stops.map((stop, i) => (
          <li
            key={stop.name}
            className={cn("flex min-w-0 items-start", i < stops.length - 1 && "flex-1")}
          >
            <div className="flex min-w-0 max-w-40 flex-col items-start">
              <span
                aria-hidden
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full ring-1",
                  i === 0 || i === stops.length - 1
                    ? "bg-secondary text-secondary-foreground ring-secondary"
                    : "bg-card text-secondary ring-border-default",
                )}
              >
                <MapPin className="size-3.5" />
              </span>
              <span className="mt-2.5 font-mono text-xs font-medium tracking-wide uppercase">
                {stop.name}
              </span>
              {stop.note ? (
                <span className="mt-1 text-xs leading-snug text-pretty text-muted-foreground">
                  {stop.note}
                </span>
              ) : null}
            </div>
            {i < stops.length - 1 ? (
              <span
                aria-hidden
                className="mx-3 mt-4 h-px flex-1 border-t border-dashed border-border-strong"
              />
            ) : null}
          </li>
        ))}
      </ol>

      {/* Mobile — vertical timeline */}
      <ol className="mt-5 flex flex-col sm:hidden">
        {stops.map((stop, i) => (
          <li key={stop.name} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                aria-hidden
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full ring-1",
                  i === 0 || i === stops.length - 1
                    ? "bg-secondary text-secondary-foreground ring-secondary"
                    : "bg-card text-secondary ring-border-default",
                )}
              >
                <MapPin className="size-3" />
              </span>
              {i < stops.length - 1 ? (
                <span aria-hidden className="my-1 w-px flex-1 border-l border-dashed border-border-strong" />
              ) : null}
            </div>
            <div className={cn(i < stops.length - 1 && "pb-5")}>
              <p className="font-mono text-xs font-medium tracking-wide uppercase">{stop.name}</p>
              {stop.note ? (
                <p className="mt-0.5 text-xs text-pretty text-muted-foreground">{stop.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
