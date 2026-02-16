import { cn } from "@/lib/utils";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export function GridLayout({ 
  children, 
  className,
  cols = { default: 1, md: 2 },
  gap = "gap-8"
}: GridLayoutProps) {
  const getGridCols = () => {
    const colClasses = [];
    
    // Default columns (mobile first)
    colClasses.push(`grid-cols-${cols.default}`);
    
    // Responsive columns
    if (cols.sm) colClasses.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`);
    
    return colClasses.join(" ");
  };

  return (
    <div className={cn(
      "grid",
      getGridCols(),
      gap,
      className
    )}>
      {children}
    </div>
  );
}
