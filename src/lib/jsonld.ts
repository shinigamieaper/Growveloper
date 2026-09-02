/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD Schema Builders
   Returns plain objects. Render via <JsonLd>.

   Every builder links back to the same three entities by @id so search and
   answer engines can stitch the site into one graph: the WebSite, the
   Organization, and the founder Person that authors the writing.
───────────────────────────────────────────────────────────────────────────── */

import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/seo";
import type { FAQItem } from "@/lib/types";

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#founder`;

/* Canonical identity facts. Display name follows the site byline. */
const FOUNDER_NAME = "Oyekola Obajuwon";
const FOUNDER_ALT_NAME = "Juwon";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/obajuwon-oyekola";
const COMPANY_LINKEDIN = "https://www.linkedin.com/company/growveloper";
const LOGO_PATH = "/images/logo/logo-icon-light.png";

/** Where the studio takes clients from. Confirmed 2026-09-03. */
export const AREA_SERVED = [
  { "@type": "Country", name: "Nigeria" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
];

const KNOWS_ABOUT = [
  "Web development",
  "Growth marketing",
  "Search engine optimization",
  "Answer engine optimization",
  "Local SEO",
  "Paid advertising",
  "Conversion rate optimization",
  "Marketing automation",
  "AI automation",
];

type JsonLdObject = Record<string, unknown>;

/** JSON for a <script> body. Escapes "<" so CMS text can never close the tag. */
export function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

const orgRef = { "@id": ORG_ID };
const personRef = { "@id": PERSON_ID };

function compact<T extends JsonLdObject>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  ) as T;
}

/* ─── Site-wide graph (rendered once, in the root layout) ─── */

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: "Growveloper",
    url: SITE_URL,
    inLanguage: "en",
    publisher: orgRef,
  };
}

export function buildOrganizationSchema(opts: {
  description?: string | null;
  email?: string | null;
  telephone?: string | null;
  sameAs?: string[];
  logo?: string | null;
}) {
  const sameAs = Array.from(new Set([COMPANY_LINKEDIN, ...(opts.sameAs ?? [])])).filter(
    (u) => /^https?:\/\//.test(u),
  );
  return compact({
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Growveloper",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(opts.logo ?? LOGO_PATH),
    },
    description: opts.description ?? undefined,
    founder: personRef,
    email: opts.email ?? undefined,
    telephone: opts.telephone ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    areaServed: AREA_SERVED,
    knowsAbout: KNOWS_ABOUT,
    contactPoint: compact({
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE_URL}/start`,
      email: opts.email ?? undefined,
      telephone: opts.telephone ?? undefined,
      availableLanguage: "English",
      areaServed: AREA_SERVED,
    }),
    sameAs,
  });
}

export function buildPersonSchema(opts: { jobTitle?: string | null; image?: string | null }) {
  return compact({
    "@type": "Person",
    "@id": PERSON_ID,
    name: FOUNDER_NAME,
    alternateName: FOUNDER_ALT_NAME,
    url: `${SITE_URL}/about`,
    jobTitle: opts.jobTitle ?? "Growth Engineer. Developer. Marketer.",
    image: opts.image ?? undefined,
    worksFor: orgRef,
    knowsAbout: KNOWS_ABOUT,
    sameAs: [FOUNDER_LINKEDIN],
  });
}

/** The root graph: one script, three linked entities. */
export function buildSiteGraph(opts: {
  description?: string | null;
  email?: string | null;
  telephone?: string | null;
  sameAs?: string[];
  founderJobTitle?: string | null;
  founderImage?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteSchema(),
      buildOrganizationSchema(opts),
      buildPersonSchema({ jobTitle: opts.founderJobTitle, image: opts.founderImage }),
    ],
  };
}

/* ─── Per-page builders ─── */

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

/** Home is prepended automatically. The last item may omit its path. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) =>
      compact({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.path ? absoluteUrl(item.path) : undefined,
      }),
    ),
  };
}

export function buildFaqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
  /** Who the service is for, e.g. "Local service businesses". */
  audience?: string;
  offer?: { price: string | number; priceCurrency?: string; description?: string };
}) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: orgRef,
    areaServed: AREA_SERVED,
    audience: opts.audience
      ? { "@type": "BusinessAudience", audienceType: opts.audience }
      : undefined,
    offers: opts.offer
      ? compact({
          "@type": "Offer",
          price: String(opts.offer.price),
          priceCurrency: opts.offer.priceCurrency ?? "USD",
          description: opts.offer.description,
          url: absoluteUrl(opts.path),
          availability: "https://schema.org/InStock",
        })
      : undefined,
  });
}

export function buildWebPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  dateModified?: string | null;
  datePublished?: string | null;
}) {
  return compact({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(opts.path),
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef,
    inLanguage: "en",
    datePublished: opts.datePublished ?? undefined,
    dateModified: opts.dateModified ?? undefined,
  });
}

export function buildCollectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    provider: orgRef,
  };
}

export function buildBlogSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: orgRef,
    author: personRef,
  };
}

/** Author resolves to the founder entity when the byline matches, else a plain Person. */
function authorEntity(name?: string | null) {
  if (!name) return orgRef;
  const n = name.trim().toLowerCase();
  const isFounder =
    n.includes("obajuwon") || n.includes("oyekola") || n === FOUNDER_ALT_NAME.toLowerCase();
  return isFounder ? personRef : { "@type": "Person", name };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string | null;
  authorName?: string | null;
  type?: "Article" | "BlogPosting";
  keywords?: string[];
}) {
  const published = opts.datePublished ? new Date(opts.datePublished) : undefined;
  const modifiedRaw = opts.dateModified ? new Date(opts.dateModified) : undefined;
  /* A CMS save stamped before the scheduled publish date is not a revision. */
  const modified =
    published && modifiedRaw && modifiedRaw.getTime() < published.getTime()
      ? published
      : (modifiedRaw ?? published);
  return compact({
    "@context": "https://schema.org",
    "@type": opts.type ?? "Article",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(opts.path) },
    image: opts.imageUrl ?? undefined,
    datePublished: published?.toISOString(),
    dateModified: modified?.toISOString(),
    author: authorEntity(opts.authorName),
    publisher: orgRef,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
    keywords: opts.keywords?.length ? opts.keywords.join(", ") : undefined,
  });
}
