"use client";

import * as React from "react";

/**
 * Owned theme provider (replaced next-themes: its injected <script> trips
 * React 19.2's script-in-client-render warning, and we only ever needed
 * light/dark via data-theme with no system detection).
 *
 * Works with the pre-hydration script in the root layout, which stamps
 * `data-theme` on <html> from localStorage BEFORE first paint (server-
 * rendered script — executes normally, no client warning). This provider
 * reads that as its initial truth and keeps state, DOM and storage in sync.
 */

export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "ts-theme";

type ThemeContextValue = {
  theme: Theme;
  /** Same as `theme` — we don't do system detection; kept for API parity. */
  resolvedTheme: Theme;
  setTheme: (theme: Theme | string) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

function readInitial(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(readInitial);

  const setTheme = React.useCallback((next: Theme | string) => {
    const value: Theme = next === "dark" ? "dark" : "light";
    setThemeState(value);
    document.documentElement.dataset.theme = value;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      /* private mode — theme just won't persist */
    }
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme: theme, setTheme }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Inline pre-hydration script body — rendered by the SERVER layout. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.dataset.theme=t==="dark"?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;
