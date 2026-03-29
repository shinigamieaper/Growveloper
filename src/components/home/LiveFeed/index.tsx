import { SectionHeader } from "@/components/shared/SectionHeader";
import { LiveFeedBento } from "@/components/shared/LiveFeedBento";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { cn } from "@/lib/utils";
import type { LabContentCard } from "@/lib/types";

interface LiveFeedProps extends React.ComponentPropsWithoutRef<"section"> {
  headline?: string;
  highlightedWord?: string;
  description?: string;
  items: LabContentCard[];
  sectionTitle?: string;
  seeAllLabel?: string;
  seeAllUrl?: string;
  onVideoClick?: (videoUrl: string, platform: "youtube" | "tiktok") => void;
}

export function LiveFeed({
  headline,
  highlightedWord,
  description,
  items,
  sectionTitle,
  seeAllLabel,
  seeAllUrl,
  onVideoClick,
  className,
  ...props
}: LiveFeedProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader headline={headline ?? null} highlightedWord={highlightedWord} description={description ?? null} />
        <ScrollFadeUp>
          <LiveFeedBento
            items={items}
            sectionTitle={sectionTitle}
            seeAllLabel={seeAllLabel}
            seeAllUrl={seeAllUrl}
            onVideoClick={onVideoClick}
          />
        </ScrollFadeUp>
      </div>
    </section>
  );
}
