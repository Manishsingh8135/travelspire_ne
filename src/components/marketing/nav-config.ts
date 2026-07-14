import { customTripUrl, permitAssistUrl } from "@/lib/whatsapp";

/**
 * The public navigation tree — ONE config consumed by the marketing SiteNav
 * and the content-page SiteHeader (08-blueprint/14 Part 3).
 *
 * No-dead-links law (07-pages): every href resolves to a live page, a real
 * landing anchor, or the WhatsApp funnel. Placeholders are forbidden — a
 * child ships here when its page ships (permits guides, /stories, /festivals
 * swap in when built).
 */

export type NavChild = {
  label: string;
  href: string;
  /** Mono sub-line shown in dropdown panels and the mobile sheet. */
  sub?: string;
};

export type NavParent = {
  label: string;
  href: string;
  sub?: string;
  children?: NavChild[];
};

export const PUBLIC_NAV: NavParent[] = [
  {
    label: "Explore",
    href: "/explore",
    sub: "The living map of the Northeast",
    children: [
      { label: "The Living Map", href: "/explore", sub: "Every place, one map" },
      { label: "Arunachal Pradesh", href: "/arunachal-pradesh", sub: "The state hub" },
      { label: "Tawang", href: "/arunachal-pradesh/tawang", sub: "Monastery country · 3,048 m" },
      { label: "Mechuka", href: "/arunachal-pradesh/mechuka", sub: "The far valley" },
      { label: "Ziro Valley", href: "/arunachal-pradesh/ziro", sub: "The Apatani plateau" },
    ],
  },
  {
    label: "Expeditions",
    href: "/tours",
    sub: "Guided journeys, real itineraries",
    children: [
      { label: "All expeditions", href: "/tours", sub: "The full catalogue" },
      { label: "Treks", href: "/tours?type=trek", sub: "On foot, up high" },
      { label: "Festival trips", href: "/tours?type=festival", sub: "Timed to the calendar" },
      { label: "Tawang Expedition", href: "/tours/tawang-expedition", sub: "5 days · Sela & the monastery" },
      { label: "Mechuka Expedition", href: "/tours/mechuka-expedition", sub: "6 days · the far valley" },
      { label: "Dong Valley Expedition", href: "/tours/dong-valley-expedition", sub: "India's first sunrise" },
    ],
  },
  {
    label: "Festivals",
    href: "/tours?type=festival",
    sub: "Trips built around the calendar",
    children: [
      { label: "Hornbill Festival", href: "/tours/hornbill-festival-2026", sub: "Dec 1–10 · Kisama, Nagaland" },
      { label: "Ziro Festival of Music", href: "/tours/ziro-festival-2026", sub: "Sep 24–27 · Ziro valley" },
      { label: "Orange Festival", href: "/tours/orange-festival-2026", sub: "December · Dambuk" },
    ],
  },
  {
    // Guides are imported & verified in the DB; this swaps to /permits the day
    // that page ships. Until then the WhatsApp assist is the real destination.
    label: "Permits",
    href: permitAssistUrl(),
    sub: "ILP / PAP — handled on WhatsApp",
  },
  {
    label: "Stories",
    href: "/#stories",
    sub: "Real journeys, told properly",
  },
  {
    label: "Community",
    href: "/#community",
    sub: "The Explorer Passport",
  },
];

/** The one marigold CTA (WhatsApp is the checkout until Razorpay). */
export const NAV_CTA = {
  label: "Plan a trip",
  href: customTripUrl(),
};

export const isExternal = (href: string) => href.startsWith("http");
export const isAnchor = (href: string) => href.startsWith("/#") || href.startsWith("#");
