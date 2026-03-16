import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CTABannerData } from "@/lib/types";

interface CTABannerProps extends React.ComponentPropsWithoutRef<"section"> {
  data: CTABannerData | null;
  variant?: "primary" | "secondary";
}

export function CTABanner({ data, variant = "primary", className, ...props }: CTABannerProps) {
  if (!data) return null;

  return (
    <section
      className={cn(
        "py-20 md:py-28",
        variant === "primary"
          ? "bg-brand-dark text-base-white"
          : "bg-bg-tertiary text-text-primary",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">{data.headline}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-80">{data.subCopy}</p>
        <Link
          href={data.ctaDestination}
          className={cn(
            "inline-flex min-h-[44px] items-center rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105",
            variant === "primary"
              ? "bg-base-white text-brand-dark hover:bg-brand-light"
              : "bg-brand-dark text-base-white hover:bg-brand-mid",
          )}
        >
          {data.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
