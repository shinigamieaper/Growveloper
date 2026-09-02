import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { getAllCaseStudies, getSiteSettings, getWorkPage, getWorkFAQ } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

const WORK_DESCRIPTION = "Case studies and client work from GROWVELOPER.";

export async function generateMetadata(): Promise<Metadata> {
  const [workPage, settings] = await Promise.all([getWorkPage(), getSiteSettings()]);
  return buildPageMetadata({
    title: workPage?.seoTitle ?? "Our Work",
    description: workPage?.seoDescription ?? WORK_DESCRIPTION,
    path: "/work",
    image: workPage?.ogImage ?? settings?.ogImage,
  });
}

export default async function WorkPage() {
  const [caseStudies, workPageData, faq] = await Promise.all([
    getAllCaseStudies(),
    getWorkPage(),
    getWorkFAQ(),
  ]);
  return (
    <>
      <JsonLd
        schema={[
          buildCollectionPageSchema({
            name: workPageData?.seoTitle ?? "Work",
            description: workPageData?.seoDescription ?? WORK_DESCRIPTION,
            path: "/work",
          }),
          buildBreadcrumbSchema([{ name: "Work", path: "/work" }]),
        ]}
      />
      <WorkPageClient caseStudies={caseStudies} workPageData={workPageData} faq={faq} />
    </>
  );
}
