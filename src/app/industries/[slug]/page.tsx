import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Industries — GROWVELOPER`,
    description: "Industry-specific solutions from Growveloper.",
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-slug={slug}>
      {/* Stage 8 — Industry silo template sections */}
    </main>
  );
}
