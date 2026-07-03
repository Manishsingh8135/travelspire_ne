import Link from "next/link";
import type { Route } from "next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { StatusBadge } from "./status-badge";

/** Edit-page header: title, slug, live status, and a "View live" escape hatch. */
export function EditHeader({
  title,
  slug,
  status,
  liveHref,
}: {
  title: string;
  slug: string;
  status: string;
  liveHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <h1 className="truncate font-display text-2xl font-medium tracking-tight">{title}</h1>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">/{slug}</p>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
        {liveHref && status === "published" ? (
          <Button asChild variant="outline" size="sm">
            <Link href={liveHref as Route} target="_blank" rel="noopener noreferrer">
              View live <ExternalLink />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
