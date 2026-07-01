import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Eyebrow / kicker — the small tracked label above section headings
 * (THE PROBLEM · DREAM · EXPERIENCE NORTHEAST). Field-journal voice: mono,
 * uppercase, generously tracked. `ornament` adds the hairline rules that
 * flank centered eyebrows in the editorial layouts.
 */
const eyebrowVariants = cva(
  "inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em]",
  {
    variants: {
      tone: {
        pine: "text-secondary",
        muted: "text-muted-foreground",
        onDark: "text-mist-300",
      },
    },
    defaultVariants: { tone: "pine" },
  },
);

type EyebrowProps = React.ComponentProps<"p"> &
  VariantProps<typeof eyebrowVariants> & {
    /** Flank the label with hairline rules (for centered section openers). */
    ornament?: boolean;
  };

function Eyebrow({ className, tone, ornament = false, children, ...props }: EyebrowProps) {
  const rule = <span aria-hidden className="h-px w-6 bg-current opacity-40" />;
  return (
    <p className={cn(eyebrowVariants({ tone }), className)} {...props}>
      {ornament ? rule : null}
      {children}
      {ornament ? rule : null}
    </p>
  );
}

export { Eyebrow, eyebrowVariants };
