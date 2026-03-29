"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface ContentFilterBarProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Array of filter options to display */
  filters: FilterOption[];
  /** Currently active filter values */
  activeFilters: string[];
  /** Callback when filters change — returns the full updated array */
  onFilterChange: (values: string[]) => void;
}

export function ContentFilterBar({
  filters,
  activeFilters,
  onFilterChange,
  className,
  ...props
}: ContentFilterBarProps) {
  if (!filters || filters.length === 0) return null;

  const toggle = (value: string) => {
    if (activeFilters.includes(value)) {
      onFilterChange(activeFilters.filter((v) => v !== value));
    } else {
      onFilterChange([...activeFilters, value]);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        className={cn(
          "flex gap-2.5",
          "overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1",
          "md:flex-wrap md:overflow-x-visible md:snap-none md:pb-0",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
        role="group"
        aria-label="Content filters"
      >
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.value);
          return (
            <button
              key={filter.value}
              role="checkbox"
              aria-checked={isActive}
              onClick={() => toggle(filter.value)}
              className={cn(
                "snap-start inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 min-h-[44px]",
                isActive
                  ? "border-brand-mid bg-brand-dark text-brand-light shadow-md shadow-brand-dark/20"
                  : "border-brand-mid/25 bg-bg-secondary text-text-secondary hover:border-brand-mid/50 hover:bg-brand-dark/5 hover:text-text-primary",
              )}
            >
              {isActive && (
                <Check
                  className="h-3.5 w-3.5 text-brand-light"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              )}
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
