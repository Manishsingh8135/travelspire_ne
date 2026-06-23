import * as React from "react";
import { Label as LabelPrimitive } from "@radix-ui/react-label";
import { cn } from "@/lib/cn";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive>) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        "text-sm font-medium text-foreground select-none peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function FieldMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p role="alert" className={cn("text-sm font-medium text-danger", className)} {...props} />
  );
}

export { Field, Label, FieldDescription, FieldMessage };
