// components/tours/tour-showcase/tour-grid.tsx
import { cn } from "@/lib/utils";

interface TourGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TourGrid({ children, className }: TourGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
