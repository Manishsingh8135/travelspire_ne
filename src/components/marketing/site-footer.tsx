import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";

type FooterCol = { heading: string; links: { label: string; href: string }[] };

const COLUMNS: FooterCol[] = [
  {
    heading: "Explore",
    links: [
      { label: "The Atlas", href: "/#atlas" },
      { label: "Living Map", href: "/explore" },
      { label: "Stories", href: "/#stories" },
      { label: "Expeditions", href: "/tours" },
    ],
  },
  {
    heading: "Plan",
    links: [
      { label: "Meet Mei", href: "/#mei" },
      { label: "Permits (ILP/PAP)", href: "https://wa.me/919864141211?text=Hi%20Travelspire%20%E2%80%94%20I%20need%20help%20with%20permits." },
      { label: "Festivals", href: "/tours?type=festival" },
      { label: "Rides", href: "/tours" },
    ],
  },
  {
    heading: "Travelspire",
    links: [
      { label: "Our story", href: "/#people" },
      {
        label: "Hosts & Scouts",
        href: "https://wa.me/919864141211?text=Hi%20Travelspire%20%E2%80%94%20I%20run%20a%20homestay%20or%20know%20my%20region%20well%20and%20want%20to%20partner.",
      },
      { label: "Journal", href: "/#stories" },
      {
        label: "Contact",
        href: "https://wa.me/919864141211?text=Hi%20Travelspire%20%E2%80%94%20I%20have%20a%20question.",
      },
    ],
  },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "text-sm text-muted-foreground/80 transition-colors hover:text-foreground";
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={className}>
      {children}
    </Link>
  );
}

/**
 * The closing chapter (new.md §17): one oversized field-journal line, then the
 * footer proper. Dark bookend to the page.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="forest" className="relative bg-charcoal-950 text-mist-50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Emotional close */}
        <div className="border-b border-mist-50/10 py-20 md:py-28">
          <p className="max-w-4xl font-display text-4xl leading-[1.05] font-medium text-balance md:text-6xl">
            The Northeast{" "}
            <span className="text-secondary italic">isn&apos;t waiting forever.</span>
          </p>
          <a
            href="#top"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-mist-200 transition-colors hover:text-mist-50"
          >
            Begin your journey
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {/* Footer grid */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <BrandLogo />
            <p className="max-w-xs text-sm text-muted-foreground/80">
              The living atlas, marketplaces and trip companion for Northeast India —
              guided when you want it, independent when you don&apos;t.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
              <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-mist-400">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-mist-50/10 py-8 text-xs text-mist-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Travelspire. Made in Northeast India.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#privacy" className="transition-colors hover:text-mist-50">
              Privacy
            </a>
            <a href="#terms" className="transition-colors hover:text-mist-50">
              Terms
            </a>
            <a href="#responsible" className="transition-colors hover:text-mist-50">
              Responsible travel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
