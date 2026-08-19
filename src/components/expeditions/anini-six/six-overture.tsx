import { Check, X } from "lucide-react";
import { sixOverture } from "@/data/expeditions/anini-six-days";

export function SixOverture() {
  const [isPanel, isNotPanel] = sixOverture.truths;

  return (
    <section
      aria-labelledby="six-overture-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              {sixOverture.kicker}
            </p>
            <div className="mt-5 hidden h-px w-full bg-[#111C18]/15 lg:block" />
          </div>

          <div className="lg:col-span-9">
            <h2
              id="six-overture-title"
              className="max-w-[22ch] text-[clamp(1.75rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#111C18]"
            >
              {sixOverture.lead}
            </h2>

            <div className="mt-8 grid max-w-[62rem] gap-6 text-[0.98rem] leading-7 text-[#3D4B44] sm:mt-10 sm:grid-cols-2 sm:gap-10 sm:text-[1.02rem] sm:leading-8">
              {sixOverture.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* The honesty spread: what this is, and what it very much isn't. */}
        <div className="mt-14 grid overflow-hidden rounded-[18px] sm:mt-20 lg:grid-cols-2">
          <div className="border-b border-[#111C18]/10 bg-[#E9E1CE] px-6 py-9 sm:px-9 sm:py-11 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3F6350]">
              {isPanel.label}
            </p>
            <ul className="mt-7 space-y-4">
              {isPanel.items.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Check
                    aria-hidden="true"
                    className="mt-[3px] h-4 w-4 flex-none text-[#3F6350]"
                  />
                  <span className="text-[0.95rem] leading-6 text-[#22312B] sm:text-base sm:leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0C1614] px-6 py-9 sm:px-9 sm:py-11">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9683A]">
              {isNotPanel.label}
            </p>
            <ul className="mt-7 space-y-4">
              {isNotPanel.items.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <X
                    aria-hidden="true"
                    className="mt-[3px] h-4 w-4 flex-none text-[#C9683A]"
                  />
                  <span className="text-[0.95rem] leading-6 text-[#F3EEE2]/[0.78] sm:text-base sm:leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
