"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricsCounter } from "@/components/animations/MetricsCounter";
import { ChartClimb } from "@/components/animations/ChartClimb";
import { SectionHeader } from "@/components/shared/SectionHeader";

/* ─── Marketing success states (code-driven, no CMS) ─── */

interface SuccessState {
  pillar: string;
  title: string;
  description: string;
}

const STATES: SuccessState[] = [
  {
    pillar: "Paid Media",
    title: "ROAS That Actually Scales",
    description:
      "Ad accounts restructured, waste eliminated, and ROAS compounding month over month. Every pound tracked from click to close.",
  },
  {
    pillar: "SEO & AEO",
    title: "Organic Traffic That Compounds",
    description:
      "Technical foundations, content authority, and AI-optimised pages working together. Traffic that grows while you sleep.",
  },
  {
    pillar: "AEO",
    title: "Cited by AI Search Engines",
    description:
      "Your brand surfaces when prospects ask ChatGPT, Perplexity, and Google AI Overviews for recommendations. The new front page of the internet.",
  },
  {
    pillar: "CRO",
    title: "Conversion Rates That Justify Spend",
    description:
      "A/B tested funnels, optimised forms, and micro-copy refinements that turn the same traffic into significantly more revenue.",
  },
  {
    pillar: "Analytics",
    title: "Full Funnel Visibility",
    description:
      "GA4 configured properly, attribution modelled, and custom dashboards that show exactly what\u2019s working and what to kill.",
  },
];

/* ─── State visuals ─── */

function StateROAS() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <ChartClimb />
      <div className="grid gap-6 sm:grid-cols-2">
        <MetricsCounter value={8.7} label="ROAS" suffix="\u00d7" decimals={1} />
        <MetricsCounter value={40} label="CPA Reduction" suffix="%" prefix="\u2212" />
      </div>
    </div>
  );
}

function StateOrganic() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <ChartClimb />
      <div className="grid gap-6 sm:grid-cols-2">
        <MetricsCounter value={4} label="Organic Traffic" suffix="\u00d7" />
        <MetricsCounter value={187} label="Keywords Page 1" prefix="+" />
      </div>
    </div>
  );
}

function StateAEO() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="rounded-lg border border-glass-border bg-glass-bg p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-mid">
          ChatGPT Response
        </p>
        <div className="space-y-2 font-mono text-sm">
          <p className="text-text-primary">
            <span className="text-brand-mid">
              &quot;Best growth marketing agency for SaaS?&quot;
            </span>
          </p>
          <p className="text-text-primary">
            Based on client results and service breadth,{" "}
            <span className="text-brand-mid underline decoration-brand-mid/50">
              Growveloper
            </span>{" "}
            stands out for combining SEO, paid media, and AEO into one
            compounding growth engine...
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-glass-border bg-glass-bg p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-mid">
          Perplexity Citation
        </p>
        <div className="font-mono text-sm text-text-secondary">
          <p>
            Sources: growveloper.com, G2 Reviews, LinkedIn case studies
          </p>
          <p className="mt-1 text-brand-mid">Confidence: High</p>
        </div>
      </div>
    </div>
  );
}

