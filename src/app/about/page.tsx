import type { Metadata } from "next";
import { AboutCinemaHero } from "@/components/about/AboutCinemaHero";
import { AboutTrackSwitch } from "@/components/about/AboutTrackSwitch";
import { AboutViewPanel } from "@/components/about/AboutViewPanel";
import { AboutContactBand } from "@/components/about/AboutContactBand";
import { AboutForceDark } from "@/components/about/AboutForceDark";
import styles from "@/components/about/about.module.css";
import { getAboutPage, getAllCaseStudies, getSiteSettings } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { buildBreadcrumbSchema, PERSON_ID, WEBSITE_ID } from "@/lib/jsonld";
import {
  ABOUT_BOOKING,
  ABOUT_CV,
  ABOUT_HEADLINE,
  ABOUT_HERO,
  ABOUT_QUIET_LINKS,
  ABOUT_TRACK_TABS,
  ABOUT_TRACK_PARAM_ALIASES,
  ABOUT_VIEWS,
} from "@/lib/data/aboutTracks";
import type { AboutViewKey } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  return buildPageMetadata({
    title: page?.seoTitle ?? "About Juwon",
    description:
      page?.seoDescription ??
      "Oyekola Obajuwon (Juwon): full-stack developer and paid media strategist in Lagos. Next.js and TypeScript builds, Meta and Google Ads, and the tracking in between.",
    path: "/about",
    image: page?.ogImage ?? settings?.ogImage,
  });
}

const VIEW_ORDER: AboutViewKey[] = ["all", "dev", "marketing", "growth"];

/* The four views, all rendered into the static HTML (crawlers and AI readers
   see every side). /about is fully static: `?track=` is applied in the
   browser, first by the inline script below (before the switch paints, so a
   deep link never flashes the combined view), then by the switch itself. */
function TracksSection({ caseStudyImages }: { caseStudyImages: Record<string, string> }) {
  const panels = Object.fromEntries(
    VIEW_ORDER.map((key) => [key, <AboutViewPanel key={key} data={ABOUT_VIEWS[key]} caseStudyImages={caseStudyImages} />]),
  ) as Record<AboutViewKey, React.ReactNode>;

  return (
    <AboutTrackSwitch
      tabs={ABOUT_TRACK_TABS}
      panels={panels}
      initialView="all"
      prompt="Pick the side that interests you"
      resetLabel="Show everything"
    />
  );
}

/* Runs as the HTML parses: marks <html> with the side from ?track= so CSS can
   show it before hydration. <html> carries suppressHydrationWarning. */
const TRACK_BOOT_SCRIPT = `(function(){try{var a=${JSON.stringify(ABOUT_TRACK_PARAM_ALIASES)};var t=new URLSearchParams(location.search).get('track');var k=t&&a[t.toLowerCase()];if(k)document.documentElement.setAttribute('data-about-view',k);}catch(e){}})();`;

export default async function AboutPage() {
  const [page, caseStudies] = await Promise.all([getAboutPage(), getAllCaseStudies()]);

  const caseStudyImages: Record<string, string> = Object.fromEntries(
    caseStudies.filter((cs) => cs.heroImage).map((cs) => [cs.slug, cs.heroImage as string]),
  );

  return (
    <div data-theme="dark" className={styles.page}>
      <AboutForceDark />

      {/* The founder Person entity lives in the root graph; this page is its profile. */}
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": absoluteUrl("/about"),
            url: absoluteUrl("/about"),
            name: page?.seoTitle ?? "About Juwon",
            mainEntity: { "@id": PERSON_ID },
            isPartOf: { "@id": WEBSITE_ID },
          },
          buildBreadcrumbSchema([{ name: "About", path: "/about" }]),
        ]}
      />

      {/* 01 Hero: the combined story, visible with no script */}
      <AboutCinemaHero
        kicker={ABOUT_HERO.kicker}
        firstName={ABOUT_HERO.firstName}
        accentName={ABOUT_HERO.accentName}
        headline={ABOUT_HEADLINE}
        summary={ABOUT_HERO.summary}
        backdropWord={ABOUT_HERO.backdropWord}
        portraitAlt={ABOUT_HERO.portraitAlt}
        portraitBase="/images/about/juwon-smiling"
        portraitWidths={[480, 720, 1080, 1440]}
        portraitSize={{ width: 2880, height: 3024 }}
        workHref="#work"
        cv={ABOUT_CV}
        links={ABOUT_QUIET_LINKS}
      />

      <script dangerouslySetInnerHTML={{ __html: TRACK_BOOT_SCRIPT }} />

      {/* 02 The switch and the chosen side */}
      <section id="work" aria-label="Work" className="scroll-mt-20 border-t border-[var(--av-line)] pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
          <TracksSection caseStudyImages={caseStudyImages} />
        </div>
      </section>

      {/* 03 The close */}
      <AboutContactBand
        headline={{ lead: "Let's talk about", accent: "the work." }}
        body="Thirty minutes on a call, or an email if that's easier. Either way, you're talking to the person who would do it."
        booking={ABOUT_BOOKING}
        cv={ABOUT_CV}
        links={ABOUT_QUIET_LINKS}
      />
    </div>
  );
}
