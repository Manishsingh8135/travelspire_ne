import Link from "next/link";
import { IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/icons";
import type { SiteNav } from "@/data/site-nav";
import { Logo } from "./logo";
import { ThemeSwitch } from "./theme-controls";

/* Footer: the full map of the site in four columns, how to reach a person,
   and the legal row. No newsletter — the old one never sent anything. */
export function SiteFooter({ nav }: { nav: SiteNav }) {
  const [tours, destinations, permits] = nav.panels;
  const columns = [
    {
      heading: "Tours",
      links: [...tours.groups.flatMap((g) => g.links).slice(0, 7), { label: "All tours", href: "/all-tours" }],
    },
    {
      heading: "Destinations",
      links: destinations.groups.flatMap((g) => g.links),
    },
    {
      heading: "Permits",
      links: [{ label: "Permit overview", href: "/permits" }, ...permits.groups.flatMap((g) => g.links)],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Gallery", href: "/gallery" },
        { label: "Booking policy", href: "/booking-policy" },
      ],
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas-subtle font-ui">
      <div className="mx-auto w-full max-w-wide px-5 pb-28 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
          <div className="max-w-sm space-y-5">
            <Logo />
            <p className="text-body text-fg-muted">
              A local travel company from Dibrugarh. We run our own vehicles on Arunachal&apos;s roads, arrange your
              permits, and stay on WhatsApp for the whole trip.
            </p>
            <ul className="space-y-2.5 text-body">
              <li>
                <a href={nav.contact.phoneHref} className="inline-flex items-center gap-2.5 text-fg hover:text-brand">
                  <IconPhone size={18} className="text-fg-subtle" />
                  {nav.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${nav.contact.email}`} className="inline-flex items-center gap-2.5 text-fg hover:text-brand">
                  <IconMail size={18} className="text-fg-subtle" />
                  {nav.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-fg-muted">
                <IconPin size={18} className="text-fg-subtle" />
                HSR Layout, Dibrugarh, Assam 786001
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-eyebrow uppercase text-fg-subtle">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-small text-fg-muted transition-colors hover:text-fg">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-fg-subtle">
            <span>© {year} Travelspire Northeast</span>
            <Link href="/privacy-policy" className="hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-fg">
              Terms
            </Link>
            <Link href="/booking-policy" className="hover:text-fg">
              Booking &amp; refunds
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={nav.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-10 place-items-center rounded-control border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <IconWhatsApp size={20} />
            </a>
            <a
              href={nav.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-control border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <IconInstagram size={20} />
            </a>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
