import Image from "next/image";
import { homeStories } from "@/data/home/homepage";

export function HomeStories() {
  const [featured, ...rest] = homeStories;

  return (
    <section
      aria-labelledby="stories-heading"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 sm:mb-14">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
            Traveller stories
          </p>
          <h2
            id="stories-heading"
            className="max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
          >
            Told by the people{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              who went.
            </span>
          </h2>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Featured story — one large quote, one supporting image */}
          <figure className="lg:col-span-7">
            <blockquote>
              <p className="font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.4] tracking-[-0.01em] text-[#f2ead8]">
                &ldquo;{featured.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 border-t border-white/[0.09] pt-5">
              <p className="text-sm font-semibold text-[#fffdf7]">
                {featured.name}
                <span className="font-normal text-white/[0.5]">
                  {" "}
                  · {featured.origin}
                </span>
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.45]">
                {featured.tourName} · {featured.destination} ·{" "}
                {featured.travelDate}
              </p>
            </figcaption>
          </figure>

          <div className="lg:col-span-5">
            {featured.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        {/* Supporting stories */}
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
          {rest.map((story) => (
            <li key={story.id}>
              <figure className="flex h-full flex-col rounded-[14px] border border-white/[0.09] bg-[#0b1714] p-6 sm:p-7">
                <blockquote className="flex-1">
                  <p className="line-clamp-5 text-[15px] leading-7 text-white/[0.72]">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="text-sm font-semibold text-[#fffdf7]">
                    {story.name}
                    <span className="font-normal text-white/[0.5]">
                      {" "}
                      · {story.origin}
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.45]">
                    {story.tourName} · {story.travelDate}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
