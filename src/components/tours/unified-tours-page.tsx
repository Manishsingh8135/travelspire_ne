"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Gauge,
  Grid2X2,
  MapPin,
  Rows3,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  filterTours,
  getSearchSuggestions,
  getTourStatistics,
  sortTours,
  type SortCriteria,
} from "@/lib/tour-filters";
import { upcomingTours } from "@/data/tours";
import {
  getTourCategory,
  getTourDuration,
  getTourPrice,
  isFestivalTour,
  isRegularTour,
  isSpecialActivityTour,
  type Tour,
  type TourCategory,
  type TourDifficulty,
  type TourFilters,
  type TourStatus,
} from "@/types/tours/tour";
import { ActivityTourCard } from "./tour-showcase/special-activity-card";
import { FestivalTourCard } from "./tour-showcase/festival-tour-card";
import { TourCard } from "./tour-showcase/tour-card";

interface UnifiedToursPageProps {
  initialFilters?: Partial<TourFilters>;
  className?: string;
}

type ViewMode = "grid" | "list";

const statusOptions: { value: TourStatus | "all"; label: string }[] = [
  { value: "all", label: "Every departure" },
  { value: "featured", label: "Featured" },
  { value: "trending", label: "Trending" },
  { value: "upcoming", label: "Upcoming" },
];

const difficultyOptions: { value: TourDifficulty | "all"; label: string }[] = [
  { value: "all", label: "Any pace" },
  { value: "Easy", label: "Easy" },
  { value: "Moderate", label: "Moderate" },
  { value: "Challenging", label: "Challenging" },
];

const priceFormatter = new Intl.NumberFormat("en-IN");
const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
});

