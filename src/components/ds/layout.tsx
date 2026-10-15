import * as React from "react";
import { cn } from "@/lib/utils";

/* One container standard for every page: the left edge never jumps between
   routes. `wide` is for media grids, `prose` for long reading. */
const containerWidths = {
  page: "max-w-page",
  wide: "max-w-wide",
  prose: "max-w-prose",
} as const;

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof containerWidths;
};

export function Container({ size = "page", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", containerWidths[size], className)}
      {...props}
    />
  );
}

/* Sections set their own ground. `inverse` is a dark island in either mode:
   it re-scopes the tokens with data-theme="dark", so every component inside
   (buttons, muted text, cards) adapts without a single dark: variant. */
const sectionTones = {
  default: "",
  subtle: "bg-canvas-subtle",
  inverse: "bg-inverse",
} as const;

const sectionSpacing = {
  default: "py-16 md:py-24",
  compact: "py-12 md:py-16",
  none: "",
} as const;

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: keyof typeof sectionTones;
  spacing?: keyof typeof sectionSpacing;
};

export function Section({ tone = "default", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      data-theme={tone === "inverse" ? "dark" : undefined}
      className={cn(sectionTones[tone], sectionSpacing[spacing], className)}
      {...props}
    />
  );
}
