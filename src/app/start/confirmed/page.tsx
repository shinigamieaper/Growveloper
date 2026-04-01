import type { Metadata } from "next";
import { Check, CalendarDays, MessageCircle, ArrowRight } from "lucide-react";
import { ConfettiBurst } from "@/components";

export const metadata: Metadata = {
  title: "Consultation Confirmed — GROWVELOPER",
  description: "Your consultation request has been received. Here is what happens next.",
};

const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const nextSteps = [
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

export default function StartConfirmedPage() {
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
            description: "Your consultation request has been received.",
            url: "https://growveloper.com/start/confirmed",
          }),
        }}
      />
      <ConfettiBurst />
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
            You&apos;re in. We&apos;ll be in touch.
          </h1>
          <p className="text-text-secondary">
            Your consultation request has been received. Here&apos;s what happens next.
          </p>
        </div>

        {/* Next steps */}
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
                <h3 className="mb-1 text-sm font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={CALCOM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
          >
            <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">
                Book a time now
              </p>
              <p className="text-xs text-text-tertiary">
                Skip the wait — pick a slot
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
          </a>

          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Message on WhatsApp
                </p>
                <p className="text-xs text-text-tertiary">
                  Quick questions? Chat now
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        {/* Back to home */}
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
