import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  getResourceBySlug,
  getAllResources,
} from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const resources = await getAllResources();
  const paidResources = resources.filter((r) => r.accessType === "paid");
  if (paidResources.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return paidResources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: "Purchase Confirmed — GROWVELOPER" };
  return {
    title: `${resource.title} — Purchase Confirmed — GROWVELOPER`,
    description: `Your purchase is confirmed. Download ${resource.title} now.`,
  };
}

export default async function ResourceConfirmedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <section className="min-h-screen px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          {/* Success icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15 ring-1 ring-brand-mid/20">
              <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
            </div>
          </div>

          {/* Headline */}
          <div className="mb-12 text-center">
            <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
              Payment confirmed.
            </h1>
            <p className="text-text-secondary">{resource.title}</p>
          </div>

          {/* Download card */}
          {resource.fileUrl && (
            <a
              href={resource.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 flex items-center gap-4 rounded-xl border border-brand-mid/30 bg-brand-dark/10 p-5 transition-all hover:border-brand-mid hover:bg-brand-dark/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark/20">
                <Download className="h-5 w-5 text-brand-mid" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  {resource.title}
                </p>
                <p className="text-xs text-text-tertiary">
                  Click to download your file
                </p>
              </div>
            </a>
          )}

          {/* Back link */}
          <div className="text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
