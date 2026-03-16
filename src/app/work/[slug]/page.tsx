import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Case Study — GROWVELOPER`,
    description: "A detailed case study.",
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-slug={slug}>
      {/* Stage 7 — Individual case study sections */}
    </main>
  );
}
