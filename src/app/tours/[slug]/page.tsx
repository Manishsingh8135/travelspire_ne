import { Metadata } from 'next'
import { TourWrapper } from "@/components/tours/tour-details/tour-wrapper";
import { getTourBySlug } from "@/data/tours/tour-helper";
import { notFound } from "next/navigation";
import { StructuredData } from '@/components/seo/structured-data'
import { PageSEO } from '@/components/seo/page-seo'
import { generateTourPackageSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import { Tour } from '@/types/tours/tour'

interface Params {
  slug: string;
}

// Helper functions to handle different tour types
const getDuration = (tour: Tour): string => {
  if ('duration' in tour) return tour.duration;
  if ('variants' in tour && tour.variants?.length > 0) {
    return `${tour.variants[0].duration.days} Days / ${tour.variants[0].duration.nights} Nights`;
  }
  return '6 Days';
};

const getPrice = (tour: Tour): number => {
  if ('price' in tour) return tour.price;
  if ('variants' in tour && tour.variants?.length > 0) {
    return Math.min(...tour.variants.map(v => v.price));
  }
  return 15000;
};

// Generate metadata for each tour page
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  
  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  const duration = getDuration(tour);
  const price = getPrice(tour);

  return {
    title: `${tour.title} | ${duration} Adventure ₹${price.toLocaleString('en-IN')}`,
    description: tour.overview || `Experience ${tour.title} with Travelspire NE. ${duration} of authentic Northeast India adventure starting from ₹${price.toLocaleString('en-IN')}.`,
    keywords: [
      tour.title,
      `${tour.location} tour`,
      'Northeast India travel',
      'Arunachal Pradesh tour',
      'authentic travel experience',
      tour.difficulty + ' difficulty',
      'adventure tourism',
      ...tour.highlights?.slice(0, 5) || []
    ],
    openGraph: {
      title: `${tour.title} | ${duration} Adventure`,
      description: tour.overview || `Experience authentic ${tour.location} with expert local guides`,
      images: [tour.heroImage],
      url: `https://travelspirene.com/tours/${tour.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | Northeast India Adventure`,
      description: `${duration} exploring ${tour.location} with Travelspire NE`,
      images: [tour.heroImage]
    },
    alternates: {
      canonical: `https://travelspirene.com/tours/${tour.slug}`
    }
  };
}

interface Params {
  slug: string;
}

export default async function TourPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  // Generate structured data for the tour
  const tourSchema = generateTourPackageSchema({
    title: tour.title,
    description: tour.overview,
    price: getPrice(tour),
    duration: getDuration(tour),
    difficulty: tour.difficulty,
    heroImage: tour.heroImage,
    itinerary: 'itinerary' in tour ? tour.itinerary : undefined
  });

  const breadcrumbs = [
    { name: "Home", url: "https://travelspirene.com" },
    { name: "Tours", url: "https://travelspirene.com/all-tours" },
    { name: tour.title, url: `https://travelspirene.com/tours/${tour.slug}` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* SEO Components */}
      <StructuredData data={tourSchema} />
      <StructuredData data={breadcrumbSchema} />
      <PageSEO breadcrumbs={breadcrumbs} />
      
      {/* Main Tour Content */}
      <div className="min-h-screen overflow-x-hidden">
        <TourWrapper tour={tour} />
      </div>
    </>
  );
}