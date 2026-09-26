import { preload } from "react-dom";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AboutLink } from "@/lib/types";
import styles from "../about.module.css";

export interface AboutCinemaHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  kicker: string;
  firstName: string;
  accentName: string;
  headline: string;
  summary: string;
  backdropWord: string;
  portraitAlt: string;
  /** Path prefix of the cut-out; files are `${portraitBase}-${width}.avif|webp`. */
  portraitBase: string;
  portraitWidths: number[];
  workHref: string;
  cv: AboutLink;
  links: AboutLink[];
}

const PORTRAIT_SIZES = "(min-width: 1280px) 560px, (min-width: 768px) 42vw, 100vw";

function srcSet(base: string, widths: number[], ext: "avif" | "webp") {
  return widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
}

/**
 * The /about first screen: name and identity at left, his cut-out standing
 * in one warm disc of light at right. Server-rendered and visible with no
 * script; the portrait is preloaded as the page's largest paint.
 */
export function AboutCinemaHero({
  kicker,
  firstName,
  accentName,
  headline,
  summary,
  backdropWord,
  portraitAlt,
  portraitBase,
  portraitWidths,
  workHref,
  cv,
  links,
  className,
  ...props
}: AboutCinemaHeroProps) {
  preload(`${portraitBase}-${portraitWidths[1]}.avif`, {
    as: "image",
    type: "image/avif",
    imageSrcSet: srcSet(portraitBase, portraitWidths, "avif"),
    imageSizes: PORTRAIT_SIZES,
    fetchPriority: "high",
  });

  const largest = portraitWidths[portraitWidths.length - 1];

  return (
    <section className={cn(styles.hero, className)} aria-labelledby="about-name" {...props}>
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-y-6 px-4 pb-14 sm:px-6 md:min-h-[min(100svh,960px)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-x-8 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-x-12 xl:gap-x-20">
        {/* Portrait first in the DOM order on phones so the text is never on top of it. */}
        <div className="mx-auto w-full max-w-[520px] md:order-2 md:max-w-[600px]">
          <div className={styles.stage}>
            <div className={styles.disc} aria-hidden="true" />
            <div className={styles.ring} aria-hidden="true" />
            <div className={styles.word} aria-hidden="true">
              {backdropWord}
            </div>
            <picture className={styles.figure}>
              <source type="image/avif" srcSet={srcSet(portraitBase, portraitWidths, "avif")} sizes={PORTRAIT_SIZES} />
              <source type="image/webp" srcSet={srcSet(portraitBase, portraitWidths, "webp")} sizes={PORTRAIT_SIZES} />
              <img
                src={`${portraitBase}-${portraitWidths[1]}.webp`}
                width={largest}
                height={Math.round((largest * 2000) / 1441)}
                alt={portraitAlt}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div className="flex flex-col md:order-1 md:pt-6">
          <p className={styles.kicker}>{kicker}</p>

          <h1
            id="about-name"
            className="mt-4 text-[clamp(2.5rem,1.2rem+4.6vw,5.4rem)] md:mt-5 font-medium leading-[0.95] tracking-[-0.035em] text-[var(--av-text)]"
          >
            {firstName}{" "}
            <span className={cn(styles.serif, "font-normal italic tracking-[-0.02em] text-[var(--av-amber)]")}>
              {accentName}
            </span>
          </h1>

          <p className="mt-4 max-w-[26ch] text-[clamp(1.25rem,1rem+1.2vw,1.9rem)] md:mt-6 font-medium leading-[1.2] tracking-[-0.02em] text-[var(--av-text)]">
            {headline}
          </p>

          {/* On phones the summary moves below the links, so the actions and GitHub stay in the first screen. */}
          <p className={cn(styles.serif, "order-last mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-[var(--av-text-2)] md:order-none md:mt-5 md:text-lg")}>
            {summary}
          </p>

          <div className="mt-7 flex md:mt-9 flex-wrap items-center gap-x-7 gap-y-3">
            <a href={workHref} className={styles.primaryButton}>
              See the work
              <span className={styles.primaryButtonIcon} aria-hidden="true">
                <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </a>
            <a href={cv.href} download={cv.download || undefined} className={styles.textLink}>
              {cv.label}
              <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-0 border-t border-[var(--av-line)] pt-2 text-[0.95rem] md:mt-6 md:pt-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.quietLink}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                  {link.external && <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-60" strokeWidth={1.75} aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
