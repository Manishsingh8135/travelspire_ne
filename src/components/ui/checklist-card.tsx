import { Check, X, Circle } from "lucide-react";
import { cn } from "@/lib/cn";

type Mark = "yes" | "no" | "neutral";

const MARK: Record<Mark, { icon: typeof Check; cls: string }> = {
  yes: { icon: Check, cls: "bg-success/12 text-success" },
  no: { icon: X, cls: "bg-danger/10 text-danger" },
  neutral: { icon: Circle, cls: "bg-muted text-muted-foreground [&_svg]:size-2" },
};

/**
 * Ruled checklist on paper — inclusions/exclusions, documents, things-to-carry.
 * One primitive for every ✓/✕/○ list (docs-new/07-pages/10 §23); scannable,
 * no prose. Rows are real data, never decorative.
 */
export function ChecklistCard({
  title,
  items,
  mark = "yes",
  className,
}: {
  title: string;
  items: string[];
  mark?: Mark;
  className?: string;
}) {
  const { icon: Icon, cls } = MARK[mark];
  if (!items.length) return null;
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-card p-6 shadow-panel sm:p-7",
        className,
      )}
    >
      <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-b border-border-subtle py-2.5 text-[15px] text-pretty last:border-0"
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full [&_svg]:size-3",
                cls,
              )}
            >
              <Icon />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
