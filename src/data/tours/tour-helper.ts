import { Tour } from "@/types/tours/tour";
import { upcomingTours } from "./index";

export function getTourBySlug(slug: string): Tour | null {
  return upcomingTours.find((tour) => tour.slug === slug) || null;
}
