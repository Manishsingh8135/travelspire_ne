import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container, Heading, Section } from "@/components/ds";
import { AdminLoginForm } from "@/components/admin/login-form";
import { getAdmin } from "@/lib/admin/auth";
import { signingAvailable } from "@/lib/bookings/signing";

export const metadata: Metadata = {
  title: "Team sign-in",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  if (await getAdmin()) redirect("/admin");
  const { expired } = await searchParams;

  return (
    <Section spacing="none" className="pb-24 pt-14 md:pt-20">
      <Container size="prose" className="max-w-md font-ui">
        <Heading as="h1" size="h2">
          Team sign-in
        </Heading>
        <p className="mt-3 text-body text-fg-muted">We&apos;ll email you a link. No password needed.</p>
        {!signingAvailable() ? (
          <p className="mt-6 rounded-card bg-caution-soft px-4 py-3 text-small text-fg">
            Sign-in isn&apos;t switched on yet: BOOKING_LINK_SECRET is missing on the server.
          </p>
        ) : (
          <AdminLoginForm expired={expired === "1"} className="mt-8" />
        )}
      </Container>
    </Section>
  );
}
