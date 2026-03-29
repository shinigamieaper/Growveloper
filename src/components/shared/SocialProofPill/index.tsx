import { cn } from "@/lib/utils";
import type { SocialProofPillData } from "@/lib/types";

interface SocialProofPillProps extends React.ComponentPropsWithoutRef<"div"> {
  data: SocialProofPillData | null;
}

export function SocialProofPill({ data, className, ...props }: SocialProofPillProps) {
  if (!data) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-5 py-2.5 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-mid" aria-hidden="true" />
      <span className="text-sm font-medium tracking-wide text-text-secondary">
        {data.text}
      </span>
    </div>
  );
}
