"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ContentFilterBar } from "@/components/shared/ContentFilterBar";
import { AutomationCard } from "@/components/shared/AutomationCard";
import type { AutomationCardData, AutomationCategory } from "@/lib/types";

const PAGE_SIZE = 6;

interface AutomationsCatalogueProps extends React.ComponentPropsWithoutRef<"div"> {
  items: AutomationCardData[];
  categories: AutomationCategory[];
}

export function AutomationsCatalogue({
  items,
  categories,
  className,
  ...props
}: AutomationsCatalogueProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return items;
    return items.filter((item) => activeFilters.includes(item.category));
  }, [items, activeFilters]);

  const featured = useMemo(
    () => filtered.filter((item) => item.featured),
    [filtered],
  );

  const regular = useMemo(
    () => filtered.filter((item) => !item.featured),
    [filtered],
  );

  const visibleRegular = regular.slice(0, visibleCount);
  const hasMore = visibleCount < regular.length;

  function handleFilterChange(values: string[]) {
    setActiveFilters(values);
    setVisibleCount(PAGE_SIZE);
  }

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-10", className)} {...props}>
      {/* Filter bar */}
      <ContentFilterBar
        filters={categories}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Featured automations */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((item) => (
            <AutomationCard key={item.slug} data={item} />
          ))}
        </div>
      )}

      {/* Regular grid */}
      {visibleRegular.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRegular.map((item) => (
            <AutomationCard key={item.slug} data={item} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="py-16 text-center text-text-tertiary">
          No automations match the selected filters.
        </p>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-glass-border px-6 py-3 font-mono text-sm font-medium text-text-secondary transition-colors hover:border-brand-mid hover:text-text-primary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
