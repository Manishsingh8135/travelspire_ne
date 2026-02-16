import FAQSection from "@/components/faqs/faq-home";
import { SplitHeroHome } from "@/components/hero/split-hero-home";
import { TestimonialCarousel } from "@/components/testimonials/testimonial-section";
import { UpcomingTours } from "@/components/tours/upcoming-tours";
import { testimonialData } from "@/data/testimonials/testimonial-data";
import { ImageSEO } from "@/components/seo/image-seo";
import { getAllPlaceImages } from "@/data/seo/image-seo-data";

export default function Home() {
  // Get featured images for homepage SEO (mix from different locations)
  const featuredImages = getAllPlaceImages().slice(0, 8);
  
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {/* Image SEO for homepage featuring best destinations */}
        <ImageSEO images={featuredImages} limit={8} />
        
        <SplitHeroHome/>
        <UpcomingTours/>
        <TestimonialCarousel data = {testimonialData}/>
        <FAQSection/>
        
      
    </div>
  );
}
