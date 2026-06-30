import Link from "next/link";
import type { Route } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { MediaImage } from "@/components/media/media-image";
import { readString } from "@/lib/json";
import type { TourWithHero } from "@/server/tours";

export function TourCard({ tour }: { tour: TourWithHero }) {
  const description =
    tour.subtitle ?? readString(tour.seo, "description") ?? readString(tour.body, "overview");

  return (
    <Link href={`/tours/${tour.slug}` as Route} className="group rounded-lg">
      <Card className="h-full overflow-hidden transition-shadow duration-200 ease-out group-hover:shadow-md">
        {tour.hero ? (
          <div className="relative aspect-[16/10] w-full bg-muted">
            <MediaImage
              media={tour.hero}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
            <span className="capitalize">{tour.type}</span>
            {tour.duration_days ? <span>· {tour.duration_days}d</span> : null}
            <span className="capitalize">· {tour.difficulty}</span>
          </div>
          <CardTitle>{tour.title}</CardTitle>
          {description ? (
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          ) : null}
        </CardHeader>
        {tour.price_inr ? (
          <CardContent className="mt-auto flex items-baseline gap-1.5">
            <span className="font-medium tabular-nums">
              ₹{tour.price_inr.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted-foreground">per person</span>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}
