import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { PUBLIC_NAV, NAV_CTA, isExternal, isAnchor } from "@/components/marketing/nav-config";

/**
 * Content-page header (tours, explore, atlas). Same nav tree as the landing
 * SiteNav (nav-config — one source of truth), rendered as a quiet paper bar:
 * parents as links, horizontal-scrollable on mobile, one marigold CTA.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 md:px-10">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-medium tracking-tight text-foreground"
        >
          Travelspire
        </Link>

        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none]"
        >
          {PUBLIC_NAV.map((item) =>
            isExternal(item.href) || isAnchor(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal(item.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href as Route}
                className="rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={NAV_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            {NAV_CTA.label}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
