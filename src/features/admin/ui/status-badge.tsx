import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";

type Status = "draft" | "published" | "archived" | string;

const DOT: Record<string, string> = {
  draft: "bg-muted-foreground/60",
  published: "bg-success",
  archived: "bg-muted-foreground/40",
};

/**
 * Canonical publish-status pill. One component, every table + editor. Status is
 * never text-only — always a restrained badge, per the anti-slop rules.
 * `edited` renders the "published with newer draft" split state.
 */
export function StatusBadge({
  status,
  edited = false,
  className,
}: {
  status: Status;
  edited?: boolean;
  className?: string;
}) {
  if (status === "published" && edited) {
    return (
      <Badge variant="warning" className={cn("gap-1.5", className)}>
        <span className="size-1.5 rounded-full bg-warning" aria-hidden />
        Published · edited
      </Badge>
    );
  }
  const variant =
    status === "published" ? "success" : status === "archived" ? "outline" : "neutral";
  return (
    <Badge variant={variant} className={cn("gap-1.5 capitalize", className)}>
      <span
        className={cn("size-1.5 rounded-full", DOT[status] ?? "bg-muted-foreground/60")}
        aria-hidden
      />
      {status}
    </Badge>
  );
}
