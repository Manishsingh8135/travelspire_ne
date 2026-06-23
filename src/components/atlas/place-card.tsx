import Link from "next/link";
import type { Route } from "next";
import { Mountain } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { readString } from "@/lib/json";
import type { Place } from "@/lib/supabase/types";

export function PlaceCard({ place, regionSlug }: { place: Place; regionSlug: string }) {
  const description = readString(place.seo, "description") ?? readString(place.body, "intro");
  const href = `/${regionSlug}/${place.slug}` as Route;

  return (
    <Link href={href} className="group rounded-lg">
      <Card className="h-full transition-shadow duration-200 ease-out group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Mountain className="size-3.5" aria-hidden />
            <span className="capitalize">{place.kind}</span>
            {place.elevation_m ? (
              <span className="tabular-nums">· {place.elevation_m.toLocaleString()} m</span>
            ) : null}
          </div>
          <CardTitle>{place.name}</CardTitle>
          {description ? (
            <CardDescription className="line-clamp-3">{description}</CardDescription>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
}
