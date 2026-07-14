import {
  LayoutDashboard,
  Route,
  MapPin,
  Map,
  CalendarDays,
  UsersRound,
  Stamp,
  Image as ImageIcon,
  ArrowRightLeft,
  Users,
  ChartColumn,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  /** Stable key, also used to look up a live count badge. */
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Not built yet — rendered muted, not a link. Communicates the IA. */
  soon?: boolean;
  /** Single-key go-to shortcut chord (after `g`). */
  goto?: string;
};

export type NavGroup = { label: string; items: NavItem[] };

export const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard, goto: "d" }],
  },
  {
    label: "Content",
    items: [
      { key: "tours", label: "Tours", href: "/admin/tours", icon: Route, goto: "t" },
      { key: "places", label: "Places", href: "/admin/places", icon: MapPin, goto: "p" },
      { key: "regions", label: "Regions", href: "/admin/regions", icon: Map, goto: "r" },
      { key: "festivals", label: "Festivals", href: "/admin/festivals", icon: CalendarDays, goto: "f" },
      { key: "tribes", label: "Tribes", href: "/admin/tribes", icon: UsersRound, goto: "b" },
      { key: "permits", label: "Permits", href: "/admin/permits", icon: Stamp, goto: "l" },
      { key: "media", label: "Media", href: "/admin/media", icon: ImageIcon, soon: true },
      { key: "redirects", label: "Redirects", href: "/admin/redirects", icon: ArrowRightLeft, soon: true },
    ],
  },
  {
    label: "Insights",
    items: [
      { key: "health", label: "Content Health", href: "/admin/insights/health", icon: ChartColumn, soon: true },
    ],
  },
  {
    label: "People",
    items: [{ key: "team", label: "Team", href: "/admin/settings/team", icon: Users, soon: true }],
  },
  {
    label: "Settings",
    items: [{ key: "settings", label: "Settings", href: "/admin/settings", icon: Settings, soon: true }],
  },
];

/** Flat list of real (non-soon) destinations — used by the command palette. */
export const NAV_DESTINATIONS: NavItem[] = NAV.flatMap((g) => g.items).filter((i) => !i.soon);
