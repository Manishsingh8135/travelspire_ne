import { HomeAniniFest } from "@/components/home/home-anini-fest";
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
import { HomeStatesRail } from "@/components/home/home-states-rail";
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
      {/* Ordered as an argument rather than a list: where can I go → what is
          the trip and what does it cost → when, and am I allowed in → can I
          trust you with the money. Section grounds alternate paper / soft /
          deep, with ink bands at the festival and at the point the page asks
          to be paid.

          The festival sits this high because it expires: it is three weeks
          out and it is the one thing on the page with a deadline. It removes
          itself once the edition is past, and the catalogue closes back up. */}
      <HomeHero />
      <HomeTrustStrip />
      <HomeStatesRail />
      <HomeDestinationAtlas />
      <HomeAniniFest />
      <HomeJourneyTypes />
      <HomeFeaturedJourneys />
      <HomeSeasonalFeature />
      <HomeDepartures />
      <HomePermits />
      <HomeGuides />
      <HomeWhyTravelspire />
      <HomeBooking />
      <HomeStories />
      <HomeFinalCta />
    </>
  );
}
