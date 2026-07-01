import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * GlassPanel — a translucent surface used ONLY where depth is earned over
 * photography (hero info cards, map layer panel, floating strips). Token-driven
 * (`--glass*`), restrained — not glassmorphism-everywhere (design doc §13).
 * `dark` reads over imagery / dark sections; `light` over paper sections.
 */
const glassPanelVariants = cva("border backdrop-blur-md", {
  variants: {
    tone: {
      dark: "border-glass-border bg-glass text-mist-50 shadow-lg",
      darker: "border-glass-border bg-glass-strong text-mist-50 shadow-xl",
      light: "border-black/5 bg-glass-light text-basalt-900 shadow-md",
    },
    radius: {
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    },
  },
  defaultVariants: { tone: "dark", radius: "xl" },
});

type GlassPanelProps = React.ComponentProps<"div"> & VariantProps<typeof glassPanelVariants>;

function GlassPanel({ className, tone, radius, ...props }: GlassPanelProps) {
  return <div className={cn(glassPanelVariants({ tone, radius }), className)} {...props} />;
}

export { GlassPanel, glassPanelVariants };
