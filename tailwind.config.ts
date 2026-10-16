import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

/* Evergreen design system — see planning/2026-q4-design-system.md.
   Every colour is a semantic token whose light and dark values live in
   globals.css; the type scale is named by role. Keep the custom names here in
   step with the tailwind-merge config in src/lib/utils.ts. */

const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config = {
  // Dark styles key off next-themes' data-theme, so a data-theme="dark"
  // island (inverse sections) gets them too.
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: token("canvas"), subtle: token("canvas-subtle") },
        surface: { DEFAULT: token("surface"), raised: token("surface-raised") },
        inverse: token("inverse"),
        "on-inverse": token("on-inverse"),
        fg: { DEFAULT: token("fg"), muted: token("fg-muted"), subtle: token("fg-subtle") },
        line: { DEFAULT: token("line"), strong: token("line-strong") },
        brand: { DEFAULT: token("brand"), hover: token("brand-hover"), soft: token("brand-soft") },
        "on-brand": token("on-brand"),
        highlight: { DEFAULT: token("highlight"), soft: token("highlight-soft") },
        seasonal: { DEFAULT: token("seasonal"), soft: token("seasonal-soft") },
        positive: { DEFAULT: token("positive"), soft: token("positive-soft") },
        caution: { DEFAULT: token("caution"), soft: token("caution-soft") },
        critical: { DEFAULT: token("critical"), soft: token("critical-soft") },
        notice: { DEFAULT: token("notice"), soft: token("notice-soft") },
        focus: token("focus"),
      },
      // Named by role, not size. Headings interpolate linearly between a
      // 360px phone and a 1280px desktop. Nothing renders below 12px.
      fontSize: {
        display: ["clamp(2.5rem, 1.717rem + 3.478vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "600" }],
        h1: ["clamp(2.125rem, 1.587rem + 2.391vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.022em", fontWeight: "600" }],
        h2: ["clamp(1.75rem, 1.457rem + 1.304vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.018em", fontWeight: "600" }],
        h3: ["clamp(1.25rem, 1.152rem + 0.435vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "600" }],
        lead: ["clamp(1.0625rem, 0.989rem + 0.326vw, 1.25rem)", { lineHeight: "1.55" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.8125rem", { lineHeight: "1.45" }],
        eyebrow: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      fontFamily: {
        // Instrument Sans for everything; Instrument Serif for the one italic
        // accent per heading.
        ui: ["var(--font-ui)", ...fontFamily.sans],
        sans: ["var(--font-ui)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.serif],
      },
      // Three radii, named by what they round.
      borderRadius: {
        control: "0.5rem",
        card: "0.75rem",
        panel: "1rem",
      },
      maxWidth: {
        page: "80rem",
        wide: "90rem",
        prose: "42.5rem",
      },
      // Elevation; values swap per theme in globals.css.
      boxShadow: {
        e1: "var(--e1)",
        e2: "var(--e2)",
        e3: "var(--e3)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;

export default config;
