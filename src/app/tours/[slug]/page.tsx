import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPublishedTours, getTourBySlug } from "@/server/tours";
import { buildMetadata } from "@/lib/seo";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Badge } from "@/components/ui";
import { MediaImage } from "@/components/media/media-image";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tours = await getPublishedTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

function strArray(value: unknown, key: string): string[] {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const arr = (value as Record<string, unknown>)[key];
    if (Array.isArray(arr)) return arr.filter((x): x is string => typeof x === "string");
  }
  return [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  return buildMetadata(tour.seo, {
    title: tour.title,
    description: tour.subtitle ?? readString(tour.body, "overview"),
    path: `/tours/${slug}`,
  });
}

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const overview = readString(tour.body, "overview");
  const highlights = strArray(tour.body, "highlights");
  const inclusions = strArray(tour.body, "inclusions");
  const base = env.NEXT_PUBLIC_SITE_URL;
  const url = `${base}/tours/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    url,
    ...(overview || tour.subtitle ? { description: overview ?? tour.subtitle } : {}),
    ...(tour.price_inr
      ? {
          offers: {
            "@type": "Offer",
            price: tour.price_inr,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" as Route },
            { label: "Tours", href: "/tours" as Route },
            { label: tour.title },
          ]}
        />

        <article className="mt-6 flex flex-col gap-8">
          {tour.hero ? (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-muted">
              <MediaImage media={tour.hero} priority sizes="(min-width: 768px) 768px, 100vw" />
            </div>
          ) : null}
          <header className="flex flex-col gap-3 border-b border-border-subtle pb-8">
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="capitalize">
                {tour.type}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {tour.difficulty}
              </Badge>
            </div>
            <h1 className="font-display text-5xl font-medium text-balance">{tour.title}</h1>
            {tour.subtitle ? (
              <p className="text-lg text-muted-foreground text-pretty">{tour.subtitle}</p>
            ) : null}
            <dl className="flex flex-wrap gap-x-8 gap-y-2 pt-1 font-mono text-sm text-muted-foreground">
              {tour.duration_days ? (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground/70">Duration</dt>
                  <dd className="tabular-nums text-foreground">{tour.duration_days} days</dd>
                </div>
              ) : null}
              {tour.best_time ? (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground/70">Best time</dt>
                  <dd className="text-foreground">{tour.best_time}</dd>
                </div>
              ) : null}
              {tour.price_inr ? (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground/70">From</dt>
                  <dd className="tabular-nums text-foreground">
                    ₹{tour.price_inr.toLocaleString("en-IN")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </header>

          {overview ? <p className="text-lg leading-relaxed text-pretty">{overview}</p> : null}

          {highlights.length ? (
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-medium">Highlights</h2>
              <ul className="flex flex-col gap-2">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-pretty">
                    <span aria-hidden className="text-muted-foreground">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {inclusions.length ? (
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-medium">What&apos;s included</h2>
              <ul className="flex flex-col gap-2">
                {inclusions.map((item) => (
                  <li key={item} className="flex gap-2.5 text-pretty">
                    <span aria-hidden className="text-muted-foreground">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <JsonLd data={jsonLd} />
    </>
  );
}
