import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

/* /links — the "link in bio" page every social profile points to.
   The top repeats the YouTube and X banner (same words, same hand-drawn marks,
   same black-and-white photo) so a visitor arriving from a bio knows they are
   in the right place. Then one main action, the free call, and a picture card
   for each place worth going, each in its own shape so the page has rhythm.
   Fixed warm-paper palette on purpose: it is the banner's palette, not the
   site's light/dark theme. */

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Oyekola Obajuwon: links",
    description:
      "Websites, ads and AI for small businesses. Book a free 30-minute call, get the free Traffic Reality Check guide, watch on YouTube or see the work.",
    path: "/links",
  });
}

const BOOKING_URL = "https://cal.com/growveloper/30";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/obajuwon-oyekola" },
  { label: "YouTube", href: "https://www.youtube.com/@OyekolaObajuwon" },
  { label: "Instagram", href: "https://www.instagram.com/growveloper" },
  { label: "TikTok", href: "https://www.tiktok.com/@oyekolaobajuwon" },
  { label: "X", href: "https://x.com/ObajuwonOyekola" },
] as const;

const SERIF = { fontFamily: "var(--font-gambetta)" } as const;
const EYEBROW = "font-mono text-[11px] uppercase tracking-[0.2em]";
const RISE = "animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both motion-reduce:animate-none";
const PRESS = "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]";

