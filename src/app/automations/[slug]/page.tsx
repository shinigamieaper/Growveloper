import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Automations — GROWVELOPER`,
    description: "Automation product page.",
  };
}

export default async function AutomationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-slug={slug}>
      {/* Stage 5 — Individual automation page sections */}
    </main>
  );
}
