import * as React from "react";
import { IconCheck, IconMinus, IconArrowRight, IconWhatsApp } from "@/components/icons";
import { ButtonLink, Container, Heading, Section, buttonVariants } from "@/components/ds";
import { cn } from "@/lib/utils";

/* ── CheckList ─────────────────────────────────────────────────────────
   Included / not included / what to carry. A tick or a dash leads each line;
   no boxes around the list. */
export function CheckList({
  title,
  items,
  tone = "include",
  className,
}: {
  title?: string;
  items: string[];
  tone?: "include" | "exclude" | "neutral";
  className?: string;
}) {
  const Mark = tone === "exclude" ? IconMinus : IconCheck;
  return (
    <div className={cn("font-ui", className)}>
      {title ? <h3 className="text-h4 text-fg">{title}</h3> : null}
      <ul className={cn("space-y-3", title && "mt-4")}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body text-fg-muted">
            <Mark
              size={18}
              strokeWidth={2}
              className={cn(
                "mt-[3px] shrink-0",
                tone === "include" && "text-positive",
                tone === "exclude" && "text-fg-subtle",
                tone === "neutral" && "text-brand",
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ContentSection ────────────────────────────────────────────────────
   A titled block inside a long page. The id doubles as the SectionNav
   anchor; scroll-margin keeps the title clear of the sticky bars. */
export function ContentSection({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-36", className)}>
      <Heading as="h2" size="h2">
        {title}
      </Heading>
      {intro ? <p className="mt-3 max-w-prose font-ui text-body text-fg-muted">{intro}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ── Steps ─────────────────────────────────────────────────────────────
   A numbered process: permits, booking. Numbers sit on a hairline rail. */
export function Steps({ items, className }: { items: { title: string; body: React.ReactNode }[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-8 font-ui", className)}>
      <span aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-line" />
      {items.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[2rem_1fr] gap-4">
          <span className="relative z-10 grid size-8 place-items-center rounded-full border border-line-strong bg-canvas text-small font-semibold text-fg tabular-nums">
            {i + 1}
          </span>
          <div className="pt-1">
            <h3 className="text-h4 text-fg">{step.title}</h3>
            <div className="mt-1.5 text-body text-fg-muted">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── PlanCta ───────────────────────────────────────────────────────────
   The closing band on most pages: one question, two honest actions. */
export function PlanCta({
  title = "Tell us your dates. We’ll plan the road.",
  body = "A real person in Dibrugarh answers — usually within a few hours, always before you pay anything.",
  whatsappHref,
  secondary = { label: "Browse all tours", href: "/all-tours" },
}: {
  title?: React.ReactNode;
  body?: React.ReactNode;
  whatsappHref: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="inverse" spacing="compact">
      <Container className="grid gap-8 py-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <Heading as="h2" size="h2" className="max-w-[22ch]">
          {title}
        </Heading>
        <div className="space-y-5 md:justify-self-end">
          <p className="max-w-[42ch] font-ui text-body text-fg-muted">{body}</p>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
              <IconWhatsApp />
              Plan on WhatsApp
            </a>
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
              <IconArrowRight />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── CardRail ──────────────────────────────────────────────────────────
   A swipeable row of cards on phones (the next card peeks in as the cue),
   a normal grid from tablet up. Keeps long card lists from turning into a
   wall on mobile. */
export function CardRail({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul
      className={cn(
        "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden",
        "md:mx-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3",
        "[&>li]:w-[82%] [&>li]:shrink-0 [&>li]:snap-start md:[&>li]:w-auto",
        className,
      )}
    >
      {children}
    </ul>
  );
}
