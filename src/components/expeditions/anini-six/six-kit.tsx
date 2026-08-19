import { sixCarry, sixDays, sixExcluded, sixIncluded } from "@/data/expeditions/anini-six-days";

const nights = sixDays
  .filter((day) => day.sleeps !== "—")
  .map((day) => ({
    n: day.n,
    place: day.sleeps,
    note:
      day.sleeps === "Chigu Camp"
        ? "River flats. No walls, no signal."
        : day.day === 5
          ? "Homestay. Bonfire to close the week."
          : "Anini homestay.",
  }));

export function SixKit() {
  return (
    <section
      aria-labelledby="six-kit-title"
      className="relative overflow-hidden bg-[#070E0D] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              The kit
            </p>
            <h2
              id="six-kit-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              Five nights,{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                what is carried
              </span>
            </h2>
          </div>
          <p className="max-w-[32rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.62] lg:col-span-6">
            Four nights in an Anini homestay, one night on the Dri flats. Breakfast
            and dinner every day. The mountain road, the trek, the permits — written
            down so nobody has to guess.
          </p>
        </div>

        <ol className="mt-14 grid gap-0 border-t border-[#F3EEE2]/[0.12] sm:grid-cols-5">
          {nights.map((night) => (
            <li
              key={night.n}
              className="border-b border-[#F3EEE2]/[0.12] py-6 sm:border-b-0 sm:border-r sm:px-5 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#D8BE8B]">
                Night {night.n}
              </p>
              <p className="mt-3 font-serif text-[1.55rem] italic leading-[1.05] tracking-[-0.02em] text-[#F7F3E9]">
                {night.place}
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#F3EEE2]/[0.5]">
                {night.note}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3F8F6B]">
              Carried
            </h3>
            <ul className="mt-6">
              {sixIncluded.map((item) => (
                <li
                  key={item.name}
                  className="grid grid-cols-[minmax(0,11rem)_1fr] gap-4 border-t border-[#F3EEE2]/[0.1] py-4 first:border-t-0 sm:grid-cols-[minmax(0,14rem)_1fr]"
                >
                  <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-[#F7F3E9]">
                    {item.name}
                  </span>
                  <span className="text-[0.92rem] leading-6 text-[#F3EEE2]/[0.58]">
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9683A]">
              Not carried
            </h3>
            <ul className="mt-6">
              {sixExcluded.map((item) => (
                <li
                  key={item.name}
                  className="grid grid-cols-[minmax(0,11rem)_1fr] gap-4 border-t border-[#F3EEE2]/[0.1] py-4 first:border-t-0 sm:grid-cols-[minmax(0,14rem)_1fr]"
                >
                  <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-[#F7F3E9]">
                    {item.name}
                  </span>
                  <span className="text-[0.92rem] leading-6 text-[#F3EEE2]/[0.58]">
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[#F3EEE2]/[0.12] pt-12 sm:mt-20 sm:pt-16">
          <h3 className="font-serif text-[2rem] italic tracking-[-0.02em] text-[#D8BE8B] sm:text-[2.4rem]">
            What to put in the bag
          </h3>
          <ol className="mt-8 columns-1 gap-x-16 sm:columns-2">
            {sixCarry.map((item, index) => (
              <li
                key={item}
                className="mb-4 flex break-inside-avoid gap-4 border-b border-[#F3EEE2]/[0.1] pb-4"
              >
                <span className="font-mono text-[11px] text-[#D8BE8B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.95rem] leading-6 text-[#F3EEE2]/[0.78]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
