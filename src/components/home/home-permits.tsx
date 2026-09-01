import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homePermitLinks } from "@/data/home/homepage";

const kindStyles: Record<string, string> = {
  ILP: "border-tide/25 bg-tide/[0.08] text-tide",
  PAP: "border-tide/25 bg-tide/[0.08] text-tide",
  Route: "border-clay/25 bg-clay/[0.08] text-clay",
};

// Permit handling is the single biggest friction in Northeast travel and the
// clearest reason to book with an operator, so it gets a photograph and real
// cards rather than the bare link list it had before.
export function HomePermits() {
  return (
    <section
      aria-labelledby="permits-heading"
      className="bg-paper-deep py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Permits &amp; planning
            </p>
            <h2
              id="permits-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              The paperwork should{" "}
              <span className="font-display font-normal italic text-clay">
                never be the surprise.
              </span>
            </h2>
          </div>
          <p className="max-w-[32rem] self-end text-[15px] leading-7 text-ink-soft lg:col-span-5">
            Four Northeast states require an Inner Line Permit and Sikkim
            restricts its border zones. On our trips we arrange them for you.
            If you are travelling independently, these guides explain each
            process honestly — free, and with nothing held back.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-[20px] bg-paper ring-1 ring-ink/[0.06]">
          <div className="relative aspect-[16/10] sm:aspect-[21/8] lg:aspect-[24/7]">
            <Image
              src="/images/places/anini/Anini_10.JPG"
              alt="The mountain road out of Roing towards the Mayodia Pass and Anini"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,26,21,0.88)_0%,rgba(14,26,21,0.66)_40%,rgba(14,26,21,0.3)_72%,rgba(14,26,21,0.14)_100%)]"
            />
            <div className="absolute inset-0 flex items-center p-6 sm:p-8 lg:px-12">
              <p className="max-w-[30rem] text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-paper sm:text-[1.6rem] lg:text-[2rem]">
                Every trip we run includes{" "}
                <span className="font-display font-normal italic text-[#F2E5C8]">
                  permit assistance.
                </span>
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Permit and route guides">
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {homePermitLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex h-full flex-col rounded-[14px] bg-paper p-6 ring-1 ring-ink/[0.07] transition-shadow duration-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.25rem] font-medium leading-tight tracking-[-0.025em] text-ink">
                      {link.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${kindStyles[link.kind]}`}
                    >
                      {link.kind}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[13.5px] leading-6 text-ink-muted">
                    {link.note}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-clay transition-colors duration-200 group-hover:text-ink">
                    {link.kind === "Route" ? "Read the guide" : "Permit guide"}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
