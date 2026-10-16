import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/* Badges carry status — availability, permit requirement, a fixed date. They
   are not decoration: "Adventure · Featured" on every card says nothing. */
const badgeVariants = cva(
  "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-[0.375rem] px-2 font-ui text-caption font-semibold [&_svg]:size-3.5",
  {
    variants: {
      tone: {
        neutral: "bg-fg/[0.06] text-fg-muted",
        brand: "bg-brand-soft text-brand",
        seasonal: "bg-seasonal-soft text-seasonal",
        positive: "bg-positive-soft text-positive",
        caution: "bg-caution-soft text-caution",
        critical: "bg-critical-soft text-critical",
        notice: "bg-notice-soft text-notice",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

const calloutTones = {
  note: { box: "bg-notice-soft border-notice", icon: "text-notice", Icon: Info },
  tip: { box: "bg-brand-soft border-brand", icon: "text-brand", Icon: Lightbulb },
  caution: { box: "bg-caution-soft border-caution", icon: "text-caution", Icon: TriangleAlert },
} as const;

type CalloutProps = {
  tone?: keyof typeof calloutTones;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Callout({ tone = "note", title, children, className }: CalloutProps) {
  const { box, icon, Icon } = calloutTones[tone];
  return (
    <aside className={cn("flex gap-3.5 rounded-r-card border-l-[3px] px-5 py-4", box, className)}>
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", icon)} />
      <div className="space-y-1 font-ui">
        {title ? <p className="text-body font-semibold text-fg">{title}</p> : null}
        <div className="text-small text-fg-muted">{children}</div>
      </div>
    </aside>
  );
}
