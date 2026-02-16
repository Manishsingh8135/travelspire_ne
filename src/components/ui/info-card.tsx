// components/ui/info-card.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  items?: string[];
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  items,
  className,
  headerClassName,
  contentClassName,
}: InfoCardProps) {
  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-md",
      "border border-border/50",
      "transition duration-300 hover:shadow-lg",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "mb-4 flex items-center gap-3",
        headerClassName
      )}>
        {Icon && (
          <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/50">
            <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-card-foreground">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className={cn(
        "space-y-3",
        contentClassName
      )}>
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}

        {items && items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-card-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
