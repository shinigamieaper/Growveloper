/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD Schema Builder Helpers
   Returns plain objects — render via <JsonLd> or inline <script> tags.
───────────────────────────────────────────────────────────────────────────── */

const SITE_URL = "https://growveloper.com";
const SITE_NAME = "GROWVELOPER";

export function buildOrganizationSchema(seoDescription?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: seoDescription ?? "",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/start`,
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/lab?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    serviceType: opts.serviceType,
    areaServed: "Worldwide",
    url: `${SITE_URL}${opts.path}`,
  };
}

export function buildCollectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function buildBlogSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
  };
}
