import * as React from "react";
import { cn } from "@/lib/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-sm border border-input bg-card px-3.5 py-2.5 text-base text-foreground shadow-xs outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring",
        "aria-[invalid=true]:border-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
