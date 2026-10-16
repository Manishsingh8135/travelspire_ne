// app/all-tours/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Accent, Breadcrumbs, Container, Heading, Lead, Section } from "@/components/ds";
import { PlanCta } from "@/components/site/content-blocks";
import { TourCatalogue, type CatalogueItem } from "@/components/tours/tour-catalogue";
import { tourCard, tourPrice } from "@/components/tours/tour-facts";
import { getActiveTours } from "@/data/tours";
import { createTripPlanningURL } from "@/lib/whatsapp";
import { getTourCategory, getTourDuration } from "@/types/tours/tour";

// Festival editions drop out of the catalogue when they end.
export const revalidate = 21600; // DATE_DRIVEN_REVALIDATE_SECONDS — must be a literal

export const metadata: Metadata = {
  title: "Arunachal Pradesh & Northeast India Tour Packages",
  description:
    "Every Travelspire tour in one place: Arunachal expeditions to Mechuka, Dong, Anini and Tawang, plus Hornbill and Orange Festival journeys. Compare length and price, then book online.",
  alternates: { canonical: "/all-tours" },
};

export default async function AllToursPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const tours = getActiveTours();

  const items: CatalogueItem[] = tours.map((tour, rank) => ({
    card: tourCard(tour),
    kind: getTourCategory(tour) === "Festival" ? "festival" : "expedition",
    days: getTourDuration(tour).min,
    price: tourPrice(tour),
    search: [tour.title, tour.subtitle, tour.location, ...(tour.tags ?? [])].join(" ").toLowerCase(),
    // Festivals with dates coming up lead the "Recommended" order.
    rank: getTourCategory(tour) === "Festival" ? rank - 100 : rank,
  }));

  return (
    <>
      <Section spacing="none" className="pb-10 pt-6 md:pb-12 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/all-tours" },
            ]}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <Heading as="h1" size="h1" className="max-w-[18ch]">
              Tours across Arunachal <Accent>and the Northeast</Accent>
            </Heading>
            <Lead>
              Expeditions we drive every season and festival journeys with fixed dates. Every price is per person and
              includes permit help — compare, then book online or ask us first.
            </Lead>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-20 md:pb-28">
        <Container>
          <Suspense>
            <TourCatalogue items={items} initialKind={category === "Festival" ? "festival" : "all"} />
          </Suspense>
        </Container>
      </Section>

      <PlanCta
        title="Don't see your trip? We'll build it."
        body="Most of our journeys are planned around the traveller: your dates, your pace, the places you care about. Tell us roughly what you want."
        whatsappHref={createTripPlanningURL()}
        secondary={{ label: "Read the permit guide", href: "/permits" }}
      />
    </>
  );
}