export function UnifiedToursPage({
  initialFilters = {},
  className,
}: UnifiedToursPageProps) {
  const [filters, setFilters] = useState<TourFilters>({
    category: "all",
    status: "all",
    difficulty: "all",
    searchQuery: "",
    ...initialFilters,
  });
  const [sortBy, setSortBy] = useState<SortCriteria>("popularity");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const statistics = useMemo(() => getTourStatistics(upcomingTours), []);
  const categories = useMemo(
    () => Array.from(new Set(upcomingTours.map(getTourCategory))).sort(),
    [],
  );
  const tours = useMemo(
    () => sortTours(filterTours(upcomingTours, filters), sortBy),
    [filters, sortBy],
  );

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.difficulty !== "all" ||
    Boolean(filters.searchQuery);

  const updateFilter = <Key extends keyof TourFilters>(
    key: Key,
    value: TourFilters[Key],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  const handleSearch = (query: string) => {
    updateFilter("searchQuery", query);
    const nextSuggestions = getSearchSuggestions(query, upcomingTours);
    setSuggestions(nextSuggestions);
    setShowSuggestions(query.length >= 2 && nextSuggestions.length > 0);
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      difficulty: "all",
      searchQuery: "",
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("min-h-screen bg-[#f1ebdf]", className)}>
      <AllToursHero statistics={statistics} />

      <section
        aria-labelledby="tour-catalog-title"
        className="py-16 text-[#152019] sm:py-20 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <header className="mb-10 grid gap-7 md:grid-cols-12 md:items-end md:gap-10 lg:mb-14">
            <div className="md:col-span-7">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
                The complete collection
              </p>
              <h2
                id="tour-catalog-title"
                className="max-w-[11ch] text-[clamp(2.8rem,5.8vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.055em]"
              >
                Find your way{" "}
                <span className="font-serif font-normal italic text-[#76533e]">
                  Northeast
                </span>
              </h2>
            </div>
            <p className="max-w-[34rem] text-base leading-7 text-[#58645c] md:col-span-5 md:justify-self-end md:text-lg md:leading-8">
              Search by place, choose the pace that suits you, and compare every
              handcrafted journey without losing sight of the landscape.
            </p>
          </header>

          <div className="relative z-20 rounded-[14px] bg-[#e4dac9] p-3 shadow-[10px_20px_44px_-28px_rgba(31,43,35,0.7)] sm:p-3.5">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
              <div className="relative lg:w-[18rem] lg:flex-none xl:w-auto xl:min-w-[20rem] xl:flex-1">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#68736c]"
                />
                <input
                  type="search"
                  value={filters.searchQuery ?? ""}
                  onChange={(event) => handleSearch(event.target.value)}
                  onFocus={() =>
                    suggestions.length > 0 && setShowSuggestions(true)
                  }
                  onBlur={() =>
                    window.setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Search a tour, destination or experience"
                  aria-label="Search tours"
                  className="h-12 w-full rounded-[10px] bg-[#f7f2e9] pl-11 pr-11 text-sm text-[#152019] shadow-[4px_9px_20px_-17px_rgba(26,37,30,0.8)] outline-none placeholder:text-[#778078] focus:ring-2 focus:ring-[#87543a]"
                />
                {filters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[8px] text-[#69746d] transition-colors hover:bg-[#e8dfd1] hover:text-[#152019]"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                )}

                {showSuggestions && (
                  <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[10px] bg-[#faf6ee] py-2 shadow-[10px_18px_38px_-20px_rgba(24,34,28,0.75)]">
                    {suggestions.map((suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          handleSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="block w-full px-4 py-2.5 text-left text-sm text-[#455149] transition-colors hover:bg-[#ebe2d4] hover:text-[#152019]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="-mx-1 min-w-0 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-1 lg:pb-0">
                <div className="flex min-w-max items-center gap-2">
                  <ToolbarSelect
                    label="Journey type"
                    value={filters.category ?? "all"}
                    onChange={(value) =>
                      updateFilter("category", value as TourCategory | "all")
                    }
                    options={[
                      { value: "all", label: "All journeys" },
                      ...categories.map((category) => ({
                        value: category,
                        label: formatCategory(category),
                      })),
                    ]}
                    className="w-[9.75rem]"
                  />
                  <ToolbarSelect
                    label="Departure status"
                    value={filters.status ?? "all"}
                    onChange={(value) =>
                      updateFilter("status", value as TourStatus | "all")
                    }
                    options={statusOptions}
                    className="w-[10.5rem]"
                  />
                  <ToolbarSelect
                    label="Travel pace"
                    value={filters.difficulty ?? "all"}
                    onChange={(value) =>
                      updateFilter(
                        "difficulty",
                        value as TourDifficulty | "all",
                      )
                    }
                    options={difficultyOptions}
                    className="w-[8.75rem]"
                  />
                  <SortControl value={sortBy} onChange={setSortBy} />
                  <ViewControl value={viewMode} onChange={setViewMode} />
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      aria-label="Clear all filters"
                      title="Clear all filters"
                      className="flex h-12 w-12 flex-none items-center justify-center rounded-[9px] bg-[#17241d] text-[#f5efe2] shadow-[5px_9px_20px_-14px_rgba(0,0,0,0.86)] transition-colors hover:bg-[#2b3a31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a]"
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-7 mt-10 lg:mt-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a715f]">
                Available journeys
              </p>
              <p className="mt-2 text-2xl font-medium tracking-[-0.035em] text-[#152019] sm:text-3xl">
                {tours.length}{" "}
                {tours.length === 1 ? "experience" : "experiences"}
              </p>
            </div>
          </div>

          {tours.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tours.map((tour, index) => (
                  <GridTourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>
            ) : (
              <div className="grid gap-5">
                {tours.map((tour) => (
                  <LandscapeTourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )
          ) : (
            <div className="rounded-[16px] bg-[#e4dac9] px-6 py-16 text-center shadow-[9px_17px_34px_-27px_rgba(31,43,35,0.68)] sm:py-20">
              <p className="font-serif text-3xl italic tracking-[-0.03em] text-[#76533e] sm:text-4xl">
                No journey matches that search.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5d6961] sm:text-base">
                Try another destination or reset the filters to see the complete
                Northeast collection.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#17241d] px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5efe2] transition-colors hover:bg-[#2b3a31]"
              >
                Show every journey
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AllToursHero({
  statistics,
}: {
  statistics: ReturnType<typeof getTourStatistics>;
}) {
  const stats = [
    { value: statistics.total, label: "Journeys" },
    { value: statistics.statuses.trending ?? 0, label: "Trending" },
    { value: statistics.statuses.upcoming ?? 0, label: "Upcoming" },
    { value: statistics.festivalTours, label: "Festivals" },
  ];

  return (
    <section className="relative isolate flex min-h-[72svh] overflow-hidden bg-[#07100d] text-white md:min-h-[78svh]">
      <Image
        src="/images/places/ziro-new/ziro-new-landscape-1.jpeg"
        alt="Green mountains and villages of Ziro Valley in Northeast India"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,7,0.93)_0%,rgba(3,9,7,0.72)_43%,rgba(3,9,7,0.24)_78%,rgba(3,9,7,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,7,0.45)_0%,transparent_31%,rgba(3,9,7,0.16)_60%,rgba(3,9,7,0.92)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-5 pb-6 pt-28 sm:px-8 sm:pb-8 md:px-10 md:pt-32 lg:px-16 xl:px-24">
        <div className="flex flex-1 items-center py-12">
          <div className="max-w-[850px]">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e2d5b8] sm:text-[11px]">
              Curated across Northeast India
            </p>
            <h1 className="max-w-[13ch] text-[clamp(3.2rem,9vw,7rem)] font-medium leading-[0.88] tracking-[-0.06em] text-[#f7f4ec]">
              Every journey.{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                One remarkable region.
              </span>
            </h1>
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
              From quiet monastery roads to first-light treks and music beneath
              open skies—choose the Northeast experience that stays with you.
            </p>
          </div>
        </div>

        <dl
          className="grid grid-cols-4 gap-2 sm:gap-4"
          aria-label="Tour collection statistics"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col py-3 text-center md:py-5 md:text-left"
            >
              <dt className="order-2 mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/[0.45] sm:text-[10px] sm:tracking-[0.16em]">
                {stat.label}
              </dt>
              <dd className="order-1 text-xl font-medium tracking-[-0.03em] text-[#f7f4ec] sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ToolbarSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("relative block flex-none", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-[9px] bg-[#f7f2e9] pl-3.5 pr-9 text-[11px] font-semibold text-[#334038] shadow-[4px_9px_20px_-17px_rgba(26,37,30,0.8)] outline-none transition-colors hover:bg-[#fcf9f3] focus:ring-2 focus:ring-[#87543a]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#69746d]"
      />
    </label>
  );
}

function SortControl({
  value,
  onChange,
}: {
  value: SortCriteria;
  onChange: (value: SortCriteria) => void;
}) {
  return (
    <label className="relative block w-[11.5rem] flex-none">
      <span className="sr-only">Sort tours</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortCriteria)}
        className="h-12 w-full appearance-none rounded-[9px] bg-[#f7f2e9] pl-3.5 pr-9 text-[11px] font-semibold text-[#334038] shadow-[4px_9px_20px_-17px_rgba(26,37,30,0.8)] outline-none transition-colors hover:bg-[#fcf9f3] focus:ring-2 focus:ring-[#87543a]"
      >
        <option value="popularity">Most relevant</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="duration-asc">Shortest first</option>
        <option value="duration-desc">Longest first</option>
        <option value="newest">Newest first</option>
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#69746d]"
      />
    </label>
  );
}

function ViewControl({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div
      className="grid h-12 flex-none grid-cols-2 gap-1 rounded-[9px] bg-[#d6cab8] p-1"
      aria-label="Tour layout"
    >
      <ViewButton
        label="Grid view"
        active={value === "grid"}
        onClick={() => onChange("grid")}
      >
        <Grid2X2 aria-hidden="true" className="h-4 w-4" />
      </ViewButton>
      <ViewButton
        label="List view"
        active={value === "list"}
        onClick={() => onChange("list")}
      >
        <Rows3 aria-hidden="true" className="h-4 w-4" />
      </ViewButton>
    </div>
  );
}

function ViewButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex w-11 items-center justify-center rounded-[7px] transition-colors duration-200",
        active
          ? "bg-[#17241d] text-[#f6f0e5] shadow-[4px_7px_16px_-11px_rgba(0,0,0,0.9)]"
          : "text-[#637068] hover:bg-[#e8dfd2] hover:text-[#17241d]",
      )}
    >
      {children}
    </button>
  );
}

function GridTourCard({ tour, index }: { tour: Tour; index: number }) {
  if (isFestivalTour(tour))
    return <FestivalTourCard tour={tour} index={index} />;
  if (isSpecialActivityTour(tour))
    return <ActivityTourCard tour={tour} index={index} />;
  return <TourCard tour={tour} index={index} />;
}

function LandscapeTourCard({ tour }: { tour: Tour }) {
  const price = getTourPrice(tour).min;
  const duration = getTourDuration(tour);
  const category = getTourCategory(tour);
  const date = isRegularTour(tour)
    ? tour.startDate
    : dateFormatter.format(new Date(tour.eventDates.start));
  const durationLabel =
    duration.min === duration.max
      ? `${duration.min} days`
      : `${duration.min}–${duration.max} days`;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group grid overflow-hidden rounded-[16px] bg-[#101a15] shadow-[9px_18px_40px_-25px_rgba(18,28,22,0.78)] transition-shadow duration-300 hover:shadow-[14px_25px_48px_-24px_rgba(18,28,22,0.88)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f1ebdf] md:min-h-[22rem] md:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="relative min-h-[20rem] overflow-hidden md:min-h-full">
        <Image
          src={tour.thumbnail}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 44vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(3,9,6,0.68)_100%)]" />
        <span
          className={cn(
            "absolute left-5 top-5 rounded-full px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]",
            getCategoryStyle(category),
          )}
        >
          {formatCategory(category)}
        </span>
        <p className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/[0.75]">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
          {tour.location}
        </p>
      </div>

      <article className="flex flex-col p-6 text-[#f5f0e5] sm:p-8 lg:p-10">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/[0.48]">
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
            {durationLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge aria-hidden="true" className="h-3.5 w-3.5" />
            {tour.difficulty}
          </span>
        </div>

        <h3 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
          {tour.title}
        </h3>
        <p className="mt-4 line-clamp-2 max-w-[42rem] text-sm leading-6 text-white/[0.58] sm:text-base sm:leading-7">
          {tour.subtitle}
        </p>

        <div className="mt-auto flex items-end justify-between gap-5 pt-8">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/[0.38]">
              {isRegularTour(tour) ? "Starting from" : "Packages from"}
            </p>
            <p className="mt-1.5 text-xl font-medium tracking-[-0.025em] text-white">
              ₹{priceFormatter.format(price)}
            </p>
          </div>
          <span className="inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-[10px] bg-[#eadfc8] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#07100d] shadow-[7px_12px_24px_-15px_rgba(0,0,0,0.85)] transition-colors group-hover:bg-[#f7f1e5]">
            View journey
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function formatCategory(category: TourCategory) {
  const labels: Partial<Record<TourCategory, string>> = {
    BikeTrip: "Bike trip",
    FruitFestival: "Fruit festival",
    CampingTrip: "Camping",
  };
  return labels[category] ?? category;
}

function getCategoryStyle(category: TourCategory) {
  const styles: Record<TourCategory, string> = {
    Adventure: "bg-[#82442d]/[0.92]",
    Cultural: "bg-[#69466f]/[0.92]",
    Nature: "bg-[#256247]/[0.92]",
    Pilgrimage: "bg-[#80612d]/[0.92]",
    Festival: "bg-[#7b3550]/[0.92]",
    BikeTrip: "bg-[#315f72]/[0.92]",
    FruitFestival: "bg-[#7b3550]/[0.92]",
    CampingTrip: "bg-[#256247]/[0.92]",
  };
  return styles[category];
}
