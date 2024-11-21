import { Tour } from "@/types/tours/tour";
import { upcomingTours } from "./tour-data";

export function getTourBySlug(slug: string): Tour | null {
  return upcomingTours.find((tour) => tour.slug === slug) || null;
}
