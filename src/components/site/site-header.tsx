"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ds";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconChevronDown,
  IconClose,
  IconMenu,
  IconPhone,
  IconWhatsApp,
} from "@/components/icons";
import type { NavPanel, SiteNav } from "@/data/site-nav";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-controls";

/* The site header. Sticky, so pages never hide content beneath it. Every
   panel and the mobile sheet are rendered on the server and only shown or
   hidden here — the links are in the HTML for crawlers, and there is no
   media-query branch to flash on hydration (what broke the old bar). */

const isCurrent = (pathname: string, prefixes: string[]) =>
  prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export function SiteHeader({ nav }: { nav: SiteNav }) {
  const pathname = usePathname();
  const [panel, setPanel] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setPanel(null), 160);
  };
  const closeAll = useCallback(() => {
    setPanel(null);
    setSheet(false);
  }, []);

  // A navigation always closes everything.
  useEffect(closeAll, [pathname, closeAll]);

  // Escape and outside clicks close an open panel.
  useEffect(() => {
    if (!panel && !sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = panel
        ? document.getElementById(`nav-trigger-${panel}`)
        : null;
      closeAll();
      trigger?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node))
        setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [panel, sheet, closeAll]);

  // The mobile sheet owns the viewport while it is open.
  useEffect(() => {
    const root = document.documentElement;
    if (sheet) {
      root.style.overflow = "hidden";
      root.dataset.menuOpen = "";
    }
    return () => {
      root.style.overflow = "";
      delete root.dataset.menuOpen;
    };
  }, [sheet]);

  return (
    <>
      <header
        ref={headerRef}
        onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
        onPointerEnter={cancelClose}
        className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/80"
      >
        <div className="mx-auto flex h-16 w-full max-w-wide items-center gap-4 px-5 sm:px-8 lg:px-10">
          <Logo />

          <nav
            aria-label="Primary"
            className="ml-6 hidden items-center gap-0.5 lg:flex"
          >
            {nav.panels.map((item) => {
              const open = panel === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-trigger-${item.id}`}
                  type="button"
                  aria-expanded={open}
                  aria-controls={`nav-panel-${item.id}`}
                  onClick={() => setPanel(open ? null : item.id)}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    cancelClose();
                    setPanel(item.id);
                  }}
                  className={cn(
                    "inline-flex h-10 items-center gap-1 rounded-control px-3 font-ui text-body font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                    open || isCurrent(pathname, item.match)
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                    open && "bg-fg/[0.05]",
                  )}
                >
                  {item.label}
                  <IconChevronDown
                    size={16}
                    className={cn(
                      "text-fg-subtle transition-transform duration-200",
                      open && "rotate-180",
                    )}
                  />
                </button>
              );
            })}
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onPointerEnter={() => setPanel(null)}
                aria-current={
                  isCurrent(pathname, [link.href]) ? "page" : undefined
                }
                className={cn(
                  "inline-flex h-10 items-center rounded-control px-3 font-ui text-body font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                  isCurrent(pathname, [link.href])
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <a
              href={nav.contact.phoneHref}
              className="mr-2 hidden items-center gap-2 rounded-control px-2 font-ui text-small font-medium text-fg-muted transition-colors hover:text-fg xl:inline-flex"
            >
              <IconPhone size={16} />
              {nav.contact.phone}
            </a>
            <ThemeToggle />
            <a
              href={nav.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "ml-1 hidden sm:inline-flex",
              )}
            >
              <IconWhatsApp />
              Plan a trip
            </a>
            <button
              type="button"
              onClick={() => setSheet((v) => !v)}
              aria-expanded={sheet}
              aria-controls="nav-sheet"
              aria-label={sheet ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-control text-fg transition-colors hover:bg-fg/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus lg:hidden"
            >
              {sheet ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {nav.panels.map((item) => (
          <DesktopPanel
            key={item.id}
            item={item}
            open={panel === item.id}
            onNavigate={closeAll}
          />
        ))}
      </header>
      {/* Outside the header on purpose: the header's backdrop-filter would
        become the containing block for this fixed sheet and collapse it. */}
      <MobileSheet nav={nav} open={sheet} pathname={pathname} />
    </>
  );
}

function DesktopPanel({
  item,
  open,
  onNavigate,
}: {
  item: NavPanel;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id={`nav-panel-${item.id}`}
      aria-labelledby={`nav-trigger-${item.id}`}
      inert={!open}
      className={cn(
        "absolute inset-x-0 top-full hidden border-b border-line bg-canvas shadow-e3 lg:block",
        "transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-none",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="mx-auto w-full max-w-wide px-10 pb-6 pt-7">
        <div className="flex gap-10">
          <div
            className="grid flex-1 gap-x-10 gap-y-8"
            style={{
              gridTemplateColumns: item.groups
                .map((g) =>
                  g.links.length > 4 ? "minmax(0, 2fr)" : "minmax(0, 1fr)",
                )
                .join(" "),
            }}
          >
            {item.groups.map((group) => (
              <div key={group.heading}>
                <p className="px-3 font-ui text-eyebrow uppercase text-fg-subtle">
                  {group.heading}
                </p>
                <ul
                  className={cn(
                    "mt-3",
                    group.links.length > 4 && "grid grid-cols-2 gap-x-4",
                  )}
                >
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="group/link block rounded-control px-3 py-2.5 transition-colors hover:bg-fg/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                      >
                        <span className="flex items-baseline justify-between gap-3 font-ui">
                          <span className="text-body font-medium text-fg group-hover/link:text-brand">
                            {link.label}
                          </span>
                          {link.meta ? (
                            <span className="shrink-0 text-caption text-fg-subtle">
                              {link.meta}
                            </span>
                          ) : null}
                        </span>
                        {link.description ? (
                          <span className="mt-0.5 block font-ui text-small text-fg-muted">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.feature ? (
            <Link
              href={item.feature.href}
              onClick={onNavigate}
              className="group/feature relative w-72 shrink-0 overflow-hidden rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.feature.image}
                  alt={item.feature.imageAlt}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 group-hover/feature:scale-[1.03]"
                />
              </div>
              <div className="border-x border-b border-line px-4 pb-4 pt-3 font-ui">
                <p className="text-eyebrow uppercase text-seasonal">
                  {item.feature.eyebrow}
                </p>
                <p className="mt-1.5 text-h4 text-fg group-hover/feature:text-brand">
                  {item.feature.title}
                </p>
                <p className="mt-1 text-small text-fg-muted">
                  {item.feature.description}
                </p>
              </div>
            </Link>
          ) : null}
        </div>

        <div className="mt-6 border-t border-line px-3 pt-4">
          <Link
            href={item.footer.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 font-ui text-small font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            {item.footer.label}
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileSheet({
  nav,
  open,
  pathname,
}: {
  nav: SiteNav;
  open: boolean;
  pathname: string;
}) {
  return (
    <div
      id="nav-sheet"
      inert={!open}
      className={cn(
        "fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-line bg-canvas lg:hidden",
        open ? "block" : "hidden",
      )}
    >
      <nav aria-label="Mobile" className="px-5 pb-10 pt-2 sm:px-8">
        {nav.panels.map((item) => (
          <details
            key={item.id}
            className="group border-b border-line"
            open={isCurrent(pathname, item.match)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-ui text-h4 text-fg [&::-webkit-details-marker]:hidden">
              {item.label}
              <IconChevronDown
                size={20}
                className="text-fg-subtle transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="space-y-6 pb-6">
              {item.groups.map((group) => (
                <div key={group.heading}>
                  <p className="font-ui text-eyebrow uppercase text-fg-subtle">
                    {group.heading}
                  </p>
                  <ul className="mt-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between gap-4 py-2.5 font-ui"
                        >
                          <span>
                            <span className="block text-body font-medium text-fg">
                              {link.label}
                            </span>
                            {link.description ? (
                              <span className="block text-small text-fg-muted">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                          {link.meta ? (
                            <span className="shrink-0 text-caption text-fg-subtle">
                              {link.meta}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href={item.footer.href}
                className="inline-flex items-center gap-1.5 font-ui text-small font-semibold text-brand"
              >
                {item.footer.label}
                <IconArrowRight size={16} />
              </Link>
            </div>
          </details>
        ))}
        {[...nav.links, { label: "Gallery", href: "/gallery" }].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between border-b border-line py-4 font-ui text-h4 text-fg"
          >
            {link.label}
            <IconArrowUpRight size={18} className="text-fg-subtle" />
          </Link>
        ))}

        <div className="mt-8 grid gap-3">
          <a
            href={nav.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            <IconWhatsApp />
            Plan a trip on WhatsApp
          </a>
          <a
            href={nav.contact.phoneHref}
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "w-full",
            })}
          >
            <IconPhone />
            Call {nav.contact.phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
