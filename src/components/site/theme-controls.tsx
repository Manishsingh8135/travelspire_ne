"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMonitor, IconMoon, IconSun } from "@/components/icons";
import { cn } from "@/lib/utils";

/* Header toggle: one tap flips light ↔ dark. Both glyphs are always in the
   markup and CSS picks one from data-theme, so there is no hydration flash. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Switch between light and dark theme"
      className={cn(
        "grid size-10 place-items-center rounded-control text-fg-muted transition-colors hover:bg-fg/[0.06] hover:text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        className,
      )}
    >
      <IconMoon size={20} className="dark:hidden" />
      <IconSun size={20} className="hidden dark:block" />
    </button>
  );
}

const choices = [
  { value: "light", label: "Light", Icon: IconSun },
  { value: "dark", label: "Dark", Icon: IconMoon },
  { value: "system", label: "System", Icon: IconMonitor },
] as const;

/* Footer control: explicit light / dark / system. */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("inline-flex rounded-control border border-line p-0.5", className)}>
      {choices.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-[0.375rem] px-2.5 font-ui text-small transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
              active ? "bg-fg/[0.08] font-medium text-fg" : "text-fg-subtle hover:text-fg",
            )}
          >
            <Icon size={16} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
