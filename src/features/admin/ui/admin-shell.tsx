"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import {
  PanelLeftClose,
  PanelLeft,
  Search,
  Sun,
  Moon,
  Check,
  LogOut,
  ChevronDown,
  Circle,
  Keyboard,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { signOutAdmin } from "@/features/admin/auth-actions";
import { NAV, NAV_DESTINATIONS } from "./nav";
import { CommandPalette } from "./command-palette";
import { useDensity, type Density } from "./preferences";

type EnvName = "local" | "preview" | "production";

export function AdminShell({
  user,
  counts,
  env,
  children,
}: {
  user: { email: string | null };
  /** draft counts per nav key, for the rail badges */
  counts: Record<string, number>;
  env: EnvName;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { density } = useDensity();
  const [collapsed, setCollapsed] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);

  React.useEffect(() => {
    // Hydrate rail state from localStorage post-mount (SSR-safe).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCollapsed(window.localStorage.getItem("admin:rail") === "collapsed");
  }, []);
  const toggleRail = () =>
    setCollapsed((c) => {
      const next = !c;
      window.localStorage.setItem("admin:rail", next ? "collapsed" : "open");
      return next;
    });

  // `g`-then-key go-to chords + `?` shortcuts overlay.
  React.useEffect(() => {
    let pendingGoto = false;
    let timer = 0;
    const isTyping = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable);
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (document.querySelector("[cmdk-input]")) return;
      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setShortcutsOpen(false);
        return;
      }
      if (pendingGoto) {
        const dest = NAV_DESTINATIONS.find((d) => d.goto === e.key);
        pendingGoto = false;
        window.clearTimeout(timer);
        if (dest) {
          e.preventDefault();
          router.push(dest.href as Route);
        }
        return;
      }
      if (e.key === "g") {
        pendingGoto = true;
        timer = window.setTimeout(() => (pendingGoto = false), 800);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [router]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div
      data-admin-root
      data-density={density}
      className="flex min-h-dvh bg-background text-foreground"
    >
      {/* ── Left rail ────────────────────────────────────────────────── */}
      <aside
        className={cn(
          "sticky top-0 flex h-dvh shrink-0 flex-col border-r border-border-subtle bg-card/40 transition-[width] duration-200 ease-out",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex h-14 items-center gap-2 px-3">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary font-display text-lg font-semibold text-primary-foreground">
              T
            </span>
            {!collapsed && (
              <span className="truncate font-display text-base font-medium tracking-tight">
                Travelspire
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleRail}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto grid size-7 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>

        <nav className="admin-scroll flex-1 space-y-4 overflow-y-auto px-2 py-3">
          {NAV.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="px-2 pb-1 font-mono text-[0.625rem] tracking-wider text-muted-foreground/70 uppercase">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = !item.soon && isActive(item.href);
                  const badge = counts[item.key];
                  const inner = (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 h-5 w-0.5 rounded-r-full bg-primary transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          active ? "text-foreground" : "text-muted-foreground",
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="truncate">{item.label}</span>
                          {item.soon ? (
                            <span className="ml-auto font-mono text-[0.5625rem] tracking-wide text-muted-foreground/60 uppercase">
                              soon
                            </span>
                          ) : badge ? (
                            <span className="ml-auto font-mono text-[0.625rem] tabular-nums text-muted-foreground">
                              {badge}
                            </span>
                          ) : null}
                        </>
                      )}
                    </>
                  );
                  const base = cn(
                    "relative flex h-9 items-center gap-2.5 rounded-sm px-2 text-sm transition-colors",
                    collapsed && "justify-center",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : item.soon
                        ? "cursor-default text-muted-foreground/50"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  );
                  return (
                    <li key={item.key}>
                      {item.soon ? (
                        <div className={base} title={`${item.label} — coming soon`}>
                          {inner}
                        </div>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className={base}
                          title={collapsed ? item.label : undefined}
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main column ──────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border-subtle bg-background/85 px-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("admin:palette"))}
            className="flex h-9 min-w-56 items-center gap-2.5 rounded-sm border border-input bg-card px-3 text-sm text-muted-foreground shadow-xs transition-colors hover:border-border-strong"
          >
            <Search className="size-4" />
            <span>Search or jump to…</span>
            <kbd className="ml-auto font-mono text-[0.6875rem]">⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <EnvBadge env={env} />
            <ThemeButton />
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              aria-label="Keyboard shortcuts"
              className="grid size-9 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Keyboard className="size-4" />
            </button>
            <AccountMenu email={user.email} />
          </div>
        </header>

        <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
      </div>

      <CommandPalette />
      {shortcutsOpen ? <ShortcutsOverlay onClose={() => setShortcutsOpen(false)} /> : null}
    </div>
  );
}

function EnvBadge({ env }: { env: EnvName }) {
  const tone =
    env === "production"
      ? "text-success"
      : env === "preview"
        ? "text-warning"
        : "text-muted-foreground";
  return (
    <span
      className="hidden items-center gap-1.5 rounded-xs border border-border-subtle px-2 py-1 font-mono text-[0.625rem] tracking-wide uppercase sm:inline-flex"
      title={`Environment: ${env}`}
    >
      <Circle className={cn("size-2 fill-current", tone)} />
      {env}
    </span>
  );
}

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}

const DENSITIES: Density[] = ["compact", "regular", "relaxed"];

function AccountMenu({ email }: { email: string | null }) {
  const { density, setDensity } = useDensity();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const initial = (email ?? "?").charAt(0).toUpperCase();
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-sm p-0.5 pr-1.5 transition-colors hover:bg-muted"
      >
        <span className="grid size-8 place-items-center rounded-full bg-secondary font-medium text-secondary-foreground">
          {initial}
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-1.5 w-60 overflow-hidden rounded-lg border border-border-subtle bg-card p-1.5 shadow-lg">
          <div className="truncate px-2.5 py-1.5 font-mono text-xs text-muted-foreground">{email}</div>
          <div className="my-1 h-px bg-border-subtle" />
          <p className="px-2.5 pt-1 pb-0.5 font-mono text-[0.625rem] tracking-wider text-muted-foreground/70 uppercase">
            Density
          </p>
          {DENSITIES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDensity(d)}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm capitalize transition-colors hover:bg-muted"
            >
              <Check className={cn("size-3.5", density === d ? "opacity-100" : "opacity-0")} />
              {d}
            </button>
          ))}
          <div className="my-1 h-px bg-border-subtle" />
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="size-3.5 text-muted-foreground" />
              Sign out
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

const SHORTCUTS: { keys: string; label: string }[] = [
  { keys: "⌘K", label: "Command palette" },
  { keys: "/", label: "Focus search" },
  { keys: "j / k", label: "Move focus down / up" },
  { keys: "x", label: "Select focused row" },
  { keys: "↵", label: "Open focused row" },
  { keys: "g d", label: "Go to Dashboard" },
  { keys: "g t / p / r", label: "Go to Tours / Places / Regions" },
  { keys: "esc", label: "Clear selection / close" },
  { keys: "?", label: "This help" },
];

function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[1300] grid place-items-center bg-black/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(26rem,92vw)] rounded-lg border border-border-subtle bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-lg font-medium">Keyboard shortcuts</h2>
        <ul className="mt-3 space-y-1.5">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <kbd className="rounded-xs border border-border-subtle bg-muted px-1.5 py-0.5 font-mono text-xs">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
