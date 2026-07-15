import { cn } from "@/lib/cn";

/**
 * A traveler's words as pure typography (docs-new/07-pages/10 §15, de-shadcn:
 * no box — the quote carries itself). Oversized Fraunces with a ghosted
 * opening mark, mono provenance rule. Real testimonials only — the section
 * using this hides when none exist.
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
    <figure className={cn("mx-auto max-w-3xl text-center", className)}>
      <span aria-hidden className="block font-display text-6xl leading-none text-secondary/25">
        “
      </span>
      <blockquote className="-mt-5 font-display text-xl leading-snug text-pretty sm:text-2xl">
        {quote}
      </blockquote>
      <figcaption className="mt-5 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        — {name}
        {meta ? ` · ${meta}` : ""}
      </figcaption>
    </figure>
  );
}
