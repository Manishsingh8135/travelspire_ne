import { cn } from "@/lib/cn";

/**
 * PipelinePanel — read-only listing of body keys the form does NOT own:
 * content written by importers and research seeds (field notes, galleries,
 * route data, ground-truth flags…). Makes the data-safety contract visible:
 * saves merge; these survive. (13-admin-editor-system §2)
 */
function summarize(v: unknown): string {
  if (v == null) return "—";
  if (typeof v === "string") return v.length > 64 ? `${v.slice(0, 64)}…` : v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? "" : "s"}`;
  if (typeof v === "object") return `${Object.keys(v as object).length} fields`;
  return typeof v;
}

export function PipelinePanel({
  body,
  ownedKeys,
  className,
}: {
  body: unknown;
  /** Keys the form owns (they render as fields, not here). */
  ownedKeys: string[];
  className?: string;
}) {
  const record =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  const keys = Object.keys(record).filter((k) => !ownedKeys.includes(k));
  if (keys.length === 0) return null;

  return (
    <div className={cn("rounded-lg border border-border-subtle p-4", className)}>
      <h3 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
        Pipeline content
      </h3>
      <dl className="mt-3 flex flex-col gap-2">
        {keys.map((k) => (
          <div key={k} className="grid grid-cols-[minmax(0,42%)_minmax(0,1fr)] items-baseline gap-2">
            <dt className="truncate font-mono text-[11px] text-muted-foreground">{k}</dt>
            <dd className="truncate text-xs text-foreground">{summarize(record[k])}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 border-t border-border-subtle pt-2 text-[11px] leading-relaxed text-muted-foreground/80">
        Written by the content pipeline (imports, research seeds). Saves merge — these fields
        survive edits made here.
      </p>
    </div>
  );
}
