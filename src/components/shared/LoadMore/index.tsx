"use client";

import { cn } from "@/lib/utils";

interface LoadMoreProps extends React.ComponentPropsWithoutRef<"button"> {
  label: string;
  onLoadMore: () => void;
  loading?: boolean;
}

export function LoadMore({ label, onLoadMore, loading = false, className, ...props }: LoadMoreProps) {
  return (
    <button
      onClick={onLoadMore}
      disabled={loading}
      className={cn(
        "min-h-[44px] rounded-full border border-glass-border px-8 py-3 text-sm font-semibold text-text-primary transition-all hover:border-brand-mid hover:bg-bg-tertiary disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
