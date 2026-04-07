import { ICON_MAP } from "@/lib/icons";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { AboutHowIWorkData } from "@/lib/types";

interface AboutPrinciplesProps {
  data: AboutHowIWorkData | null;
  id?: string;
}

export function AboutPrinciples({ data, id }: AboutPrinciplesProps) {
  if (!data) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <TextReveal
          as="h2"
          className="heading-font mb-12 max-w-2xl text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
          splitType="words"
          highlightedWord={data.highlightedWord}
        >
          {data.headline}
        </TextReveal>

        <div className="flex flex-col gap-10">
          {data.principles.map((p, i) => {
            const IconComponent = p.icon ? ICON_MAP[p.icon] : undefined;
            return (
              <ScrollFadeUp key={p.title} delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <span className="w-14 shrink-0 font-serif text-5xl font-extrabold leading-none text-brand-mid/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      {IconComponent && (
                        <IconComponent
                          className="h-5 w-5 text-brand-mid"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                      )}
                      <h3 className="text-lg font-bold text-text-primary">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                  </div>
                </div>
              </ScrollFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
