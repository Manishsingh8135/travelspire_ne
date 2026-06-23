import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        danger: "bg-danger text-white hover:opacity-90",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-sm px-3 text-sm [&_svg]:size-4",
        md: "h-11 rounded-md px-5 text-sm [&_svg]:size-4",
        lg: "h-12 rounded-md px-6 text-base [&_svg]:size-5",
        icon: "size-11 rounded-md [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : null}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
