import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — GROWVELOPER",
  description: "How GROWVELOPER collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "1 January 2025";
const COMPANY_NAME = "Growveloper";
const CONTACT_EMAIL = "hello@growveloper.com";

interface LegalSection {
  id: string;
  heading: string;
  content: string[];
}

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    heading: "1. Introduction",
    content: [
      `${COMPANY_NAME} (\u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d) operates the website growveloper.com and provides web development, growth marketing, and AI automation services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.`,
      "Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.",
    ],
  },
  {
    id: "data-collected",
    heading: "2. Information We Collect",
    content: [
      "We may collect personal information you provide directly when you: complete our consultation form, purchase a resource or audit, sign up for our newsletter, or contact us.",
      "This may include: name, email address, company name, website URL, and details about your business goals and current marketing setup.",
      "We also collect non-personally identifiable information automatically via cookies and analytics tools, including pages visited, time on site, referring URLs, and device/browser type.",
    ],
  },
  {
    id: "how-we-use",
    heading: "3. How We Use Your Information",
    content: [
      "We use the information we collect to: respond to consultation requests, deliver purchased services and digital products, send transactional emails (receipts, download links, audit deliverables), send marketing emails where you have opted in, improve our website and service offerings, and comply with legal obligations.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    id: "cookies",
    heading: "4. Cookies and Tracking",
    content: [
      "We use first-party cookies to remember your preferences and measure site performance. We also use Google Analytics (GA4) to understand aggregate traffic patterns. GA4 data is anonymised and subject to Google\u2019s own privacy policy.",
      "If we run paid advertising, advertising platforms (Google Ads, Meta) may place their own cookies to measure ad performance. You can opt out of personalised advertising through your browser settings or the relevant platform\u2019s ad settings.",
      "You may disable cookies in your browser settings. Doing so may affect site functionality.",
    ],
  },
  {
    id: "third-parties",
    heading: "5. Third-Party Services",
    content: [
      "We share data with a limited set of third-party processors necessary to operate our services: Stripe (payment processing), Mailchimp (email marketing), Resend (transactional email), Sanity (CMS), and Vercel (hosting and edge delivery).",
      "Each processor is bound by their own privacy policies and is not authorised to use your data for any purpose beyond providing the service to us.",
    ],
  },
  {
    id: "retention",
    heading: "6. Data Retention",
    content: [
      "We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
      "Consultation form submissions are retained for up to 3 years. Newsletter subscribers\u2019 data is retained until they unsubscribe. Payment records are retained for 7 years for tax and accounting purposes.",
    ],
  },
  {
    id: "rights",
    heading: "7. Your Rights",
    content: [
      "Depending on your location, you may have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to or restrict processing, and request data portability.",
      `To exercise any of these rights, contact us at ${CONTACT_EMAIL}. We will respond within 30 days.`,
    ],
  },
  {
    id: "security",
    heading: "8. Security",
    content: [
      "We implement reasonable technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction. However, no method of internet transmission or electronic storage is 100% secure.",
    ],
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy periodically. When we do, we will update the \u201cLast updated\u201d date at the top of this page. Continued use of our site after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    heading: "10. Contact",
    content: [
      `If you have questions about this Privacy Policy or how we handle your data, contact us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12 border-b border-glass-border pb-8">
            <h1 className="heading-font mb-4 text-3xl font-bold text-text-primary md:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-text-tertiary">Last updated: {LAST_UPDATED}</p>
          </div>

          {/* Table of contents */}
          <nav className="mb-12 rounded-xl border border-glass-border bg-bg-secondary p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Contents
            </p>
            <ul className="space-y-2">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-text-secondary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="heading-font mb-4 text-xl font-bold text-text-primary">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-glass-border pt-8">
            <Link
              href="/terms"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              Terms of Service →
            </Link>
            <Link
              href="/"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-text-primary hover:underline"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
