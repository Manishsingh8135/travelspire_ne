"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchBarProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  /** className for the wrapping element (the input keeps `className`). */
  containerClassName?: string;
}

/**
 * The one search input, reused everywhere (atlas, map, admin, marketplace).
 * Controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
 * See docs-new/03-frontend/04-component-library.md.
 */
function SearchBar({
  className,
  containerClassName,
  value,
  defaultValue,
  onValueChange,
  onClear,
  placeholder = "Search…",
  ...props
}: SearchBarProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = isControlled ? value : internal;

  function setValue(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <div className={cn("group relative flex items-center", containerClassName)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
      />
      <input
        type="search"
        role="searchbox"
        value={current}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "h-11 w-full rounded-md border border-input bg-card pr-10 pl-10 text-base text-foreground shadow-xs outline-none transition-colors",
          "placeholder:text-muted-foreground focus-visible:border-ring",
          "[&::-webkit-search-cancel-button]:appearance-none",
          "md:text-sm",
          className,
        )}
        {...props}
      />
      {current ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("");
            onClear?.();
          }}
          className="absolute right-2.5 grid size-7 place-items-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export { SearchBar };
