import { cn } from "@/lib/utils";
import type { ArchitectureLayersData } from "@/lib/types";

interface ArchitectureLayersProps extends React.ComponentPropsWithoutRef<"div"> {
  data: ArchitectureLayersData | null;
  /** Heading level for the diagram headline (default h3). */
  headingAs?: "h2" | "h3";
}

/* Four-step aqua ramp: the top layer is quietest, the deepest (the database) strongest. */
const BAND_TONES = [
  "border-brand-mid/15 bg-brand-mid/[0.04]",
  "border-brand-mid/25 bg-brand-mid/[0.08]",
  "border-brand-mid/35 bg-brand-mid/[0.13]",
  "border-brand-mid/60 bg-brand-dark/40",
];

/**
 * A layered architecture diagram drawn as stacked bands, with an optional
 * two-column list beside it (e.g. scheduled jobs). Server component, no
 * motion: it has to read as a diagram, not a show.
 */
export function ArchitectureLayers({ data, headingAs = "h3", className, ...props }: ArchitectureLayersProps) {
  if (!data) return null;

  const Heading = headingAs;
  const tone = (i: number) =>
    BAND_TONES[Math.min(BAND_TONES.length - 1, Math.round((i / Math.max(1, data.layers.length - 1)) * (BAND_TONES.length - 1)))];

  return (
    <div className={cn("grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16", className)} {...props}>
      <div>
        <Heading className="heading-font text-2xl font-bold text-text-primary md:text-3xl">{data.headline}</Heading>
        {data.intro && (
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-secondary">{data.intro}</p>
        )}

        <figure className="mt-8" aria-label={data.headline}>
          {data.caption && (
            <figcaption className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {data.caption}
            </figcaption>
          )}
          <ol className="flex flex-col gap-2">
            {data.layers.map((layer, i) => (
              <li
                key={layer.name}
                className={cn(
                  "grid grid-cols-[2rem_1fr] items-baseline gap-x-3 gap-y-1 rounded-xl border px-4 py-4 sm:grid-cols-[2rem_11rem_1fr] sm:px-5",
                  tone(i),
                )}
              >
                <span className="font-mono text-xs text-brand-mid">{String(i + 1).padStart(2, "0")}</span>
                <span className="heading-font text-sm font-semibold text-text-primary sm:text-base">{layer.name}</span>
                <span className="col-start-2 text-sm leading-relaxed text-text-secondary sm:col-start-3">
                  {layer.detail}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      </div>

      {data.annex && (
        <div className="lg:pt-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mid">{data.annex.headline}</p>
          <dl className="mt-5 divide-y divide-glass-border border-y border-glass-border">
            {data.annex.items.map((item, i) => (
              <div key={`${item.name}-${i}`} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                <dt className="font-mono text-xs uppercase tracking-wider text-text-tertiary">{item.name}</dt>
                <dd className="text-sm leading-relaxed text-text-secondary">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
