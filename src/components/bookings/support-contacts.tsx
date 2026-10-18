import { support } from "@/lib/bookings/after-payment";
import { cn } from "@/lib/utils";

/* "Talk to a person": every way to reach the team, for pages a customer sees
   after paying. `whatsappHref` should carry their booking reference. */
export function SupportContacts({
  whatsappHref,
  title = "Talk to a person",
  className,
}: {
  whatsappHref: string;
  title?: string;
  className?: string;
}) {
  const contacts = [
    { label: "WhatsApp", value: support.phoneDisplay, href: whatsappHref, external: true },
    { label: "Call", value: support.phoneDisplay, href: support.phoneHref },
    { label: "Email", value: support.email, href: `mailto:${support.email}` },
    { label: "Instagram", value: support.instagramHandle, href: support.instagramUrl, external: true },
  ];

  return (
    <div className={cn("font-ui", className)}>
      <h2 className="text-h4 text-fg">{title}</h2>
      <p className="mt-1 text-small text-fg-muted">Our team in Dibrugarh answers. Quote your booking reference.</p>
      <dl className="mt-4 grid gap-x-6 gap-y-3 text-small sm:grid-cols-2">
        {contacts.map((c) => (
          <div key={c.label} className="flex justify-between gap-4 sm:block">
            <dt className="text-fg-subtle">{c.label}</dt>
            <dd className="font-medium text-fg">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-control hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                {c.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
