import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";
import { getAllResources, getSiteSettings, getResourcesPage } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

const RESOURCES_DESCRIPTION =
  "Guides, templates, frameworks, and playbooks for founders who build and market.";

export async function generateMetadata(): Promise<Metadata> {
  const [res, settings] = await Promise.all([getResourcesPage(), getSiteSettings()]);
  return buildPageMetadata({
    title: res?.seoTitle ?? "Resources",
    description: res?.seoDescription ?? RESOURCES_DESCRIPTION,
    path: "/resources",
    image: res?.ogImage ?? settings?.ogImage,
  });
}

export default async function ResourcesPage() {
  const [resources, settings, res] = await Promise.all([
    getAllResources(),
    getSiteSettings(),
    getResourcesPage(),
  ]);
  return (
    <>
      <JsonLd
        schema={[
          buildCollectionPageSchema({
            name: res?.seoTitle ?? "Resources",
            description: res?.seoDescription ?? RESOURCES_DESCRIPTION,
            path: "/resources",
          }),
          buildBreadcrumbSchema([{ name: "Resources", path: "/resources" }]),
        ]}
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
