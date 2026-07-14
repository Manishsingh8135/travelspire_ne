"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandLogo } from "./brand-logo";
import { PUBLIC_NAV, NAV_CTA, isExternal, isAnchor, type NavParent } from "./nav-config";

/**
 * Marketing header (08-blueprint/14 Part 3). Transparent over the hero,
 * solidifies to warm midnight glass on scroll. Every parent with children
 * gets a paper dropdown panel (hover to open, chevron click/keyboard to pin,
 * Esc to close). Mobile: a full-screen paper sheet with the ENTIRE tree —
 * parents as Fraunces headers, children with mono sub-lines — CTA pinned.
 */

function SmartLink({
  href,
  className,
  onClick,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (isExternal(href) || isAnchor(href)) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** One desktop parent: link + (children ? chevron toggle + panel : nothing). */
function DesktopItem({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavParent;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (item.children) onOpen();
  };
  const leave = () => {
    closeTimer.current = setTimeout(onClose, 120);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <div className="flex items-center gap-0.5">
        <SmartLink
          href={item.href}
          className="text-sm font-medium text-mist-100/85 transition-colors hover:text-mist-50"
        >
          {item.label}
        </SmartLink>
        {item.children ? (
          <button
            type="button"
            aria-label={`${item.label} menu`}
            aria-expanded={open}
            onClick={() => (open ? onClose() : onOpen())}
            className="rounded-sm p-1 text-mist-100/60 transition-colors hover:text-mist-50"
          >
            <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
          </button>
        ) : null}
      </div>

      {item.children ? (
        <div
          data-tone="paper"
          className={cn(
            "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 transition-all duration-150",
            open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
          )}
        >
          <div className="overflow-hidden rounded-lg border border-border-subtle bg-background shadow-lg">
            <ul className="flex flex-col py-2">
              {item.children.map((child) => (
                <li key={child.label}>
                  <SmartLink
                    href={child.href}
                    onClick={onClose}
                    className="group/child flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="text-sm font-medium text-foreground">{child.label}</span>
                    {child.sub ? (
                      <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                        {child.sub}
                      </span>
                    ) : null}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between border-t border-border-subtle px-4 py-2.5 text-xs font-medium tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              All {item.label.toLowerCase()} <ArrowRight className="size-3.5" />
            </SmartLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes any pinned dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  return (
    <header
      data-tone="forest"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-glass-border bg-charcoal-950/80 backdrop-blur-md"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-mist-50 md:h-20 md:px-10">
        <BrandLogo />

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {PUBLIC_NAV.map((item) => (
            <DesktopItem
              key={item.label}
              item={item}
              open={openMenu === item.label}
              onOpen={() => setOpenMenu(item.label)}
              onClose={() => setOpenMenu(null)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={NAV_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-marigold-500 px-5 py-2.5 text-xs font-semibold tracking-wider text-basalt-950 uppercase transition-colors hover:bg-marigold-400 sm:inline-flex"
          >
            {NAV_CTA.label}
            <ArrowUpRight className="size-4" />
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-md text-mist-50 transition-colors hover:bg-mist-50/10 lg:hidden"
            >
              <Menu className="size-6" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
              <Dialog.Content
                data-tone="paper"
                className="fixed inset-0 z-50 flex w-full flex-col bg-background text-foreground outline-none"
              >
                <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
                  <BrandLogo onClick={() => setOpen(false)} />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
                  >
                    <X className="size-6" />
                  </Dialog.Close>
                </div>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                {/* The ENTIRE tree, visible — parents as chapters, children indented. */}
                <nav
                  aria-label="Primary mobile"
                  className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6"
                >
                  {PUBLIC_NAV.map((item) => (
                    <div key={item.label} className="border-b border-border-subtle py-4">
                      <SmartLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between font-display text-2xl font-medium text-foreground transition-colors hover:text-secondary"
                      >
                        {item.label}
                        <ArrowRight className="size-5 opacity-40" />
                      </SmartLink>
                      {item.sub ? (
                        <p className="mt-0.5 font-mono text-[11px] tracking-wide text-muted-foreground">
                          {item.sub}
                        </p>
                      ) : null}
                      {item.children ? (
                        <ul className="mt-3 flex flex-col gap-1 border-l border-border-subtle pl-4">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <SmartLink
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="flex flex-col gap-0.5 rounded-md px-2 py-2 transition-colors hover:bg-muted"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {child.label}
                                </span>
                                {child.sub ? (
                                  <span className="font-mono text-[11px] text-muted-foreground">
                                    {child.sub}
                                  </span>
                                ) : null}
                              </SmartLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </nav>

                <div className="border-t border-border-subtle px-5 py-4">
                  <a
                    href={NAV_CTA.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-marigold-500 px-5 py-3.5 text-sm font-semibold tracking-wider text-basalt-950 uppercase transition-colors hover:bg-marigold-400"
                  >
                    {NAV_CTA.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
