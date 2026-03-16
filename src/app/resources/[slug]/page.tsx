import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Resources — GROWVELOPER`,
    description: "A resource from Growveloper.",
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-slug={slug}>
      {/* Stage 6 — Individual resource page sections */}
    </main>
  );
}
