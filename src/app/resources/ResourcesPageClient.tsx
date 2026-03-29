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
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCES_HEADLINE,
  RESOURCES_HIGHLIGHTED_WORD,
  RESOURCES_DESCRIPTION,
  RESOURCES_NEWSLETTER,
  RESOURCES_CTA_INLINE,
  RESOURCES_CTA_SECTION,
} from "@/lib/data/resources";

const FILTER_OPTIONS = RESOURCE_CATEGORIES.map((c) => ({ label: c, value: c }));

export function ResourcesPageClient() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const visibleCategories = useMemo(() => {
    const cats = activeFilters.length > 0 ? activeFilters : RESOURCE_CATEGORIES;
    return cats.map((cat) => ({
      name: cat,
      items: RESOURCES.filter((r) => r.category === cat),
    }));
  }, [activeFilters]);

  return (
    <>
      {/* 01 — Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            headline={RESOURCES_HEADLINE}
            highlightedWord={RESOURCES_HIGHLIGHTED_WORD}
            description={RESOURCES_DESCRIPTION}
          />
        </div>
      </section>

      {/* 02 — Filter Bar */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <ContentFilterBar
            filters={FILTER_OPTIONS}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </div>
      </section>

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
                        price={resource.price}
                        href={`/resources/${resource.slug}`}
                      />
                    </ScrollFadeUp>
                  ))}
                </div>
              </div>
            );
          })}

          {visibleCategories.every((c) => c.items.length === 0) && (
            <p className="text-center text-text-tertiary">
              No resources found for the selected filters.
            </p>
          )}
        </div>
      </section>

      {/* CTA inline */}
      <CTABanner
        data={RESOURCES_CTA_INLINE}
        presentationMode="inline"
        colorScheme="light-teal"
      />

      {/* 04 — Newsletter */}
      <NewsletterCapture
        headline={RESOURCES_NEWSLETTER.headline}
        highlightedWord={RESOURCES_NEWSLETTER.highlightedWord}
        subCopy={RESOURCES_NEWSLETTER.subCopy}
        ctaLabel={RESOURCES_NEWSLETTER.ctaLabel}
      />

      {/* CTA section */}
      <CTABanner
        data={RESOURCES_CTA_SECTION}
        presentationMode="section"
        colorScheme="teal-solid"
      />
    </>
  );
}
