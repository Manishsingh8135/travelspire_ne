import Image from "next/image";
import { homeStories } from "@/data/home/homepage";

// Three equal plates. The previous layout gave one story a photograph and
// left the other two as bare text blocks, which read as though we only had
// one story worth showing.
export function HomeStories() {
  return (
    <section
      aria-labelledby="stories-heading"
      className="bg-paper-soft py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Traveller stories
            </p>
            <h2
              id="stories-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              Told by the people{" "}
              <span className="font-display font-normal italic text-clay">
                who went.
              </span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[15px] leading-7 text-ink-soft">
            Unedited accounts from travellers who booked these routes with us.
          </p>
        </header>

        <ul className="rail -mx-5 gap-5 px-5 pb-1 scroll-pl-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:gap-6 lg:grid-cols-3">
          {homeStories.map((story) => (
            <li
              key={story.id}
              className="w-[82vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <figure className="flex h-full flex-col overflow-hidden rounded-[16px] bg-paper ring-1 ring-ink/[0.07]">
                {story.image && (
                  <div className="relative aspect-[4/3] shrink-0 bg-paper-deep">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 82vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.75rem] leading-[0.6] text-clay/35"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 flex-1">
                    <p className="line-clamp-6 text-[14.5px] leading-7 text-ink-soft">
                      {story.quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-6 border-t border-ink/10 pt-4">
                    <p className="text-sm font-semibold text-ink">
                      {story.name}
                      <span className="font-normal text-ink-muted">
                        {" "}
                        · {story.origin}
                      </span>
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      {story.tourName}
                      <span aria-hidden="true"> · </span>
                      {story.travelDate}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
