import { sixNights } from "@/data/expeditions/anini-six-atlas";
import { RATIO } from "@/lib/media";
import { PlateImage } from "./plate";

export function SixNights() {
  return (
    <section
      aria-labelledby="six-nights-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              Five nights
            </p>
            <h2
              id="six-nights-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              Where you{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                actually sleep
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#3D4B44] lg:col-span-6">
            Two kinds of night, and they are not interchangeable. Four are spent
            in a house on the plateau. One is spent on a river bed with nothing
            built around it — and that is the one the whole week turns on.
          </p>
        </div>

        {/* Side by side, so the two kinds of night can be compared rather than
            read one after the other. */}
        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          {sixNights.map((stay) => (
            <article
              key={stay.id}
              className="flex flex-col overflow-hidden rounded-[18px] bg-[#EAE1CD] ring-1 ring-[#111C18]/[0.08]"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: RATIO.tall }}
              >
                <PlateImage
                  frame={stay.frame}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,16,0)_50%,rgba(10,18,16,0.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D8BE8B]">
                      {stay.label}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#F7F3E9]">
                      {stay.title}
                      <span className="mt-1 block font-serif text-[0.62em] font-normal italic text-[#D8BE8B]">
                        {stay.serif}
                      </span>
                    </h3>
                  </div>
                  <p className="flex-none text-right font-mono text-[2.6rem] leading-none tracking-[-0.05em] text-[#F7F3E9]/85">
                    {stay.nights}
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-[#F3EEE2]/55">
                      {stay.nights === 1 ? "night" : "nights"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-[1rem] leading-8 text-[#3D4B44]">{stay.body}</p>

                <dl className="mt-7">
                  {stay.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="grid grid-cols-[minmax(0,6.5rem)_1fr] gap-4 border-t border-[#111C18]/10 py-3.5"
                    >
                      <dt className="font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-[#9A5B36]">
                        {fact.label}
                      </dt>
                      <dd className="text-[0.95rem] leading-5 text-[#22312B]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
