import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — The Lab — GROWVELOPER`,
    description: "A blog post from The Lab.",
  };
}

export default async function LabPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-slug={slug}>
      {/* Stage 6 — Individual blog post sections */}
    </main>
  );
}
