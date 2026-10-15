import Link from "next/link";

// The notice a festival page carries once its edition is over. The page keeps
// its URL and its search history; this banner turns the visit into a next
// step instead of a dead end.
export function FestivalWrappedBanner({
  festivalName,
  edition,
  nextEdition,
  nextStep,
}: {
  festivalName: string;
  edition: string;
  nextEdition: string;
  nextStep: { href: string; label: string };
}) {
  return (
    <section
      aria-label="Festival edition notice"
      className="relative z-20 border-b border-white/10 bg-[#101a14] px-5 pb-4 pt-24 text-white sm:px-8 sm:pt-28"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/85">
          <span className="font-semibold text-[#e7d9b8]">
            {festivalName} {edition} has wrapped.
          </span>{" "}
          The {nextEdition} dates will be announced on the festival&apos;s
          official channels — the valley is open all year.
        </p>
        <Link
          href={nextStep.href}
          className="inline-flex min-h-10 flex-none items-center gap-2 rounded-[9px] border border-[#d8c59d]/40 px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#e7d9b8] transition-colors duration-200 hover:bg-[#d8c59d]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
        >
          {nextStep.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
