// app/tours/page.tsx
import { UpcomingTours } from "@/components/tours/upcoming-tours";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

export default function ToursPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-black dark:via-accent-900 dark:to-black">
      {/* Background Effects */}
      <DotPattern className="opacity-30 dark:opacity-10" />
      <GlowEffect 
        color="primary"
        size="lg"
        className="-top-40 -right-40"
      />
      <GlowEffect 
        color="secondary"
        size="lg"
        className="-bottom-40 -left-40"
      />
      
      {/* Tours Grid */}
      <UpcomingTours />
    </main>
  );
}