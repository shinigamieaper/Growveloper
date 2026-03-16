import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CaseStudyCardData } from "@/lib/types";

interface CaseStudyCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: CaseStudyCardData | null;
}

export function CaseStudyCard({ data, className, ...props }: CaseStudyCardProps) {
  if (!data) return null;

  return (
    <article
      className={cn("group overflow-hidden rounded-2xl border border-glass-border bg-glass-bg", className)}
      {...props}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="mb-2 text-sm text-text-tertiary">{data.situation}</p>
        <h3 className="mb-3 text-xl font-bold text-text-primary">{data.resultHeadline}</h3>
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-brand-dark/10 px-3 py-1 text-xs font-medium text-brand-dark">
            {data.clientIndustry}
          </span>
          <span className="rounded-full bg-brand-mid/10 px-3 py-1 text-xs font-medium text-brand-mid">
            Development + Marketing
          </span>
        </div>
        {data.techStack.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {data.techStack.map((tech) => (
              <span key={tech} className="rounded-md bg-bg-tertiary px-2 py-1 text-xs text-text-secondary">
                {tech}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/work/${data.slug}`}
          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-dark transition-colors hover:text-brand-mid"
        >
          Read the full story &rarr;
        </Link>
      </div>
    </article>
  );
}
