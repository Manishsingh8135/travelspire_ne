import type { Metadata } from "next";
import { getMappablePlaces } from "@/server/atlas";
import { LivingMap } from "@/components/map/living-map";
import { SiteHeader } from "@/components/site/site-header";
import { env } from "@/lib/env";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Explore the map",
  description:
    "The living map of Northeast India — places, treks and secret spots, on your own terms.",
  alternates: { canonical: "/explore" },
};

export default async function ExplorePage() {
  const places = await getMappablePlaces();

  return (
    <div className="flex h-dvh flex-col">
      <SiteHeader />
      <main className="relative flex-1">
        <LivingMap places={places} token={env.NEXT_PUBLIC_MAPBOX_TOKEN} />
      </main>
    </div>
  );
}
