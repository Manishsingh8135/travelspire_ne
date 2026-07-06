import { MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The conversion engine — until Razorpay lands, WhatsApp IS the checkout
 * (docs-new/07-pages/10 §19). One component for every chat CTA so copy,
 * look and analytics live in one place. `href` comes from src/lib/whatsapp.ts
 * intent builders — never hand-built URLs.
 */
export function WhatsAppCTA({
  href,
  children,
  variant = "primary",
  note,
  className,
}: {
  href: string;
  children: React.ReactNode;
  /** primary = filled pine action · soft = quiet text link */
  variant?: "primary" | "soft";
  /** honest response-time microcopy, e.g. "Usually within the hour, IST daytime" */
  note?: string;
  className?: string;
}) {
  if (variant === "soft") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex items-center gap-2 text-sm font-medium text-secondary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <MessageCircle className="size-4" />
        {children}
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    );
  }
  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-panel transition-[background-color,transform] duration-150 ease-out outline-none hover:bg-pine-600 focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px sm:w-auto"
      >
        <MessageCircle className="size-4.5" />
        {children}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
      {note ? (
        <p className="mt-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {note}
        </p>
      ) : null}
    </div>
  );
}
