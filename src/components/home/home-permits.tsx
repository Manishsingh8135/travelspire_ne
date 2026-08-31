import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homePermitLinks } from "@/data/home/homepage";

export function HomePermits() {
  return (
    <section
      aria-labelledby="permits-heading"
      className="border-y border-white/[0.08] bg-[#0b1714] py-16 text-white sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 sm:px-8 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 xl:px-24">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
            Permits &amp; planning
          </p>
          <h2
            id="permits-heading"
            className="max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#fffdf7]"
          >
            The paperwork should{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              never be the surprise.
            </span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-sm leading-6 text-white/[0.62]">
            Most Northeast states ask for an Inner Line Permit or Protected
            Area Permit. On our trips we arrange them for you — and if you are
            travelling on your own, these free guides explain the process
            honestly, state by state.
          </p>
        </div>

        <nav aria-label="Permit and route guides" className="lg:self-center">
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {homePermitLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
                >
                  <span className="text-[15px] font-medium text-white/[0.85] transition-colors duration-200 group-hover:text-[#f2ead8]">
                    {link.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 flex-none text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d8c59d]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
