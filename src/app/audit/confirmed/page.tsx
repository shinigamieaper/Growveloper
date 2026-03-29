import type { Metadata } from "next";
import { Check, ClipboardList, CalendarDays, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit Confirmed — GROWVELOPER",
  description: "Your growth audit is booked. Complete the intake form and we\u2019ll get started.",
};

const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
const INTAKE_URL = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL || "#";

const nextSteps = [
  {
    number: "01",
    title: "Complete the intake form",
    description:
      "A short form covering your site, goals, and current stack. Takes about 5 minutes \u2014 the more detail you provide, the sharper the audit.",
  },
  {
    number: "02",
    title: "We audit your digital presence",
    description:
      "Expect your full audit package within 3\u20135 business days: a Loom walkthrough, a Notion doc with every finding, and a prioritised action list.",
  },
  {
    number: "03",
    title: "Walkthrough call",
    description:
      "We\u2019ll walk through every finding together on a live call \u2014 ask questions, challenge recommendations, and leave with a clear roadmap.",
  },
];

export default function AuditConfirmedPage() {
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
              Your audit is booked.
            </h1>
            <p className="text-text-secondary">
              Payment confirmed. Complete the intake form below so we know where to focus.
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
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={INTAKE_URL}
              target={INTAKE_URL !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-brand-mid/40 bg-brand-dark/10 p-5 transition-all hover:border-brand-mid/70"
            >
              <ClipboardList className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Complete intake form
                </p>
                <p className="text-xs text-text-tertiary">Start here — takes 5 minutes</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-mid transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href={CALCOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Book walkthrough call
                </p>
                <p className="text-xs text-text-tertiary">Pick a slot in advance</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Back link */}
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
