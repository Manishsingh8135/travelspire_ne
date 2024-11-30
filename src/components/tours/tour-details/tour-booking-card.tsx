// components/tours/tour-detail/tour-booking-card.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tour, isRegularTour, isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";
import { DotPattern } from "@/components/ui/background-patterns";

interface TourBookingCardProps {
  tour: Tour;
  className?: string;
}

export function TourBookingCard({ tour, className }: TourBookingCardProps) {
  // Get the appropriate price based on tour type
  const getPrice = () => {
    if (isRegularTour(tour)) {
      return tour.price;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return Math.min(...tour.variants.map(v => v.price));
    }
    return 0;
  };

  // Get the appropriate price label
  const getPriceLabel = () => {
    if (isRegularTour(tour)) {
      return "Price per person";
    }
    return "Starting from";
  };

  const price = getPrice();

  return (
    <div className={cn(
      "relative rounded-[2.5rem] overflow-hidden",
      "bg-gradient-to-tr from-primary-50 via-white to-secondary-50/30",
      "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
      "border border-primary-100/20 dark:border-white/10",
      "shadow-glow dark:shadow-none",
      "backdrop-blur-xl",
      "p-6",
      className
    )}>
      {/* Background pattern */}
      <DotPattern className="opacity-30 dark:opacity-10" />

      <div className="relative space-y-6">
        {/* Price Display */}
        <div className={cn(
          "text-center pb-6",
          "border-b border-primary-100/20 dark:border-white/10"
        )}>
          <div className="text-sm text-muted-foreground">{getPriceLabel()}</div>
          <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ₹{price.toLocaleString()}
          </div>
        </div>

        {/* Booking Form */}
        <form className="space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "bg-white dark:bg-white/5",
                "border border-primary-100/20 dark:border-white/10",
                "text-foreground dark:text-white",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Your Email"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "bg-white dark:bg-white/5",
                "border border-primary-100/20 dark:border-white/10",
                "text-foreground dark:text-white",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Your Phone"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "bg-white dark:bg-white/5",
                "border border-primary-100/20 dark:border-white/10",
                "text-foreground dark:text-white",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={cn(
              "w-full py-4 rounded-xl",
              "bg-gradient-primary hover:bg-gradient-secondary",
              "text-white font-medium",
              "shadow-glow-sm dark:shadow-none",
              "transition-all duration-300"
            )}
          >
            Book Now
          </motion.button>
        </form>
      </div>
    </div>
  );
}