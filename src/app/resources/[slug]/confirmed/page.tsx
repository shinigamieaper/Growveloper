import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getResourceBySlug, RESOURCES } from "@/lib/data/resources";

export async function generateStaticParams() {
  return RESOURCES.filter((r) => r.accessType === "paid").map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Purchase Confirmed — GROWVELOPER" };
  return {
    title: `Purchase Confirmed — ${resource.title} — GROWVELOPER`,
    description: `Your purchase of ${resource.title} is confirmed. Your download is ready.`,
  };
}

const nextSteps = [
  {
    number: "01",
    title: "Payment confirmed",
    description: "Your purchase is complete and securely processed via Stripe.",
  },
  {
    number: "02",
    title: "Download your resource",
    description: "Use the download button below to get your file instantly.",
  },
  {
    number: "03",
    title: "Put it to work",
    description: "Apply the frameworks and templates to your business right away.",
  },
];

export default async function ResourceConfirmedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <section className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15">
            <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
          </div>
        </div>

        {/* Headline */}
        <div className="mb-12 text-center">
          <h1 className="heading-font mb-3 text-3xl font-bold md:text-4xl">
            You&apos;re in. Your download is ready.
          </h1>
          <p className="text-text-secondary">
            {resource.title} — purchased successfully.
          </p>
        </div>

        {/* Next steps */}
        <div className="mb-12 space-y-4">
          {nextSteps.map((step) => (
            <div
              key={step.number}
              className="flex gap-4 rounded-xl border border-glass-border bg-bg-secondary p-5"
            >
              <span className="heading-font shrink-0 text-2xl font-bold text-brand-mid">
                {step.number}
              </span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download card */}
        {resource.fileUrl && (
          <a
            href={resource.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-8 flex items-center gap-4 rounded-xl border border-brand-mid/30 bg-brand-dark/10 p-5 transition-all hover:border-brand-mid hover:bg-brand-dark/20"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark/20">
              <Download className="h-5 w-5 text-brand-mid" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">
                Download {resource.title}
              </p>
              <p className="text-xs text-text-tertiary">Click to download your file</p>
            </div>
          </a>
        )}

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to resources
          </Link>
        </div>
      </div>
      </section>
    </>
  );
}
