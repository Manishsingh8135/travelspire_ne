import Image from "next/image";
import { homeWhyPhotos, homeWhyPoints } from "@/data/home/homepage";

export function HomeWhyTravelspire() {
  return (
    <section
      aria-labelledby="why-travelspire-heading"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-16 xl:px-24">
        <header className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
            Why Travelspire
          </p>
          <h2
            id="why-travelspire-heading"
            className="max-w-[14ch] text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
          >
            A company you can{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              actually find.
            </span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-sm leading-6 text-white/[0.62]">
            Not a marketplace, not a reseller. A small team in Dibrugarh with
            its own vehicles, its own routes and its own name on the line.
          </p>
        </header>

        <div className="lg:col-span-8">
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {homeWhyPoints.map((point, index) => (
              <li
                key={point.title}
                className="border-t border-white/[0.09] py-7"
              >
                <p
                  aria-hidden="true"
                  className="font-mono text-[11px] tracking-[0.14em] text-[#d8c59d]/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em] text-[#fffdf7]">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/[0.6]">
                  {point.body}
                </p>
              </li>
            ))}
          </ol>

          {/* Documentary strip — the roads, the stays, the people */}
          <ul className="mt-10 grid grid-cols-3 gap-4">
            {homeWhyPhotos.map((photo) => (
              <li key={photo.label}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] sm:aspect-[5/4]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.5]">
                    {photo.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
