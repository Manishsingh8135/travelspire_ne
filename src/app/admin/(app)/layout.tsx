import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import { getAdminCounts } from "@/server/admin/regions";
import { AdminProviders } from "@/features/admin/ui/providers";
import { AdminShell } from "@/features/admin/ui/admin-shell";

export const dynamic = "force-dynamic";

function envName(): "local" | "preview" | "production" {
  const v = process.env.VERCEL_ENV;
  if (v === "production") return "production";
  if (v === "preview") return "preview";
  return "local";
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();
  const counts = await getAdminCounts();
  const draftBadges: Record<string, number> = {
    tours: counts.tours.draft,
    places: counts.places.draft,
    regions: counts.regions.draft,
    festivals: counts.festivals.draft,
    tribes: counts.tribes.draft,
    permits: counts.permits.draft,
  };

  return (
    <AdminProviders>
      <AdminShell user={{ email: user.email ?? null }} counts={draftBadges} env={envName()}>
        {children}
      </AdminShell>
    </AdminProviders>
  );
}
