import { ICON_MAP } from "@/lib/icons";
import { fluidGrid } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutHowIWorkData } from "@/lib/types";

interface AboutPrinciplesProps {
  data: AboutHowIWorkData | null;
  id?: string;
}

export function AboutPrinciples({ data, id }: AboutPrinciplesProps) {
  if (!data) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="center"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className={`${fluidGrid(data.principles.length, 3)} mt-12 gap-6`}>
            {data.principles.map((p, i) => {
              const IconComponent = p.icon ? ICON_MAP[p.icon] : undefined;
              return (
                <GrowveloperCard
                  key={p.title}
                  variant="diagnosis"
                  colorScheme="glass-dark"
                  tag={`0${i + 1}`}
                  headline={p.title}
                  subCopy={p.description}
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
