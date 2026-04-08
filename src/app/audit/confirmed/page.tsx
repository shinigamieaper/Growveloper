import type { Metadata } from "next";
import { Check, ClipboardList, CalendarDays, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAuditConfirmedPage } from "@/lib/sanity/queries";

const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
const INTAKE_URL = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL || "#";

const FALLBACK_NEXT_STEPS = [
  {
    number: "01",
    title: "Complete the intake form",
    description:
      "A short form covering your site, goals, and current stack. Takes about 5 minutes — the more detail you provide, the sharper the audit.",
  },
  {
    number: "02",
    title: "We audit your digital presence",
    description:
      "Expect your full audit package within 3–5 business days: a Loom walkthrough, a Notion doc with every finding, and a prioritised action list.",
  },
  {
    number: "03",
    title: "Walkthrough call",
    description:
      "We'll walk through every finding together on a live call — ask questions, challenge recommendations, and leave with a clear roadmap.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAuditConfirmedPage();
  return {
    title: data?.seoTitle ?? "Audit Confirmed — GROWVELOPER",
    description:
      data?.seoDescription ??
      "Your growth audit is booked. Complete the intake form and we'll get started.",
    robots: { index: false, follow: false },
    openGraph: data?.ogImage ? { images: [{ url: data.ogImage }] } : undefined,
  };
}

export default async function AuditConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; tx_ref?: string; transaction_id?: string }>;
}) {
  const params = await searchParams;
  const data = await getAuditConfirmedPage();

  const headline = data?.headline ?? "Your audit is booked.";
  const description =
    data?.description ??
    "Payment confirmed. Complete the intake form below so we know where to focus.";
  const nextSteps =
    data?.nextSteps && data.nextSteps.length > 0
      ? data.nextSteps.map((s) => ({ number: s.stepNumber, title: s.title, description: s.description }))
      : FALLBACK_NEXT_STEPS;
  const intakeLabel = data?.intakeCtaLabel ?? "Complete intake form";
  const intakeUrl = data?.intakeCtaUrl || INTAKE_URL;
  const calendarLabel = data?.calendarCtaLabel ?? "Book walkthrough call";
  const calendarUrl = data?.calendarCtaUrl || CALCOM_URL;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Audit Confirmed — GROWVELOPER",
            description: "Your growth audit is booked. Complete the intake form and we'll get started.",
            url: "https://growveloper.com/audit/confirmed",
          }),
        }}
      />
      <section className="min-h-screen px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15 ring-1 ring-brand-mid/20">
              <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
            </div>
          </div>

          <div className="mb-12 text-center">
            <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
              {headline}
            </h1>
            <p className="text-text-secondary">{description}</p>
            {params.status === "successful" && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <Check className="h-3 w-3" />
                Payment successful
              </span>
            )}
            {params.tx_ref && (
              <p className="mt-2 text-xs text-text-tertiary">
                Reference: {params.tx_ref}
              </p>
            )}
          </div>

          <p className="mb-8 text-center text-sm font-medium text-brand-mid">
            Your audit covers website performance, marketing channels, and automation opportunities — with a prioritized roadmap showing exactly what to fix first.
          </p>

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
                  <h3 className="mb-1 text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={intakeUrl}
              target={intakeUrl !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-brand-mid/40 bg-brand-dark/10 p-5 transition-all hover:border-brand-mid/70"
            >
              <ClipboardList className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{intakeLabel}</p>
                <p className="text-xs text-text-tertiary">Start here — takes 5 minutes</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-mid transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">Open in new tab</p>
                <p className="text-xs text-text-tertiary">If the calendar doesn't load below</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-glass-border">
            <div className="flex items-center gap-2 border-b border-glass-border bg-bg-secondary px-5 py-3">
              <CalendarDays className="h-4 w-4 text-brand-mid" />
              <p className="text-sm font-semibold text-text-primary">{calendarLabel}</p>
            </div>
            <iframe
              src={calendarUrl}
              className="h-150 w-full border-0 bg-bg-primary"
              loading="lazy"
              title="Book your walkthrough call"
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/audit"
              className="inline-flex items-center gap-1.5 text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to Growth Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
