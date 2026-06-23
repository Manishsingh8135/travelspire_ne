type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/** Renders a JSON-LD <script>. Server-safe; place anywhere in the page tree. */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; no user-controlled HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
