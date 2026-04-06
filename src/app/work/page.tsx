import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { getAllCaseStudies, getSiteSettings, getWorkPage, getWorkFAQ } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [workPage, settings] = await Promise.all([getWorkPage(), getSiteSettings()]);
  const ogImage = workPage?.ogImage ?? settings?.ogImage;
  return {
    title: workPage?.seoTitle ?? "Our Work",
    description: workPage?.seoDescription ?? "Case studies and client work from GROWVELOPER.",
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

export default async function WorkPage() {
  const [caseStudies, workPageData, faq] = await Promise.all([
    getAllCaseStudies(),
    getWorkPage(),
    getWorkFAQ(),
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
      <WorkPageClient caseStudies={caseStudies} workPageData={workPageData} faq={faq} />
    </>
  );
}
