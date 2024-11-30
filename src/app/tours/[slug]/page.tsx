// app/tours/[slug]/page.tsx
import { TourWrapper } from "@/components/tours/tour-details/tour-wrapper";
import { getTourBySlug } from "@/data/tours/tour-helper";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export default async function TourPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TourWrapper tour={tour} />
    </div>
  );
}