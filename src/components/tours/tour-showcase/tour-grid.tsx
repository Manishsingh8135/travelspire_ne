// components/tours/tour-showcase/tour-grid.tsx
import { cn } from "@/lib/utils";

interface TourGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TourGrid({ children, className }: TourGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-8",
      className
    )}>
      {children}
    </div>
  );
}