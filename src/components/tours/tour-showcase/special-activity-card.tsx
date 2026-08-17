import { CalendarDays, Clock3, Gauge } from "lucide-react";
import type { SpecialActivityTour } from "@/types/tours/tour";
import { MediaTourCard } from "./media-tour-card";

interface ActivityTourCardProps {
  tour: SpecialActivityTour;
  index: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
});

export function ActivityTourCard({ tour }: ActivityTourCardProps) {
  const basePrice = Math.min(...tour.variants.map((variant) => variant.price));
  const shortestDuration = Math.min(
    ...tour.variants.map((variant) => variant.duration.days),
  );
  const dateRange = `${dateFormatter.format(new Date(tour.eventDates.start))} — ${dateFormatter.format(new Date(tour.eventDates.end))}`;

  return (
    <MediaTourCard
      href={`/tours/${tour.slug}`}
      image={tour.thumbnail}
      title={tour.title}
      subtitle={tour.subtitle}
      location={tour.location}
      eyebrow={`Activity${tour.featured ? " · Featured" : ""}`}
      badgeTone="activity"
      price={basePrice}
      priceLabel="Packages from"
      actionLabel="View details"
      meta={[
        { icon: CalendarDays, label: dateRange },
        { icon: Clock3, label: `${shortestDuration} days` },
        { icon: Gauge, label: tour.difficulty },
      ]}
    />
  );
}
