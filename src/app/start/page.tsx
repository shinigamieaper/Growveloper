import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { getStartPage } from "@/lib/sanity/queries";
import { QualifyingForm } from "@/components/forms/QualifyingForm";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStartPage();
  return {
    title: data?.seoTitle ?? "Book a Consultation — GROWVELOPER",
    description: data?.seoDescription ?? "Tell us about your project and book a free consultation.",
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const data = await getStartPage();

  return (
    <>
      <section className="min-h-screen px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
            {data?.pageHeadline ?? "Book a Free Consultation"}
          </h1>
          <p className="mb-6 text-text-secondary">
            {data?.pageDescription ?? "Tell us about your project and we'll map out the clearest path to growth."}
          </p>
          <p className="mb-12 text-sm text-text-tertiary opacity-80">
            We've helped companies achieve 3.6x above-benchmark conversion rates.
          </p>
        </div>
        <QualifyingForm
          preSelectedService={service}
          formSteps={data?.formSteps ?? null}
          submitButtonLabel={data?.submitButtonLabel}
        />
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-tertiary">
          <Lock className="h-3 w-3" aria-hidden />
          Your information is secure and never shared.
        </p>
      </section>
    </>
  );
}
