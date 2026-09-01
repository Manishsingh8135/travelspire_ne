import Image from "next/image";
import { homeWhyPhotos, homeWhyPoints } from "@/data/home/homepage";

export function HomeWhyTravelspire() {
  return (
    <section
      aria-labelledby="why-travelspire-heading"
      className="bg-paper-soft py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <header className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Why Travelspire
            </p>
            <h2
              id="why-travelspire-heading"
              className="max-w-[13ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              A company you can{" "}
              <span className="font-display font-normal italic text-clay">
                actually find.
              </span>
            </h2>
            <p className="mt-6 max-w-[26rem] text-[15px] leading-7 text-ink-soft">
              Not a marketplace and not a reseller. A small team in Dibrugarh
              with its own vehicles, its own routes and its own name on the
              line.
            </p>
          </header>

          <div className="lg:col-span-8">
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {homeWhyPoints.map((point, index) => (
                <li key={point.title} className="border-t border-ink/12 py-7">
                  <p
                    aria-hidden="true"
                    className="font-mono text-[11px] tracking-[0.14em] text-brass"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[1.125rem] font-medium tracking-[-0.02em] text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-ink-muted">
                    {point.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Documentary strip — the roads, the stays, the people. Full width
            below the grid so the photographs get real size. */}
        <ul className="mt-16 grid grid-cols-3 gap-4 sm:gap-6">
          {homeWhyPhotos.map((photo) => (
            <li key={photo.label}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-paper-deep ring-1 ring-ink/[0.06]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="32vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {photo.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
