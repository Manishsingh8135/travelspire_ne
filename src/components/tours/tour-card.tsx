import Link from "next/link";
import type { Route } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { readString } from "@/lib/json";
import type { Tour } from "@/lib/supabase/types";

export function TourCard({ tour }: { tour: Tour }) {
  const description =
    tour.subtitle ?? readString(tour.seo, "description") ?? readString(tour.body, "overview");

  return (
    <Link href={`/tours/${tour.slug}` as Route} className="group rounded-lg">
      <Card className="h-full transition-shadow duration-200 ease-out group-hover:shadow-md">
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
