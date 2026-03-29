import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutHowIWorkData } from "@/lib/types";

interface AboutPrinciplesProps {
  data: AboutHowIWorkData | null;
}

export function AboutPrinciples({ data }: AboutPrinciplesProps) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="center"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.principles.map((p, i) => (
              <GrowveloperCard
                key={p.title}
                variant="diagnosis"
                colorScheme="glass-dark"
                tag={`0${i + 1}`}
                headline={p.title}
                subCopy={p.description}
              />
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
