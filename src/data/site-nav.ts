import { allTours, isTourOver } from "@/data/tours";
import { contactInfo } from "@/data/social/social-links";
import { createWhatsAppURL } from "@/lib/whatsapp";

/* One source for the navbar, the mobile sheet and the footer. Festival
   links drop out on their own once the edition has ended. */

export type NavLink = { label: string; href: string; description?: string; meta?: string };
export type NavGroup = { heading: string; links: NavLink[] };
export type NavPanel = {
  id: string;
  label: string;
  href: string;
  /** Path prefixes that mark this item as current. */
  match: string[];
  groups: NavGroup[];
  footer: NavLink;
  feature?: { eyebrow: string; title: string; description: string; href: string; image: string; imageAlt: string };
};

export type SiteNav = {
  panels: NavPanel[];
  links: NavLink[];
  contact: { phone: string; phoneHref: string; email: string; whatsapp: string; instagram: string };
};

const festivalLinks: Array<NavLink & { slug: string }> = [
  {
    slug: "hornbill-festival-2026",
    label: "Hornbill Festival",
    href: "/tours/hornbill-festival-2026",
    description: "Kisama, Nagaland — the festival of festivals",
    meta: "1–10 Dec",
  },
  {
    slug: "orange-festival-2026",
    label: "Orange Festival, Dambuk",
    href: "/tours/orange-festival-2026",
    description: "Music in the orange orchards of Lower Dibang",
    meta: "13–15 Dec",
  },
];

export function getSiteNav(): SiteNav {
  const liveFestivals = festivalLinks.filter(({ slug }) => {
    const tour = allTours.find((t) => t.slug === slug);
    return tour ? !isTourOver(tour) : false;
  });

  const tourGroups: NavGroup[] = [
    {
      heading: "Arunachal expeditions",
      links: [
        { label: "Mechuka, Dong & Anini", href: "/tours/mechuka-dong-anini-tour-package", description: "The grand circuit, west to east", meta: "13 days" },
        { label: "Six Days in the Dibang", href: "/tours/anini-pomo-grassland-expedition", description: "Anini and the Pomo grasslands", meta: "6 days" },
        { label: "Tawang & Sela Pass", href: "/tours/tawang-expedition", description: "Monasteries and the high pass", meta: "5 days" },
        { label: "Mechuka Expedition", href: "/tours/mechuka-expedition", description: "The valley at the end of the road", meta: "6 days" },
        { label: "Dong Valley", href: "/tours/dong-valley-expedition", description: "India's first sunrise, from Walong", meta: "4 days" },
        { label: "Anini & Dibang Valley", href: "/tours/anini-expedition", description: "A short road trip to the plateau", meta: "3 days" },
      ],
    },
  ];
  if (liveFestivals.length) {
    tourGroups.push({ heading: "Festivals this season", links: liveFestivals.map(({ label, href, description, meta }) => ({ label, href, description, meta })) });
  }

  return {
    panels: [
      {
        id: "tours",
        label: "Tours",
        href: "/all-tours",
        match: ["/all-tours", "/tours", "/book"],
        groups: tourGroups,
        footer: { label: "Browse all tours", href: "/all-tours" },
        feature: liveFestivals.length
          ? {
              eyebrow: "Booking open",
              title: "Hornbill Festival 2026",
              description: "Camping, the Dzükou trek or the full festival — from ₹1,799.",
              href: "/tours/hornbill-festival-2026",
              image: "/images/places/hornbill/Hornbill_3.PNG",
              imageAlt: "Naga dancers in full regalia at the Hornbill Festival",
            }
          : undefined,
      },
      {
        id: "destinations",
        label: "Destinations",
        href: "/places/dibang-valley",
        match: ["/places", "/guides"],
        groups: [
          {
            heading: "Dibang Valley",
            links: [
              { label: "Anini", href: "/places/anini", description: "The high plateau at the end of NH-313" },
              { label: "Dibang Valley", href: "/places/dibang-valley", description: "The whole valley, one guide" },
              { label: "Dambuk", href: "/places/dambuk", description: "Orange country on the Dibang" },
              { label: "Roing", href: "/places/roing", description: "The gateway town and Mayodia" },
            ],
          },
          {
            heading: "Across Arunachal",
            links: [
              { label: "Mechuka", href: "/tours/mechuka-expedition", description: "Monastery valley near the border" },
              { label: "Dong & Walong", href: "/tours/dong-valley-expedition", description: "Where India's day begins" },
              { label: "Tawang", href: "/tours/tawang-expedition", description: "The great monastery road west" },
            ],
          },
          {
            heading: "Road guides",
            links: [{ label: "Dibrugarh to Anini", href: "/guides/dibrugarh-to-anini", description: "The NH-313 drive, stop by stop" }],
          },
        ],
        footer: { label: "Start with the Dibang Valley guide", href: "/places/dibang-valley" },
      },
      {
        id: "permits",
        label: "Permits",
        href: "/permits",
        match: ["/permits"],
        groups: [
          {
            heading: "Inner Line Permits",
            links: [
              { label: "Arunachal Pradesh", href: "/permits/arunachal-pradesh-ilp", description: "ILP for Indians, PAP for foreigners" },
              { label: "Nagaland", href: "/permits/nagaland-ilp", description: "Needed for Hornbill and Kohima" },
              { label: "Mizoram", href: "/permits/mizoram-ilp", description: "Online or on arrival at Lengpui" },
              { label: "Manipur", href: "/permits/manipur-ilp", description: "Required since December 2019" },
            ],
          },
          {
            heading: "Protected areas",
            links: [{ label: "Sikkim", href: "/permits/sikkim-permit", description: "Nathula, North Sikkim and other zones" }],
          },
        ],
        footer: { label: "Which permit do I need?", href: "/permits" },
      },
    ],
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    contact: {
      phone: contactInfo.phone,
      phoneHref: `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`,
      email: contactInfo.email,
      whatsapp: createWhatsAppURL({ customMessage: "Hi Travelspire, I'd like help planning a trip." }),
      instagram: contactInfo.instagram,
    },
  };
}
