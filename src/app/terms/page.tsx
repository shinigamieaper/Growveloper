import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — GROWVELOPER",
  description: "Terms governing use of the GROWVELOPER website and services.",
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
      `These Terms of Service govern your use of growveloper.com and any services provided by ${COMPANY_NAME} (\u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d). By accessing our website or engaging our services, you agree to these terms.`,
      "If you do not agree, please do not use our website or services.",
    ],
  },
  {
    id: "services",
    heading: "2. Services",
    content: [
      `${COMPANY_NAME} provides web development, growth marketing, AI automation, and related digital consultancy services. The specific scope, deliverables, timeline, and fees for any engagement are defined in a separate project agreement or statement of work agreed between the parties.`,
      "We reserve the right to refuse service to anyone for any reason at our discretion.",
    ],
  },
  {
    id: "digital-products",
    heading: "3. Digital Products and Resources",
    content: [
      "We offer digital products (templates, guides, playbooks, frameworks) available for purchase or download via the Resources section of our website. All sales are final unless the product is materially defective.",
      "Upon purchase, you receive a personal, non-exclusive, non-transferable licence to use the product for your own business purposes. You may not resell, redistribute, or sublicence the product to third parties.",
      "Free resources distributed in exchange for an email address are subject to the same licence restrictions.",
    ],
  },
  {
    id: "payment",
    heading: "4. Payment Terms",
    content: [
      "Digital product purchases are processed via Stripe. Payment is due at time of purchase. Growth Audit purchases include a one-time fee as displayed at time of purchase.",
      "For ongoing service engagements, payment terms are defined in the project agreement. Typically this is 50% upfront and 50% on completion, or monthly retainer billing as agreed.",
      "All prices are listed in the currency shown at time of purchase. Applicable taxes may be added at checkout depending on your location.",
    ],
  },
  {
    id: "refunds",
    heading: "5. Refunds and Cancellations",
    content: [
      "Digital products: we do not offer refunds on digital downloads once the file has been accessed or downloaded, except where the product is materially defective.",
      "Growth Audit: if you have paid but not yet completed the intake form, you may request a full refund within 48 hours of purchase. Once the audit is underway, no refund is available.",
      "Ongoing service retainers: either party may terminate with 30 days written notice. Any work completed up to the termination date will be billed at the agreed rate.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "6. Intellectual Property",
    content: [
      "All content on this website \u2014 including text, graphics, logos, code, and design \u2014 is the property of Growveloper and is protected by applicable copyright law. You may not reproduce, distribute, or create derivative works without our written permission.",
      "For bespoke work products (websites, codebases, marketing assets) built for clients, intellectual property ownership transfers to the client upon receipt of final payment as specified in the project agreement.",
      `Growveloper retains the right to display completed work in our portfolio unless explicitly agreed otherwise in the project agreement.`,
    ],
  },
  {
    id: "limitation",
    heading: "7. Limitation of Liability",
    content: [
      `To the maximum extent permitted by law, ${COMPANY_NAME} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or website, including but not limited to lost profits, data loss, or business interruption.`,
      "Our total liability in connection with any claim arising from these terms or our services shall not exceed the total fees paid by you in the 12 months preceding the claim.",
    ],
  },
  {
    id: "warranties",
    heading: "8. Disclaimers",
    content: [
      `Our website and services are provided \u201cas is\u201d without warranty of any kind, express or implied. We do not warrant that the website will be uninterrupted or error-free, or that any defects will be corrected.`,
      "Growth results, conversion improvements, and other outcomes described in case studies and marketing materials are illustrative of past results and are not a guarantee of future performance.",
    ],
  },
  {
    id: "governing-law",
    heading: "9. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    id: "changes",
    heading: "10. Changes to These Terms",
    content: [
      "We may update these Terms periodically. Changes will be posted on this page with an updated \u201cLast updated\u201d date. Continued use of our services after changes constitutes acceptance.",
    ],
  },
  {
    id: "contact",
    heading: "11. Contact",
    content: [
      `For questions about these Terms, contact us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12 border-b border-glass-border pb-8">
            <h1 className="heading-font mb-4 text-3xl font-bold text-text-primary md:text-4xl">
              Terms of Service
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
              href="/privacy"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              Privacy Policy →
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
