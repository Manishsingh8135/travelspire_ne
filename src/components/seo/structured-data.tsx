// components/seo/structured-data.tsx
// Plain <script> (not next/script) so JSON-LD is in the server-rendered HTML —
// next/script's afterInteractive strategy injects client-side, which search
// engines may miss. Content-derived id keeps blocks unique across layout + page.

interface StructuredDataProps {
  data: Record<string, unknown>;
}

function contentId(payload: string): string {
  let hash = 5381;
  for (let i = 0; i < payload.length; i += 1) {
    hash = ((hash << 5) + hash + payload.charCodeAt(i)) >>> 0;
  }
  return `sd-${hash.toString(36)}`;
}

export function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data);

  return (
    <script
      id={contentId(json)}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
