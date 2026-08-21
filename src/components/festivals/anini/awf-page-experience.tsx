import { AdvancedFAQ } from "@/components/faqs/faq-base";
import {
  AwfExperience,
  AwfTrustStrip,
} from "@/components/festivals/anini/awf-experience";
import { AwfFinalCta } from "@/components/festivals/anini/awf-final-cta";
import { AwfHero } from "@/components/festivals/anini/awf-hero";
import { AwfJourney } from "@/components/festivals/anini/awf-journey";
import { AwfLineup } from "@/components/festivals/anini/awf-lineup";
import { AwfPasses } from "@/components/festivals/anini/awf-passes";
import { AwfPeople } from "@/components/festivals/anini/awf-people";
import { AwfRouteMap } from "@/components/festivals/anini/awf-route-map";
import { AwfRouteRibbon } from "@/components/festivals/anini/awf-route-ribbon";
import { AwfTransport } from "@/components/festivals/anini/awf-transport";
import { AwfValley } from "@/components/festivals/anini/awf-valley";
import {
  AwfEvergreen,
  AwfWrappedBanner,
} from "@/components/festivals/anini/awf-evergreen";
import { StructuredData } from "@/components/seo/structured-data";
import {
  awfArtists,
  awfEdition,
  awfFaqSection,
  awfHeroImages,
  awfMeta,
} from "@/data/festivals/anini-winter-fest";

const siteUrl = "https://travelspirene.com";
const heroImageUrl = `${siteUrl}${awfHeroImages.desktop.src}`;

function buildStructuredData(pageUrl: string, isHomepage: boolean) {
  const isPast = awfEdition.status === "past";

  const musicEventSchema = {
    "@type": "MusicEvent",
    "@id": `${pageUrl}#event`,
    name: "Anini Winter Fest 2026 (AWF 5.0)",
    alternateName: "AWF 5.0",
    description:
      "The fifth edition of Anini Winter Fest — two days of indie, folk, electronic and tribal-fusion music at 1,970 m in Dibang Valley. Travelspire Northeast is the Official Travel & Taxi Partner for transport and journeys.",
    startDate: awfMeta.dates.start,
    endDate: awfMeta.dates.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [heroImageUrl],
    url: pageUrl,
    location: {
      "@type": "Place",
      "@id": `${siteUrl}/places/anini#place`,
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
      sameAs: [awfMeta.officialSite, awfMeta.instagram],
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
            url: `${siteUrl}/book/anini-winter-fest-2026-shared-transfer`,
            validFrom: "2026-01-01",
            seller: {
              "@type": "TravelAgency",
              name: "Travelspire Northeast",
              url: siteUrl,
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
              url: siteUrl,
            },
          },
        ],
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: awfFaqSection.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: isHomepage
      ? [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }]
      : [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Anini Winter Fest 2026",
            item: pageUrl,
          },
        ],
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Anini Winter Fest 2026 · Sep 19–20 · Official Travel Partner",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${pageUrl}#event` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: heroImageUrl,
    datePublished: "2026-08-19",
    dateModified: "2026-08-21",
    inLanguage: "en-IN",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPageSchema, musicEventSchema, faqSchema, breadcrumbSchema],
  };
}

export function AwfPageExperience({
  pageUrl,
  isHomepage = false,
}: {
  pageUrl: string;
  isHomepage?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#050d0f]">
      <StructuredData data={buildStructuredData(pageUrl, isHomepage)} />
      <AwfWrappedBanner />
      <AwfHero />
      <AwfTrustStrip />
      <AwfRouteRibbon />
      <AwfLineup />
      <AwfExperience />
      <AwfRouteMap />
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
