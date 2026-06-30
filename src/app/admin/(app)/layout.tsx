import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOutAdmin } from "@/features/admin/auth-actions";
import { Button } from "@/components/ui";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-medium tracking-tight">
              Travelspire <span className="text-muted-foreground">admin</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/admin"
                className="rounded-sm px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/regions"
                className="rounded-sm px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Regions
              </Link>
              <Link
                href="/admin/places"
                className="rounded-sm px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Places
              </Link>
              <Link
                href="/admin/tours"
                className="rounded-sm px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Tours
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              {user.email}
            </span>
            <form action={signOutAdmin}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
