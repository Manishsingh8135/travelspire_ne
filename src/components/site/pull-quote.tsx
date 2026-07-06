import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A traveler's words as an artifact (docs-new/07-pages/10 §15): Fraunces quote,
 * mono attribution rule. Real testimonials only — the section using this hides
 * when none exist (honesty rule).
 */
export function PullQuote({
  quote,
  name,
  meta,
  className,
}: {
  quote: string;
  name: string;
  /** e.g. "Bangalore · January 2024" */
  meta?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "rounded-2xl border border-border-subtle bg-card p-6 shadow-panel sm:p-8",
        className,
      )}
    >
      <Quote aria-hidden className="size-5 text-secondary/60" />
      <blockquote className="mt-3 font-display text-lg leading-relaxed text-pretty sm:text-xl">
        {quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border-subtle pt-4">
        <span className="font-medium">{name}</span>
        {meta ? (
          <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            {meta}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
