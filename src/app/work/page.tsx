import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { getAllCaseStudies, getSiteSettings, getWorkPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Our Work",
    description: settings?.seoDescription ?? "",
  };
}

export default async function WorkPage() {
  const [caseStudies, workPageData] = await Promise.all([
    getAllCaseStudies(),
    getWorkPage(),
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
            name: "Work — GROWVELOPER",
            description: "Case studies and client work from GROWVELOPER.",
            url: "https://growveloper.com/work",
            provider: { "@type": "Organization", name: "GROWVELOPER", url: "https://growveloper.com" },
          }),
        }}
      />
      <WorkPageClient caseStudies={caseStudies} workPageData={workPageData} />
    </>
  );
}
