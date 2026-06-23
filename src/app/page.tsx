import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { getRegions } from "@/server/atlas";
import { SiteHeader } from "@/components/site/site-header";
import { Badge, Button } from "@/components/ui";

export const revalidate = 3600;

export default async function HomePage() {
  const regions = await getRegions();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <Badge variant="accent" className="w-fit">
          v2 · in progress
        </Badge>
        <h1 className="mt-6 max-w-3xl font-display text-6xl font-medium text-balance">
          Northeast India, on your own terms.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
          The living atlas, marketplaces and trip companion for the region — guided when you
          want it, independent when you don&apos;t.
        </p>

        <section className="mt-14 flex flex-col gap-4">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Explore the atlas
          </p>
          {regions.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {regions.map((region) => (
                <Link
                  key={region.id}
                  href={`/${region.slug}` as Route}
                  className="group flex items-center justify-between rounded-lg border border-border-subtle bg-card p-5 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md"
                >
                  <span className="font-display text-xl font-medium">{region.name}</span>
                  <ArrowRight className="size-5 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No regions published yet.</p>
          )}
        </section>

        <div className="mt-12">
          <Button variant="outline" asChild>
            <Link href="/design">Design system</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