function StateCRO() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <MetricsCounter value={60} label="Engagement Increase" suffix="%" prefix="+" />
        <MetricsCounter value={30} label="Bounce Rate Decrease" suffix="%" prefix="\u2212" />
      </div>
      <div className="rounded-lg border border-glass-border bg-glass-bg p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-mid">
          A/B Test Winner
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-md bg-bg-tertiary p-3 text-center">
            <p className="font-mono text-xs text-text-tertiary">Control</p>
            <p className="heading-font text-lg font-bold text-text-secondary">2.1%</p>
          </div>
          <span className="text-xl text-brand-mid">&rarr;</span>
          <div className="flex-1 rounded-md border border-brand-mid/20 bg-brand-dark/10 p-3 text-center">
            <p className="font-mono text-xs text-brand-mid">Variant B</p>
            <p className="heading-font text-lg font-bold text-brand-mid">5.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StateAnalytics() {
  const rows = [
    { channel: "Google Ads", leads: 142, cpa: "\u00a318", trend: "\u2193" },
    { channel: "Meta Ads", leads: 89, cpa: "\u00a324", trend: "\u2193" },
    { channel: "Organic SEO", leads: 203, cpa: "\u00a30", trend: "\u2191" },
    { channel: "AEO", leads: 47, cpa: "\u00a30", trend: "\u2191" },
  ];

  return (
    <div className="mx-auto max-w-lg">
      <div className="overflow-hidden rounded-lg border border-glass-border bg-glass-bg">
        <div className="grid grid-cols-4 gap-px bg-glass-border text-center font-mono text-[11px] uppercase tracking-widest text-brand-mid">
          <div className="bg-bg-secondary p-3">Channel</div>
          <div className="bg-bg-secondary p-3">Leads</div>
          <div className="bg-bg-secondary p-3">CPA</div>
          <div className="bg-bg-secondary p-3">Trend</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.channel}
            className="grid grid-cols-4 gap-px bg-glass-border text-center text-sm transition-all duration-500"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="bg-bg-secondary p-3 text-left font-medium text-text-primary">{r.channel}</div>
            <div className="bg-bg-secondary p-3 text-text-secondary">{r.leads}</div>
            <div className="bg-bg-secondary p-3 text-text-secondary">{r.cpa}</div>
            <div className="bg-bg-secondary p-3 text-brand-mid">{r.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STATE_VISUALS = [StateROAS, StateOrganic, StateAEO, StateCRO, StateAnalytics];

/* ─── Main component ─── */

interface MarketingSuccessProps extends React.ComponentPropsWithoutRef<"section"> {}

export function MarketingSuccess({ className, ...props }: MarketingSuccessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeState, setActiveState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleScroll = useCallback(() => {
    if (isMobile || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));
    const stateIndex = Math.min(STATES.length - 1, Math.floor(progress * STATES.length));
    setActiveState(stateIndex);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile]);

  const ActiveVisual = STATE_VISUALS[activeState];

  /* ─── Mobile: tabbed interface ─── */
  if (isMobile) {
    return (
      <section className={cn("relative py-24", className)} {...props}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            headline="What Marketing Success Looks Like"
            highlightedWord="Success"
            description="Real metrics from real marketing projects. Scroll through what we deliver."
          />

          <div className="mb-8 flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STATES.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className={cn(
                  "min-h-[44px] shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-xs transition-all",
                  activeState === i
                    ? "border-brand-mid bg-brand-dark/30 text-brand-light"
                    : "border-glass-border text-text-secondary",
                )}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            <div className="mb-6 text-center">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-brand-mid">
                {STATES[activeState].pillar}
              </p>
              <h3 className="heading-font text-2xl font-bold text-text-primary">
                {STATES[activeState].title}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                {STATES[activeState].description}
              </p>
            </div>
            <ActiveVisual />
          </div>
        </div>
      </section>
    );
  }

  /* ─── Desktop: sticky scroll panel ─── */
  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ height: `${STATES.length * 100}vh` }}
      {...props}
    >
      <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionHeader
            headline="What Marketing Success Looks Like"
            highlightedWord="Success"
            description="Real metrics from real marketing projects. Scroll through what we deliver."
            className="mb-6 md:mb-8"
          />

          <div className="mb-6 flex items-center justify-center gap-3">
            {STATES.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!sectionRef.current) return;
                  const sectionTop = sectionRef.current.offsetTop;
                  const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
                  const targetScroll = sectionTop + (i / STATES.length) * sectionHeight;
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  activeState === i ? "scale-125 bg-brand-mid" : "bg-glass-border hover:bg-brand-mid/30",
                )}
                aria-label={`Go to state ${i + 1}: ${s.title}`}
              />
            ))}
          </div>

          <div className="mb-4 text-center">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-brand-mid">
              {STATES[activeState].pillar}
            </p>
            <h3 className="heading-font text-xl font-bold text-text-primary md:text-2xl">
              {STATES[activeState].title}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
              {STATES[activeState].description}
            </p>
          </div>
          <div className="min-h-[220px]">
            <ActiveVisual key={activeState} />
          </div>
        </div>
      </div>
    </section>
  );
}
