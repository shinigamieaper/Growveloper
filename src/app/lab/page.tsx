import type { Metadata } from "next";
import { LabPageClient } from "./LabPageClient";
import { getAllLabContent, getSiteSettings, getLabPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "The Lab",
    description:
      settings?.seoDescription ??
      "Blog posts, breakdowns, and video content on development, marketing, and automation.",
  };
}

export default async function LabPage() {
  const [items, settings, lab] = await Promise.all([
    getAllLabContent(),
    getSiteSettings(),
    getLabPage(),
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "The Lab — GROWVELOPER",
            description: "Blog posts, breakdowns, and video content on development, marketing, and automation.",
            url: "https://growveloper.com/lab",
            publisher: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
          }),
        }}
      />
      <LabPageClient
      items={items}
      pageHeadline={lab?.pageHeadline}
      pageHighlightedWord={lab?.pageHighlightedWord}
      pageDescription={lab?.pageDescription}
      newsletterHeadline={lab?.newsletterHeadline}
      newsletterHighlightedWord={lab?.newsletterHighlightedWord}
      newsletterSubCopy={lab?.newsletterSubCopy}
      newsletterCtaLabel={lab?.newsletterCtaLabel}
      newsletterSuccessHeadline={settings?.newsletterSuccessHeadline}
      newsletterSuccessSubCopy={settings?.newsletterSuccessSubCopy}
      newsletterEmailPlaceholder={settings?.newsletterEmailPlaceholder}
      inlineCtaHeadline={lab?.inlineCtaHeadline}
      inlineCtaHighlightedWord={lab?.inlineCtaHighlightedWord}
      inlineCtaLabel={lab?.inlineCtaLabel}
      inlineCtaDestination={lab?.inlineCtaDestination}
      sectionCtaHeadline={lab?.sectionCtaHeadline}
      sectionCtaHighlightedWord={lab?.sectionCtaHighlightedWord}
      sectionCtaLabel={lab?.sectionCtaLabel}
      sectionCtaDestination={lab?.sectionCtaDestination}
      emptyStateFiltered={lab?.emptyStateFiltered}
    />
    </>
  );
}
