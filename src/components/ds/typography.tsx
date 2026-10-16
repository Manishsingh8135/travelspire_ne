import * as React from "react";
import { cn } from "@/lib/utils";

/* Heading level (the page outline search engines read) and heading size (the
   design) are chosen separately: a card title can be an h3 at h4 size, a
   hero can be the h1 at display size. */
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "p";
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

const headingSizes: Record<HeadingSize, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  size?: HeadingSize;
};

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  const resolved = size ?? (Tag === "p" ? "h3" : Tag);
  return (
    <Tag
      className={cn("font-ui text-balance text-fg", headingSizes[resolved], className)}
      {...props}
    />
  );
}

/* The one serif-italic phrase a heading may carry. Instrument Serif runs a
   smaller x-height than the sans, so it is nudged up to sit level. */
export function Accent({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-display text-[1.08em] font-normal italic tracking-normal text-highlight", className)}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-ui text-eyebrow uppercase text-highlight", className)} {...props} />;
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-ui text-lead text-fg-muted text-pretty", className)} {...props} />;
}

/* Long-form text: guides, policies, permit explanations. */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-prose font-ui text-body-lg text-fg-muted",
        "[&_p]:mt-5 first:[&_p]:mt-0 [&_strong]:font-semibold [&_strong]:text-fg",
        "[&_h2]:mt-12 [&_h2]:text-h2 [&_h2]:text-fg [&_h3]:mt-10 [&_h3]:text-h3 [&_h3]:text-fg",
        "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-line-strong",
        "[&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-brand",
        className,
      )}
      {...props}
    />
  );
}

/* Compact section header: title left, intro and action right on desktop so
   the content below gets the height, not the chrome. */
type SectionHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  as = "h2",
  size = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-12",
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading as={as} size={size} className="max-w-[20ch]">
          {title}
        </Heading>
      </div>
      {intro || action ? (
        <div className="space-y-5 md:justify-self-end md:pb-1">
          {intro ? <p className="max-w-[46ch] text-body text-fg-muted text-pretty">{intro}</p> : null}
          {action}
        </div>
      ) : null}
    </header>
  );
}
