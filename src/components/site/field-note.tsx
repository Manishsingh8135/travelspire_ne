import { cn } from "@/lib/cn";

/**
 * The hand-written observation (docs-new/07-pages/10 §5): Fraunces body on a
 * sand paper tint with a mono kicker line. For field notes, honesty callouts
 * and important notes — the human voice beside the data. Never generated,
 * never generic.
 */
export function FieldNote({
  kicker,
  children,
  className,
}: {
  kicker: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-border-subtle bg-mist-200/60 p-6 sm:p-7",
        className,
      )}
    >
      <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-secondary uppercase">
        {kicker}
      </p>
      <div className="mt-2.5 font-display text-lg leading-relaxed text-pretty">{children}</div>
    </aside>
  );
}
