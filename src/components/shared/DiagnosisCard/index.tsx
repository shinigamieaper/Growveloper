import { cn } from "@/lib/utils";
import type { DiagnosisCardData, LucideIconComponent } from "@/lib/types";

interface DiagnosisCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: DiagnosisCardData | null;
  Icon?: LucideIconComponent;
}

export function DiagnosisCard({ data, Icon, className, ...props }: DiagnosisCardProps) {
  if (!data) return null;

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark/10 text-brand-mid transition-colors group-hover:bg-brand-dark/20">
        {Icon ? (
          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
        ) : (
          <span className="text-2xl" aria-hidden="true">{data.icon}</span>
        )}
      </div>
      <h3 className="heading-font text-lg font-bold text-text-primary">
        {data.headline}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {data.body}
      </p>
    </article>
  );
}
