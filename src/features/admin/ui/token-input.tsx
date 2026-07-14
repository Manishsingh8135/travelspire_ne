"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useEditorForm } from "./editor-shell";

/**
 * TokenInput — a chip list (Enter/comma to add, × or Backspace to remove).
 * The no-flatten law as UI: lists stay tokens, never prose. Emits either a
 * hidden JSON input (`name`) or a callback (`onTokensChange`) for composers.
 */
export function TokenInput({
  name,
  defaultTokens = [],
  onTokensChange,
  placeholder,
  className,
}: {
  name?: string;
  defaultTokens?: string[];
  onTokensChange?: (tokens: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  const [tokens, setTokens] = React.useState<string[]>(defaultTokens);
  const [text, setText] = React.useState("");
  const { markDirty } = useEditorForm();

  const commit = (next: string[]) => {
    setTokens(next);
    onTokensChange?.(next);
    markDirty();
  };

  const add = () => {
    const value = text.trim().replace(/,+$/, "");
    if (!value) return;
    if (!tokens.includes(value)) commit([...tokens, value]);
    setText("");
  };

  return (
    <div
      className={cn(
        "flex min-h-11 flex-wrap items-center gap-1.5 rounded-sm border border-input bg-card px-2 py-1.5 transition-colors focus-within:border-ring",
        className,
      )}
    >
      {tokens.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-muted px-2.5 py-1 text-xs text-foreground"
        >
          {t}
          <button
            type="button"
            aria-label={`Remove ${t}`}
            className="text-muted-foreground transition-colors hover:text-danger"
            onClick={() => commit(tokens.filter((x) => x !== t))}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !text && tokens.length) {
            commit(tokens.slice(0, -1));
          }
        }}
        onBlur={add}
        placeholder={tokens.length ? "" : placeholder}
        className="min-w-28 flex-1 bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
      />
      {name ? <input type="hidden" name={name} value={JSON.stringify(tokens)} readOnly /> : null}
    </div>
  );
}
