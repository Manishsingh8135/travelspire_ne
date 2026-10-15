import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Colors - Ocean and Forest Theme
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
        // Secondary Colors - Ocean Blue
        secondary: {
          50: "rgb(var(--secondary-50) / <alpha-value>)",
          100: "rgb(var(--secondary-100) / <alpha-value>)",
          200: "rgb(var(--secondary-200) / <alpha-value>)",
          300: "rgb(var(--secondary-300) / <alpha-value>)",
          400: "rgb(var(--secondary-400) / <alpha-value>)",
          500: "rgb(var(--secondary-500) / <alpha-value>)",
          600: "rgb(var(--secondary-600) / <alpha-value>)",
          700: "rgb(var(--secondary-700) / <alpha-value>)",
          800: "rgb(var(--secondary-800) / <alpha-value>)",
          900: "rgb(var(--secondary-900) / <alpha-value>)",
          950: "rgb(var(--secondary-950) / <alpha-value>)",
        },
        // Accent Colors - Mountain Mist
        accent: {
          50: "rgb(var(--accent-50) / <alpha-value>)",
          100: "rgb(var(--accent-100) / <alpha-value>)",
          200: "rgb(var(--accent-200) / <alpha-value>)",
          300: "rgb(var(--accent-300) / <alpha-value>)",
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
          700: "rgb(var(--accent-700) / <alpha-value>)",
          800: "rgb(var(--accent-800) / <alpha-value>)",
          900: "rgb(var(--accent-900) / <alpha-value>)",
          950: "rgb(var(--accent-950) / <alpha-value>)",
        },
        // ── Light editorial system ────────────────────────────────────────
        // Warm neutrals. Never pure white, never pure black: on cream grounds
        // both read as cheap, and hairlines do the structural work instead.
        paper: {
          DEFAULT: "#FBF8F1",
          soft: "#F4EFE4",
          deep: "#EBE4D5",
        },
        ink: {
          DEFAULT: "#14201A",
          soft: "#3D4A43",
          muted: "#6B766E",
          faint: "#949D96",
          band: "#0E1A15",
        },
        moss: {
          DEFAULT: "#2F4A3A",
          deep: "#253C2F",
        },
        clay: {
          DEFAULT: "#9A5A38",
          soft: "#B0714E",
        },
        brass: "#B08A4F",
        tide: "#2C5B72",
        // Pulled from the logo mark; reserved for festival + seasonal items.
        ember: "#E2762B",

        // ── Field Guide semantic tokens (globals.css) ────────────────────
        // Light/dark values swap under data-theme; never use raw hex in
        // components that are built on these.
        canvas: {
          DEFAULT: "rgb(var(--c-canvas) / <alpha-value>)",
          subtle: "rgb(var(--c-canvas-subtle) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          raised: "rgb(var(--c-surface-raised) / <alpha-value>)",
        },
        inverse: "rgb(var(--c-inverse) / <alpha-value>)",
        "on-inverse": "rgb(var(--c-on-inverse) / <alpha-value>)",
        fg: {
          DEFAULT: "rgb(var(--c-fg) / <alpha-value>)",
          muted: "rgb(var(--c-fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--c-fg-subtle) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--c-line) / <alpha-value>)",
          strong: "rgb(var(--c-line-strong) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--c-brand) / <alpha-value>)",
          hover: "rgb(var(--c-brand-hover) / <alpha-value>)",
          soft: "rgb(var(--c-brand-soft) / <alpha-value>)",
        },
        "on-brand": "rgb(var(--c-on-brand) / <alpha-value>)",
        terra: {
          DEFAULT: "rgb(var(--c-terra) / <alpha-value>)",
          soft: "rgb(var(--c-terra-soft) / <alpha-value>)",
        },
        marigold: {
          DEFAULT: "rgb(var(--c-marigold) / <alpha-value>)",
          soft: "rgb(var(--c-marigold-soft) / <alpha-value>)",
        },
        positive: {
          DEFAULT: "rgb(var(--c-positive) / <alpha-value>)",
          soft: "rgb(var(--c-positive-soft) / <alpha-value>)",
        },
        caution: {
          DEFAULT: "rgb(var(--c-caution) / <alpha-value>)",
          soft: "rgb(var(--c-caution-soft) / <alpha-value>)",
        },
        critical: {
          DEFAULT: "rgb(var(--c-critical) / <alpha-value>)",
          soft: "rgb(var(--c-critical-soft) / <alpha-value>)",
        },
        notice: {
          DEFAULT: "rgb(var(--c-notice) / <alpha-value>)",
          soft: "rgb(var(--c-notice-soft) / <alpha-value>)",
        },
        focus: "rgb(var(--c-focus) / <alpha-value>)",

        // UI Colors
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",
        popover: "rgb(var(--popover) / <alpha-value>)",
        "popover-foreground": "rgb(var(--popover-foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        // Field Guide: three radii, named by what they round.
        control: "0.5rem",
        card: "0.75rem",
        panel: "1rem",
      },
      maxWidth: {
        page: "80rem",
        wide: "90rem",
        prose: "42.5rem",
      },
      boxShadow: {
        // Warm-tinted and very low opacity. Grey shadows on cream look dirty.
        card: '0 2px 4px rgba(20,32,26,0.03), 0 12px 28px -12px rgba(20,32,26,0.10)',
        lift: '0 4px 8px rgba(20,32,26,0.04), 0 24px 48px -20px rgba(20,32,26,0.16)',
        cta: '0 8px 20px -10px rgba(47,74,58,0.5)',
        nav: '0 8px 24px -16px rgba(20,32,26,0.25)',
        frame: '0 30px 80px -40px rgba(20,32,26,0.45)',
        // Field Guide elevation; values swap per theme in globals.css.
        e1: 'var(--e1)',
        e2: 'var(--e2)',
        e3: 'var(--e3)',
        'glow-sm': '0 2px 8px -1px rgba(var(--primary-500), 0.15)',
        'glow': '0 4px 12px -2px rgba(var(--primary-500), 0.2)',
        'glow-lg': '0 8px 20px -4px rgba(var(--primary-500), 0.25)',
        'glow-xl': '0 12px 28px -6px rgba(var(--primary-500), 0.3)',
        'inner-glow': 'inset 0 2px 8px -2px rgba(var(--primary-500), 0.2)',
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",

        // ── Field Guide type scale ───────────────────────────────────────
        // Named by role, not size, so they never collide with the legacy
        // sm/base overrides above. Headings interpolate linearly between a
        // 360px phone and a 1280px desktop. Nothing renders below 12px.
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
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        display: ["var(--font-display)", ...fontFamily.serif],
        // Field Guide body + UI face (Instrument Sans).
        ui: ["var(--font-ui)", ...fontFamily.sans],
      },
      keyframes: {
        // Existing keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // New smooth transitions
        "smooth-fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "smooth-fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        // Hover effects
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Loading states
        "shimmer": {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "smooth-fade-in": "smooth-fade-in 0.6s ease-out",
        "smooth-fade-out": "smooth-fade-out 0.6s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(to right, rgb(var(--primary-500)), rgb(var(--secondary-500)))",
        "gradient-secondary": "linear-gradient(to right, rgb(var(--secondary-500)), rgb(var(--primary-500)))",
        "gradient-accent": "linear-gradient(to right, rgb(var(--accent-500)), rgb(var(--secondary-500)))",
        "gradient-diagonal": "linear-gradient(to top right, rgb(var(--primary-600)), rgb(var(--primary-500)), rgb(var(--secondary-500)))",
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;

export default config;