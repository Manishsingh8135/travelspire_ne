import { sixSummit } from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";

export function SixSummit() {
  return (
    <section
      aria-labelledby="six-summit-title"
      className="relative overflow-hidden bg-[#070E0D] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              {sixSummit.kicker}
            </p>
            <h2
              id="six-summit-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.05em]"
            >
              Twelve hours{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                on Pomo
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.62] lg:col-span-6">
            {sixSummit.standfirst}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-4 border-y border-[#F3EEE2]/[0.12] py-6 sm:mt-14 sm:py-8">
          <p className="font-mono text-[clamp(2.8rem,8vw,5.5rem)] leading-none tracking-[-0.06em] text-[#F7F3E9]">
            {sixSummit.start}
            <span className="mx-3 font-serif text-[0.45em] italic text-[#D8BE8B]">
              to
            </span>
            {sixSummit.end}
          </p>
          <dl className="flex flex-wrap gap-8">
            {sixSummit.brief.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3EEE2]/45">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm tracking-[-0.02em] text-[#F3EEE2]/85">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative mt-14 sm:mt-16">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[7px] top-2 w-px bg-[#C9683A]/40 sm:left-[9px]"
          />
          {sixSummit.segments.map((segment, index) => (
            <li
              key={segment.title}
              className="relative grid gap-2 py-7 pl-10 sm:grid-cols-12 sm:gap-8 sm:py-9 sm:pl-14"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-9 h-[15px] w-[15px] rounded-full sm:top-11 sm:h-[19px] sm:w-[19px] ${
                  index === 0 || index === sixSummit.segments.length - 1
                    ? "bg-[#C9683A]"
                    : "bg-[#070E0D] ring-1 ring-[#D8BE8B]/70"
                }`}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#D8BE8B] sm:col-span-3">
                {segment.at}
              </p>
              <div className="sm:col-span-9">
                <h3 className="font-serif text-[1.65rem] italic leading-none tracking-[-0.02em] text-[#F7F3E9] sm:text-[1.9rem]">
                  {segment.title}
                </h3>
                <p className="mt-3 max-w-[40rem] text-[0.98rem] leading-7 text-[#F3EEE2]/[0.68] sm:text-[1.02rem] sm:leading-8">
                  {segment.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="mt-8 max-w-[48rem] border-l-2 border-[#C9683A] py-1 pl-5 sm:mt-12 sm:pl-7">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#C9683A]">
            Weather clause
          </p>
          <p className="mt-2 text-[0.98rem] leading-7 text-[#F3EEE2]/[0.72] sm:text-base sm:leading-8">
            {sixSummit.warning}
          </p>
          <a
            href={createAniniSixInquiryURL({ kind: "trek" })}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[13px] font-medium text-[#D8BE8B] underline decoration-[#D8BE8B]/40 underline-offset-4 transition-colors hover:text-[#F3EEE2] hover:decoration-[#F3EEE2]"
          >
            Ask us honestly whether this day is right for you
          </a>
        </aside>
      </div>
    </section>
  );
}
