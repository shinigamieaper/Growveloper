"use client";

import { useState } from "react";
import { LampContainer } from "@/components/ui/lamp";
import { GridBackground } from "@/components/ui/grid-background";
import { CanvasText } from "@/components/ui/canvas-text";
import { LinkPreview } from "@/components/ui/link-preview";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { CountUp } from "@/components/animations/CountUp";
import { MetricsCounter } from "@/components/animations/MetricsCounter";
import { ChartClimb } from "@/components/animations/ChartClimb";
import { WorkflowAnimation } from "@/components/animations/WorkflowAnimation";
import { PortableTextRenderer } from "@/components/shared/PortableTextRenderer";
import { ContentFilterBar } from "@/components/shared/ContentFilterBar";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { FreeResourceBlock, PaidResourceBlock } from "@/components/shared/ResourceActionBlock";
import { LabFeaturedCard } from "@/components/shared/LabFeaturedCard";
import { LabFeedWrapper } from "@/components/shared/LabFeedWrapper";
import { SocialShareButtons } from "@/components/shared/SocialShareButtons";
import { RelatedContentGrid } from "@/components/shared/RelatedContentGrid";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { LineReveal } from "@/components/animations/LineReveal";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SocialProofPill } from "@/components/shared/SocialProofPill";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { CTABanner } from "@/components/shared/CTABanner";
import { Navigation } from "@/components/shared/Navigation";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { LiveFeedBento } from "@/components/shared/LiveFeedBento";
import { VideoModal } from "@/components/shared/VideoModal";
import { Popup } from "@/components/shared/Popup";
import { NewsletterCapture } from "@/components/shared/NewsletterCapture";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import Loading from "@/app/loading";
import { motion } from "motion/react";
import { EyeOff, Zap, BarChart3, Bot, Rocket, Target, Cpu, Landmark } from "lucide-react";
import type { NavigationData, PopupConfig } from "@/lib/types";

const ctaBannerColorSchemes = ["teal-solid", "light-teal", "glass"] as const;
const testNavigationData: NavigationData = {
  serviceLinks: [
    { label: "Web Development", url: "/services/development" },
    { label: "Growth Marketing", url: "/services/marketing" },
    { label: "AI & Automation", url: "/services/ai" },
    { label: "Growth Audit", url: "/audit", highlighted: true },
  ],
  industryLinks: [
    { label: "SaaS", url: "/industries/saas" },
    { label: "B2B Lead Gen", url: "/industries/b2b" },
    { label: "AI & Tech Startups", url: "/industries/ai-tech" },
    { label: "FinTech", url: "/industries/fintech" },
  ],
  staticLinks: [
    { label: "Work", url: "/work" },
    { label: "The Lab", url: "/lab" },
    { label: "Resources", url: "/resources" },
    { label: "The Brains", url: "/about" },
  ],
  ctaLabel: "Book a Consultation",
  ctaUrl: "/start",
};

const inlineCtaBannerPreviewData = {
  headline: "Ready to build your repeatable growth engine?",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start",
  highlightedWord: "growth engine",
};

const sectionCtaBannerPreviewData = {
  headline: "Ready to build your repeatable growth engine?",
  subCopy: "Book a free consultation and we’ll show you the clearest next move for your brand, funnel, and automation stack.",
  ctaLabel: "Book a Free Consultation",
  ctaDestination: "/start",
  highlightedWord: "growth engine",
};

function formatPreviewLabel(value: string) {
  return value.replace(/-/g, " ");
}

const popupPresets: Record<string, PopupConfig> = {
  newsletter: {
    id: "test-newsletter",
    pageReference: "test",
    enabled: true,
    triggerType: "time_on_page",
    triggerValue: 1,
    offerType: "newsletter",
    headline: "Get smarter about growth",
    subCopy: "Weekly breakdowns of what's working in dev, marketing, and automation — straight to your inbox.",
    ctaLabel: "Subscribe Now",
    ctaDestination: "/lab",
  },
  consultation: {
    id: "test-consultation",
    pageReference: "test",
    enabled: true,
    triggerType: "time_on_page",
    triggerValue: 1,
    offerType: "consultation",
    headline: "Let's talk about your growth",
    subCopy: "Book a free 30-minute consultation and we'll map out your next best move.",
    ctaLabel: "Book a Free Consultation",
    ctaDestination: "/start",
  },
  audit: {
    id: "test-audit",
    pageReference: "test",
    enabled: true,
    triggerType: "time_on_page",
    triggerValue: 1,
    offerType: "audit",
    headline: "Find out what's costing you conversions",
    subCopy: "Our Growth Audit uncovers exactly where your funnel leaks revenue — and how to fix it.",
    ctaLabel: "Get the Audit",
    ctaDestination: "/audit",
  },
  download: {
    id: "test-download",
    pageReference: "test",
    enabled: true,
    triggerType: "manual",
    triggerValue: 0,
    offerType: "download",
    headline: "Get the Next.js Performance Playbook",
    subCopy: "Enter your email to download the guide. You'll also get weekly growth insights.",
    ctaLabel: "Get the Guide",
    ctaDestination: "",
    downloadUrl: "/guides/nextjs-performance-playbook.pdf",
    resourceTitle: "Next.js Performance Playbook",
  },
};

