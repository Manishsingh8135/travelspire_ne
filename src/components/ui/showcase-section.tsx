import { cn } from "@/lib/utils";

interface ShowcaseSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function ShowcaseSection({ 
  children, 
  className,
  containerClassName 
}: ShowcaseSectionProps) {
  return (
    <section className={cn(
      "w-full py-12 md:py-16 lg:py-20",
      className
    )}>
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  );
}

interface ShowcaseHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function ShowcaseHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName
}: ShowcaseHeaderProps) {
  return (
    <div className={cn(
      "text-center max-w-3xl mx-auto mb-12",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold text-foreground mb-4",
        titleClassName
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-muted-foreground",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
