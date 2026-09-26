import { ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AboutLink } from "@/lib/types";
import styles from "../about.module.css";

export interface AboutContactBandProps extends React.ComponentPropsWithoutRef<"section"> {
  headline: { lead: string; accent: string };
  body: string;
  booking: AboutLink;
  cv: AboutLink;
  links: AboutLink[];
  portraitAlt: string;
  /** Path prefix of the full-length cut-out; files are `${portraitBase}-${width}.avif|webp`. */
  portraitBase: string;
  portraitWidths: number[];
}

/**
 * The close of /about: one line, the booking link, and the same quiet
 * links as the hero. His full-length cut-out stands on a pool of warm
 * light at right (desktop only, so phones end on the call to action).
 */
export function AboutContactBand({
  headline,
  body,
  booking,
  cv,
  links,
  portraitAlt,
  portraitBase,
  portraitWidths,
  className,
  ...props
}: AboutContactBandProps) {
  const set = (ext: string) => portraitWidths.map((w) => `${portraitBase}-${w}.${ext} ${w}w`).join(", ");
  const largest = portraitWidths[portraitWidths.length - 1];

  return (
    <section className={cn(styles.contact, className)} aria-labelledby="about-contact" {...props}>
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-end gap-x-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_200px] xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="py-20 md:py-28">
          <p className={styles.kicker}>Hiring, or have a project</p>
          <h2
            id="about-contact"
            className="mt-5 max-w-[18ch] text-[clamp(2rem,1.2rem+3.4vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[var(--av-text)]"
          >
            {headline.lead}{" "}
            <span className={cn(styles.serif, "font-normal italic tracking-[-0.015em] text-[var(--av-amber)]")}>
              {headline.accent}
            </span>
          </h2>
          <p className={cn(styles.serif, "mt-6 max-w-[50ch] text-[1.05rem] leading-[1.7] text-[var(--av-text-2)] md:text-lg")}>
            {body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href={booking.href} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
              {booking.label}
              <span className={styles.primaryButtonIcon} aria-hidden="true">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </a>
            <a href={cv.href} download={cv.download || undefined} className={styles.textLink}>
              {cv.label}
              <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 border-t border-[var(--av-line)] pt-3 text-[0.95rem]">
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

        <div className="relative hidden self-end pt-10 lg:block">
          <div className={styles.floorLight} aria-hidden="true" />
          <picture className={styles.standing}>
            <source type="image/avif" srcSet={set("avif")} sizes="220px" />
            <source type="image/webp" srcSet={set("webp")} sizes="220px" />
            <img
              src={`${portraitBase}-${portraitWidths[1]}.webp`}
              alt={portraitAlt}
              width={largest}
              height={Math.round((largest * 1745) / 742)}
              loading="lazy"
              decoding="async"
              className="relative"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