export default function TestPage() {
  const [videoModal, setVideoModal] = useState<{ url: string; platform: "youtube" | "tiktok" } | null>(null);
  const [activePopup, setActivePopup] = useState<PopupConfig | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [contentFilters, setContentFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);

  return (
    <>
      <Navigation data={testNavigationData} />
      <main className="min-h-screen bg-bg-primary pt-24 text-text-primary md:pt-28">
      {/* ════════════════════════════════════════════════
          SECTION 1 — Lamp Hero
          ════════════════════════════════════════════════ */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="heading-font text-center text-4xl font-bold tracking-tight text-text-primary md:text-7xl">
            Animation{" "}
            <CanvasText text="Showcase" />
          </h1>
          <p className="max-w-xl text-center text-lg text-text-secondary">
            Every GSAP + Aceternity animation component built for Growveloper,
            rendered on one page for visual QA.
          </p>
          <MagneticElement strength={0.4}>
            <MovingBorderButton
              as="a"
              href="#text-reveal"
              duration={3000}
              containerClassName="inline-flex"
            >
              Explore Below
            </MovingBorderButton>
          </MagneticElement>
        </motion.div>
      </LampContainer>

      {/* ════════════════════════════════════════════════
          SECTION 2 — Grid Background
          ════════════════════════════════════════════════ */}
      <GridBackground
        className="min-h-[50vh] py-24"
        gridSize={40}
        masked
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TextReveal
            as="h2"
            className="heading-font mb-6 text-3xl font-bold md:text-5xl"
            splitType="words"
          >
            Grid Background with TextReveal
          </TextReveal>
          <ScrollFadeUp delay={0.3}>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              Subtle grid lines create depth. The heading above splits into
              words and fades up on scroll. This paragraph fades up separately.
            </p>
          </ScrollFadeUp>
        </div>
      </GridBackground>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SECTION 3 — Text Animations
          ════════════════════════════════════════════════ */}
      <section id="text-reveal" className="py-24">
        <div className="mx-auto max-w-5xl px-6 space-y-16">
          <TextReveal
            as="h2"
            className="heading-font text-3xl font-bold md:text-5xl"
            splitType="words"
          >
            Text Reveal — Word by Word
          </TextReveal>

          <TextReveal
            as="h3"
            className="heading-font text-2xl font-semibold text-text-secondary md:text-4xl"
            splitType="chars"
            stagger={0.02}
          >
            Character by Character Reveal
          </TextReveal>

          <TextReveal
            as="h3"
            className="heading-font text-2xl font-semibold text-brand-mid md:text-4xl"
            splitType="lines"
            y={50}
          >
            Line by line reveal works great for longer headings that wrap to
            multiple lines on smaller screens
          </TextReveal>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SECTION 4 — CanvasText Highlighted Words
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollFadeUp>
            <h2 className="heading-font mb-12 text-3xl font-bold md:text-5xl">
              We drive{" "}
              <CanvasText text="Growth" />{" "}
              for your business
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <h3 className="heading-font mb-6 text-2xl font-semibold md:text-4xl">
              Gradient only:{" "}
              <CanvasText text="Lightning Speed" />
            </h3>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.2}>
            <h3 className="heading-font mb-12 text-2xl font-semibold md:text-4xl">
              Underline only:{" "}
              <CanvasText text="Conversion" />
            </h3>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.3}>
            <p className="max-w-3xl text-lg text-text-secondary">
              CMS marks key words in headings. A teal gradient highlights
              the word, drawing attention to key phrases.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          SECTION 5 — Link Preview
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal
            as="h2"
            className="heading-font mb-12 text-3xl font-bold md:text-5xl"
          >
            Inline Link Previews
          </TextReveal>
          <ScrollFadeUp>
            <div className="max-w-3xl text-xl leading-relaxed text-text-secondary">
              Our service caters to industries like{" "}
              <LinkPreview url="/industries/saas" isStatic imageSrc="/images/logo/logo-wordmark-dark.png">
                SaaS
              </LinkPreview>
              ,{" "}
              <LinkPreview url="/industries/b2b" isStatic imageSrc="/images/logo/logo-wordmark-dark.png">
                B2B Lead Gen
              </LinkPreview>
              , and{" "}
              <LinkPreview url="/industries/fintech" isStatic imageSrc="/images/logo/logo-wordmark-dark.png">
                FinTech
              </LinkPreview>
              . Hover over any highlighted link to see a preview card appear
              with a spring animation.
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SECTION 6 — Stagger Children (Card Grid)
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal
            as="h2"
            className="heading-font mb-12 text-3xl font-bold md:text-5xl"
          >
            Staggered Card Entrance
          </TextReveal>
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <GrowveloperCard
                key={i}
                variant="resource"
                colorScheme="glass-dark"
                headline={`Card Title ${i + 1}`}
                subCopy="Each card enters with a stagger delay, creating a cascade effect as you scroll down."
                icon={
                  <span
                    className="heading-font text-sm font-bold"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                }
              />
            ))}
          </StaggerChildren>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SECTION 7 — CountUp Stats
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal
            as="h2"
            className="heading-font mb-12 text-center text-3xl font-bold md:text-5xl"
          >
            Animated Counters
          </TextReveal>
          <div className="grid gap-8 md:grid-cols-4">
            <ScrollFadeUp className="text-center">
              <CountUp
                end={100}
                suffix="%"
                className="heading-font text-5xl font-bold text-brand-mid"
              />
              <p className="mt-2 text-sm text-text-secondary">
                Lighthouse Score
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp className="text-center" delay={0.1}>
              <CountUp
                end={0.9}
                suffix="s"
                decimals={1}
                className="heading-font text-5xl font-bold text-brand-mid"
              />
              <p className="mt-2 text-sm text-text-secondary">
                Load Time
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp className="text-center" delay={0.2}>
              <CountUp
                end={3.2}
                suffix="x"
                decimals={1}
                className="heading-font text-5xl font-bold text-brand-mid"
              />
              <p className="mt-2 text-sm text-text-secondary">
                ROAS Increase
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp className="text-center" delay={0.3}>
              <CountUp
                end={47}
                prefix="+"
                suffix="%"
                className="heading-font text-5xl font-bold text-brand-mid"
              />
              <p className="mt-2 text-sm text-text-secondary">
                Conversion Rate
              </p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          SESSION B — MetricsCounter Cards
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="MetricsCounter — Card Layout"
            description="Wraps CountUp in a reusable card with label. Used in Section 06 proof panels, case study metric strips, and anywhere a stat needs visual weight."
          />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsCounter value={100} label="Lighthouse Score" />
            <MetricsCounter value={0.9} label="Load Time" suffix="s" decimals={1} />
            <MetricsCounter value={3.8} label="Conversion Rate" suffix="%" decimals={1} />
            <MetricsCounter value={4.2} label="ROAS" suffix="×" decimals={1} />
          </StaggerChildren>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SESSION B — ChartClimb (GA4 Visual)
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="ChartClimb — GA4 Visual"
            description="Pure SVG + GSAP path-draw animation. Dark panel, teal line, teal fill at 15% opacity. No axis labels — purely decorative proof animation for Section 06."
          />
          <ScrollFadeUp className="mt-12">
            <ChartClimb />
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          SESSION B — WorkflowAnimation (AI State)
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="WorkflowAnimation — AI Automation"
            description="5 workflow nodes light up L→R via GSAP timeline. Connecting lines animate grey→teal. Time-saved counter ticks up using MetricsCounter. All hardcoded — animation proof, not CMS."
          />
          <ScrollFadeUp className="mt-12">
            <WorkflowAnimation />
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SESSION C — LabFeaturedCard
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session C"
            headline="LabFeaturedCard"
            description="Hero-sized featured card matching CaseStudyCard accent panels. Cycles through brand-light/mid/dark teal. SpotlightCard wrap, GSAP hover scale, ArrowUpRight affordance. Blog variant links to /lab/[slug], video variant opens VideoModal."
          />

          <div className="mt-12 space-y-8">
            <ScrollFadeUp>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Blog Variant</p>
              <LabFeaturedCard
                colorIndex={0}
                item={{
                  title: "How We Took a SaaS Landing Page from 34 to 100 on Lighthouse",
                  slug: "saas-lighthouse-100",
                  excerpt: "A deep-dive into the exact performance optimizations — image pipelines, font loading, code splitting, and edge caching — that transformed a sluggish marketing site into a sub-second experience.",
                  heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
                  category: "Performance",
                  publishedAt: "Mar 15, 2026",
                  readTime: "8 min read",
                  platform: "blog" as const,
                  featuredToggle: true,
                }}
              />
            </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.15}>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Video Variant (YouTube)</p>
              <LabFeaturedCard
                colorIndex={1}
                item={{
                  title: "I Rebuilt My Client’s Entire Funnel with AI — Here’s What Happened",
                  platform: "youtube",
                  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
                  description: "From cold traffic to booked calls in 14 days. A full walkthrough of the AI-powered automation stack we built for a B2B SaaS client.",
                  publishedAt: "Mar 10, 2026",
                  featuredToggle: true,
                }}
                onVideoClick={(url, platform) => setVideoModal({ url, platform })}
              />
            </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SESSION C — LabFeedWrapper
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session C"
            headline="LabFeedWrapper"
            description="Layout composition for /lab feed. ContentFilterBar at top, 3-col CSS grid, LiveFeedCard for each item, LoadMore button showing next 6. 9 mixed items below (first 6 visible, 3 behind Load More)."
          />
          <ScrollFadeUp className="mt-12">
            <LabFeedWrapper
              items={[
                { title: "How We Took a SaaS Landing Page from 34 to 100 on Lighthouse", slug: "saas-lighthouse-100", excerpt: "A deep-dive into image pipelines, font loading, code splitting, and edge caching.", heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", category: "Performance", publishedAt: "2026-03-15", readTime: "8 min read", platform: "blog" as const },
                { title: "I Rebuilt My Client’s Entire Funnel with AI", platform: "youtube" as const, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop", description: "AI-powered automation stack walkthrough.", publishedAt: "2026-03-10" },
                { title: "3 TikTok Hooks That Actually Convert", platform: "tiktok" as const, videoUrl: "https://www.tiktok.com/@user/video/1234567890", thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop", description: "Short-form hooks that drive real traffic.", publishedAt: "2026-03-08" },
                { title: "Why Your CMS Choice Matters More Than Your Framework", slug: "cms-choice-matters", excerpt: "Framework debates miss the point — your CMS is the real bottleneck.", heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", category: "Strategy", publishedAt: "2026-03-05", readTime: "6 min read", platform: "blog" as const },
                { title: "The Growth Stack I Use for Every Client", platform: "youtube" as const, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", description: "Next.js + Sanity + Vercel + Stripe breakdown.", publishedAt: "2026-03-02" },
                { title: "Edge Functions Changed How I Build APIs", slug: "edge-functions-apis", excerpt: "From Lambda cold starts to sub-10ms responses at the edge.", heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", category: "Development", publishedAt: "2026-02-28", readTime: "10 min read", platform: "blog" as const },
                { title: "Stop Paying for Tools You Don’t Need", platform: "tiktok" as const, videoUrl: "https://www.tiktok.com/@user/video/9876543210", thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", description: "The SaaS bloat rant that went viral.", publishedAt: "2026-02-25" },
                { title: "Designing for Conversion: The Anatomy of a High-Performing Landing Page", slug: "designing-for-conversion", excerpt: "Layout patterns, CTA placement, and social proof that actually moves the needle.", heroImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", category: "Marketing", publishedAt: "2026-02-20", readTime: "7 min read", platform: "blog" as const },
                { title: "How I Automate Client Onboarding in 4 Steps", platform: "youtube" as const, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop", description: "From form submit to project kickoff, fully automated.", publishedAt: "2026-02-15" },
              ]}
              onVideoClick={(url, platform) => setVideoModal({ url, platform })}
            />
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          SESSION C — SocialShareButtons
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            label="Session C"
            headline="SocialShareButtons"
            description="Share cluster for blog post headers. X, LinkedIn, and Copy link. Uses Web Share API on mobile if available. Glassmorphism pill container, icon-only on mobile, icon + label on desktop."
          />
          <ScrollFadeUp className="mt-12 space-y-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Default State</p>
              <SocialShareButtons
                url="https://growveloper.com/lab/saas-lighthouse-100"
                title="How We Took a SaaS Landing Page from 34 to 100 on Lighthouse"
              />
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">In Context (simulated post header)</p>
              <div className="rounded-2xl border border-glass-border bg-bg-primary p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-text-tertiary">Mar 15, 2026 · 8 min read</p>
                    <h3 className="heading-font mt-1 text-lg font-bold text-text-primary">How We Took a SaaS Landing Page from 34 to 100 on Lighthouse</h3>
                  </div>
                  <SocialShareButtons
                    url="https://growveloper.com/lab/saas-lighthouse-100"
                    title="How We Took a SaaS Landing Page from 34 to 100 on Lighthouse"
                  />
                </div>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SESSION C — RelatedContentGrid
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session C"
            headline="RelatedContentGrid"
            description="'You might also like' block for /lab/[slug] and /resources/[slug]. Renders LiveFeedCard for lab content, GrowveloperCard variant=resource for resources. Matching logic handled by the page."
          />

          <div className="mt-12 space-y-16">
            <ScrollFadeUp>
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Lab Variant (3 blog cards)</p>
              <RelatedContentGrid
                contentType="lab"
                label="Related"
                items={[
                  { title: "Why Your CMS Choice Matters More Than Your Framework", slug: "cms-choice-matters", excerpt: "Framework debates miss the point.", heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", category: "Strategy", publishedAt: "2026-03-05", readTime: "6 min read", platform: "blog" as const },
                  { title: "Edge Functions Changed How I Build APIs", slug: "edge-functions-apis", excerpt: "From Lambda cold starts to sub-10ms responses.", heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", category: "Development", publishedAt: "2026-02-28", readTime: "10 min read", platform: "blog" as const },
                  { title: "Designing for Conversion", slug: "designing-for-conversion", excerpt: "Layout patterns and CTA placement that moves the needle.", heroImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", category: "Marketing", publishedAt: "2026-02-20", readTime: "7 min read", platform: "blog" as const },
                ]}
              />
            </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.15}>
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Resource Variant (3 resource cards)</p>
              <RelatedContentGrid
                contentType="resource"
                label="Related"
                items={[
                  { title: "Next.js Performance Playbook", slug: "nextjs-performance-playbook", description: "Achieve 100 Lighthouse scores.", resourceType: "Guide" as const, category: "Performance", accessType: "free" as const },
                  { title: "Growth Marketing Template Pack", slug: "growth-marketing-templates", description: "12 battle-tested templates.", resourceType: "Template" as const, category: "Marketing", accessType: "paid" as const, priceUSD: 49 },
                  { title: "AI Automation Workflow Kit", slug: "ai-automation-kit", description: "Pre-built Zapier and Make templates.", resourceType: "Framework" as const, category: "Automation", accessType: "paid" as const, priceUSD: 79 },
                ]}
              />
            </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SESSION B — PortableTextRenderer
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            label="Session B"
            headline="PortableTextRenderer"
            description="Renders Sanity Portable Text with custom block renderers. General Sans headings, Gambetta body, JetBrains Mono code, teal links, and teal-bordered blockquotes."
          />
          <ScrollFadeUp className="mt-12">
          <div className="rounded-2xl border border-glass-border bg-bg-primary p-6 md:p-10">
            <PortableTextRenderer
              value={[
                { _type: "block", _key: "h1", style: "h1", children: [{ _type: "span", _key: "h1s", text: "Building a Growth Engine" }] },
                { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", _key: "p1s", text: "Every successful digital product starts with a foundation of clean architecture and measurable performance. This guide walks through the exact process we use to transform underperforming sites into conversion machines." }] },
                { _type: "block", _key: "h2", style: "h2", children: [{ _type: "span", _key: "h2s", text: "The Technical Foundation" }] },
                { _type: "block", _key: "p2", style: "normal", children: [
                  { _type: "span", _key: "p2a", text: "Start with " },
                  { _type: "span", _key: "p2b", text: "Next.js", marks: ["strong"] },
                  { _type: "span", _key: "p2c", text: " and " },
                  { _type: "span", _key: "p2d", text: "Sanity CMS", marks: ["strong"] },
                  { _type: "span", _key: "p2e", text: " for a stack that scales. Use " },
                  { _type: "span", _key: "p2f", text: "generateStaticParams", marks: ["code"] },
                  { _type: "span", _key: "p2g", text: " for static generation and " },
                  { _type: "span", _key: "p2h", text: "revalidateTag", marks: ["code"] },
                  { _type: "span", _key: "p2i", text: " for on-demand ISR." },
                ] },
                { _type: "block", _key: "h3", style: "h3", children: [{ _type: "span", _key: "h3s", text: "Performance Metrics" }] },
                { _type: "block", _key: "p3", style: "normal", children: [
                  { _type: "span", _key: "p3a", text: "Check the " },
                  { _type: "span", _key: "p3b", text: "Web Vitals documentation", marks: ["link-1"] },
                  { _type: "span", _key: "p3c", text: " for the latest thresholds. Target LCP under 2.5s, FID under 100ms, and CLS under 0.1." },
                ], markDefs: [{ _type: "link", _key: "link-1", href: "https://web.dev/vitals/" }] },
                { _type: "block", _key: "bq", style: "blockquote", children: [{ _type: "span", _key: "bqs", text: "Performance is not a feature — it is the product. Every 100ms of load time costs you 1% of conversions." }] },
                { _type: "code", _key: "code1", code: "const lighthouse = await runAudit(url);\nconsole.log(lighthouse.score); // 100" },
              ] as never[]}
            />
          </div>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SESSION B — ContentFilterBar
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="ContentFilterBar"
            description="Multi-select pill-tab filter bar with checkmark indicators. Bordered outline pills, wraps on desktop, horizontal scroll on mobile. Used on /lab, /resources, /work."
          />

          <div className="mt-12 space-y-10">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Content Types (/lab)</p>
              <ContentFilterBar
                filters={[
                  { label: "Blog", value: "blog" },
                  { label: "YouTube", value: "youtube" },
                  { label: "TikTok", value: "tiktok" },
                  { label: "Podcast", value: "podcast" },
                ]}
                activeFilters={contentFilters}
                onFilterChange={setContentFilters}
              />
              <p className="mt-2 text-xs text-text-tertiary">Active: <span className="text-brand-mid">{contentFilters.length ? contentFilters.join(", ") : "none"}</span></p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Resource Categories (/resources)</p>
              <ContentFilterBar
                filters={[
                  { label: "Templates", value: "templates" },
                  { label: "Guides", value: "guides" },
                  { label: "Checklists", value: "checklists" },
                  { label: "Tools", value: "tools" },
                  { label: "Workflows", value: "workflows" },
                ]}
                activeFilters={categoryFilters}
                onFilterChange={setCategoryFilters}
              />
              <p className="mt-2 text-xs text-text-tertiary">Active: <span className="text-brand-mid">{categoryFilters.length ? categoryFilters.join(", ") : "none"}</span></p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Industries (/work)</p>
              <ContentFilterBar
                filters={[
                  { label: "SaaS", value: "saas" },
                  { label: "E-commerce", value: "ecommerce" },
                  { label: "FinTech", value: "fintech" },
                  { label: "Healthcare", value: "healthcare" },
                  { label: "Education", value: "education" },
                  { label: "Real Estate", value: "real-estate" },
                ]}
                activeFilters={industryFilters}
                onFilterChange={setIndustryFilters}
              />
              <p className="mt-2 text-xs text-text-tertiary">Active: <span className="text-brand-mid">{industryFilters.length ? industryFilters.join(", ") : "none"}</span></p>
            </div>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          SESSION B — ResourceCard
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="ResourceCard"
            description="Thin wrapper composing GrowveloperCard with variant=resource. Adds resource type pill, access badge (Free/Paid), and contextual CTA. Does not modify GrowveloperCardBaseProps."
          />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              headline="Next.js Performance Playbook"
              subCopy="A comprehensive guide to achieving 100 Lighthouse scores with Next.js App Router."
              tag="Performance"
              resourceType="Guide"
              accessType="free"
              href="/resources/nextjs-performance-playbook"
            />
            <ResourceCard
              headline="Growth Marketing Template Pack"
              subCopy="12 battle-tested templates for content calendars, campaign briefs, and reporting dashboards."
              tag="Marketing"
              resourceType="Template"
              accessType="paid"
              price={49}
              href="/resources/growth-marketing-templates"
            />
            <ResourceCard
              headline="AI Automation Workflow Kit"
              subCopy="Pre-built Zapier and Make templates for lead scoring, CRM sync, and email sequences."
              tag="Automation"
              resourceType="Workflow"
              accessType="paid"
              price={79}
              href="/resources/ai-automation-kit"
            />
          </StaggerChildren>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SESSION B — ResourceActionBlock
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Session B"
            headline="ResourceActionBlock"
            description="Two sub-components: FreeResourceBlock (email gate → download unlock) and PaidResourceBlock (Stripe checkout). Both show loading/error states."
          />
          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Free Resource</p>
              <FreeResourceBlock
                fileUrl="/guides/nextjs-performance-playbook.pdf"
                headline="Get the Performance Playbook"
                subCopy="Drop your email and download instantly. You'll also get weekly growth insights."
              />
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Paid Resource</p>
              <PaidResourceBlock
                resourceSlug="test-resource"
                resourceTitle="Test Resource"
                priceUSD={49}
                priceGBP={39}
                priceNGN={75000}
              />
              <p className="mt-3 text-xs text-text-tertiary">
                Note: Checkout handled via Flutterwave. Set FLW_SECRET_KEY in .env.
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SECTION 8 — Parallax
          ════════════════════════════════════════════════ */}
      <ParallaxSection speed={0.15} className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <TextReveal
            as="h2"
            className="heading-font mb-6 text-3xl font-bold md:text-5xl"
          >
            Parallax Section
          </TextReveal>
          <ScrollFadeUp>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              This entire section has subtle parallax movement — the content
              moves slightly slower than scroll speed. Disabled on mobile for
              performance.
            </p>
          </ScrollFadeUp>
        </div>
      </ParallaxSection>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          SECTION 9 — Magnetic Buttons
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal
            as="h2"
            className="heading-font mb-6 text-center text-3xl font-bold md:text-5xl"
          >
            Magnetic Buttons + Press State
          </TextReveal>
          <ScrollFadeUp>
            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-text-secondary">
              Buttons follow your cursor with a magnetic pull (desktop only).
              Click/tap to see the press compress effect.
            </p>
          </ScrollFadeUp>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <MagneticElement strength={0.4}>
              <MovingBorderButton duration={3000}>
                Book a Consultation
              </MovingBorderButton>
            </MagneticElement>
            <MagneticElement strength={0.3}>
              <MovingBorderButton duration={4000}>
                Get a Growth Audit
              </MovingBorderButton>
            </MagneticElement>
            <MagneticElement strength={0.5}>
              <MovingBorderButton duration={2500}>
                View Work
              </MovingBorderButton>
            </MagneticElement>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          SECTION 10 — Line Reveals
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <TextReveal
            as="h2"
            className="heading-font text-center text-3xl font-bold md:text-5xl"
          >
            Line Reveal Directions
          </TextReveal>
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-text-tertiary">From left →</p>
              <LineReveal direction="left" className="bg-brand-mid h-0.5" />
            </div>
            <div>
              <p className="mb-3 text-sm text-text-tertiary">From right ←</p>
              <LineReveal direction="right" className="bg-brand-mid h-0.5" />
            </div>
            <div>
              <p className="mb-3 text-sm text-text-tertiary">From center ↔</p>
              <LineReveal direction="center" className="bg-brand-light h-0.5" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SHARED COMPONENTS — New Builds
          ════════════════════════════════════════════════ */}

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ── Social Proof Pill ── */}
      <section className="py-16 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeader
            label="Hero Component"
            headline="Social Proof Pill"
            description="CMS-driven pill that sits in the hero. No data = no render."
          />
          <div className="flex justify-center">
            <SocialProofPill data={{ text: "5+ years · 3 companies · Dev + Marketing + AI" }} />
          </div>
        </div>
      </section>

      {/* ── Scroll Cue ── */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeader
            label="Navigation"
            headline="Scroll Cue"
            description="Spinning circular text with a down arrow. Speeds up on hover. Sits below hero."
          />
          <ScrollCue targetId="diagnosis-cards" text="EXPLORE OUR WORK · EXPLORE OUR WORK · " />
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ── Diagnosis Cards (GrowveloperCard) ── */}
      <section id="diagnosis-cards" className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Section 03"
            headline="The Diagnosis"
            description="GrowveloperCard variant=&quot;diagnosis&quot; · colorScheme=&quot;glass-dark&quot;. Icon animates on hover."
          />
          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            <GrowveloperCard
              variant="diagnosis"
              colorScheme="glass-dark"
              headline="Your site is invisible to AI"
              subCopy="Search engines index you, but AI assistants skip you entirely. That's where your next customers are looking."
              icon={<EyeOff className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
            />
            <GrowveloperCard
              variant="diagnosis"
              colorScheme="glass-dark"
              headline="Speed kills (slowly)"
              subCopy="A 3-second load time costs you 53% of mobile visitors. You're bleeding revenue every millisecond."
              icon={<Zap className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
            />
            <GrowveloperCard
              variant="diagnosis"
              colorScheme="glass-dark"
              headline="You're flying blind"
              subCopy="No tracking, no attribution, no idea which channel drives revenue. Every campaign is a guess."
              icon={<BarChart3 className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
            />
            <GrowveloperCard
              variant="diagnosis"
              colorScheme="glass-dark"
              headline="Manual everything"
              subCopy="Your team spends hours on tasks that could be automated. Time wasted is growth you'll never get back."
              icon={<Bot className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
            />
          </StaggerChildren>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ── Section 04 — What We Can Do For You (StickyScroll + Lottie) ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="Section 04"
            headline="What We Can Do For You"
            description="Scroll through our three service pillars. The visual swaps as each service enters view."
          />
          <StickyScroll
            items={[
              {
                stepNumber: "01",
                heading: "Web Development",
                description: "Performance-obsessed builds that score 100 on Lighthouse and convert visitors into customers.",
                subItems: ["Next.js", "Performance", "CMS Setup", "GTM & GA4", "API Integrations"],
                ctaLabel: "Learn More",
                ctaUrl: "/services/development",
                lottiePath: "/lottie/Web Development.lottie",
                fallbackGradient: "linear-gradient(135deg, var(--brand-dark), var(--brand-mid))",
              },
              {
                stepNumber: "02",
                heading: "Growth Marketing",
                description: "AI-first marketing that makes your brand visible where your buyers actually look.",
                subItems: ["AEO", "SEO", "Paid Ads", "Content Strategy", "CRO", "Analytics"],
                ctaLabel: "Learn More",
                ctaUrl: "/services/marketing",
                lottiePath: "/lottie/Digital Marketing.lottie",
                fallbackGradient: "linear-gradient(135deg, var(--brand-mid), var(--brand-light))",
              },
              {
                stepNumber: "03",
                heading: "AI & Automation",
                description: "Workflows that eliminate manual busywork and free your team to focus on growth.",
                subItems: ["Make.com", "n8n", "AI Chatbots", "Content Pipelines", "Reporting"],
                ctaLabel: "Learn More",
                ctaUrl: "/services/ai",
                lottiePath: "/lottie/Chat Bot.lottie",
                fallbackGradient: "linear-gradient(135deg, var(--brand-light), var(--brand-dark))",
              },
            ]}
            bottomCta={{
              headline: "Need the right mix to move faster?",
              description: "We combine development, marketing, and automation into one growth system tailored to your stage.",
              ctaLabel: "Book a Free Consultation",
              ctaUrl: "/start",
            }}
          />
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ── Section 07 — How It Works (StickyScroll, no Lottie) ── */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="Section 07"
            headline="How It Works"
            description="Four steps from audit to scale. Same sticky scroll, same GSAP pinning, same active-step Lottie playback."
          />
          <StickyScroll
            items={[
              {
                stepNumber: "01",
                heading: "Audit",
                description: "We analyse your current digital presence — site speed, SEO health, ad performance, tech stack, and conversion flow. You get a clear picture of what's working and what's leaking revenue.",
                lottiePath: "/lottie/step-audit.lottie",
                fallbackGradient: "linear-gradient(135deg, #1a1a2e, var(--brand-dark))",
              },
              {
                stepNumber: "02",
                heading: "Architect",
                description: "Based on the audit, we design your growth engine — the right tech stack, marketing channels, and automation workflows tailored to your business model and budget.",
                lottiePath: "/lottie/step-architect.lottie",
                fallbackGradient: "linear-gradient(135deg, var(--brand-dark), #1a2a2a)",
              },
              {
                stepNumber: "03",
                heading: "Build",
                description: "We build everything in-house. Development, marketing campaigns, automation flows — one team, one vision, no broken telephone between agencies.",
                lottiePath: "/lottie/step-build.lottie",
                fallbackGradient: "linear-gradient(135deg, #1a2a2a, var(--brand-mid))",
              },
              {
                stepNumber: "04",
                heading: "Scale",
                description: "Once the engine is running, we optimise and scale. Monthly reporting, A/B testing, new automations, and continuous iteration to compound your growth.",
                lottiePath: "/lottie/step-scale.lottie",
                fallbackGradient: "linear-gradient(135deg, var(--brand-mid), var(--brand-dark))",
              },
            ]}
          />
        </div>
      </section>

      {/* ── CTA Banner System ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="CTA Banner"
            headline="CTA Banner System"
            description="One shared CTA family with two presentation modes: inline for embedding inside sections, and section for full-page conversion moments."
          />
          <div>
            <h3 className="heading-font text-2xl font-bold text-text-primary md:text-3xl">Inline / embeddable</h3>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              Use this when the CTA sits inside another section but still needs to feel prominent.
            </p>
            <div className="mt-8 space-y-8">
              {ctaBannerColorSchemes.map((colorScheme) => (
                <div key={`inline-${colorScheme}`}>
                  <div className="mb-3 flex">
                    <span className="rounded-full border border-glass-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                      {formatPreviewLabel(colorScheme)}
                    </span>
                  </div>
                  <CTABanner
                    data={inlineCtaBannerPreviewData}
                    colorScheme={colorScheme}
                    presentationMode="inline"
                    className="!px-0 !py-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="heading-font text-2xl font-bold text-text-primary md:text-3xl">Section / full conversion block</h3>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              Use this when the CTA needs to stand on its own as a dedicated section between major page blocks.
            </p>
          </div>
          <div className="mt-8 space-y-8">
            {ctaBannerColorSchemes.map((colorScheme) => (
              <div key={`section-${colorScheme}`}>
                <div className="mx-auto mb-3 max-w-7xl px-6">
                  <span className="rounded-full border border-glass-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    {formatPreviewLabel(colorScheme)}
                  </span>
                </div>
                <CTABanner
                  data={sectionCtaBannerPreviewData}
                  colorScheme={colorScheme}
                  presentationMode="section"
                  className="!px-0 !py-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ── Industry Cards (GrowveloperCard) ── */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Section 05"
            headline="Who We Work With"
            description="GrowveloperCard variant=&quot;industry&quot; dark + variant=&quot;sound-like-you&quot; teal-solid. 3 top row, 2 bottom row."
          />
          <ScrollFadeUp>
          <div className="overflow-hidden rounded-2xl border border-glass-border bg-glass-border">
            <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
              <GrowveloperCard
                variant="industry"
                colorScheme="dark"
                headline="SaaS"
                subCopy="Ship faster, convert more, retain longer."
                ctaLabel="Learn More"
                ctaHref="/industries/saas"
                icon={<Rocket className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                className="rounded-none border-0"
              />
              <GrowveloperCard
                variant="industry"
                colorScheme="dark"
                headline="B2B Lead Gen"
                subCopy="Fill your pipeline with qualified leads on autopilot."
                ctaLabel="Learn More"
                ctaHref="/industries/b2b"
                icon={<Target className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                className="rounded-none border-0"
              />
              <GrowveloperCard
                variant="industry"
                colorScheme="dark"
                headline="AI & Tech Startups"
                subCopy="Technical builds that match your ambition."
                ctaLabel="Learn More"
                ctaHref="/industries/ai-tech"
                icon={<Cpu className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                className="rounded-none border-0"
              />
              <GrowveloperCard
                variant="industry"
                colorScheme="dark"
                headline="FinTech"
                subCopy="Compliant, fast, and built for trust."
                ctaLabel="Learn More"
                ctaHref="/industries/fintech"
                icon={<Landmark className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                className="rounded-none border-0"
              />
              <GrowveloperCard
                variant="sound-like-you"
                colorScheme="teal-solid"
                headline="Sound like you?"
                ctaLabel="Free consultation"
                ctaHref="/start"
                className="rounded-none border-0 md:col-span-2"
              />
            </div>
          </div>
          </ScrollFadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ── Case Study Cards ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="Section 08"
            headline="Case Studies"
            description="Full-width stacked cards with accent panels, SpotlightCard hover, and GSAP scale. Whole card is clickable."
          />
          <div className="space-y-10">
            <ScrollFadeUp>
            <CaseStudyCard
              colorIndex={0}
              data={{
                title: "Monaco Supplement Brand",
                slug: "monaco-supplements",
                heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
                situation: "Since 2021, we scaled Google Ads into a core growth channel, playing a central role in driving the brand's online revenue and market presence.",
                resultHeadline: "ROAS up to 12 for a Monaco supplement brand",
                techStack: ["Next.js", "Sanity", "Vercel", "GA4"],
              }}
            />
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.1}>
            <CaseStudyCard
              colorIndex={1}
              data={{
                title: "Roommaster SaaS",
                slug: "roommaster",
                heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
                situation: "Hotel management platform suffering from poor site speed and weak conversion. We rebuilt the frontend and ran targeted paid acquisition.",
                resultHeadline: "100 Lighthouse score, 3.2× ROAS",
                techStack: ["Next.js", "Tailwind", "GA4", "GTM"],
              }}
            />
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.15}>
            <CaseStudyCard
              colorIndex={2}
              data={{
                title: "French Luxury Kidswear",
                slug: "luxury-kidswear",
                heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
                situation: "We boosted orders and brand awareness through targeted Meta Ads. Instagram engagement drove ROAS and rapidly increased visibility across key demographics.",
                resultHeadline: "+74% orders & ROAS up to 23",
                techStack: ["Meta Ads", "Instagram", "Shopify"],
              }}
            />
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.2}>
            <CaseStudyCard
              colorIndex={0}
              data={{
                title: "Gradient Fallback Demo",
                slug: "gradient-demo",
                situation: "This card has no image — it shows the gradient fallback on the media panel. Everything else renders normally.",
                resultHeadline: "No image? No problem.",
                techStack: ["Figma", "React", "GSAP"],
              }}
            />
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ── Testimonials (Section 09) — Grid + Centered Carousel ── */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="Section 09"
            headline="Testimonials"
            description="Aceternity-style background grid with radial mask + centered GSAP carousel. Auto-advances every 4s, pause on hover, dots nav."
          />
          <TestimonialsSection
            items={[
              {
                quote: "They didn't just build a website — they built a growth machine. Our leads tripled in two months.",
                name: "Sarah Chen",
                role: "CEO",
                company: "TechFlow",
                rating: 5,
              },
              {
                quote: "The speed difference alone paid for the project. Our Lighthouse score went from 34 to 100.",
                name: "Marcus Johnson",
                role: "CTO",
                company: "Roommaster",
                rating: 5,
              },
            ]}
            showCTACard
            ctaHeadline="This could be you…"
            ctaLabel="Book a Consultation"
            ctaUrl="/start"
          />
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ── FAQ Accordion ── */}
      <FAQAccordion
        sectionHeadline="Frequently Asked Questions"
        sectionDescription="Everything you need to know about working with us. Can't find an answer? Book a call."
        ctaHeadline="Still Have Questions?"
        ctaDescription="We understand every business is unique. Reach out anytime."
        ctaLabel="Book a Demo"
        ctaUrl="/start"
        items={[
          { question: "What is Growveloper?", answer: "Growveloper is a full-service growth studio that combines web development, marketing, and AI automation under one roof. We build, market, and automate — so you don't need three separate agencies." },
          { question: "How does it work?", answer: "Simple: we audit your current setup, architect a growth plan, build the solution, then scale it. Four steps, one team, measurable results." },
          { question: "Is my data safe?", answer: "Yes. We use enterprise-grade encryption and secure cloud storage. Your data belongs only to you — always." },
          { question: "Can I cancel anytime?", answer: "Absolutely. You can upgrade, downgrade, or cancel your retainer anytime — no hidden fees or contracts." },
        ]}
      />

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ── Live Feed Bento Grid (Section 11) ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="Section 11"
            headline="What We're Up To"
            description="Aceternity Bento Grid — 1 featured blog (2-col), 1 YouTube, 1 TikTok. Glass-dark cards, SpotlightCard hover, GSAP scale."
          />
          <LiveFeedBento
            items={[
              {
                title: "How We Tripled Conversion Rates for a SaaS Startup",
                slug: "tripled-conversion-saas",
                excerpt: "A deep dive into the strategy, design decisions, and technical implementation that led to a 3x increase in signups.",
                heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
                publishedAt: "2024-12-15",
                readTime: "8 min read",
                category: "Case Study",
                platform: "blog",
              },
              {
                title: "Building a Design System from Scratch",
                platform: "youtube",
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
                description: "Watch how we approach design systems for scalable products.",
                publishedAt: "2024-11-28",
              },
              {
                title: "60-Second Website Audit Tips",
                platform: "tiktok",
                videoUrl: "https://www.tiktok.com/@example/video/123",
                thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=700&fit=crop",
                description: "Quick wins you can implement today.",
                publishedAt: "2024-12-01",
              },
            ]}
            sectionTitle="Latest from The Lab"
            seeAllLabel="See everything"
            seeAllUrl="/lab"
            onVideoClick={(url, platform) => setVideoModal({ url, platform })}
          />
        </div>
      </section>

      {/* ── Video Modal ── */}
      {videoModal && (
        <VideoModal
          videoUrl={videoModal.url}
          platform={videoModal.platform}
          onClose={() => setVideoModal(null)}
        />
      )}

      <LineReveal className="mx-auto max-w-5xl" direction="center" />

      {/* ════════════════════════════════════════════════
          GROWVELOPER CARD — Full Variant × ColorScheme Matrix
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Shared Card System"
            headline="GrowveloperCard — All Variants × All Schemes"
            description="One base component reused across shared card use-cases. Every combination rendered below for visual QA."
          />

          {/* ── industry ── */}
          <h3 className="heading-font mt-16 mb-6 text-2xl font-bold text-text-primary">variant=&quot;industry&quot;</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(["dark", "glass-dark", "glass-light", "teal-solid", "light-teal"] as const).map((cs) => (
              <div key={`industry-${cs}`}>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{cs}</span>
                <GrowveloperCard
                  variant="industry"
                  colorScheme={cs}
                  headline="SaaS"
                  subCopy="Ship faster, convert more, retain longer."
                  ctaLabel="Learn More"
                  ctaHref="/industries/saas"
                />
              </div>
            ))}
          </div>

          {/* ── diagnosis ── */}
          <h3 className="heading-font mt-16 mb-6 text-2xl font-bold text-text-primary">variant=&quot;diagnosis&quot;</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(["dark", "glass-dark", "glass-light", "teal-solid", "light-teal"] as const).map((cs) => (
              <div key={`diagnosis-${cs}`}>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{cs}</span>
                <GrowveloperCard
                  variant="diagnosis"
                  colorScheme={cs}
                  headline="Speed kills (slowly)"
                  subCopy="A 3-second load time costs you 53% of mobile visitors."
                  icon={<Zap className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                />
              </div>
            ))}
          </div>

          {/* ── resource ── */}
          <h3 className="heading-font mt-16 mb-6 text-2xl font-bold text-text-primary">variant=&quot;resource&quot;</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(["dark", "glass-dark", "glass-light", "teal-solid", "light-teal"] as const).map((cs) => (
              <div key={`resource-${cs}`}>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{cs}</span>
                <GrowveloperCard
                  variant="resource"
                  colorScheme={cs}
                  headline="Next.js Performance Playbook"
                  subCopy="A step-by-step guide to hitting Lighthouse 100 on every deploy."
                  tag="Guide"
                  badge="Free"
                  ctaLabel="Download"
                  ctaHref="/resources/nextjs-performance"
                />
              </div>
            ))}
          </div>

          {/* ── automation ── */}
          <h3 className="heading-font mt-16 mb-6 text-2xl font-bold text-text-primary">variant=&quot;automation&quot;</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(["dark", "glass-dark", "glass-light", "teal-solid", "light-teal"] as const).map((cs) => (
              <div key={`automation-${cs}`}>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{cs}</span>
                <GrowveloperCard
                  variant="automation"
                  colorScheme={cs}
                  headline="Lead Qualification Bot"
                  subCopy="Auto-qualify inbound leads and route to your CRM in real time."
                  tag="AI Workflow"
                  badge="£499"
                  icon={<Bot className="h-6 w-6" strokeWidth={1.8} aria-hidden />}
                  ctaLabel="View Details"
                  ctaHref="/automations/lead-qualification"
                />
              </div>
            ))}
          </div>

          {/* ── sound-like-you ── */}
          <h3 className="heading-font mt-16 mb-6 text-2xl font-bold text-text-primary">variant=&quot;sound-like-you&quot;</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(["dark", "glass-dark", "glass-light", "teal-solid", "light-teal"] as const).map((cs) => (
              <div key={`sly-${cs}`}>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{cs}</span>
                <GrowveloperCard
                  variant="sound-like-you"
                  colorScheme={cs}
                  headline="Sound like you?"
                  ctaLabel="Free consultation"
                  ctaHref="/start"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="left" />

      {/* ════════════════════════════════════════════════
          NEWSLETTER CAPTURE — Default + Download Unlock
          ════════════════════════════════════════════════ */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            label="Newsletter Capture"
            headline="NewsletterCapture — All Variants"
            description="Full-width section component with RHF + Zod validation, loading spinner, success animation, and inline error display. Posts to /api/newsletter."
          />
        </div>

        <div className="mt-12 space-y-4">
          <p className="mx-auto max-w-5xl px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Default variant</p>
          <NewsletterCapture
            headline="Get smarter about growth"
            subCopy="Weekly breakdowns of what's working in dev, marketing, and automation — straight to your inbox."
            ctaLabel="Subscribe Now"
          />

          <p className="mx-auto max-w-5xl px-6 pt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Download unlock variant</p>
          <NewsletterCapture
            headline="Unlock the Next.js Performance Playbook"
            subCopy="Enter your email to download the guide. You'll also get weekly growth insights."
            ctaLabel="Get the Guide"
            downloadUnlocks
          />
        </div>
      </section>

      <LineReveal className="mx-auto max-w-5xl" direction="right" />

      {/* ════════════════════════════════════════════════
          LOADING STATE — Demo
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader
            headline="Loading State"
            highlightedWord="Loading"
            description="Global loading UI shown during page navigation. Uses Lottie animation."
          />
          <div className="mt-12 rounded-2xl border border-glass-border bg-bg-secondary p-8">
            <div className="relative h-[400px]">
              <Loading />
            </div>
          </div>
          <p className="mt-6 text-xs text-text-tertiary">
            This appears automatically during Next.js navigation. Requires /lottie/loading.lottie file.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          POPUP SYSTEM — 3 Offer Type Variants
          ════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader
            headline="Popup System"
            highlightedWord="Popup"
            description="Test all popup variants with localStorage-based dismissal."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(popupPresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => {
                  localStorage.removeItem(`growveloper-popup-dismissed-${preset.pageReference}`);
                  setActivePopup(preset);
                  setIsPopupOpen(true);
                }}
                className="min-h-[44px] rounded-full border border-glass-border bg-bg-tertiary px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-brand-mid hover:bg-bg-secondary"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Popup
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-tertiary">
            Dismissal is stored in localStorage for 7 days. The buttons above clear it before re-triggering so you can test repeatedly.
          </p>
        </div>
      </section>

      {/* Popup instance */}
      <Popup
        config={activePopup}
        open={isPopupOpen}
        onOpenChange={(open) => {
          setIsPopupOpen(open);
          if (!open) {
            setActivePopup(null);
          }
        }}
      />

      {/* Spacer */}
      <div className="h-24" />
      </main>
    </>
  );
}
