import { Metadata } from "next";
import { TourPage as TourTemplate } from "@/components/tours/tour-page";
import { getTourBySlug } from "@/data/tours/tour-helper";
import { getActiveTours, isTourOver } from "@/data/tours";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/seo/structured-data";
import { ImageSEO } from "@/components/seo/image-seo";
import { generateTourPackageSchema } from "@/lib/structured-data";
import { getPlaceImageAlt, getPlaceImageBySrc } from "@/data/seo/image-seo-data";
import { Tour } from "@/types/tours/tour";

interface Params {
  slug: string;
}

// Festival editions end; re-render a few times a day so the page notices.
export const revalidate = 21600; // DATE_DRIVEN_REVALIDATE_SECONDS — must be a literal

// Helper functions to handle different tour types
const getDuration = (tour: Tour): string => {
  if ("duration" in tour) return tour.duration;
  if ("variants" in tour && tour.variants?.length > 0) {
    const { days, nights } = tour.variants[0].duration;
    return `${days} ${days === 1 ? "Day" : "Days"} / ${nights} ${nights === 1 ? "Night" : "Nights"}`;
  }
  return "6 Days";
};

const getPrice = (tour: Tour): number => {
  if ("price" in tour) return tour.price;
  if ("variants" in tour && tour.variants?.length > 0) {
    return Math.min(...tour.variants.map((v) => v.price));
  }
  return 15000;
};

// Generate metadata for each tour page
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  const duration = getDuration(tour);
  const price = getPrice(tour);
  const heroAlt = getPlaceImageAlt(
    tour.heroImage,
    `${tour.title} in ${tour.location}`,
  );
  const heroUrl = tour.heroImage.startsWith("http")
    ? tour.heroImage
    : `https://travelspirene.com${tour.heroImage}`;

  const description =
    tour.seo?.description ||
    tour.overview ||
    `Experience ${tour.title} with Travelspire NE. ${duration} of authentic Northeast India adventure starting from ₹${price.toLocaleString("en-IN")}.`;

  return {
    title: tour.seo
      ? { absolute: tour.seo.title }
      : `${tour.title} | ${duration} Adventure ₹${price.toLocaleString("en-IN")}`,
    description,
    keywords: tour.seo?.keywords ?? [
      tour.title,
      `${tour.location} tour`,
      "Northeast India travel",
      "Arunachal Pradesh tour",
      "authentic travel experience",
      tour.difficulty + " difficulty",
      "adventure tourism",
      ...(tour.highlights?.slice(0, 5) || []),
    ],
    openGraph: {
      title: tour.seo?.title ?? `${tour.title} | ${duration} Adventure`,
      description,
      images: [
        {
          url: heroUrl,
          alt: heroAlt,
        },
      ],
      url: `https://travelspirene.com/tours/${tour.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | Northeast India Adventure`,
      description: `${duration} exploring ${tour.location} with Travelspire NE`,
      images: [heroUrl],
    },
    alternates: {
      canonical: `https://travelspirene.com/tours/${tour.slug}`,
    },
  };
}

interface Params {
  slug: string;
}

export default async function TourPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const gallerySeoImages = tour.gallery
    .map((src) => getPlaceImageBySrc(src))
    .filter((image): image is NonNullable<typeof image> => Boolean(image));

  // Generate structured data for the tour
  const tourSchema = generateTourPackageSchema({
    title: tour.title,
    description: tour.overview,
    price: getPrice(tour),
    duration: getDuration(tour),
    difficulty: tour.difficulty,
    heroImage: tour.heroImage,
    gallery: tour.gallery,
    itinerary: "itinerary" in tour ? tour.itinerary : undefined,
  });

  // BreadcrumbList comes from the visible <Breadcrumbs> in the template.

  return (
    <>
      {/* SEO Components */}
      <StructuredData data={tourSchema} />
      {gallerySeoImages.length > 0 && (
        <ImageSEO images={gallerySeoImages} limit={12} />
      )}

      <TourTemplate tour={tour} isOver={isTourOver(tour)} pool={getActiveTours()} />
    </>
  );
}
