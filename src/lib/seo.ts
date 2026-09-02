/* ─────────────────────────────────────────────────────────────────────────────
   SEO helpers — one place that decides canonical URLs, Open Graph, Twitter
   cards and robots directives so every page emits the same, complete head.
───────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from "next";

export const SITE_URL = "https://growveloper.com";
export const SITE_NAME = "GROWVELOPER";
export const SITE_LOCALE = "en_US";

/** Absolute URL for a root-relative path. Already-absolute URLs pass through. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? SITE_URL : `${SITE_URL}${clean}`;
}

/** Trim a description to a search-snippet-safe length without cutting a word. */
export function snippet(text: string | null | undefined, max = 155): string {
  if (!text) return "";
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max - 1).trim()}…`;
}

export interface ArticleMetadataInput {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export interface PageMetadataInput {
  /** Page title. The layout template appends the brand unless `absoluteTitle` is set. */
  title: string;
  /** Use the title as-is, with no brand suffix. */
  absoluteTitle?: boolean;
  description: string;
  /** Root-relative path, e.g. "/industries/local-services". Drives the canonical URL. */
  path: string;
  /** Share image. Root-relative or absolute. Omit to inherit the site default. */
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  /** Thank-you pages, playgrounds and anything else that should never rank. */
  noIndex?: boolean;
  article?: ArticleMetadataInput;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const description = snippet(input.description, 160);
  const image = input.image ? absoluteUrl(input.image) : undefined;
  const plainTitle = input.title;
  /* CMS titles sometimes already end in the brand. Never brand them twice. */
  const absolute = input.absoluteTitle || /growveloper/i.test(plainTitle);

  const metadata: Metadata = {
    title: absolute ? { absolute: plainTitle } : plainTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: input.type ?? "website",
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: plainTitle,
      description,
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: input.imageAlt ?? plainTitle }] }
        : {}),
      ...(input.type === "article" && input.article
        ? {
            publishedTime: input.article.publishedTime,
            modifiedTime: input.article.modifiedTime,
            authors: input.article.authors,
            tags: input.article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: plainTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };

  if (input.noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
