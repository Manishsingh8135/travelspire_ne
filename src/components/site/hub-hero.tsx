import { Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Compact hub opener (docs-new/07-pages/10 §17): eyebrow, title, one honest
 * line, and a COMPUTED facts strip — real numbers in mono, never typed claims.
 * Kills the "big generic hub banner".
 */
export function HubHero({
  eyebrow,
  title,
  lead,
  facts,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  /** e.g. ["8 EXPEDITIONS", "3–6 DAYS", "FROM ₹12,499"] — computed by the page */
  facts?: string[];
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <Eyebrow tone="pine" ornament>
        {eyebrow}
      </Eyebrow>
      <h1 className="mt-4 font-display text-4xl leading-[1.04] font-medium text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {lead ? (
        <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          {lead}
        </p>
      ) : null}
      {facts?.length ? (
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {facts.map((fact, i) => (
            <span key={fact} className="flex items-center gap-3 tabular-nums">
              {i > 0 ? (
                <span aria-hidden className="size-1 rotate-45 bg-secondary/50" />
              ) : null}
              {fact}
            </span>
          ))}
        </p>
      ) : null}
    </header>
  );
}
