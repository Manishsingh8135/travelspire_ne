import type { Metadata } from "next";
import Link from "next/link";
import { Accent, ButtonLink, Container, Heading, Lead, Section } from "@/components/ds";
import { IconArrowRight, IconCompass, IconMap, IconPermit, IconWhatsApp, type Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const shortcuts: { href: string; title: string; body: string; Icon: Icon }[] = [
  { href: "/all-tours", title: "All tours", body: "Expeditions and festival journeys with prices", Icon: IconMap },
  { href: "/places/dibang-valley", title: "Destinations", body: "Anini, Dibang Valley, Dambuk and Roing", Icon: IconCompass },
  { href: "/permits", title: "Permits", body: "Which Inner Line Permit you need, and how", Icon: IconPermit },
  { href: "/contact", title: "Contact", body: "Talk to the team in Dibrugarh", Icon: IconWhatsApp },
];

export default function NotFound() {
  return (
    <Section spacing="none" className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container>
        <p className="font-ui text-small font-semibold text-highlight tabular-nums">404</p>
        <Heading as="h1" size="h1" className="mt-3 max-w-[18ch]">
          This road doesn&apos;t go <Accent>anywhere.</Accent>
        </Heading>
        <Lead className="mt-5 max-w-[50ch]">
          The page may have moved, or the link has a typo. These will get you back on the map.
        </Lead>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2">
          {shortcuts.map(({ href, title, body, Icon }) => (
            <li key={href} className="bg-canvas">
              <Link href={href} className="group flex h-full items-start gap-4 p-5 font-ui transition-colors hover:bg-canvas-subtle sm:p-6">
                <Icon size={22} className="mt-0.5 shrink-0 text-brand" />
                <span className="flex-1">
                  <span className="block text-h4 text-fg group-hover:text-brand">{title}</span>
                  <span className="mt-0.5 block text-small text-fg-muted">{body}</span>
                </span>
                <IconArrowRight size={18} className="mt-1 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>

        <ButtonLink href="/" variant="secondary" className="mt-8">
          Back to the homepage
        </ButtonLink>
      </Container>
    </Section>
  );
}
