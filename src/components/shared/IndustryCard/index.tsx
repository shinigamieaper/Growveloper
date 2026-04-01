"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";
import type { IndustryCardData } from "@/lib/types";

interface IndustryCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: IndustryCardData | null;
}

export function IndustryCard({ data, className, ...props }: IndustryCardProps) {
  const pathname = usePathname();

  if (!data) return null;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      <h3 className="heading-font mb-2 text-lg font-bold text-text-primary">
        {data.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {data.hookLine}
      </p>
      <Link
        href={`/industries/${data.slug}`}
        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-mid transition-colors hover:text-brand-light"
        onClick={() => trackCTAClick(pathname, data.ctaLabel ?? "Learn More", `/industries/${data.slug}`)}
      >
        {data.ctaLabel ?? "Learn More"} &rarr;
      </Link>
      <div
        className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-brand-mid/5 transition-transform duration-500 group-hover:scale-150"
        aria-hidden="true"
      />
    </article>
  );
}
