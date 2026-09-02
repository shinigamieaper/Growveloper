import { serializeJsonLd } from "@/lib/jsonld";

interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/* Structured data for one page. Content is serialised with "<" escaped, so
   CMS text can never break out of the script element. */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
