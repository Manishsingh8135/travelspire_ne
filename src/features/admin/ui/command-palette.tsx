"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useTheme } from "@/components/theme-provider";
import { Command } from "cmdk";
import {
  Search,
  Plus,
  Route as RouteIcon,
  MapPin,
  Map,
  Sun,
  Moon,
  Rows3,
  CornerDownLeft,
} from "lucide-react";
import { NAV_DESTINATIONS } from "./nav";
import { useDensity, type Density } from "./preferences";
import { searchAdminEntities, type SearchHit } from "@/features/admin/search-actions";

const KIND_ICON = { tour: RouteIcon, place: MapPin, region: Map } as const;

const CREATE = [
  { label: "New tour", href: "/admin/tours/new" },
  { label: "New place", href: "/admin/places/new" },
  { label: "New region", href: "/admin/regions/new" },
];

export function CommandPalette() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { density, setDensity } = useDensity();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [hits, setHits] = React.useState<SearchHit[]>([]);
  const [loading, setLoading] = React.useState(false);

  // ⌘K toggles; the topbar search button dispatches `admin:palette`.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("admin:palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("admin:palette", onOpen);
    };
  }, []);

  // Debounced server search.
  React.useEffect(() => {
    const term = query.trim();
    if (!term) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHits([]);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    const id = window.setTimeout(async () => {
      try {
        const res = await searchAdminEntities(term);
        if (active) setHits(res);
      } finally {
        if (active) setLoading(false);
      }
    }, 160);
    return () => {
      active = false;
      window.clearTimeout(id);
    };
  }, [query]);

  const run = React.useCallback(
    (fn: () => void) => {
      setOpen(false);
      setQuery("");
      fn();
    },
    [],
  );

  const term = query.trim().toLowerCase();
  const navMatches = NAV_DESTINATIONS.filter((i) => !term || i.label.toLowerCase().includes(term));
  const createMatches = CREATE.filter((c) => !term || c.label.toLowerCase().includes(term));
  const nextDensity: Density =
    density === "compact" ? "regular" : density === "regular" ? "relaxed" : "compact";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      shouldFilter={false}
      className="fixed top-[18vh] left-1/2 z-[1400] w-[min(38rem,92vw)] -translate-x-1/2 overflow-hidden rounded-lg border border-border-subtle bg-card shadow-xl"
    >
      <div className="flex items-center gap-2.5 border-b border-border-subtle px-3.5">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search or jump to…"
          className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {loading ? (
          <span
            aria-hidden
            className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent text-muted-foreground"
          />
        ) : null}
      </div>

      <Command.List className="admin-scroll max-h-[min(24rem,60vh)] overflow-y-auto p-1.5">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
          No matches.
        </Command.Empty>

        {hits.length > 0 && (
          <Command.Group heading="Results">
            {hits.map((hit) => {
              const Icon = KIND_ICON[hit.kind];
              return (
                <Command.Item
                  key={`${hit.kind}-${hit.id}`}
                  value={`hit-${hit.kind}-${hit.id}`}
                  onSelect={() => run(() => router.push(hit.href as Route))}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-sm"
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-foreground">{hit.label}</span>
                  <span className="ml-auto truncate font-mono text-xs text-muted-foreground">
                    {hit.sub}
                  </span>
                </Command.Item>
              );
            })}
          </Command.Group>
        )}

        {createMatches.length > 0 && (
          <Command.Group heading="Create">
            {createMatches.map((c) => (
              <Command.Item
                key={c.href}
                value={`create-${c.href}`}
                onSelect={() => run(() => router.push(c.href as Route))}
                className="flex items-center gap-2.5 px-2.5 py-2 text-sm"
              >
                <Plus className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-foreground">{c.label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {navMatches.length > 0 && (
          <Command.Group heading="Go to">
            {navMatches.map((item) => (
              <Command.Item
                key={item.key}
                value={`nav-${item.key}`}
                onSelect={() => run(() => router.push(item.href as Route))}
                className="flex items-center gap-2.5 px-2.5 py-2 text-sm"
              >
                <item.icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
                {item.goto ? (
                  <kbd className="ml-auto font-mono text-[0.6875rem] text-muted-foreground">
                    g {item.goto}
                  </kbd>
                ) : null}
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Preferences">
          <Command.Item
            value="pref-theme"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            className="flex items-center gap-2.5 px-2.5 py-2 text-sm"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4 shrink-0 text-muted-foreground" />
            ) : (
              <Moon className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="text-foreground">
              Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
            </span>
          </Command.Item>
          <Command.Item
            value="pref-density"
            onSelect={() => run(() => setDensity(nextDensity))}
            className="flex items-center gap-2.5 px-2.5 py-2 text-sm"
          >
            <Rows3 className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-foreground">Density: {nextDensity}</span>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex items-center gap-3 border-t border-border-subtle px-3 py-2 font-mono text-[0.6875rem] text-muted-foreground">
        <span className="flex items-center gap-1">
          <CornerDownLeft className="size-3" /> open
        </span>
        <span>esc close</span>
        <span className="ml-auto">⌘K</span>
      </div>
    </Command.Dialog>
  );
}
