"use client";

import * as React from "react";

export type Density = "compact" | "regular" | "relaxed";

type PreferencesValue = {
  density: Density;
  setDensity: (d: Density) => void;
};

const PreferencesContext = React.createContext<PreferencesValue | null>(null);
const STORAGE_KEY = "admin:density";

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensityState] = React.useState<Density>("regular");

  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "compact" || saved === "regular" || saved === "relaxed") {
      // Hydrate from localStorage post-mount (SSR-safe; avoids a hydration mismatch).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDensityState(saved);
    }
  }, []);

  const setDensity = React.useCallback((d: Density) => {
    setDensityState(d);
    window.localStorage.setItem(STORAGE_KEY, d);
  }, []);

  const value = React.useMemo(() => ({ density, setDensity }), [density, setDensity]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useDensity(): PreferencesValue {
  const ctx = React.useContext(PreferencesContext);
  if (!ctx) throw new Error("useDensity must be used within PreferencesProvider");
  return ctx;
}
