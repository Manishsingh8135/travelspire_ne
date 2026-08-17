import type React from "react";
import { cn } from "@/lib/utils";

interface TourShowcaseProps {
  children: React.ReactNode;
  className?: string;
}

export function TourShowcase({ children, className }: TourShowcaseProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#07100d] py-20 text-white sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        {children}
      </div>
    </section>
  );
}
