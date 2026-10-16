import * as React from "react";

/* Travelspire icon set — drawn for this site, not borrowed.
   Grid: 24px, 2px safe margin. Stroke: 1.6, round caps and joins, no fills.
   Corners on boxes: 2px. Colour: currentColor, so icons take the text colour
   of their context. Decorative by default (aria-hidden); pass `title` when
   the icon is the only label. Server-safe: no hooks, no client code. */

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  size?: number | string;
  title?: string;
};

export type Icon = React.FC<IconProps>;

function createIcon(displayName: string, children: React.ReactNode): Icon {
  const Component: Icon = ({ size = 24, title, strokeWidth = 1.6, className, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
  Component.displayName = `Icon${displayName}`;
  return Component;
}

/* ── Interface ─────────────────────────────────────────────────────── */

export const IconMenu = createIcon("Menu", <path d="M4 7h16M4 12h16M4 17h10" />);
export const IconClose = createIcon("Close", <path d="M6 6l12 12M18 6 6 18" />);
export const IconChevronDown = createIcon("ChevronDown", <path d="m6 9 6 6 6-6" />);
export const IconChevronUp = createIcon("ChevronUp", <path d="m6 15 6-6 6 6" />);
export const IconChevronRight = createIcon("ChevronRight", <path d="m9 6 6 6-6 6" />);
export const IconChevronLeft = createIcon("ChevronLeft", <path d="m15 6-6 6 6 6" />);
export const IconArrowRight = createIcon("ArrowRight", <path d="M4 12h15M13 6l6 6-6 6" />);
export const IconArrowLeft = createIcon("ArrowLeft", <path d="M20 12H5M11 6l-6 6 6 6" />);
export const IconArrowUpRight = createIcon("ArrowUpRight", <path d="M7 17 17 7M8.5 7H17v8.5" />);
export const IconArrowDown = createIcon("ArrowDown", <path d="M12 4v15M6 13l6 6 6-6" />);
export const IconPlus = createIcon("Plus", <path d="M12 5v14M5 12h14" />);
export const IconMinus = createIcon("Minus", <path d="M5 12h14" />);
export const IconCheck = createIcon("Check", <path d="m5 12.5 4.5 4.5L19 7.5" />);
export const IconSearch = createIcon(
  "Search",
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </>,
);
export const IconFilter = createIcon(
  "Filter",
  <>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </>,
);
export const IconExternal = createIcon(
  "External",
  <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
);
export const IconDownload = createIcon("Download", <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />);
export const IconCopy = createIcon(
  "Copy",
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
  </>,
);
export const IconExpand = createIcon("Expand", <path d="M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6" />);
export const IconSun = createIcon(
  "Sun",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </>,
);
export const IconMoon = createIcon("Moon", <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />);
export const IconMonitor = createIcon(
  "Monitor",
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>,
);
export const IconLock = createIcon(
  "Lock",
  <>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v1.5" />
  </>,
);
export const IconInfo = createIcon(
  "Info",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </>,
);
export const IconAlert = createIcon(
  "Alert",
  <path d="M10.3 4.3a2 2 0 0 1 3.4 0l7.3 12.6a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3ZM12 10v4M12 17h.01" />,
);
export const IconCheckCircle = createIcon(
  "CheckCircle",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.7 2.7L16 10" />
  </>,
);
export const IconLightbulb = createIcon(
  "Lightbulb",
  <path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />,
);
export const IconStar = createIcon(
  "Star",
  <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9Z" />,
);
export const IconQuote = createIcon(
  "Quote",
  <path d="M10 12V7H6.5A1.5 1.5 0 0 0 5 8.5v2A1.5 1.5 0 0 0 6.5 12H10Zm0 0v1.5c0 2.2-1.2 3.6-3 4.3M19 12V7h-3.5A1.5 1.5 0 0 0 14 8.5v2a1.5 1.5 0 0 0 1.5 1.5H19Zm0 0v1.5c0 2.2-1.2 3.6-3 4.3" />,
);
export const IconSpinner = createIcon("Spinner", <path d="M12 3a9 9 0 1 0 9 9" />);
export const IconImage = createIcon(
  "Image",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m3 17 5.5-6 4 4.5 2.5-2.5L21 18" />
    <circle cx="16" cy="8.5" r="1.5" />
  </>,
);
export const IconCamera = createIcon(
  "Camera",
  <>
    <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </>,
);
export const IconPlay = createIcon("Play", <path d="M8 5.5v13l10-6.5Z" />);

/* ── Contact ───────────────────────────────────────────────────────── */

export const IconPhone = createIcon(
  "Phone",
  <path d="M6.6 3.5h2.6l1.5 4-2 1.3a10 10 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
);
export const IconMail = createIcon(
  "Mail",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </>,
);
export const IconWhatsApp = createIcon(
  "WhatsApp",
  <>
    <path d="m4 20 1.2-3.9A8.5 8.5 0 1 1 8.2 19Z" />
    <path d="M9.3 8.3c.3-.4.8-.4 1 0l.8 1.6c.1.3 0 .6-.2.8l-.5.5a5.5 5.5 0 0 0 2.4 2.4l.5-.5c.2-.2.5-.3.8-.2l1.6.8c.4.2.4.7 0 1-.6.6-1.4 1-2.3.8a7 7 0 0 1-4.9-4.9c-.2-.9.2-1.7.8-2.3Z" />
  </>,
);
export const IconInstagram = createIcon(
  "Instagram",
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.8h.01" />
  </>,
);
export const IconChat = createIcon(
  "Chat",
  <path d="M5 18.5V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.5ZM9 10h6M9 13h3.5" />,
);
export const IconSend = createIcon("Send", <path d="M20.5 3.5 10 14M20.5 3.5l-6.5 17-4-6.5-6.5-4Z" />);

/* ── Travel ────────────────────────────────────────────────────────── */

export const IconClock = createIcon(
  "Clock",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const IconCalendar = createIcon(
  "Calendar",
  <>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
  </>,
);
/* Signature: two ridgelines with a snow line, the shape of the Eastern
   Himalaya from the valley floor. */
export const IconMountain = createIcon(
  "Mountain",
  <path d="M2.5 19.5 8.5 6.5l4 6.5 3-4 6 10.5ZM6.7 10.4l1.4 1.1 1.4-.9 1.4-.2" />,
);
export const IconUsers = createIcon(
  "Users",
  <>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.6a3.2 3.2 0 0 1 0 6M17.5 14.2a5.5 5.5 0 0 1 3 4.8" />
  </>,
);
export const IconRoute = createIcon(
  "Route",
  <>
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="6" r="2" />
    <path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16" />
  </>,
);
export const IconCompass = createIcon(
  "Compass",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5Z" />
  </>,
);
export const IconPin = createIcon(
  "Pin",
  <>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>,
);
export const IconMap = createIcon("Map", <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6ZM9 4v14M15 6v14" />);
/* Signature: a permit — a document carrying a round official seal. */
export const IconPermit = createIcon(
  "Permit",
  <>
    <path d="M13.5 20.5H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h7l5 5V11M14 3.5v5h5M8.5 12h4M8.5 15.5h2" />
    <circle cx="16.5" cy="16.5" r="3.5" />
    <path d="m15 16.6 1 1 2-2.1" />
  </>,
);
export const IconShield = createIcon(
  "Shield",
  <path d="M12 3 19.5 6v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6ZM8.8 12.2l2.2 2.2 4.2-4.4" />,
);
export const IconTicket = createIcon(
  "Ticket",
  <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4ZM14.5 6v2M14.5 11v2M14.5 16v2" />,
);
export const IconTent = createIcon(
  "Tent",
  <path d="M3.5 19.5 12 5l8.5 14.5ZM12 5V3M12 12.5l-2.6 7M12 12.5l2.6 7M2.5 19.5h19" />,
);
export const IconHomestay = createIcon(
  "Homestay",
  <path d="m3.5 11 8.5-7 8.5 7M5.5 9.5V20h13V9.5M10 20v-5h4v5" />,
);
export const IconBed = createIcon(
  "Bed",
  <>
    <path d="M3 18V7M3 14h18v4M21 14v-2.5a3 3 0 0 0-3-3h-7V14" />
    <circle cx="7" cy="11" r="1.8" />
  </>,
);
/* Signature: the 4×4 — roof rack included. */
export const IconVehicle = createIcon(
  "Vehicle",
  <>
    <path d="M3.5 15V12l1.6-4.2a1.8 1.8 0 0 1 1.7-1.2h10.4a1.8 1.8 0 0 1 1.7 1.2l1.6 4.2v3M3.5 12h17M8 4.5h8M3.5 15h17" />
    <circle cx="7.5" cy="16.5" r="1.8" />
    <circle cx="16.5" cy="16.5" r="1.8" />
  </>,
);
export const IconTrain = createIcon(
  "Train",
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01M8.5 20.5l1.5-4M15.5 20.5l-1.5-4" />
  </>,
);
export const IconPlane = createIcon(
  "Plane",
  <path d="M10.5 13.5 3 11l1-2 7.5 1L16 4.8a1.6 1.6 0 0 1 2.3 2.2L13.5 12l1 7.5-2 1-2.5-7.5Z" />,
);
export const IconMeals = createIcon(
  "Meals",
  <path d="M3.5 12h17a8.5 8.5 0 0 1-17 0ZM9 20.5h6M12 12l6.5-8.5M14.5 12l6-6.5" />,
);
export const IconLeaf = createIcon("Leaf", <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 8-8" />);
/* Signature: first light over the ridge — Dong. */
export const IconSunrise = createIcon(
  "Sunrise",
  <path d="M3 17.5h18M6.5 17.5a5.5 5.5 0 0 1 11 0M12 6.5v2M5.6 9.6 7 11M18.4 9.6 17 11M2.5 13.5h2M19.5 13.5h2M8 21h8" />,
);
export const IconRiver = createIcon(
  "River",
  <path d="M3 8.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0M3 13c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0M3 17.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0" />,
);
/* Signature: a gompa — finial, swept roof, window band, door. */
export const IconMonastery = createIcon(
  "Monastery",
  <path d="M12 3v2.5M5.5 9.5 12 5.5l6.5 4ZM7 9.5V20h10V9.5M7 13h10M11 20v-3.5h2V20M4 20h16" />,
);
/* Signature: a string of prayer flags across the pass. */
export const IconPrayerFlags = createIcon(
  "PrayerFlags",
  <path d="M3 5c6 4.5 12 4.5 18 0M4.6 6.5v5.2h3.2V7.4M8.6 7.9v5.4h3V8.3M12.4 8.3v5.4h3V7.9M16.2 7.4v5.2h3.2V6.5" />,
);
export const IconMusic = createIcon(
  "Music",
  <>
    <path d="M9 17.5V6l10-2v11.5M9 9.5l10-2" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="15.5" r="2.5" />
  </>,
);
export const IconRupee = createIcon(
  "Rupee",
  <path d="M7 4.5h10M7 8.5h10M10 4.5c3.5 0 5 1.8 5 4s-1.5 4-5 4H7.5l7 7" />,
);
export const IconCard = createIcon(
  "Card",
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </>,
);
export const IconGauge = createIcon("Gauge", <path d="M4.5 17a8 8 0 1 1 15 0M12 14l3.8-4.2" />);
export const IconSignal = createIcon("Signal", <path d="M5 18v-2M9 18v-5M13 18v-8M17 18V6" />);
export const IconCloud = createIcon(
  "Cloud",
  <path d="M7.5 18.5H17a4 4 0 0 0 .7-7.95A6 6 0 0 0 6.2 11.6a3.5 3.5 0 0 0 1.3 6.9Z" />,
);
export const IconSnow = createIcon(
  "Snow",
  <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 6l2.5-1.5M9.5 19.5 12 18l2.5 1.5" />,
);
export const IconThermometer = createIcon(
  "Thermometer",
  <path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0ZM12 9v7" />,
);
export const IconFuel = createIcon(
  "Fuel",
  <path d="M4.5 20V5.5A1.5 1.5 0 0 1 6 4h6a1.5 1.5 0 0 1 1.5 1.5V20M3.5 20h11M4.5 10h9M13.5 8.5h2a2 2 0 0 1 2 2V16a1.5 1.5 0 0 0 3 0V8L18 5.5" />,
);
export const IconWallet = createIcon(
  "Wallet",
  <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5v10A2.5 2.5 0 0 0 6.5 20H20V8H6.5A2.5 2.5 0 0 1 4 7.5ZM16 14h.01" />,
);
export const IconGlobe = createIcon(
  "Globe",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </>,
);
export const IconIdCard = createIcon(
  "IdCard",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M5.5 16a3 3 0 0 1 6 0M14 10h4M14 13.5h3" />
  </>,
);
export const IconBinoculars = createIcon(
  "Binoculars",
  <>
    <circle cx="7" cy="15.5" r="3.5" />
    <circle cx="17" cy="15.5" r="3.5" />
    <path d="M10.5 15h3M4 14l2-7.5a1.5 1.5 0 0 1 2.9.3V12M20 14l-2-7.5a1.5 1.5 0 0 0-2.9.3V12" />
  </>,
);

/* Every icon by name — used by the /design specimen and by data files that
   reference icons as strings. */
export const icons = {
  menu: IconMenu,
  close: IconClose,
  chevronDown: IconChevronDown,
  chevronUp: IconChevronUp,
  chevronRight: IconChevronRight,
  chevronLeft: IconChevronLeft,
  arrowRight: IconArrowRight,
  arrowLeft: IconArrowLeft,
  arrowUpRight: IconArrowUpRight,
  arrowDown: IconArrowDown,
  plus: IconPlus,
  minus: IconMinus,
  check: IconCheck,
  search: IconSearch,
  filter: IconFilter,
  external: IconExternal,
  download: IconDownload,
  copy: IconCopy,
  expand: IconExpand,
  sun: IconSun,
  moon: IconMoon,
  monitor: IconMonitor,
  lock: IconLock,
  info: IconInfo,
  alert: IconAlert,
  checkCircle: IconCheckCircle,
  lightbulb: IconLightbulb,
  star: IconStar,
  quote: IconQuote,
  spinner: IconSpinner,
  image: IconImage,
  camera: IconCamera,
  play: IconPlay,
  phone: IconPhone,
  mail: IconMail,
  whatsapp: IconWhatsApp,
  instagram: IconInstagram,
  chat: IconChat,
  send: IconSend,
  clock: IconClock,
  calendar: IconCalendar,
  mountain: IconMountain,
  users: IconUsers,
  route: IconRoute,
  compass: IconCompass,
  pin: IconPin,
  map: IconMap,
  permit: IconPermit,
  shield: IconShield,
  ticket: IconTicket,
  tent: IconTent,
  homestay: IconHomestay,
  bed: IconBed,
  vehicle: IconVehicle,
  train: IconTrain,
  plane: IconPlane,
  meals: IconMeals,
  leaf: IconLeaf,
  sunrise: IconSunrise,
  river: IconRiver,
  monastery: IconMonastery,
  prayerFlags: IconPrayerFlags,
  music: IconMusic,
  rupee: IconRupee,
  card: IconCard,
  gauge: IconGauge,
  signal: IconSignal,
  cloud: IconCloud,
  snow: IconSnow,
  thermometer: IconThermometer,
  fuel: IconFuel,
  wallet: IconWallet,
  globe: IconGlobe,
  idCard: IconIdCard,
  binoculars: IconBinoculars,
} as const;

export type IconName = keyof typeof icons;
