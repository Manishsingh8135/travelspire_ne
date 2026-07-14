import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Section — the editor's building block: hairline card, mono uppercase title,
 * optional hint, fields on a 12-col grid (single column on mobile).
 * Fields size themselves with `className="sm:col-span-N"` (default: full width).
 */
export function Section({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-border-subtle p-4 sm:p-5", className)}>
      <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {title}
        </h2>
        {hint ? <p className="text-xs text-muted-foreground/80">{hint}</p> : null}
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-x-4 sm:gap-y-5 [&>*]:sm:col-span-12">
        {children}
      </div>
    </section>
  );
}
