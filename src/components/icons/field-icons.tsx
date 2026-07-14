import * as React from "react";

/**
 * FIELD ICONS v1 — Travelspire's owned icon set (08-blueprint/14 D4).
 * 24×24 grid · 1.75 stroke · rounded caps/joins · currentColor · line-only
 * with occasional dotted detail — hand-surveyed field-guide language.
 * PUBLIC surfaces only (admin deliberately keeps Lucide).
 *
 * Usage: <PermitStamp className="size-5 text-secondary" />
 */

type IconProps = React.SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Papers & permits ─────────────────────────────────────────────────── */

export function PermitStamp(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 3.5h12v17H6z" />
      <circle cx="12" cy="10" r="3.25" />
      <path d="M12 8.4v1.6l1.1.9" />
      <path d="M8.5 16.5h7" strokeDasharray="2 2.2" />
    </Base>
  );
}

export function MapFold(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 6l5.5-2.5L15 6l5.5-2.5v14.5L15 20.5 9 18l-5.5 2.5z" />
      <path d="M9 3.5V18M15 6v14.5" />
    </Base>
  );
}

export function CashNotes(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 6.5h13.5V15H7z" />
      <circle cx="13.75" cy="10.75" r="2" />
      <path d="M3.5 9.5V18H17" />
    </Base>
  );
}

export function AltitudeTicks(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 3v18M6 5h3M6 9h4.5M6 13h3M6 17h4.5" />
      <path d="M13 18.5l3.5-6 4 6" />
    </Base>
  );
}

export function Compass(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-1.8 4.4-4 1.4 1.8-4.4z" />
      <path d="M12 2v1.6" />
    </Base>
  );
}

export function TrailDashed(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="5" cy="18.5" r="1.4" />
      <path d="M6.5 17.5C10 14 7 10.5 11 8.5s7.5.5 8-4" strokeDasharray="2.6 2.8" />
      <path d="M19 2.5l1.6 2.6-3 .3z" />
    </Base>
  );
}

/* ── Sacred & cultural ────────────────────────────────────────────────── */

export function PrayerFlags(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 8C8 4.5 16 10 21.5 6.5" />
      <path d="M5.5 6.6l.3 3.4 3-.9-.4-3.2zM11.2 7.4l.1 3.5 3-.3-.2-3.4zM16.9 7.9l-.3 3.3 2.9-.7.2-3.1z" />
    </Base>
  );
}

export function Monastery(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20.5h16" />
      <path d="M6.5 20.5v-6.5h11v6.5" />
      <path d="M5 14L12 9.5 19 14" />
      <path d="M9 9.5l3-2.5 3 2.5" />
      <path d="M12 4.5V7M12 17v3.5" />
    </Base>
  );
}

export function Stupa(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.5 13.5a4.5 4.5 0 0 1 9 0" />
      <path d="M6 16.5h12M4.5 20.5h15M12 3.5v3M10.5 8h3" />
      <path d="M7.5 13.5h9v3h-9zM6 16.5l-1.5 4M18 16.5l1.5 4" />
    </Base>
  );
}

export function ButterLamp(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4.5c1.4 1.8 1.4 3-0 4.2-1.4-1.2-1.4-2.4 0-4.2z" />
      <path d="M8 11h8l-1 4.5H9z" />
      <path d="M7 20.5h10M10 15.5l-1 5M14 15.5l1 5" />
    </Base>
  );
}

export function Mithun(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8.5 9.5C5.5 9 4 6.5 4.5 4c2.5.5 4 2 4.5 4" />
      <path d="M15.5 9.5c3-.5 4.5-3 4-5.5-2.5.5-4 2-4.5 4" />
      <path d="M9 8.5a4.5 5 0 0 1 6 0l.7 5.2a3.7 4 0 0 1-7.4 0z" />
      <path d="M10.4 12.5h.01M13.6 12.5h.01M11 17h2" />
    </Base>
  );
}

export function LogDrum(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 9.5h16v6.5H4z" />
      <ellipse cx="4" cy="12.75" rx="1.6" ry="3.25" />
      <path d="M8 9.5v6.5M8 11.5h9" strokeDasharray="2 2.4" />
      <path d="M17 5l3 2.5" />
    </Base>
  );
}

/* ── Land & nature ────────────────────────────────────────────────────── */

export function Hornbill(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 8.5C9 8.5 6.5 11 6.5 15v5.5" />
      <path d="M13 8.5c0-2 1.5-3.5 3.2-3.5 1.2 0 2.3.7 2.8 2l-6 1.5z" />
      <path d="M13 7.2C13 5.5 14.5 4 16.5 4" />
      <path d="M15.5 6.6h.01" />
      <path d="M10 20.5c3.5 0 6-2.5 6-6v-3" />
    </Base>
  );
}

export function Bamboo(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3v18M9 8h2.4M9 13.5h2.4M9 18.5h2.4" />
      <path d="M15.5 5v16M15.5 10h-2.2M15.5 15.5h-2.2" />
      <path d="M15.5 5c1.8-.4 3.2-1.5 4-3" />
    </Base>
  );
}

