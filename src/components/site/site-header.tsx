import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-foreground"
        >
          Travelspire
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
