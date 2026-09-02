import type { Metadata } from "next";
import { LabPageClient } from "./LabPageClient";
import { getAllLabContent, getSiteSettings, getLabPage } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildBlogSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

const LAB_DESCRIPTION =
  "Blog posts, breakdowns, and video content on development, marketing, and automation.";

export async function generateMetadata(): Promise<Metadata> {
  const [lab, settings] = await Promise.all([getLabPage(), getSiteSettings()]);
  return buildPageMetadata({
    title: lab?.seoTitle ?? "The Lab",
    description: lab?.seoDescription ?? LAB_DESCRIPTION,
    path: "/lab",
    image: lab?.ogImage ?? settings?.ogImage,
  });
}

export default async function LabPage() {
  const [items, settings, lab] = await Promise.all([
    getAllLabContent(),
    getSiteSettings(),
    getLabPage(),
  ]);
  return (
    <>
      <JsonLd
        schema={[
          buildBlogSchema({
            name: lab?.seoTitle ?? "The Lab",
            description: lab?.seoDescription ?? LAB_DESCRIPTION,
            path: "/lab",
          }),
          buildBreadcrumbSchema([{ name: "The Lab", path: "/lab" }]),
        ]}
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
