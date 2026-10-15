import { Tour } from "@/types/tours/tour";
import { allTours } from "./index";

export function getTourBySlug(slug: string): Tour | null {
  return allTours.find((tour) => tour.slug === slug) || null;
}
