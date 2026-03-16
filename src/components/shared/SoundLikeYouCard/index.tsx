import Link from "next/link";
import { cn } from "@/lib/utils";

interface SoundLikeYouCardProps extends React.ComponentPropsWithoutRef<"div"> {
  headline: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
}

export function SoundLikeYouCard({ headline, ctaLabel, ctaUrl, className, ...props }: SoundLikeYouCardProps) {
  if (!headline || !ctaLabel || !ctaUrl) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl bg-brand-dark p-8 text-center",
        className,
      )}
      {...props}
    >
      <h3 className="text-xl font-bold text-base-white">{headline}</h3>
      <Link
        href={ctaUrl}
        className="inline-flex min-h-[44px] items-center rounded-full bg-base-white px-6 py-2.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-light hover:scale-105"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
