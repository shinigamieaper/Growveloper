import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation — GROWVELOPER",
  description: "Tell us about your project and book a free consultation.",
};

export default async function StartPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" data-service={service}>
      {/* Stage 5 — Qualifying form (multi-step) */}
    </main>
  );
}
