import type { Metadata } from "next";
import { QualifyingForm } from "@/components/forms/QualifyingForm";

export const metadata: Metadata = {
  title: "Book a Consultation — GROWVELOPER",
  description: "Tell us about your project and book a free consultation.",
};

export default async function StartPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;

  return (
    <>
      <section className="min-h-screen px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
            Book a Free Consultation
          </h1>
          <p className="mb-12 text-text-secondary">
            Tell us about your project and we&apos;ll map out the clearest path to growth.
          </p>
        </div>
        <QualifyingForm preSelectedService={service} />
      </section>
    </>
  );
}
