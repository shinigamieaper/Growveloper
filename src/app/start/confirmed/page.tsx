import type { Metadata } from "next";
import { Check, CalendarDays, MessageCircle, ArrowRight } from "lucide-react";
import { ConfettiBurst } from "@/components";
import { getStartConfirmedPage } from "@/lib/sanity/queries";

const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const FALLBACK_NEXT_STEPS = [
  {
    number: "01",
    title: "We review your submission",
    description: "Our team reads every detail you shared and prepares a tailored agenda.",
  },
  {
    number: "02",
    title: "You get a reply within 24 hours",
    description: "We'll reach out via your preferred contact method with next steps.",
  },
  {
    number: "03",
    title: "Free strategy session",
    description: "A focused 30-minute call to map your clearest path to growth.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStartConfirmedPage();
  return {
    title: data?.seoTitle ?? "Consultation Confirmed — GROWVELOPER",
    description: data?.seoDescription ?? "Your consultation request has been received. Here is what happens next.",
    robots: { index: false, follow: false },
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}

export default async function StartConfirmedPage() {
  const data = await getStartConfirmedPage();

  const headline = data?.headline ?? "You're in. We'll be in touch.";
  const description =
    data?.description ??
    "Your consultation request has been received. Here's what happens next.";
  const nextSteps =
    data?.nextSteps && data.nextSteps.length > 0
      ? data.nextSteps.map((s) => ({ number: s.stepNumber, title: s.title, description: s.description }))
      : FALLBACK_NEXT_STEPS;
  const ctaUrl = data?.ctaUrl || CALCOM_URL;
  const ctaLabel = data?.ctaLabel ?? "Book a time now";
  const secondaryCtaUrl = data?.secondaryCtaUrl || (WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "");
  const secondaryCtaLabel = data?.secondaryCtaLabel ?? "Message on WhatsApp";

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Consultation Confirmed — GROWVELOPER",
            description: "Your consultation request has been received. Here is what happens next.",
            url: "https://growveloper.com/start/confirmed",
          }),
        }}
      />
      <ConfettiBurst />
      <section className="min-h-screen px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15">
              <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
            </div>
          </div>

          <div className="mb-12 text-center">
            <h1 className="heading-font mb-3 text-3xl font-bold md:text-4xl">{headline}</h1>
            <p className="text-text-secondary">{description}</p>
          </div>

          <div className="mb-12 space-y-6">
            {nextSteps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 rounded-xl border border-glass-border bg-bg-secondary p-5"
              >
                <span className="heading-font shrink-0 text-2xl font-bold text-brand-mid">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8 rounded-xl border border-glass-border bg-bg-secondary/50 p-4 text-center">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Before your call:</span>{" "}
              Have your current website URL and a rough idea of your growth goals ready.
            </p>
          </div>

          <div className="mb-8 overflow-hidden rounded-xl border border-glass-border">
            <div className="flex items-center gap-2 border-b border-glass-border bg-bg-secondary px-5 py-3">
              <CalendarDays className="h-4 w-4 text-brand-mid" />
              <p className="text-sm font-semibold text-text-primary">{ctaLabel}</p>
            </div>
            <iframe
              src={ctaUrl}
              className="h-150 w-full border-0 bg-bg-primary"
              loading="lazy"
              title="Book a strategy call"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">Open in new tab</p>
                <p className="text-xs text-text-tertiary">If the calendar doesn't load above</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
            </a>

            {secondaryCtaUrl && (
              <a
                href={secondaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-brand-mid" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{secondaryCtaLabel}</p>
                  <p className="text-xs text-text-tertiary">Quick questions? Chat now</p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
