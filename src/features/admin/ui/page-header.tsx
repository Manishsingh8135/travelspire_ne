import Link from "next/link";
import type { Route } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

export function PageHeader({
  title,
  subtitle,
  newHref,
  newLabel,
}: {
  title: string;
  subtitle?: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {newHref ? (
        <Button asChild size="sm">
          <Link href={newHref as Route}>
            <Plus /> {newLabel ?? "New"}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
