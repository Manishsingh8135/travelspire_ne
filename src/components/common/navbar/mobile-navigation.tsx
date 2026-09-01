// src/components/layout/mobile-navigation.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavigationItem } from "@/types/navbar/navigation";
import { navigationData } from "@/data/navbar/navigation";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  active: string | null;
  setActive: (value: string | null) => void;
}

const itemClassName = cn(
  "w-full border-b border-[color:var(--nav-border)] px-4 py-4",
  "flex items-center justify-between",
  "text-[color:var(--nav-fg)] hover:bg-[color:var(--nav-hover-bg)] hover:text-[color:var(--nav-fg-strong)]",
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--nav-ring)]",
);

const MobileNavItem = ({
  item,
  active,
  setActive,
  setIsOpen,
}: {
  item: NavigationItem;
  active: string | null;
  setActive: (value: string | null) => void;
  setIsOpen: (value: boolean) => void;
}) => {
  if (item.submenu) {
    return (
      <button
        type="button"
        onClick={() => setActive(active === item.name ? null : item.name)}
        aria-expanded={active === item.name}
        className={itemClassName}
      >
        <span className="flex items-center gap-2">
          {item.icon && (
            <item.icon className="h-5 w-5 text-[color:var(--nav-accent)]" />
          )}
          <span className="font-medium">{item.name}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[color:var(--nav-fg-muted)] transition-transform duration-200",
            active === item.name && "rotate-180",
          )}
        />
      </button>
    );
  }

  return (
    <Link href={item.href} onClick={() => setIsOpen(false)} className={itemClassName}>
      <span className="flex items-center gap-2">
        {item.icon && (
          <item.icon className="h-5 w-5 text-[color:var(--nav-accent)]" />
        )}
        <span className="font-medium">{item.name}</span>
      </span>
    </Link>
  );
};

const MobileNavigation = ({
  isOpen,
  setIsOpen,
  active,
  setActive,
}: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-[color:var(--nav-overlay)] backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "md:hidden",
          "fixed left-0 right-0 top-[72px] z-50",
          "border-b border-[color:var(--nav-border)] bg-[color:var(--nav-panel-bg)] backdrop-blur-xl",
          "shadow-[var(--nav-panel-shadow)]",
          "max-h-[calc(100svh-72px)] overflow-y-auto",
        )}
      >
        <div className="px-5 pb-6 pt-2 sm:px-8">
          {navigationData.primary.map((item) => (
            <div key={item.name}>
              <MobileNavItem
                item={item}
                active={active}
                setActive={setActive}
                setIsOpen={setIsOpen}
              />

              {/* Mobile Submenu */}
              {item.submenu && (
                <AnimatePresence>
                  {active === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="mt-1 overflow-hidden rounded-[12px] border border-[color:var(--nav-border)] bg-[color:var(--nav-chip-bg)]"
                    >
                      {/* Header for Permits */}
                      {item.name === "Permits" && (
                        <div className="border-b border-[color:var(--nav-border)] px-4 py-2">
                          <p className="text-xs font-semibold text-[color:var(--nav-accent)]">
                            State Permit Guides
                          </p>
                        </div>
                      )}

                      {item.submenu.map((subitem) => (
                        <div key={subitem.name}>
                          <Link
                            href={subitem.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "mx-2 my-1 block border-l-2 border-transparent px-4 py-3",
                              "text-sm text-[color:var(--nav-fg)] hover:border-[color:var(--nav-accent)] hover:bg-[color:var(--nav-hover-bg)] hover:text-[color:var(--nav-fg-strong)]",
                              "transition-colors duration-200",
                            )}
                          >
                            <div className="flex items-start gap-3">
                              {subitem.icon && (
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-[color:var(--nav-border)] bg-[color:var(--nav-chip-bg)]">
                                  <subitem.icon className="h-4 w-4 text-[color:var(--nav-accent)]" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="truncate font-semibold text-[color:var(--nav-fg-strong)]">
                                  {subitem.name}
                                </div>
                                {subitem.description && (
                                  <div className="mt-0.5 line-clamp-2 break-words text-xs text-[color:var(--nav-fg-muted)]">
                                    {subitem.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}

                      {/* Footer for Permits */}
                      {item.name === "Permits" && (
                        <div className="border-t border-[color:var(--nav-border)] px-4 py-2">
                          <Link
                            href="/permits"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-1 text-xs font-medium text-[color:var(--nav-accent)] hover:text-[color:var(--nav-fg-strong)]"
                          >
                            View All Permit Information →
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Mobile Secondary Navigation */}
          {navigationData.secondary.length > 0 && (
            <div className="mt-5 border-t border-[color:var(--nav-border)] px-2 pt-5">
              <div className="grid grid-cols-3 gap-2">
                {navigationData.secondary.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex flex-col items-center rounded-[10px] border border-[color:var(--nav-border)] p-3",
                      "text-sm text-[color:var(--nav-fg)] hover:bg-[color:var(--nav-hover-bg)] hover:text-[color:var(--nav-fg-strong)]",
                      "transition-colors duration-200",
                    )}
                  >
                    {item.icon && <item.icon className="h-6 w-6 mb-1" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavigation;
