"use client";

import { useState, useMemo } from "react";
import {
  SectionHeader,
  ContentFilterBar,
  ResourceCard,
  CTABanner,
  NewsletterCapture,
  ScrollFadeUp,
} from "@/components";
import type { CTABannerData, ResourceCardData } from "@/lib/types";

interface ResourcesPageClientProps {
  resources: ResourceCardData[];
  pageHeadline?: string | null;
  pageHighlightedWord?: string | null;
  pageDescription?: string | null;
  newsletterHeadline?: string | null;
  newsletterHighlightedWord?: string | null;
  newsletterSubCopy?: string | null;
  newsletterCtaLabel?: string | null;
  newsletterSuccessHeadline?: string | null;
  newsletterSuccessSubCopy?: string | null;
  newsletterEmailPlaceholder?: string | null;
  inlineCtaHeadline?: string | null;
  inlineCtaHighlightedWord?: string | null;
  inlineCtaLabel?: string | null;
  inlineCtaDestination?: string | null;
  sectionCtaHeadline?: string | null;
  sectionCtaHighlightedWord?: string | null;
  sectionCtaLabel?: string | null;
  sectionCtaDestination?: string | null;
  emptyStatePrimary?: string | null;
  emptyStateFiltered?: string | null;
}

export function ResourcesPageClient({
  resources,
  pageHeadline,
  pageHighlightedWord,
  pageDescription,
  newsletterHeadline,
  newsletterHighlightedWord,
  newsletterSubCopy,
  newsletterCtaLabel,
  newsletterSuccessHeadline,
  newsletterSuccessSubCopy,
  newsletterEmailPlaceholder,
  inlineCtaHeadline,
  inlineCtaHighlightedWord,
  inlineCtaLabel,
  inlineCtaDestination,
  sectionCtaHeadline,
  sectionCtaHighlightedWord,
  sectionCtaLabel,
  sectionCtaDestination,
  emptyStatePrimary,
  emptyStateFiltered,
}: ResourcesPageClientProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = useMemo(
    () => [...new Set(resources.map((r) => r.category))],
    [resources],
  );

  const filterOptions = categories.map((c) => ({ label: c, value: c }));

  const visibleCategories = useMemo(() => {
    const cats = activeFilters.length > 0 ? activeFilters : categories;
    return cats.map((cat) => ({
      name: cat,
      items: resources.filter((r) => r.category === cat),
    }));
  }, [activeFilters, categories, resources]);

  return (
    <>
      {/* 01 — Hero */}
      {pageHeadline && (
        <section className="pt-16 pb-16 md:pt-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              headline={pageHeadline}
              highlightedWord={pageHighlightedWord}
              description={pageDescription}
            />
          </div>
        </section>
      )}

      {/* 02 — Filter Bar */}
      {filterOptions.length > 0 && (
        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <ContentFilterBar
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </div>
        </section>
      )}

      {/* 03 — Category Sections */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-6 space-y-16">
          {visibleCategories.map(({ name, items }) => {
            if (items.length === 0) return null;
            return (
              <div key={name}>
                <ScrollFadeUp>
                  <h2 className="heading-font mb-8 text-2xl font-bold text-text-primary md:text-3xl">
                    {name}
                  </h2>
                </ScrollFadeUp>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((resource, i) => (
                    <ScrollFadeUp key={resource.slug} delay={i * 0.07}>
                      <ResourceCard
                        headline={resource.title}
                        subCopy={resource.description}
                        image={resource.coverImage}
                        tag={resource.category}
                        resourceType={resource.resourceType}
                        accessType={resource.accessType}
                        price={resource.priceUSD}
                        href={`/resources/${resource.slug}`}
                      />
                    </ScrollFadeUp>
                  ))}
                </div>
              </div>
            );
          })}

          {resources.length === 0 && emptyStatePrimary && (
            <p className="text-center text-text-tertiary">{emptyStatePrimary}</p>
          )}

          {resources.length > 0 &&
            visibleCategories.every((c) => c.items.length === 0) &&
            emptyStateFiltered && (
              <p className="text-center text-text-tertiary">{emptyStateFiltered}</p>
            )}
        </div>
      </section>

      {/* CTA inline */}
      {inlineCtaHeadline && inlineCtaLabel && (
        <CTABanner
          data={{ headline: inlineCtaHeadline, highlightedWord: inlineCtaHighlightedWord ?? undefined, ctaLabel: inlineCtaLabel, ctaDestination: inlineCtaDestination ?? "/start" }}
          presentationMode="inline"
          colorScheme="light-teal"
        />
      )}

      {/* 04 — Newsletter */}
      {newsletterHeadline && (
        <NewsletterCapture
          headline={newsletterHeadline}
          highlightedWord={newsletterHighlightedWord}
          subCopy={newsletterSubCopy}
          ctaLabel={newsletterCtaLabel}
          successHeadline={newsletterSuccessHeadline}
          successSubCopy={newsletterSuccessSubCopy}
          emailPlaceholder={newsletterEmailPlaceholder}
        />
      )}

      {/* CTA section */}
      {sectionCtaHeadline && sectionCtaLabel && (
        <CTABanner
          data={{ headline: sectionCtaHeadline, highlightedWord: sectionCtaHighlightedWord ?? undefined, ctaLabel: sectionCtaLabel, ctaDestination: sectionCtaDestination ?? "/start" }}
          presentationMode="section"
          colorScheme="teal-solid"
        />
      )}
    </>
  );
}
