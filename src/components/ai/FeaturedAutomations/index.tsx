import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { AutomationCard } from "@/components/shared/AutomationCard";
import type { FeaturedAutomationsSection } from "@/lib/types";

interface FeaturedAutomationsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: FeaturedAutomationsSection | null;
}

export function FeaturedAutomations({
  data,
  className,
  ...props
}: FeaturedAutomationsProps) {
  if (!data || data.items.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <ScrollFadeUp>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data.items.map((item) => (
              <AutomationCard key={item.slug} data={item} />
            ))}
          </div>
        </ScrollFadeUp>

        <div className="mt-10 flex justify-center">
          <Link
            href={data.viewAllUrl}
            className="inline-flex items-center gap-2 rounded-full border border-brand-mid/30 px-6 py-3 font-mono text-sm font-medium text-brand-mid transition-colors hover:border-brand-mid hover:bg-brand-mid/5"
          >
            {data.viewAllLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
