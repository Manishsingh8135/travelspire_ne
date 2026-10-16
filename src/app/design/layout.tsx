import type { Metadata } from "next";

// Internal design-system showcase — reachable, but never in search results.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

// The specimen is judged on its own: the legacy navbar, footer and WhatsApp
// floater are hidden here until the shell moves onto the Field Guide tokens.
const hideLegacyChrome = `
  body:has([data-ds-specimen]) > div > header,
  body:has([data-ds-specimen]) > footer,
  body:has([data-ds-specimen]) .fixed.bottom-3.right-3 { display: none !important; }
  body:has([data-ds-specimen]) { background: rgb(var(--c-canvas)); }
`;

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hideLegacyChrome }} />
      {children}
    </>
  );
}
