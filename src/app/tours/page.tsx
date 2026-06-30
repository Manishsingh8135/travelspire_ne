import type { Metadata } from "next";
import type { Route } from "next";
import { getPublishedTours } from "@/server/tours";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { TourCard } from "@/components/tours/tour-card";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Guided trips, treks and festival tours across Northeast India — small groups, local guides.",
  alternates: { canonical: "/tours" },
};

export default async function ToursPage() {
  const tours = await getPublishedTours();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" as Route }, { label: "Tours" }]} />
        <header className="mt-6 flex flex-col gap-4 border-b border-border-subtle pb-10">
          <h1 className="font-display text-5xl font-medium text-balance">Tours</h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
            Guided trips, treks and festival tours across Northeast India.
          </p>
        </header>

        <section className="py-10">
          {tours.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No tours published yet.</p>
          )}
        </section>
      </main>
    </>
  );
}
