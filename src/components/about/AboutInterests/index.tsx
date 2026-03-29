import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutInterestsData } from "@/lib/types";

interface AboutInterestsProps {
  data: AboutInterestsData | null;
}

export function AboutInterests({ data }: AboutInterestsProps) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="left"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.items.map((item) => (
              <GrowveloperCard
                key={item.interest}
                variant="diagnosis"
                colorScheme="glass-dark"
                headline={item.interest}
                subCopy={item.connection}
              />
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
