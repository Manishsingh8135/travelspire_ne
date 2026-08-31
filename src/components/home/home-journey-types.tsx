import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeJourneyTypes, type HomeJourneyType } from "@/data/home/homepage";
import { createCustomItineraryURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function JourneyTypeCard({
  type,
  className,
  imageClassName,
}: {
  type: HomeJourneyType;
  className?: string;
  imageClassName?: string;
}) {
  const href = type.external ? createCustomItineraryURL() : type.href;

  const inner = (
    <>
      <div className={cn("relative overflow-hidden", imageClassName)}>
        <Image
          src={type.image}
          alt={type.imageAlt}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 82vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0)_45%,rgba(5,13,15,0.78)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-[#fffdf7] sm:text-2xl">
            {type.title}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <p className="text-[13px] leading-5 text-white/[0.6]">
          {type.description}
        </p>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 flex-none text-[#d8c59d] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </>
  );

  const sharedClass = cn(
    "group block overflow-hidden rounded-[14px] bg-[#0b1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]",
    className,
  );

  if (type.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${type.title} — ${type.linkLabel} on WhatsApp (opens in a new tab)`}
        className={sharedClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={`${type.title} — ${type.linkLabel}`} className={sharedClass}>
      {inner}
    </Link>
  );
}

export function HomeJourneyTypes() {
  const [first, second, ...rest] = homeJourneyTypes;

  return (
    <section
      aria-labelledby="journey-types-heading"
      className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
              Choose your kind of journey
            </p>
            <h2
              id="journey-types-heading"
              className="max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
            >
              Five ways into{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                the Northeast.
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-sm leading-6 text-white/[0.62]">
            Long circuits, treks, slow cultural travel, festival seasons — or a
            route shaped entirely around you.
          </p>
        </header>

        {/* Mobile: horizontal rail · Desktop: editorial grid */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          <JourneyTypeCard
            type={first}
            className="w-[82vw] flex-none snap-start sm:w-[60vw] lg:col-span-3 lg:w-auto"
            imageClassName="aspect-[4/3] lg:aspect-auto lg:h-[380px]"
          />
          <JourneyTypeCard
            type={second}
            className="w-[82vw] flex-none snap-start sm:w-[60vw] lg:col-span-3 lg:w-auto"
            imageClassName="aspect-[4/3] lg:aspect-auto lg:h-[380px]"
          />
          {rest.map((type) => (
            <JourneyTypeCard
              key={type.title}
              type={type}
              className="w-[82vw] flex-none snap-start sm:w-[60vw] lg:col-span-2 lg:w-auto"
              imageClassName="aspect-[4/3] lg:aspect-auto lg:h-[300px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
