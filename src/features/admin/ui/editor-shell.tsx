"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { useActionState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { FormState } from "../db-error";

/**
 * EditorShell — the one editor chrome every entity composes (13-admin-editor-system §2).
 * One <form> wraps all tabs; tabs stay MOUNTED (hidden) so switching never drops
 * an edit; a sticky save bar appears when dirty; beforeunload guards while dirty.
 */

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;
export type EditorTab = { id: string; label: string };

const EditorFormContext = React.createContext<{ state: FormState; markDirty: () => void }>({
  state: {},
  markDirty: () => {},
});
/** Field errors + programmatic dirty marking, for composers inside the shell. */
export function useEditorForm() {
  return React.useContext(EditorFormContext);
}

const ActiveTabContext = React.createContext<string>("");

/** A tab's content. Always mounted; hidden when inactive (data-safety contract §3.2). */
export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const active = React.useContext(ActiveTabContext);
  return (
    <div hidden={active !== id} className="flex min-w-0 flex-col gap-5">
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: string | null | undefined }) {
  const s = status ?? "draft";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase",
        s === "published" && "border-success/40 text-success",
        s === "draft" && "border-warning/40 text-warning",
        s !== "published" && s !== "draft" && "border-border-subtle text-muted-foreground",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {s}
    </span>
  );
}

export function EditorShell({
  action,
  backHref,
  backLabel,
  kicker,
  title,
  slug,
  status,
  liveHref,
  actions,
  tabs,
  summary,
  rail,
  children,
}: {
  action: Action;
  backHref: string;
  backLabel: string;
  /** Mono kicker, e.g. "TOUR · EXPEDITION". */
  kicker: string;
  title: string;
  slug?: string | null;
  status?: string | null;
  liveHref?: string;
  /** Extra header controls (e.g. PublishButton) rendered beside the status pill. */
  actions?: React.ReactNode;
  tabs: EditorTab[];
  /** Mono computed facts under the tab rail (desktop). */
  summary?: React.ReactNode;
  /** Right context rail (xl+): pipeline panel, flags, etc. */
  rail?: React.ReactNode;
  children: React.ReactNode;
}) {
  const firstTab = tabs[0]?.id ?? "";
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault(firstTab));
  const [dirty, setDirty] = React.useState(false);
  const markDirty = React.useCallback(() => setDirty(true), []);

  // Success → toast + clean; the action returns {ok:true} instead of redirecting.
  const wrapped = React.useCallback(
    async (prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await action(prev, formData);
      if (result.ok) {
        toast.success("Saved");
        setDirty(false);
      }
      return result;
    },
    [action],
  );
  const [state, formAction, pending] = useActionState<FormState, FormData>(wrapped, {});

  // Never lose work silently (data-safety contract §3.3).
  React.useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const activeId = tabs.some((t) => t.id === tab) ? tab : firstTab;
  const showBar = dirty || pending || !!state.error;

  return (
    <form
      action={formAction}
      onInput={markDirty}
      onChange={markDirty}
      className="flex flex-col gap-5"
    >
      {/* ── Header ── */}
      <header className="flex flex-col gap-2 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <Link
            href={backHref as Route}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> {backLabel}
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {kicker}
            </p>
            <h1 className="truncate text-xl font-semibold text-foreground">{title}</h1>
            {slug ? (
              <p className="font-mono text-xs text-muted-foreground">{slug}</p>
            ) : null}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <StatusPill status={status} />
            {actions}
            {liveHref ? (
              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View live <ExternalLink className="size-3" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Mobile tabs — horizontal chips */}
        <nav className="-mb-px flex gap-1 overflow-x-auto lg:hidden" aria-label="Editor sections">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 text-sm transition-colors",
                activeId === t.id
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border-subtle text-muted-foreground hover:text-foreground",
              )}
              aria-current={activeId === t.id ? "page" : undefined}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Body: rail · content · context ── */}
      <div className="gap-6 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start xl:grid-cols-[180px_minmax(0,1fr)_280px] xl:gap-8">
        {/* Desktop tab rail */}
        <nav className="sticky top-4 hidden flex-col gap-0.5 lg:flex" aria-label="Editor sections">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative rounded-md px-3 py-2 text-left text-sm transition-colors",
                activeId === t.id
                  ? "bg-muted font-medium text-foreground before:absolute before:top-1/2 before:left-0 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-accent"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
              aria-current={activeId === t.id ? "page" : undefined}
            >
              {t.label}
            </button>
          ))}
          {summary ? (
            <div className="mt-4 flex flex-col gap-1 border-t border-border-subtle pt-4 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              {summary}
            </div>
          ) : null}
        </nav>

        {/* Tab content — all mounted, one visible */}
        <EditorFormContext.Provider value={{ state, markDirty }}>
          <ActiveTabContext.Provider value={activeId}>
            <div className="min-w-0 pb-24">{children}</div>
          </ActiveTabContext.Provider>
        </EditorFormContext.Provider>

        {/* Context rail */}
        {rail ? <aside className="sticky top-4 hidden flex-col gap-4 xl:flex">{rail}</aside> : null}
      </div>

      {/* ── Sticky save bar ── */}
      <div
        className={cn(
          "sticky bottom-0 z-20 -mx-1 transition-transform",
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="flex items-center gap-3 rounded-t-lg border-t border-x border-border-subtle bg-background/95 px-4 py-3 backdrop-blur">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={cn("size-1.5 rounded-full", state.error ? "bg-danger" : "bg-warning")}
              aria-hidden
            />
            {state.error ?? (pending ? "Saving…" : "Unsaved changes")}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (window.confirm("Discard unsaved changes?")) window.location.reload();
              }}
            >
              Discard
            </Button>
            <Button type="submit" size="sm" loading={pending}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
