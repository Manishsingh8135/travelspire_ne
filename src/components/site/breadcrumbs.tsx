import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: Route };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight className="size-3.5 opacity-60" aria-hidden /> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
