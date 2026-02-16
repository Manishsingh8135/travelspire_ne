import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  description?: string;
  metadata?: {
    label: string;
    value: string;
  }[];
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

export function ImageCard({
  href,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  metadata,
  className,
  imageClassName,
  contentClassName,
}: ImageCardProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative aspect-[16/9] w-full overflow-hidden",
        imageClassName
      )}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col gap-2 p-6",
        contentClassName
      )}>
        {subtitle && (
          <p className="text-sm font-medium text-primary-600">
            {subtitle}
          </p>
        )}
        
        <h3 className="text-xl font-semibold text-card-foreground">
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}

        {metadata && metadata.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}:
                </span>
                <span className="text-sm text-card-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
