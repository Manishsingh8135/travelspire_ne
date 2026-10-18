import Link from "next/link";

export function AdminBar({ email }: { email: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-ui text-small text-fg-muted">
      <Link href="/admin" className="font-semibold text-fg hover:text-brand">
        Travelspire admin
      </Link>
      <form action="/api/admin/logout" method="post" className="flex items-center gap-3">
        <span>{email}</span>
        <button type="submit" className="font-medium text-fg underline underline-offset-4 hover:text-brand">
          Sign out
        </button>
      </form>
    </div>
  );
}
