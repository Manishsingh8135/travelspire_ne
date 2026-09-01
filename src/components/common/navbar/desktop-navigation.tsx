"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavigationItem } from "@/types/navbar/navigation";
import { navigationData } from "@/data/navbar/navigation";

interface DesktopNavigationProps {
  active: string | null;
  setActive: (name: string | null) => void;
}

const SubMenuItem = ({ item }: { item: NavigationItem }) => (
  <Link
    href={item.href}
    className={cn(
      "mx-2 my-1 block border-l-2 border-transparent px-4 py-3",
      "text-sm group cursor-pointer",
      "text-[color:var(--nav-fg)] hover:border-[color:var(--nav-accent)] hover:bg-[color:var(--nav-hover-bg)] hover:text-[color:var(--nav-fg-strong)]",
      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--nav-ring)]",
    )}
  >
    <div className="flex items-start gap-3">
      {item.icon && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-[color:var(--nav-border)] bg-[color:var(--nav-chip-bg)]">
          <item.icon className="h-5 w-5 text-[color:var(--nav-accent)]" />
        </div>
      )}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="truncate font-semibold text-[color:var(--nav-fg-strong)] transition-colors">
          {item.name}
        </div>
        {item.description && (
          <div className="mt-0.5 line-clamp-2 break-words text-xs text-[color:var(--nav-fg-muted)]">
            {item.description}
          </div>
        )}
      </div>
    </div>
  </Link>
);

const NavItem = ({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: boolean;
}) => {
  const content = (
    <span className="flex items-center gap-2">
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.name}
      {item.submenu && (
        <ChevronDown className="h-4 w-4 text-[color:var(--nav-fg-muted)]" />
      )}
    </span>
  );

  const buttonClassName = cn(
    "border-b border-transparent px-3 py-2 text-sm font-medium lg:px-4",
    "transition-colors duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--nav-ring)]",
    "inline-flex items-center justify-center",
    "text-[color:var(--nav-fg)] hover:border-[color:var(--nav-accent)] hover:text-[color:var(--nav-fg-strong)]",
  );

  // If there's a submenu, render as a button
  if (item.submenu) {
    return (
      <div className="relative block">
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isActive}
          className={buttonClassName}
        >
          {content}
        </button>
      </div>
    );
  }

  // If no submenu, render as a Link
  return (
    <div className="relative block">
      <Link href={item.href} className={buttonClassName}>
        {content}
      </Link>
    </div>
  );
};

export const DesktopNavigation = ({
  active,
  setActive,
}: DesktopNavigationProps) => {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {navigationData.primary.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setActive(item.name)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => item.submenu && setActive(item.name)}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setActive(null);
            }
          }}
        >
          <NavItem item={item} isActive={active === item.name} />

          {/* Dropdown Menu */}
          {item.submenu && (
            <AnimatePresence>
              {active === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-0 mt-2",
                    item.name === "Permits" ? "w-80" : "w-64",
                    "rounded-[14px] bg-[color:var(--nav-panel-bg)]",
                    "border border-[color:var(--nav-border)] shadow-[var(--nav-panel-shadow)] backdrop-blur-xl",
                    "overflow-hidden",
                  )}
                >
                  {/* Permit navigation header */}
                  {item.name === "Permits" && (
                    <div className="border-b border-[color:var(--nav-border)] bg-[color:var(--nav-chip-bg)] px-4 py-3">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-[color:var(--nav-fg-strong)]">
                        {item.icon && (
                          <item.icon className="h-4 w-4 text-[color:var(--nav-accent)]" />
                        )}
                        State Permit Guides
                      </h3>
                      <p className="mt-0.5 text-xs text-[color:var(--nav-fg-muted)]">
                        Complete information for each state
                      </p>
                    </div>
                  )}

                  <div className="py-2 max-h-[70vh] overflow-y-auto">
                    {item.submenu.map((subitem) => (
                      <div key={subitem.name}>
                        <SubMenuItem item={subitem} />
                      </div>
                    ))}
                  </div>

                  {/* Footer for Permits */}
                  {item.name === "Permits" && (
                    <div className="border-t border-[color:var(--nav-border)] bg-[color:var(--nav-chip-bg)] px-4 py-3">
                      <Link
                        href="/permits"
                        className="group flex items-center gap-1 text-xs font-medium text-[color:var(--nav-accent)] hover:text-[color:var(--nav-fg-strong)]"
                      >
                        View All Permit Information
                        <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}

      {/* Secondary Navigation */}
      {navigationData.secondary.length > 0 && (
        <div className="ml-4 flex items-center border-l border-[color:var(--nav-border-strong)] pl-4">
          {navigationData.secondary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className={cn(
                "mx-0.5 grid h-9 w-9 place-items-center rounded-[10px]",
                "text-[color:var(--nav-fg)] hover:bg-[color:var(--nav-hover-bg)] hover:text-[color:var(--nav-fg-strong)]",
                "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--nav-ring)]",
              )}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
