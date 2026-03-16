import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TestimonialData } from "@/lib/types";

interface TestimonialCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: TestimonialData | null;
}

export function TestimonialCard({ data, className, ...props }: TestimonialCardProps) {
  if (!data) return null;

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {data.rating > 0 && (
        <div className="flex gap-1">
          {Array.from({ length: data.rating }).map((_, i) => (
            <span key={i} className="text-brand-mid" aria-hidden="true">&#9733;</span>
          ))}
        </div>
      )}
      <blockquote className="text-base leading-relaxed text-text-primary">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      <div className="mt-auto flex items-center gap-3">
        {data.avatar && (
          <Image
            src={data.avatar}
            alt={data.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-text-primary">{data.name}</p>
          <p className="text-xs text-text-secondary">{data.role}, {data.company}</p>
        </div>
        {data.companyLogo && (
          <Image
            src={data.companyLogo}
            alt={data.company}
            width={60}
            height={20}
            className="ml-auto h-5 w-auto opacity-60"
          />
        )}
      </div>
    </article>
  );
}
