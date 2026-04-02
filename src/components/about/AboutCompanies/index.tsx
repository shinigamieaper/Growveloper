import Image from "next/image";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutPastCompaniesData } from "@/lib/types";

interface AboutCompaniesProps {
  data: AboutPastCompaniesData | null;
}

export function AboutCompanies({ data }: AboutCompaniesProps) {
  if (!data) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <SectionHeader
        headline={data.headline}
        highlightedWord={data.highlightedWord}
        alignment="left"
        label={null}
        description={null}
      />

      <StaggerChildren>
        <div className="mt-10 space-y-4">
          {data.companies.map((co) => (
            <GrowveloperCard
              key={co.company}
              variant="diagnosis"
              colorScheme="glass-dark"
              tag={co.role}
              headline={co.company}
              subCopy={co.insight}
              icon={
                co.logo ? (
                  <Image
                    src={co.logo}
                    alt={co.company}
                    width={64}
                    height={24}
                    className="h-6 w-auto object-contain opacity-70"
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}
