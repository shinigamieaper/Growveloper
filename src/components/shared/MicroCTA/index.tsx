import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MicroCTAData } from "@/lib/types";

interface MicroCTAProps extends React.ComponentPropsWithoutRef<"div"> {
  data: MicroCTAData | null;
}

export function MicroCTA({ data, className, ...props }: MicroCTAProps) {
  if (!data) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-glass-border bg-glass-bg p-6 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:text-left",
        className,
      )}
      {...props}
    >
      <p className="text-base font-medium text-text-primary">{data.copy}</p>
      <Link
        href={data.ctaDestination}
        className="inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105"
      >
        {data.ctaLabel}
      </Link>
    </div>
  );
}
