"use client";

import { useEffect, useRef, useState } from "react";
import { sixSummit } from "@/data/expeditions/anini-six-days";
import { sixSequenceFrames } from "@/data/expeditions/anini-six-atlas";
import { RATIO } from "@/lib/media";
import { PlateImage } from "./plate";

export function SixSummit() {
  const [active, setActive] = useState(0);
  const beats = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = beats.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    // Whichever beat is crossing the middle band of the viewport owns the pane.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.beat);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="six-summit-title"
      className="relative overflow-hidden bg-[#070E0D] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              {sixSummit.kicker} · {sixSummit.start}–{sixSummit.end}
            </p>
            <h2
              id="six-summit-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#F7F3E9]"
            >
              Twelve hours{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                on Pomo
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.66] lg:col-span-6">
            {sixSummit.standfirst}
          </p>
        </header>

        <div className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* The pane holds still while the day moves past it. */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div
                className="relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-[18px] bg-[#111C18] ring-1 ring-[#F3EEE2]/10"
                style={{ aspectRatio: RATIO.tall }}
              >
                {sixSequenceFrames.map((frame, i) => (
                  <div
                    key={frame.src}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <PlateImage
                      frame={frame}
                      sizes="30rem"
                      priority={i === 0}
                      className="scale-[1.01]"
                    />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(7,14,13,0)_0%,rgba(7,14,13,0.9)_100%)] p-5 pt-16">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D8BE8B]">
                    {sixSummit.segments[active]?.at}
                  </p>
                  <p className="mt-1 font-serif text-[1.6rem] italic leading-tight text-[#F7F3E9]">
                    {sixSummit.segments[active]?.title}
                  </p>
                </div>
              </div>

              {/* Twelve hours, drawn. */}
              <ol className="mx-auto mt-5 flex w-full max-w-[30rem] gap-1.5">
                {sixSummit.segments.map((segment, i) => (
                  <li key={segment.at} className="flex-1">
                    <span
                      className={`block h-[3px] rounded-full transition-colors duration-500 ${
                        i <= active ? "bg-[#C9683A]" : "bg-[#F3EEE2]/15"
                      }`}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol className="lg:col-span-6">
            {sixSummit.segments.map((segment, i) => {
              const frame = sixSequenceFrames[i] ?? sixSequenceFrames[0];

              return (
                <li
                  key={segment.at}
                  data-beat={i}
                  ref={(node) => {
                    beats.current[i] = node;
                  }}
                  className="border-t border-[#F3EEE2]/[0.12] py-8 first:border-t-0 first:pt-0 sm:py-10 lg:py-16"
                >
                  {/* On narrow screens each beat carries its own frame, always
                      in the same order: picture, then words. */}
                  <div
                    className="relative mb-6 overflow-hidden rounded-[18px] bg-[#111C18] lg:hidden"
                    style={{ aspectRatio: RATIO.tall }}
                  >
                    <PlateImage
                      frame={frame}
                      sizes="(min-width: 640px) 90vw, 100vw"
                    />
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                        i === active ? "text-[#C9683A]" : "text-[#F3EEE2]/40"
                      }`}
                    >
                      {segment.at}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-[#F3EEE2]/12"
                    />
                    <span className="font-mono text-[10px] text-[#F3EEE2]/30">
                      {String(i + 1).padStart(2, "0")}/
                      {String(sixSummit.segments.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-[clamp(2rem,4.4vw,2.9rem)] italic leading-none tracking-[-0.03em] text-[#F7F3E9]">
                    {segment.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-[1rem] leading-8 text-[#F3EEE2]/[0.66]">
                    {segment.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
