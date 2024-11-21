import { TourDetail } from "@/components/tours/tour-details/tour-detail";
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
    <main className="min-h-screen">
      <TourDetail tour={tour} />
    </main>
  );
}
