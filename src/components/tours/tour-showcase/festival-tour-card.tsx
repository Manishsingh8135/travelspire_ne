import { CalendarDays, Gauge, Layers3 } from "lucide-react";
import type { FestivalTour } from "@/types/tours/tour";
import { MediaTourCard } from "./media-tour-card";

interface FestivalTourCardProps {
  tour: FestivalTour;
  index: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
});

export function FestivalTourCard({ tour }: FestivalTourCardProps) {
  const basePrice = Math.min(...tour.variants.map((variant) => variant.price));
  const dateRange = `${dateFormatter.format(new Date(tour.eventDates.start))} — ${dateFormatter.format(new Date(tour.eventDates.end))}`;

  return (
    <MediaTourCard
      href={`/tours/${tour.slug}`}
      image={tour.thumbnail}
      title={tour.title}
      subtitle={tour.subtitle}
      location={tour.location}
      eyebrow={`Festival${tour.featured ? " · Featured" : ""}`}
      badgeTone="festival"
      price={basePrice}
      priceLabel="Packages from"
      actionLabel="View packages"
      meta={[
        { icon: CalendarDays, label: dateRange },
        {
          icon: Layers3,
          label: `${tour.variants.length} package${tour.variants.length === 1 ? "" : "s"}`,
        },
        { icon: Gauge, label: tour.difficulty },
      ]}
    />
  );
}
