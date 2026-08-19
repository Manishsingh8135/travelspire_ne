import type { Metadata } from "next";
import { AdvancedFAQ } from "@/components/faqs/faq-base";
import { AwfExperience, AwfTrustStrip } from "@/components/festivals/anini/awf-experience";
import { AwfFinalCta } from "@/components/festivals/anini/awf-final-cta";
import { AwfHero } from "@/components/festivals/anini/awf-hero";
import { AwfJourney } from "@/components/festivals/anini/awf-journey";
import { AwfLineup } from "@/components/festivals/anini/awf-lineup";
import { AwfPasses } from "@/components/festivals/anini/awf-passes";
import { AwfPeople } from "@/components/festivals/anini/awf-people";
import { AwfTransport } from "@/components/festivals/anini/awf-transport";
import { AwfValley } from "@/components/festivals/anini/awf-valley";
import { StructuredData } from "@/components/seo/structured-data";
import { AwfEvergreen, AwfWrappedBanner } from "@/components/festivals/anini/awf-evergreen";
import {
  awfArtists,
  awfEdition,
  awfFaqSection,
  awfHeroImages,
  awfMeta,
} from "@/data/festivals/anini-winter-fest";

const pageUrl = "https://travelspirene.com/anini-winter-fest-2026";
const heroImageUrl = `https://travelspirene.com${awfHeroImages.desktop.src}`;

// Evergreen pivot: after 20 Sep 2026, flip awfEdition.status to "past" in the
// data file and redeploy — metadata, banner and CTAs switch to holder mode.
const isPast = awfEdition.status === "past";
const metaTitle = isPast
  ? `Anini Winter Fest ${awfEdition.nextYear} — Dates Coming Soon · 2026 Recap | Travelspire NE`
  : "Anini Winter Fest 2026 · Sep 19–20 · Official Travel Partner | Travelspire NE";
const metaDescription = isPast
  ? `Anini Winter Fest 2026 has wrapped — ${awfEdition.nextYear} dates will be announced on the festival's official channels. Until then: the complete Anini destination guide, the 9-chapter road guide, and year-round Dibang Valley trips with the festival's Official Travel Partner.`
  : "Official Travel & Taxi Partner of Anini Winter Fest 2026 (19–20 Sep, Dibang Valley, Arunachal Pradesh). Shared convoy from Dibrugarh at ₹5,499/person, private SUV fleet from ₹5,599/day, ILP assistance, stay packages and NH-313 route expertise — one WhatsApp message sorts it all.";

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  keywords: [
    "Anini Winter Fest 2026",
    "Anini Winter Festival",
    "Anini festival September 2026",
    "Dibang Valley music festival",
    "Arunachal Pradesh music festival",
    "Dibrugarh to Anini taxi",
    "Anini festival transport",
    "Anini shared cab",
    "NH-313 road condition",
    "Mayodia Pass",
    "Roing to Anini",
    "Inner Line Permit Dibang Valley",
    "Arunachal ILP online",
    "Idu Mishmi festival",
    "Anini Winter Fest official travel partner",
    "Kunal Ganjawala Anini",
  ].join(", "),
  openGraph: {
    title: "Anini Winter Fest 2026 (Sep 19–20) | Official Travel Partner — Travelspire NE",
    description:
      "Music at the edge of the map: two days in Dibang Valley at 1,970 m. Shared convoy ₹5,499, private SUVs from ₹5,599/day, ILP and stay packages — by the Official Travel & Taxi Partner.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 675,
        alt: "Dibang Valley mountains around Anini — venue of Anini Winter Fest 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anini Winter Fest 2026 · Sep 19–20 · Official Travel Partner",
    description:
      "Shared convoy ₹5,499, private SUVs from ₹5,599/day, ILP assistance and stay packages for Anini Winter Fest 2026 in Dibang Valley.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const musicEventSchema = {
  "@type": "MusicEvent",
  "@id": `${pageUrl}#event`,
  name: "Anini Winter Fest 2026 (AWF 5.0)",
  alternateName: "AWF 5.0",
  description:
    "The fifth edition of Anini Winter Fest — two days of indie, folk, electronic and tribal-fusion music at 1,970 m in Dibang Valley, one of India's last great wildernesses. Adventure activities, camping and cultural exchange are run by the festival and its partners; Travelspire Northeast is the Official Travel & Taxi Partner for transport and journeys.",
  startDate: awfMeta.dates.start,
  endDate: awfMeta.dates.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [heroImageUrl],
  url: pageUrl,
  location: {
    "@type": "Place",
    name: "Anini, Dibang Valley",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anini",
      addressRegion: "Arunachal Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: Number(awfMeta.coordinates.lat),
      longitude: Number(awfMeta.coordinates.lng),
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Anini Winter Fest",
    sameAs: [awfMeta.instagram],
  },
  performer: awfArtists
    .filter((artist) => !artist.tba)
    .map((artist) => ({
      "@type": "MusicGroup",
      name: artist.name,
      genre: artist.genre,
    })),
  offers: isPast
    ? []
    : [
    {
      "@type": "Offer",
      name: "Shared Group Pickup & Drop — Dibrugarh to Anini",
      price: "5499",
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
      url: pageUrl,
      validFrom: "2026-01-01",
      seller: {
        "@type": "TravelAgency",
        name: "Travelspire Northeast",
        url: "https://travelspirene.com",
      },
    },
    {
      "@type": "AggregateOffer",
      name: "Private Vehicle Rental (per vehicle per day, all-inclusive)",
      lowPrice: "5599",
      highPrice: "14999",
      priceCurrency: "INR",
      url: pageUrl,
      seller: {
        "@type": "TravelAgency",
        name: "Travelspire Northeast",
        url: "https://travelspirene.com",
      },
    },
    // Festival passes (₹1,999–3,499) are sold by the festival's official booking
    // partners Zaatio and Baahi — deliberately NOT listed in Travelspire's offers.
  ],
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: awfFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://travelspirene.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tours",
      item: "https://travelspirene.com/all-tours",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Anini Winter Fest 2026",
      item: pageUrl,
    },
  ],
};

const aniniWinterFestGraph = {
  "@context": "https://schema.org",
  "@graph": [musicEventSchema, faqSchema, breadcrumbSchema],
};

export default function AniniWinterFest2026Page() {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={aniniWinterFestGraph} />

      <AwfWrappedBanner />
      <AwfHero />
      <AwfTrustStrip />
      <AwfLineup />
      <AwfExperience />
      <AwfJourney />
      <AwfTransport />
      <AwfPasses />
      <AwfValley />
      <AwfPeople />
      <AwfEvergreen />
      <AdvancedFAQ section={awfFaqSection} />
      <AwfFinalCta />
    </div>
  );
}
