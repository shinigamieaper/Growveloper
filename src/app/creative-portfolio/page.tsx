import type { Metadata } from "next";
import Image from "next/image";
import { ScrollFadeUp } from "@/components";
import { buildPageMetadata } from "@/lib/seo";

/* Creative portfolio: social media and design proof sent with job applications.
   Hidden on purpose while the site is still changing: no menu, footer or sitemap
   entry, and noindex so search engines skip it. Captions carry the company name only.
   To add a design, append to DESIGNS with its file in public/creative-portfolio/.
   To add a video, append to VIDEOS (Growveloper videos only when they do not carry
   Juwon's voice). */

export const metadata: Metadata = buildPageMetadata({
  title: "Creative portfolio",
  description: "Social media graphics and video by Oyekola Obajuwon.",
  path: "/creative-portfolio",
  noIndex: true,
});

interface DesignItem {
  src: string;
  company: string;
}

interface VideoItem {
  src: string;
  poster: string;
  company: string;
}

const DESIGNS: DesignItem[] = [
  { src: "/creative-portfolio/coded-graphics.png", company: "The Coded Sensation" },
  { src: "/creative-portfolio/unique-style-hub.png", company: "Unique Style Hub" },
  { src: "/creative-portfolio/sqwadsgraphics.png", company: "Sqwads" },
  // Growveloper graphics and Canva picks go here.
];

const VIDEOS: VideoItem[] = [
  {
    src: "/creative-portfolio/onlinefrenchedu.mp4",
    poster: "/creative-portfolio/onlinefrenchedu-poster.jpg",
    company: "OnlineFrenchEdu",
  },
  // Growveloper videos without Juwon's voice go here.
];

const LINKS = [
  { href: "https://www.linkedin.com/in/obajuwon-oyekola", label: "LinkedIn" },
  { href: "https://github.com/shinigamieaper", label: "GitHub" },
  { href: "/about?track=marketing", label: "About" },
];

const CAPTION = "mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary";

export default function CreativePortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollFadeUp>
            <h1 className="heading-font mb-4 text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Oyekola Obajuwon
            </h1>
            <p className="mb-6 text-lg text-text-secondary" style={{ fontFamily: "var(--font-gambetta)", fontStyle: "italic" }}>
              Social media graphics and video
            </p>
            <nav className="flex flex-wrap gap-6 text-sm font-medium">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-brand-mid underline-offset-4 hover:underline"
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="heading-font mb-8 text-2xl font-bold text-text-primary md:text-3xl">Designs</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGNS.map((d) => (
              <figure key={d.src}>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white/5">
                  <Image
                    src={d.src}
                    alt={`Social media graphic for ${d.company}`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className={CAPTION}>{d.company}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="heading-font mb-8 text-2xl font-bold text-text-primary md:text-3xl">Video</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v) => (
              <figure key={v.src} className="max-w-sm">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  className="w-full rounded-xl bg-black"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <figcaption className={CAPTION}>{v.company}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
