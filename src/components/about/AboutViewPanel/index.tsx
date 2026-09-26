import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AboutLink, AboutProject, AboutViewData } from "@/lib/types";
import styles from "../about.module.css";

export interface AboutViewPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  data: AboutViewData;
  /** Case-study hero screenshots from Sanity, keyed by slug. */
  caseStudyImages: Record<string, string>;
}

const LOCAL_WIDTHS = [560, 840, 1140];

function linkProps(link: AboutLink) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function ProjectVisual({ project, caseStudyImages }: { project: AboutProject; caseStudyImages: Record<string, string> }) {
  const v = project.visual;

  if (v.kind === "type") {
    return (
      <div className={styles.frame}>
        <div className={styles.typePanel}>
          <p className={cn(styles.kicker, "mb-4 !text-[0.65rem]")}>{v.caption}</p>
          {v.lines.map((line, i) => (
            <span key={`${line}-${i}`} className={styles.typeLine}>
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (v.kind === "image") {
    const set = (ext: string) => LOCAL_WIDTHS.map((w) => `${v.src}-${w}.${ext} ${w}w`).join(", ");
    const sizes = "(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw";
    return (
      <div className={cn(styles.frame, styles.frameScreen)}>
        <picture>
          <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
          <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
          <img
            src={`${v.src}-840.webp`}
            alt={v.alt}
            width={v.width}
            height={v.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full"
          />
        </picture>
      </div>
    );
  }

  const src = caseStudyImages[v.slug];
  if (!src) {
    return <div className={styles.frame} aria-hidden="true" />;
  }

  if (v.frame === "phone") {
    return (
      <div className={styles.frame}>
        <div className={styles.phone}>
          <Image src={src} alt={v.alt} fill sizes="180px" className="object-cover object-top" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.frame, styles.frameScreen, v.contain && styles.frameContain)}>
      <Image
        src={src}
        alt={v.alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
        style={v.focus ? { objectPosition: v.focus } : undefined}
      />
    </div>
  );
}

/**
 * One view of /about (the combined story or one side): a statement, the
 * numbers, two or three projects with real links, and the tools. Server
 * component, no motion of its own.
 */
export function AboutViewPanel({
  data,
  caseStudyImages,
  className,
  ...props
}: AboutViewPanelProps) {
  const statCols = data.stats.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className={cn("pt-6 md:pt-10", className)} {...props}>
      {/* Statement */}
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <h2 className="text-[clamp(1.75rem,1.1rem+2.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--av-text)] lg:col-span-6">
          {data.statement.lead}{" "}
          <span className={cn(styles.serif, "font-normal italic tracking-[-0.015em] text-[var(--av-amber)]")}>
            {data.statement.accent}
          </span>
          {data.statement.tail ? ` ${data.statement.tail}` : null}
        </h2>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
          <p className={cn(styles.serif, "text-[1.05rem] leading-[1.7] text-[var(--av-text-2)] md:text-lg")}>{data.body}</p>
          <p className="mt-6 border-l border-[var(--av-amber-deep)] pl-4 text-[0.98rem] leading-[1.6] text-[var(--av-text)]">
            {data.howIWork}
          </p>
        </div>
      </div>

      {/* Numbers */}
      <dl className={cn("mt-14 grid grid-cols-2 gap-x-5 border-t border-[var(--av-line)] md:mt-20 lg:gap-x-0", statCols)}>
        {data.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col gap-3 py-7 lg:px-6 lg:py-9 lg:first:pl-0",
              i > 0 && (data.stats.length === 3 ? "sm:border-l sm:border-[var(--av-line)] sm:pl-5 lg:pl-6" : "lg:border-l lg:border-[var(--av-line)]"),
              data.stats.length === 3 && i === 2 && "col-span-2 border-t border-[var(--av-line)] sm:col-span-1 sm:border-t-0",
              data.stats.length === 4 && i >= 2 && "border-t border-[var(--av-line)] lg:border-t-0",
            )}
          >
            <dt className="order-2 text-[0.95rem] leading-snug text-[var(--av-text-2)]">
              {stat.label}
              <span className={cn(styles.mono, "mt-1.5 block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--av-text-3)]")}>
                {stat.source}
              </span>
            </dt>
            <dd className={cn(styles.statValue, "order-1")}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      {/* Projects */}
      <div className="mt-16 md:mt-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className={styles.kicker}>{data.projectsHeading}</p>
          {data.projectsLink && (
            <a href={data.projectsLink.href} className={cn(styles.textLink, "text-sm")} {...linkProps(data.projectsLink)}>
              {data.projectsLink.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {data.projects.map((project) => (
            <li key={project.id} className={styles.card}>
              <ProjectVisual project={project} caseStudyImages={caseStudyImages} />
              <p className={cn(styles.mono, "mt-5 text-[0.7rem] uppercase leading-[1.7] tracking-[0.14em] text-[var(--av-text-3)]")}>
                <span className="block text-[var(--av-text-2)]">{project.client}</span>
                <span className="block">{project.period ?? "Ongoing"}</span>
              </p>
              <h3 className="mt-2 text-[1.22rem] font-medium leading-snug tracking-[-0.015em] text-[var(--av-text)]">
                {project.title}
              </h3>
              <p className={cn(styles.serif, "mt-2.5 text-[0.98rem] leading-[1.65] text-[var(--av-text-2)]")}>{project.summary}</p>
              <div className="mt-auto flex flex-wrap gap-x-6 pt-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(styles.textLink, "text-[0.92rem]")}
                    aria-label={`${link.label}: ${project.client}`}
                    {...linkProps(link)}
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* More builds (plain rows, no cards) */}
      {data.more && data.more.length > 0 && (
        <div className="mt-16">
          <p className={styles.kicker}>Also built</p>
          <ul className="mt-4 border-t border-[var(--av-line)]">
            {data.more.map((item) => {
              const inner = (
                <>
                  <span className="text-[1.02rem] font-medium text-[var(--av-text)] md:w-[17rem] md:shrink-0">{item.name}</span>
                  <span className={cn(styles.serif, "flex-1 text-[0.98rem] leading-[1.6] text-[var(--av-text-2)]")}>{item.detail}</span>
                  {item.href && (
                    <ArrowUpRight
                      className="hidden h-4 w-4 shrink-0 text-[var(--av-aqua)] md:block"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  )}
                </>
              );
              const rowClass =
                "flex flex-col gap-1 border-b border-[var(--av-line)] py-4 md:flex-row md:items-baseline md:gap-8";
              return (
                <li key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={cn(rowClass, "group transition-colors hover:bg-[rgba(233,214,186,0.03)]")}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={rowClass}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Tools: plain lines a reviewer can scan for keywords */}
      <div className="mt-16 md:mt-20">
        <p className={styles.kicker}>Tools</p>
        <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-[var(--av-line)] pt-7 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
          {data.tools.map((group) => (
            <div key={group.group}>
              <dt className="text-[0.95rem] font-medium text-[var(--av-text)]">{group.group}</dt>
              <dd className={cn(styles.serif, "mt-2 text-[0.98rem] leading-[1.65] text-[var(--av-text-2)]")}>
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
