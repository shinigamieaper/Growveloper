import Image from "next/image";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutPastCompaniesData } from "@/lib/types";

interface AboutCompaniesProps {
  data: AboutPastCompaniesData | null;
}

export function AboutCompanies({ data }: AboutCompaniesProps) {
  if (!data) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <TextReveal
        as="h2"
        className="heading-font mb-10 md:mb-14 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
        splitType="words"
        highlightedWord={data.highlightedWord}
      >
        {data.headline}
      </TextReveal>

      <StaggerChildren>
        <div className="flex flex-col">
          {data.companies.map((co) => (
            <div
              key={co.company}
              className="flex flex-col gap-3 border-b border-glass-border py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6"
            >
              {/* Logo */}
              <div className="w-14 shrink-0">
                {co.logo ? (
                  <Image
                    src={co.logo}
                    alt={co.company}
                    width={56}
                    height={20}
                    className="h-5 w-auto object-contain logo-tint opacity-60"
                  />
                ) : (
                  <div className="h-5 w-12 rounded bg-brand-mid/20" />
                )}
              </div>

              {/* Name + Role */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary">{co.company}</p>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  {co.role}
                </p>
              </div>

              {/* Insight */}
              <p className="text-sm leading-relaxed text-text-secondary sm:max-w-xs sm:text-right">
                {co.insight}
              </p>
            </div>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}
