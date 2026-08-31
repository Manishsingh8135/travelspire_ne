// app/all-tours/page.tsx
import { UnifiedToursPage } from "@/components/tours/unified-tours-page";
import type { TourCategory, TourFilters } from "@/types/tours/tour";

const validCategories: readonly TourCategory[] = [
  "Adventure",
  "Cultural",
  "Nature",
  "Pilgrimage",
  "Festival",
  "BikeTrip",
  "FruitFestival",
  "CampingTrip",
];

export default async function AllToursPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialFilters: Partial<TourFilters> =
    category && validCategories.includes(category as TourCategory)
      ? { category: category as TourCategory }
      : {};

  return <UnifiedToursPage initialFilters={initialFilters} />;
}

export const metadata = {
  title: "All Tours & Experiences | TravelSpire NE",
  description:
    "Discover all our adventures, festivals, and special activities in Northeast India with advanced filtering options.",
  alternates: { canonical: "/all-tours" },
};
