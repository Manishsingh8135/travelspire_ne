import { sixCarries } from "@/data/expeditions/anini-six-atlas";
import { sixExcluded } from "@/data/expeditions/anini-six-days";
import { PlateImage } from "./plate";

export function SixCarries() {
  return (
    <section
      aria-labelledby="six-carries-title"
      className="relative overflow-hidden bg-[#0A1210] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              Inside the number
            </p>
            <h2
              id="six-carries-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              What the price{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                carries
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.62] lg:col-span-6">
            Seven things travel with you from the moment we pick you up in
            Dibrugarh. Everything else is named further down, because the fastest
            way to lose your trust is to be vague about what is not included.
          </p>
        </div>
      </div>

      {/* Filmstrip — portrait plates, scrolled by hand. */}
      <ol className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 sm:mt-16 sm:gap-4 sm:px-8 md:px-10 lg:px-16 xl:px-[max(6rem,calc((100vw-1600px)/2+6rem))] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-[#F3EEE2]/20 [&::-webkit-scrollbar-track]:bg-[#F3EEE2]/[0.06]">
        {sixCarries.map((item) => (
          <li
            key={item.n}
            className="w-[76vw] flex-none snap-start sm:w-[42vw] lg:w-[27vw] xl:w-[23vw]"
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-[#111C18]">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <PlateImage
                  frame={item.frame}
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 42vw, 76vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,16,0)_45%,rgba(10,18,16,0.85)_100%)]" />
                <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D8BE8B]">
                  {item.n}
                </span>
                <span className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F3EEE2]/50">
                  {item.frame.place}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-serif text-[1.45rem] italic leading-[1.1] tracking-[-0.02em] text-[#F7F3E9] sm:text-[1.6rem]">
                  {item.name}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-6 text-[#F3EEE2]/[0.6]">
                  {item.note}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="mt-10 border-t border-[#F3EEE2]/[0.12] pt-8 sm:mt-14">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9683A]">
            And what it does not
          </h3>
          <ul className="mt-6 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {sixExcluded.map((item) => (
              <li
                key={item.name}
                className="border-t border-[#F3EEE2]/[0.1] py-4"
              >
                <p className="text-[0.95rem] font-medium tracking-[-0.02em] text-[#F7F3E9]">
                  {item.name}
                </p>
                <p className="mt-1.5 text-[0.88rem] leading-5 text-[#F3EEE2]/[0.55]">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
