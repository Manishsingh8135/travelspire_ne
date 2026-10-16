"use client";

import { usePathname } from "next/navigation";
import { IconWhatsApp } from "@/components/icons";

/* One quiet floating button. It stays out of checkout (where it would sit on
   the total), and CSS in globals.css hides it wherever a page already shows
   a PriceBar or the mobile menu is open — never two buttons in one corner. */
const HIDDEN_ON = ["/book", "/pay"];

export function WhatsAppFloat({ href }: { href: string }) {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-whatsapp-float
      className="fixed bottom-4 right-4 z-40 grid size-12 place-items-center rounded-full bg-brand text-on-brand shadow-e3 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-6 sm:right-6 sm:size-14"
    >
      <IconWhatsApp size={24} strokeWidth={1.7} />
    </a>
  );
}
