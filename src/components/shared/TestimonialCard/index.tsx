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
        "flex flex-col gap-5 rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-mid/20 hover:shadow-lg md:p-8",
        className,
      )}
      {...props}
    >
      {data.rating > 0 && (
        <div className="flex gap-0.5" aria-label={`${data.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn("h-4 w-4", i < data.rating ? "text-brand-mid" : "text-text-tertiary/30")}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <blockquote className="flex-1 text-base leading-relaxed text-text-primary">
        &ldquo;{data.quote}&rdquo;
      </blockquote>

      <div className="mt-auto flex items-center gap-3 border-t border-glass-border pt-4">
        {data.avatar && (
          <Image
            src={data.avatar}
            alt={data.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">{data.name}</p>
          <p className="truncate text-xs text-text-secondary">
            {data.role}{data.company ? `, ${data.company}` : ""}
          </p>
        </div>
        {data.companyLogo && (
          <Image
            src={data.companyLogo}
            alt={data.company}
            width={72}
            height={24}
            className="ml-auto h-6 w-auto shrink-0 opacity-50"
          />
        )}
      </div>
    </article>
  );
}
