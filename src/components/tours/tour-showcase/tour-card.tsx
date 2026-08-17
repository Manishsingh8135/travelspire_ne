import { CalendarDays, Clock3, Gauge } from "lucide-react";
import {
  isFestivalTour,
  isRegularTour,
  isSpecialActivityTour,
  type Tour,
} from "@/types/tours/tour";
import { MediaTourCard, type TourBadgeTone } from "./media-tour-card";

interface TourCardProps {
  tour: Tour;
  index: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
});

const regularBadgeTones: Record<string, TourBadgeTone> = {
  Adventure: "adventure",
  Cultural: "cultural",
  Nature: "nature",
  Pilgrimage: "pilgrimage",
};

export function TourCard({ tour }: TourCardProps) {
  const duration = isRegularTour(tour)
    ? tour.duration
    : `${Math.min(...tour.variants.map((variant) => variant.duration.days))} days`;

  const date = isRegularTour(tour)
    ? tour.startDate
    : dateFormatter.format(new Date(tour.eventDates.start));

  const price = isRegularTour(tour)
    ? tour.price
    : Math.min(...tour.variants.map((variant) => variant.price));

  const eyebrow = isFestivalTour(tour)
    ? `Festival${tour.featured ? " · Featured" : ""}`
    : isSpecialActivityTour(tour)
      ? `Activity${tour.featured ? " · Featured" : ""}`
      : `${tour.type}${tour.featured ? " · Featured" : ""}`;

  const badgeTone: TourBadgeTone = isFestivalTour(tour)
    ? "festival"
    : isSpecialActivityTour(tour)
      ? "activity"
      : regularBadgeTones[tour.type];

  return (
    <MediaTourCard
      href={`/tours/${tour.slug}`}
      image={tour.thumbnail}
      title={tour.title}
      subtitle={tour.subtitle}
      location={tour.location}
      eyebrow={eyebrow}
      badgeTone={badgeTone}
      price={price}
      priceLabel={isRegularTour(tour) ? "Starting from" : "Packages from"}
      actionLabel={isRegularTour(tour) ? "View journey" : "View details"}
      meta={[
        { icon: Clock3, label: duration },
        { icon: CalendarDays, label: date },
        { icon: Gauge, label: tour.difficulty },
      ]}
    />
  );
}
