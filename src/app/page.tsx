import FAQSection from "@/components/faqs/faq-home";
import { SplitHeroHome } from "@/components/hero/split-hero-home";
import { TestimonialCarousel } from "@/components/testimonials/testimonial-section";
import { UpcomingTours } from "@/components/tours/upcoming-tours";
import { testimonialData } from "@/data/testimonials/testimonial-data";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <SplitHeroHome/>
        <UpcomingTours/>
        <TestimonialCarousel data = {testimonialData}/>
        <FAQSection/>
        
      
    </div>
  );
}
