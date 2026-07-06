"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, IdCard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandLogo } from "./brand-logo";

type NavItem = { label: string; href: string };

// Real routes resolve to pages that exist today; the rest are placeholders that
// get wired to real routes as those sections/pages land.
const NAV: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Plan", href: "#plan" },
  { label: "Experiences", href: "#experiences" },
  { label: "Stays", href: "/tours" },
  { label: "Rides", href: "#rides" },
  { label: "Community", href: "#community" },
];

function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * Marketing header. Transparent over the hero, solidifies to warm-charcoal glass
 * once scrolled. Mobile collapses to logo + hamburger → a full-height Radix sheet
 * (focus-trapped, Esc-dismissable). No theme toggle — marketing palettes are
 * art-directed per section.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-mist-100/85 transition-colors hover:text-mist-50"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            href="/explore"
            className="hidden items-center gap-2 rounded-full border border-marigold-400/40 px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-marigold-300 transition-colors hover:bg-marigold-400/10 hover:text-marigold-200 sm:inline-flex"
          >
            <IdCard className="size-4" />
            Explorer Passport
          </NavLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-md text-mist-50 transition-colors hover:bg-mist-50/10 lg:hidden"
            >
              <Menu className="size-6" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-charcoal-950 px-6 py-5 text-mist-50 shadow-deep outline-none">
                <div className="flex items-center justify-between">
                  <BrandLogo onClick={() => setOpen(false)} />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-mist-50/10"
                  >
                    <X className="size-6" />
                  </Dialog.Close>
                </div>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <nav aria-label="Primary mobile" className="mt-8 flex flex-col">
                  {NAV.map((item) => (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-mist-50/10 py-4 font-display text-2xl font-medium transition-colors hover:text-secondary"
                    >
                      {item.label}
                      <ArrowRight className="size-5 opacity-40" />
                    </NavLink>
                  ))}
                </nav>
                <NavLink
                  href="/explore"
                  onClick={() => setOpen(false)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-marigold-400/40 px-5 py-3.5 text-sm font-medium tracking-wider uppercase text-marigold-300"
                >
                  <IdCard className="size-4" />
                  Explorer Passport
                </NavLink>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
