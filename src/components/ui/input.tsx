import * as React from "react";
import { cn } from "@/lib/cn";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-sm border border-input bg-card px-3.5 text-base text-foreground shadow-xs outline-none transition-colors",
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

export { Input };
