"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/common/logo/logo";
import { cn } from "@/lib/utils";

interface FooterProps {
  data: typeof import("@/data/footer/footer-data").footerData;
  className?: string;
}

export function Footer({ data, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-[#08110d] text-[#f4efe4]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-28 xl:px-24">
        <section className="grid gap-10 rounded-[18px] bg-[#111d17] p-6 shadow-[14px_24px_58px_-30px_rgba(0,0,0,0.92)] sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="lg:col-span-8">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d0b376]">
              Your Northeast story starts here
            </p>
            <h2 className="max-w-[13ch] text-[clamp(2.8rem,6vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#f5f0e5]">
              {data.mainSection.title}{" "}
              <span className="font-serif font-normal italic text-[#d9c69d]">
                {data.mainSection.highlightedTitle}
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start justify-end lg:col-span-4">
            <p className="max-w-[31rem] text-base leading-7 text-white/[0.58]">
              {data.mainSection.description}
            </p>
            <Link
              href={data.mainSection.ctaButton.href}
              className="mt-7 inline-flex min-h-12 min-w-[12rem] items-center justify-center gap-2 rounded-[10px] bg-[#eadfc8] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#09110d] shadow-[8px_14px_30px_-18px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-[#f7f0e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eadfc8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111d17]"
            >
              {data.mainSection.ctaButton.text}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          <section className="lg:col-span-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b89f70]">
              {data.newsletter.title}
            </p>
            <p className="mt-4 max-w-[30rem] text-sm leading-6 text-white/[0.48] sm:text-base sm:leading-7">
              {data.newsletter.description}
            </p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-6 flex max-w-[34rem] flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder={data.newsletter.placeholder}
                className="min-h-12 min-w-0 flex-1 rounded-[10px] bg-white/[0.07] px-4 text-sm text-white outline-none placeholder:text-white/[0.32] focus:bg-white/[0.1] focus:ring-2 focus:ring-[#b89f70]"
              />
              <button
                type="submit"
                className="min-h-12 rounded-[10px] bg-[#7f4b34] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#fff4ec] shadow-[7px_12px_26px_-16px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-[#955f45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99071]"
              >
                {data.newsletter.buttonText}
              </button>
            </form>
          </section>

          <section className="lg:col-span-4 lg:col-start-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b89f70]">
              Speak with a local expert
            </p>
            <address className="mt-5 space-y-4 not-italic text-sm text-white/[0.58]">
              <a
                href={`mailto:${data.contactInfo.email}`}
                className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-[#d0b376]" />
                {data.contactInfo.email}
              </a>
              <a
                href={`tel:${data.contactInfo.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-[#d0b376]" />
                {data.contactInfo.phone}
              </a>
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[#d0b376]" />
                {data.contactInfo.address}
              </p>
            </address>
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/[0.09] pt-8 text-xs text-white/[0.4] md:flex-row md:items-center md:justify-between lg:mt-20">
          <div className="flex flex-col gap-6">
            <Logo className="text-[#f5f0e5]" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <p>{data.bottomSection.copyright}</p>
              <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3">
                {data.bottomSection.legalLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex gap-2">
            {data.socialLinks.map((link) => {
              const Icon =
                link.icon === "Instagram" ? Instagram : MessageCircle;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-white/[0.07] text-white/[0.68] shadow-[4px_8px_18px_-13px_rgba(0,0,0,0.95)] transition-colors duration-200 hover:bg-white/[0.13] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89f70]"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
