import { IconWhatsApp } from "@/components/icons";

/* One quiet floating button. CSS in globals.css hides it wherever a page
   already shows a PriceBar (which carries its own WhatsApp action) and while
   the mobile menu is open, so two buttons never fight for the same corner. */
export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-whatsapp-float
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-brand text-on-brand shadow-e3 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-6 sm:right-6"
    >
      <IconWhatsApp size={26} strokeWidth={1.7} />
    </a>
  );
}
