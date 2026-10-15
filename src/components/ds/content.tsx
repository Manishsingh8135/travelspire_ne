import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { Badge, type BadgeProps } from "./feedback";

/* ── KeyFacts ──────────────────────────────────────────────────────────
   The answers people scan for first. A real <dl>, separated by hairlines,
   never boxed. */
export type KeyFact = { label: string; value: React.ReactNode; icon?: React.ComponentType<{ className?: string }> };

export function KeyFacts({ items, className }: { items: KeyFact[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 font-ui md:grid-cols-4 md:gap-0 md:divide-x md:divide-line",
        className,
      )}
    >
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="space-y-1 md:px-6 md:first:pl-0 md:last:pr-0">
          <dt className="flex items-center gap-1.5 text-small text-fg-subtle">
            {Icon ? <Icon aria-hidden className="size-4" /> : null}
            {label}
          </dt>
          <dd className="text-body font-semibold text-fg tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Accordion ─────────────────────────────────────────────────────────
   Native <details>: no JavaScript, keyboard-accessible, and the answers stay
   in the HTML for search engines. Pass `schema` to emit FAQPage JSON-LD. */
export type FaqItem = { question: string; answer: string };

export function Accordion({ items, schema = false, className }: { items: FaqItem[]; schema?: boolean; className?: string }) {
  return (
    <div className={cn("border-t border-line font-ui", className)}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-h4 text-fg transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-prose pb-6 pr-10 text-body text-fg-muted">{item.answer}</p>
        </details>
      ))}
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((i) => ({
                "@type": "Question",
                name: i.question,
                acceptedAnswer: { "@type": "Answer", text: i.answer },
              })),
            }),
          }}
        />
      ) : null}
    </div>
  );
}

/* ── Breadcrumbs ───────────────────────────────────────────────────────
   Visible trail plus BreadcrumbList JSON-LD from the same data. */
export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-ui text-small", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-fg-subtle">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-fg">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
            })),
          }),
        }}
      />
    </nav>
  );
}

/* ── TourCard ──────────────────────────────────────────────────────────
   Text sits below the photo, not on it: legible on every image, and the
   price is always in the same place. The whole card is one link. */
export type TourCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  place: string;
  title: string;
  duration: string;
  season?: string;
  price: number;
  badge?: { label: string; tone?: BadgeProps["tone"] };
  headingLevel?: "h2" | "h3";
  className?: string;
};

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function formatInr(amount: number) {
  return inr.format(amount);
}

export function TourCard({
  href,
  image,
  imageAlt,
  place,
  title,
  duration,
  season,
  price,
  badge,
  headingLevel: H = "h3",
  className,
}: TourCardProps) {
  return (
    <article className={cn("group relative flex flex-col font-ui", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-canvas-subtle">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {badge ? (
          <Badge tone={badge.tone ?? "seasonal"} className="absolute left-3 top-3 shadow-e1">
            {badge.label}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-small text-fg-subtle">{place}</p>
        <H className="mt-1 text-h3 text-fg transition-colors group-hover:text-brand">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </Link>
        </H>
        <p className="mb-4 mt-2 text-small text-fg-muted">
          {duration}
          {season ? <span className="text-fg-subtle"> · {season}</span> : null}
        </p>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
          <p className="text-small text-fg-subtle">
            From{" "}
            <span className="text-h4 font-semibold text-fg tabular-nums">{formatInr(price)}</span>
            <span className="sr-only"> per person</span>
          </p>
          <ArrowUpRight
            aria-hidden
            className="size-5 text-fg-subtle transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>
      </div>
      <span className="pointer-events-none absolute -inset-2 rounded-panel ring-2 ring-focus opacity-0 transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
