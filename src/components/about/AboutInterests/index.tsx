import { ICON_MAP } from "@/lib/icons";
import { fluidGrid } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutInterestsData } from "@/lib/types";

interface AboutInterestsProps {
  data: AboutInterestsData | null;
  id?: string;
}

export function AboutInterests({ data, id }: AboutInterestsProps) {
  if (!data) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="left"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className={`${fluidGrid(data.items.length, 3)} mt-10 gap-4`}>
            {data.items.map((item) => {
              const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
              return (
                <GrowveloperCard
                  key={item.interest}
                  variant="diagnosis"
                  colorScheme="glass-dark"
                  headline={item.interest}
                  subCopy={item.connection}
                  icon={
                    IconComponent ? (
                      <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                    ) : undefined
                  }
                />
              );
            })}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
