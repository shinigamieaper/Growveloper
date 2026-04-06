import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getSiteSettings, getPrivacyPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSiteSettings(), getPrivacyPage()]);
  return {
    title: page?.pageTitle ? `${page.pageTitle} — GROWVELOPER` : "Privacy Policy — GROWVELOPER",
    description: settings?.seoDescription ?? "",
    openGraph: settings?.ogImage ? { images: [{ url: settings.ogImage }] } : undefined,
  };
}

export default async function PrivacyPage() {
  const page = await getPrivacyPage();
  if (!page) return null;

  return (
    <section className="pt-16 pb-24 md:pt-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12 border-b border-glass-border pb-8">
          <h1 className="heading-font mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            {page.pageTitle}
          </h1>
          {page.lastUpdated && (
            <p className="text-sm text-text-tertiary">
              Last updated:{" "}
              {new Date(page.lastUpdated).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Table of contents */}
        {page.sections.length > 0 && (
          <nav className="mb-12 rounded-xl border border-glass-border bg-bg-secondary p-6">
            {page.contentsLabel && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                {page.contentsLabel}
              </p>
            )}
            <ul className="space-y-2">
              {page.sections.map((section) => (
                <li key={section._key ?? section.heading}>
                  <a
                    href={`#${section._key ?? ""}`}
                    className="text-sm text-text-secondary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Sections */}
        <div className="space-y-12">
          {page.sections.map((section) => (
            <div key={section._key ?? section.heading} id={section._key ?? ""}>
              <h2 className="heading-font mb-4 text-xl font-bold text-text-primary">
                {section.heading}
              </h2>
              <div className="prose-legal space-y-4">
                <PortableText
                  value={section.body as Parameters<typeof PortableText>[0]["value"]}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-base leading-relaxed text-text-secondary">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-glass-border pt-8">
          {page.termsLinkLabel && (
            <Link
              href="/terms"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
            >
              {page.termsLinkLabel}
            </Link>
          )}
          {page.homeLinkLabel && (
            <Link
              href="/"
              className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-text-primary hover:underline"
            >
              {page.homeLinkLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