/* The banner's three hand-drawn marks, drawn once here so they stay identical. */
function DoubleUnderline() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -bottom-[0.2em] left-[-4%] h-[0.26em] w-[108%] overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M1 6 C 30 3, 60 4, 99 5 M4 9 C 35 6.5, 70 7, 96 7.5" fill="none" stroke="#2b7575" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
function Ring() {
  return (
    <svg aria-hidden className="pointer-events-none absolute left-[-20%] top-[-18%] h-[136%] w-[142%] overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
      <path d="M18 50 C 2 40, 4 12, 40 6 C 75 0, 99 14, 96 32 C 93 50, 60 58, 32 55 C 10 52, 6 30, 22 18 C 40 6, 80 6, 92 20" fill="none" stroke="#5ab1b1" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
function Wave() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -bottom-[0.16em] left-[-6%] h-[0.2em] w-[120%] overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M1 6 C 10 2, 18 9, 27 5 S 45 2, 54 6 S 72 9, 81 5 S 95 3, 99 5" fill="none" stroke="#0f3d3d" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function LinksPage() {
  return (
    <section className="min-h-[100dvh] bg-[#F6F5F1] pb-16 text-[#161616]">
      <div className="mx-auto max-w-md px-5">
        {/* 01 — The banner, carried over */}
        <header className="relative h-[330px] overflow-hidden">
          <Image
            src="/images/links/juwon-bw.webp"
            alt="Oyekola Obajuwon"
            width={700}
            height={583}
            priority
            className={`absolute -right-10 bottom-0 w-[64%] max-w-[300px] [mask-image:linear-gradient(180deg,#000_70%,transparent)] ${RISE}`}
          />
          <div className="relative pt-10">
            <p className={`${EYEBROW} text-[#161616]/60 ${RISE}`}>Oyekola Obajuwon</p>
            <h1
              className={`heading-font mt-5 text-[3.1rem] font-semibold leading-[1.02] tracking-[-0.04em] ${RISE}`}
              style={{ animationDelay: "80ms" }}
            >
              <span className="relative inline-block">Websites.<DoubleUnderline /></span>
              <br />
              <span className="relative inline-block">Ads.<Ring /></span>{" "}
              <span className="relative inline-block">AI.<Wave /></span>
            </h1>
            <p className={`${EYEBROW} mt-7 text-[#2b7575] ${RISE}`} style={{ animationDelay: "160ms" }}>
              For small businesses
            </p>
          </div>
        </header>

        {/* 02 — The one main action */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 -mt-6 block overflow-hidden rounded-[22px] bg-[#0E242C] p-6 text-[#F6F5F1] shadow-[0_24px_48px_-24px_rgba(14,36,44,0.55)] ${PRESS} ${RISE}`}
          style={{ animationDelay: "240ms" }}
        >
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(90,177,177,0.35),transparent_70%)]" />
          <span className={`${EYEBROW} text-[#aeeeee]`}>Start here</span>
          <span className="heading-font mt-2 block text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
            Free 30-minute call
          </span>
          <span className="mt-2 block text-[15px] leading-relaxed text-[#F6F5F1]/80" style={SERIF}>
            No pitch. Bring your website, ads or tools, and leave knowing what to fix first.
          </span>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#F6F5F1] px-4 py-2.5 text-sm font-semibold text-[#0E242C]">
            Pick a time <ArrowUpRight aria-hidden size={16} strokeWidth={2} />
          </span>
        </a>

        {/* 03 — The free guide: picture on top */}
        <Link
          href="/resources/traffic-reality-check"
          className={`mt-5 block overflow-hidden rounded-[22px] border border-[#d7e6e6] bg-white ${PRESS} ${RISE}`}
          style={{ animationDelay: "320ms" }}
        >
          <div className="relative aspect-[16/9] w-full bg-white">
            <Image
              src="/images/links/guide.webp"
              alt="The Traffic Reality Check: visits going up while enquiries stay flat"
              fill
              sizes="(max-width: 480px) 100vw, 448px"
              className="object-cover object-center"
            />
          </div>
          <div className="border-t border-[#e8f1f1] p-5">
            <span className={`${EYEBROW} text-[#2b7575]`}>Free guide</span>
            <span className="heading-font mt-1.5 block text-xl font-semibold leading-snug tracking-[-0.01em]">
              The Traffic Reality Check
            </span>
            <span className="mt-1 block text-[15px] leading-relaxed text-[#161616]/70" style={SERIF}>
              Three checks to run before you pay for more traffic.
            </span>
          </div>
        </Link>

        {/* 04 — YouTube: words over the picture */}
        <a
          href="https://www.youtube.com/@OyekolaObajuwon"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative mt-5 block aspect-[16/10] overflow-hidden rounded-[22px] ${PRESS} ${RISE}`}
          style={{ animationDelay: "400ms" }}
        >
          <Image
            src="/images/links/youtube.webp"
            alt="YouTube thumbnail: Look closer"
            fill
            sizes="(max-width: 480px) 100vw, 448px"
            className="object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0E242C]/90 via-[#0E242C]/20 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[#F6F5F1]">
            <span>
              <span className={`${EYEBROW} text-[#aeeeee]`}>YouTube</span>
              <span className="heading-font mt-1 block text-xl font-semibold leading-snug">Watch the videos</span>
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F6F5F1] text-[#0E242C]">
              <Play aria-hidden size={18} strokeWidth={2} className="translate-x-[1px] fill-current" />
            </span>
          </span>
        </a>

        {/* 05 — The work: picture beside the words */}
        <Link
          href="/work"
          className={`mt-5 grid grid-cols-[42%_1fr] items-stretch overflow-hidden rounded-[22px] border border-[#d7e6e6] bg-white ${PRESS} ${RISE}`}
          style={{ animationDelay: "480ms" }}
        >
          <div className="relative min-h-[132px]">
            <Image
              src="/images/links/work.webp"
              alt="The Growveloper website home page"
              fill
              sizes="190px"
              className="object-cover object-left-top"
            />
          </div>
          <div className="flex flex-col justify-center p-4">
            <span className={`${EYEBROW} text-[#2b7575]`}>The work</span>
            <span className="heading-font mt-1 block text-lg font-semibold leading-snug">See what I&apos;ve built</span>
            <span className="mt-1 block text-sm leading-relaxed text-[#161616]/70" style={SERIF}>
              Websites, ads and systems for real businesses.
            </span>
          </div>
        </Link>

        {/* 06 — Everywhere else */}
        <nav aria-label="Social profiles" className={`mt-10 ${RISE}`} style={{ animationDelay: "560ms" }}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${EYEBROW} text-[#161616]/70 underline-offset-4 transition-colors hover:text-[#2b7575] hover:underline`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center">
            <Link href="/" className={`${EYEBROW} text-[#161616]/45 transition-colors hover:text-[#2b7575]`}>
              growveloper.com
            </Link>
          </p>
        </nav>
      </div>
    </section>
  );
}
