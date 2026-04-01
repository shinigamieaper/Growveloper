import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";
import { getAllResources, getSiteSettings, getResourcesPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Resources",
    description:
      settings?.seoDescription ??
      "Guides, templates, frameworks, and playbooks for founders who build and market.",
  };
}

export default async function ResourcesPage() {
  const [resources, settings, res] = await Promise.all([
    getAllResources(),
    getSiteSettings(),
    getResourcesPage(),
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Resources — GROWVELOPER",
            description: "Guides, templates, frameworks, and playbooks for founders who build and market.",
            url: "https://growveloper.com/resources",
            provider: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
          }),
        }}
      />
      <ResourcesPageClient
        resources={resources}
        pageHeadline={res?.pageHeadline}
        pageHighlightedWord={res?.pageHighlightedWord}
        pageDescription={res?.pageDescription}
        newsletterHeadline={res?.newsletterHeadline}
        newsletterHighlightedWord={res?.newsletterHighlightedWord}
        newsletterSubCopy={res?.newsletterSubCopy}
        newsletterCtaLabel={res?.newsletterCtaLabel}
        newsletterSuccessHeadline={settings?.newsletterSuccessHeadline}
        newsletterSuccessSubCopy={settings?.newsletterSuccessSubCopy}
        newsletterEmailPlaceholder={settings?.newsletterEmailPlaceholder}
        inlineCtaHeadline={res?.inlineCtaHeadline}
        inlineCtaHighlightedWord={res?.inlineCtaHighlightedWord}
        inlineCtaLabel={res?.inlineCtaLabel}
        inlineCtaDestination={res?.inlineCtaDestination}
        sectionCtaHeadline={res?.sectionCtaHeadline}
        sectionCtaHighlightedWord={res?.sectionCtaHighlightedWord}
        sectionCtaLabel={res?.sectionCtaLabel}
        sectionCtaDestination={res?.sectionCtaDestination}
        emptyStatePrimary={res?.emptyStatePrimary}
        emptyStateFiltered={res?.emptyStateFiltered}
      />
    </>
  );
}
