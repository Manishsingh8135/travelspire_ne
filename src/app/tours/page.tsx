// app/tours/page.tsx
import { UpcomingTours } from "@/components/tours/upcoming-tours";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

export default function ToursPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-black dark:via-accent-900 dark:to-black">
       {/* Background Effects Wrapped in Overflow-Hidden Container */}
       <div className="relative overflow-hidden">
        <DotPattern className="opacity-30 dark:opacity-10" />
        <GlowEffect 
          color="primary"
          size="lg"
          className="-top-20 -right-20 md:-top-40 md:-right-40"
        />
        <GlowEffect 
          color="secondary"
          size="lg"
          className="-bottom-20 -left-20 md:-bottom-40 md:-left-40"
        />
      </div>
      
      {/* Tours Grid */}
      <UpcomingTours />
    </div>
  );
}