"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* CSS-driven so there's no SSR/hydration mismatch and no setState-in-effect */}
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
