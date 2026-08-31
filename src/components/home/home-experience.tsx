import { HomeBooking } from "@/components/home/home-booking";
import { HomeDepartures } from "@/components/home/home-departures";
import { HomeDestinationAtlas } from "@/components/home/home-destination-atlas";
import { HomeFeaturedJourneys } from "@/components/home/home-featured-journeys";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeGuides } from "@/components/home/home-guides";
import { HomeHero } from "@/components/home/home-hero";
import { HomeJourneyTypes } from "@/components/home/home-journey-types";
import { HomePermits } from "@/components/home/home-permits";
import { HomeSeasonalFeature } from "@/components/home/home-seasonal-feature";
import { HomeStories } from "@/components/home/home-stories";
import { HomeTrustStrip } from "@/components/home/home-trust-strip";
import { HomeWhyTravelspire } from "@/components/home/home-why-travelspire";
import { StructuredData } from "@/components/seo/structured-data";
import { homeFeaturedJourneys } from "@/data/home/homepage";

const siteUrl = "https://travelspirene.com";

// Homepage-specific graph. Organization / TravelAgency / LocalBusiness /
// WebSite / Service are already emitted by the root layout against the
// shared #organization entity. This page adds only the ItemList of the
// featured journeys visible below — no FAQ, breadcrumb or rating schema,
// matching what is actually on the page.
function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#featured-journeys`,
    name: "Featured Northeast India Journeys",
    description:
      "The featured small-group tours and expeditions run by Travelspire NE across Arunachal Pradesh and the wider Northeast.",
    itemListElement: homeFeaturedJourneys.map((journey, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}${journey.href}`,
      name: journey.title,
    })),
  };
}

export function HomeExperience() {
  return (
    <>
      <StructuredData data={buildStructuredData()} />
      <HomeHero />
      <HomeTrustStrip />
      <HomeJourneyTypes />
      <HomeFeaturedJourneys />
      <HomeDestinationAtlas />
      <HomeSeasonalFeature />
      <HomeWhyTravelspire />
      <HomeBooking />
      <HomePermits />
      <HomeGuides />
      <HomeStories />
      <HomeDepartures />
      <HomeFinalCta />
    </>
  );
}
