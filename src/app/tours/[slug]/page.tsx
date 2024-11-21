// app/tours/[slug]/page.tsx
import { TourDetail } from "@/components/tours/tour-details/tour-detail";  // Updated import path
import { getTourBySlug } from "@/data/tours/tour-helper";
import { notFound } from "next/navigation";

export default async function TourPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <TourDetail tour={tour} />
    </main>
  );
}