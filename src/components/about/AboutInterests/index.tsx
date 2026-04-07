import { ICON_MAP } from "@/lib/icons";
import { TextReveal } from "@/components/animations/TextReveal";
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
        <TextReveal
          as="h2"
          className="heading-font mb-10 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
          splitType="words"
          highlightedWord={data.highlightedWord}
        >
          {data.headline}
        </TextReveal>

        <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.items.map((item) => {
            const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
            return (
              <div
                key={item.interest}
                className="flex items-start gap-4 rounded-xl border border-brand-dark/15 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-mid/15">
                  {IconComponent ? (
                    <IconComponent
                      className="h-5 w-5 text-brand-mid"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  ) : (
                    <span className="font-mono text-xs font-bold text-brand-mid" aria-hidden="true">
                      {item.interest.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{item.interest}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                    {item.connection}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