export function RiceTerrace(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 18.5c4-2 7-2 9 0s5 2 9 0" />
      <path d="M4.5 14c3.4-1.7 6-1.7 7.5 0s4.6 1.7 7.5 0" />
      <path d="M12 10.5V8M10.5 9.5L12 8l1.5 1.5" />
    </Base>
  );
}

export function Orchid(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 8.5c-1-2.2 0-4.2 1.6-5 1 1.4 1 3.6-.2 5" />
      <path d="M13 9c2.3-.6 4.2.5 4.8 2.2-1.6.9-3.8.4-4.9-1" />
      <path d="M12.3 9.6c.7 2.2-.3 4.2-2 4.9-.9-1.5-.6-3.7.7-5" />
      <path d="M11.5 8.8C9.3 8.4 7.6 9.7 7.2 11.5c1.7.7 3.8 0 4.8-1.5" />
      <circle cx="12.2" cy="9.3" r="1" />
      <path d="M11 21c.5-4 .2-6-1.5-8.5" />
    </Base>
  );
}

export function Pine(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.5 10.5L12 3.5l4.5 7" />
      <path d="M6 16.5L12 8l6 8.5" />
      <path d="M12 16.5V21M9.5 21h5" />
    </Base>
  );
}

export function MistCloud(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 12.5a4 4 0 0 1 7.6-1.6A3 3 0 1 1 15 16.5H7a2.5 2.5 0 0 1-1-4z" />
      <path d="M5 19.5h9M16.5 19.5h2.5" strokeDasharray="3 3" />
    </Base>
  );
}

export function RiverBraid(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 3c-2.5 4 2.5 6 0 9.5S10 19 8 21" />
      <path d="M15.5 3c2.5 4-2.5 6 0 9.5S13.5 19 15.5 21" />
      <path d="M12 5.5v2M12 11v2M12 16.5v2" strokeDasharray="1.6 2.6" />
    </Base>
  );
}

export function Waterfall(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4h6.5v6.5" />
      <path d="M10.5 4c3 0 4.5 1.5 4.5 4v1" />
      <path d="M12.5 10.5V16M15.5 11v6M18.5 9v8.5" />
      <path d="M4 20c3-1.5 6-1.5 8 0s5 1.5 8 0" />
    </Base>
  );
}

export function SunriseRidge(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 10a4 4 0 0 1 8 0" />
      <path d="M12 3v1.8M5.5 5.5l1.3 1.3M18.5 5.5l-1.3 1.3" />
      <path d="M2.5 18.5l5-6 3.5 3.5 4-5 6.5 7.5" />
    </Base>
  );
}

export function SnowPass(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20.5L11 8l7 12.5" />
      <path d="M8.6 12.3l2.4 2 2.4-2" />
      <path d="M18.5 4.5v4M16.8 5.5l3.4 2M20.2 5.5l-3.4 2" />
    </Base>
  );
}

/* ── The road & the stay ──────────────────────────────────────────────── */

export function MountainPass(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5L12 5l8.5 15.5" />
      <path d="M12 20.5l3-3h-5l3.5-3h-4l2.5-2.5" />
    </Base>
  );
}

export function HangingBridge(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 7.5c4.5 5.5 13.5 5.5 18 0" />
      <path d="M3 7.5v6M21 7.5v6" />
      <path d="M6.2 10.6v2.4M9.5 12v1.5M12 12.4V14M14.5 12v1.5M17.8 10.6v2.4" />
      <path d="M3 13.5h18" strokeDasharray="2.4 2" />
    </Base>
  );
}

export function Tent(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5L12 6l8.5 14.5z" />
      <path d="M12 20.5l-2.6-5 2.6-2 2.6 2z" />
      <path d="M12 6l-1.5-2.5M12 6l1.5-2.5" />
    </Base>
  );
}

export function HomestayHut(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 11.5l8-6.5 8 6.5" />
      <path d="M6.5 11.5V17h11v-5.5" />
      <path d="M8 17v3.5M16 17v3.5M12 17v-3h.01" />
      <path d="M10.5 14h3" />
    </Base>
  );
}

export function Jeep(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 16v-4.5h4l2-3.5h6.5l1.5 3.5h4V16" />
      <circle cx="7.5" cy="16.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
      <path d="M9.5 16.5h5M3 16h2.5M18.5 16H21M12 8v3.5" />
    </Base>
  );
}

export function Motorcycle(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="5.5" cy="16.5" r="3" />
      <circle cx="18.5" cy="16.5" r="3" />
      <path d="M5.5 16.5l3.5-6h4.5l3 6" />
      <path d="M13.5 10.5L12 8h-2.5M13.5 10.5L17 8.5M17 8.5h2l1 1.5" />
    </Base>
  );
}

export function FuelCan(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 7.5h12V20H6z" />
      <path d="M8 7.5V5h5v2.5" />
      <path d="M8.5 11l7 6.5M15.5 11l-7 6.5" />
    </Base>
  );
}

export function SignalTower(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 10v6M8.5 21l3.5-5 3.5 5" />
      <circle cx="12" cy="8.5" r="1.2" />
      <path d="M8.8 5.6a4.6 4.6 0 0 1 6.4 0M6.6 3.2a8 8 0 0 1 10.8 0" />
    </Base>
  );
}
