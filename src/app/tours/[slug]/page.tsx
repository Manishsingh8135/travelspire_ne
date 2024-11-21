// app/tours/[slug]/page.tsx
import { TourDetail } from "@/components/tours/tour-details";
import { getTourBySlug } from "@/data/tours/tour-helper";
import { notFound } from 'next/navigation';



export default async function TourPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Add await here since we're in an async component
  const { slug } = await Promise.resolve(params);
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <TourDetail tour={tour} />
    </main>
  );
}