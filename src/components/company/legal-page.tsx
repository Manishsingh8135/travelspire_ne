import * as React from "react";
import { Breadcrumbs, Container, Heading, Lead, Prose, Section } from "@/components/ds";
import { IconMail, IconPhone } from "@/components/icons";
import { contactInfo } from "@/data/social/social-links";

/* Long-form legal pages (booking, privacy, terms). One reading column, an
   "On this page" list that stays put on desktop, plain text — no boxes,
   no icons, nothing between the reader and the clauses. */

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalPage({
  title,
  intro,
  updated,
  path,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  path: string;
  sections: LegalSection[];
}) {
  const phoneHref = `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`;
  return (
    <>
      <Section spacing="none" className="border-b border-line pb-10 pt-6 md:pb-12 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: title, href: path },
            ]}
          />
          <div className="mt-8 max-w-prose space-y-4">
            <Heading as="h1" size="h1">
              {title}
            </Heading>
            <Lead>{intro}</Lead>
            <p className="font-ui text-small text-fg-subtle">Last updated {updated}</p>
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="font-ui lg:sticky lg:top-24 lg:self-start">
            <p className="text-eyebrow uppercase text-fg-subtle">On this page</p>
            <ol className="mt-3 space-y-1 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-small text-fg-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Prose className="[&_h2]:mt-12 [&_h2]:text-h3">
            {/* h3-sized section titles: many short sections read better at a
                quieter step than the h2 used on marketing pages. */}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className={i === 0 ? "!mt-0" : undefined}>{s.title}</h2>
                {s.body}
              </section>
            ))}

            <section id="contact" className="scroll-mt-24">
              <h2>Questions about this page</h2>
              <p>Write or call the Travelspire team in Dibrugarh — a person will answer.</p>
              <ul className="!list-none !pl-0">
                <li className="flex items-center gap-2.5">
                  <IconMail size={18} className="text-fg-subtle" />
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <IconPhone size={18} className="text-fg-subtle" />
                  <a href={phoneHref}>{contactInfo.phone}</a>
                </li>
              </ul>
            </section>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
