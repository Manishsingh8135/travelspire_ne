import { allTours, isTourOver } from "@/data/tours";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";
import type { TourCardProps } from "@/components/ds";
import {
  getTourCategory,
  getTourDuration,
  getTourPrice,
  isFestivalTour,
  isRegularTour,
  type Tour,
} from "@/types/tours/tour";

/* The few derived facts every tour surface needs (page, card, catalogue,
   booking bar), computed one way so they never disagree. */

const day = new Intl.DateTimeFormat("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" });
const dayMonth = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
const dayMonthYear = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export function tourDurationLabel(tour: Tour): string {
  if (isRegularTour(tour)) return tour.duration.replace(/\s*\/\s*/, " · ");
  const { min, max } = getTourDuration(tour);
  return min === max ? `${min} ${min === 1 ? "day" : "days"}` : `${min}–${max} days`;
}

export function tourShortDuration(tour: Tour): string {
  const { min, max } = getTourDuration(tour);
  return min === max ? `${min} ${min === 1 ? "day" : "days"}` : `${min}–${max} days`;
}

/** "1–10 Dec 2026" for festival editions; null for open-dated tours. */
export function tourDateRange(tour: Tour, withYear = true): string | null {
  if (isRegularTour(tour)) return null;
  const start = new Date(tour.eventDates.start);
  const end = new Date(tour.eventDates.end);
  const sameMonth = start.getMonth() === end.getMonth();
  const tail = withYear ? dayMonthYear.format(end) : dayMonth.format(end);
  return sameMonth ? `${day.format(start)}–${tail}` : `${dayMonth.format(start)} – ${tail}`;
}

/** When to go: the season for open-dated tours, the dates for festivals. */
export function tourWhen(tour: Tour): string {
  const range = tourDateRange(tour);
  if (range) return range;
  if (isRegularTour(tour) && tour.bestTimeToVisit.length) {
    const months = tour.bestTimeToVisit;
    return months.length > 3 ? `${months[0].slice(0, 3)} – ${months[months.length - 1].slice(0, 3)}` : months.join(", ");
  }
  return "Year round";
}

export function tourKindLabel(tour: Tour): string {
  const category = getTourCategory(tour);
  if (category === "Festival") return "Festival journey";
  if (category === "Adventure") return "Expedition";
  return category;
}

export function tourPrice(tour: Tour): number {
  return getTourPrice(tour).min;
}

export function tourHeroAlt(tour: Tour): string {
  return getPlaceImageAlt(tour.heroImage, `${tour.title}, ${tour.location}`);
}

export function tourCard(tour: Tour, opts: { badge?: boolean } = {}): TourCardProps {
  const range = tourDateRange(tour, false);
  return {
    href: `/tours/${tour.slug}`,
    image: tour.thumbnail || tour.heroImage,
    imageAlt: getPlaceImageAlt(tour.thumbnail || tour.heroImage, `${tour.title}, ${tour.location}`),
    place: tour.location,
    title: tour.title,
    duration: tourShortDuration(tour),
    season: range ?? tourWhen(tour),
    price: tourPrice(tour),
    badge:
      opts.badge !== false && isFestivalTour(tour) && !isTourOver(tour) && range
        ? { label: `${range} · Booking open`, tone: "seasonal" }
        : undefined,
  };
}

export function relatedTours(tour: Tour, pool: Tour[], count = 3): Tour[] {
  const category = getTourCategory(tour);
  return pool
    .filter((t) => t.id !== tour.id)
    .sort((a, b) => Number(getTourCategory(b) === category) - Number(getTourCategory(a) === category))
    .slice(0, count);
}

export { allTours };
