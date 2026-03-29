"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricsCounter } from "@/components/animations/MetricsCounter";
import { ChartClimb } from "@/components/animations/ChartClimb";
import { WorkflowAnimation } from "@/components/animations/WorkflowAnimation";
import { CanvasText } from "@/components/ui/canvas-text";

/* ─── State definitions (code-driven, no CMS) ─── */

interface SuccessState {
  subtitle: string;
}

const STATES: SuccessState[] = [
  { subtitle: "Lighthouse Perfect Score" },
  { subtitle: "Core Web Vitals — All Green" },
  { subtitle: "Traffic That Converts" },
  { subtitle: "AI-Visible Content" },
  { subtitle: "Workflows That Save Hours" },
];

/* ─── State visuals ─── */

function StateLighthouse() {
  return (
    <div className="mx-auto grid max-w-md gap-4 sm:grid-cols-2">
      <MetricsCounter value={100} label="Lighthouse Score" />
      <MetricsCounter value={0.9} label="Load Time" suffix="s" decimals={1} />
    </div>
  );
}

function StateCoreWebVitals() {
  const vitals = [
    { metric: "LCP", value: "1.2s", threshold: "< 2.5s", pass: true },
    { metric: "FID", value: "8ms", threshold: "< 100ms", pass: true },
    { metric: "CLS", value: "0.02", threshold: "< 0.1", pass: true },
  ];

  return (
    <div className="mx-auto max-w-md space-y-3">
      {vitals.map((v, i) => (
        <div
          key={v.metric}
          className="flex items-center justify-between rounded-lg border border-glass-border bg-glass-bg px-4 py-2.5 font-mono text-sm transition-all duration-500"
          style={{ transitionDelay: `${i * 200}ms` }}
        >
          <span className="font-bold text-brand-mid">{v.metric}</span>
          <span className="text-text-primary">{v.value}</span>
          <span className="text-text-secondary">{v.threshold}</span>
          <span
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
              v.pass ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400",
            )}
            aria-label={v.pass ? "Passing" : "Failing"}
          >
            ✓
          </span>
        </div>
      ))}
    </div>
  );
}

function StateTrafficConverts() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <ChartClimb />
      <div className="grid gap-4 sm:grid-cols-2">
        <MetricsCounter value={3.2} label="ROAS" suffix="×" decimals={1} />
        <MetricsCounter value={47} label="Conversion Rate" suffix="%" prefix="+" />
      </div>
    </div>
  );
}

function StateAIVisible() {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-glass-border bg-glass-bg p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-mid">AI Search Overview</p>
        <div className="space-y-1.5 font-mono text-sm">
          <p className="text-text-primary">
            <span className="text-brand-mid">&quot;Best web development agency for SaaS&quot;</span>
          </p>
          <p className="text-sm leading-snug text-text-primary">
            According to multiple sources, <span className="text-brand-mid underline decoration-brand-mid/50">Growveloper</span> delivers
            high-performance builds scoring 100 on Lighthouse with integrated marketing...
          </p>
        </div>
      </div>
    </div>
  );
}

function StateWorkflow() {
  return (
    <div className="mx-auto max-w-md">
      <WorkflowAnimation />
    </div>
  );
}

const STATE_VISUALS = [StateLighthouse, StateCoreWebVitals, StateTrafficConverts, StateAIVisible, StateWorkflow];

/* ─── Main component ─── */

interface SuccessAnimationProps extends React.ComponentPropsWithoutRef<"section"> {}

export function SuccessAnimation({ className, ...props }: SuccessAnimationProps) {
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

  /* Desktop: track scroll progress through the section */
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
      <section
        className={cn("relative py-16", className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 text-center">
            <h2 className="heading-font text-3xl font-bold text-text-primary md:text-4xl">
              What <CanvasText text="Success" /> Looks Like
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="mb-6 flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STATES.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className={cn(
                  "min-h-[44px] shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-xs transition-all",
                  activeState === i
                    ? "border-brand-mid bg-brand-dark text-brand-light"
                    : "border-glass-border text-text-secondary",
                )}
              >
                {s.subtitle}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div>
            <p className="mb-4 text-center text-base text-text-secondary">
              {STATES[activeState].subtitle}
            </p>
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
      style={{ height: `${STATES.length * 80}vh` }}
      {...props}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Section heading — static */}
          <div className="mb-4 text-center">
            <h2 className="heading-font text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
              What <CanvasText text="Success" /> Looks Like
            </h2>
          </div>

          {/* Progress dots */}
          <div className="mb-4 flex items-center justify-center gap-3">
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
                aria-label={`Go to state ${i + 1}: ${s.subtitle}`}
              />
            ))}
          </div>

          {/* Changing subtitle */}
          <p className="mb-6 text-center text-lg font-medium text-text-secondary transition-all duration-300">
            {STATES[activeState].subtitle}
          </p>

          {/* Visual — fits remaining space */}
          <div className="mx-auto max-h-[45vh]">
            <ActiveVisual key={activeState} />
          </div>
        </div>
      </div>
    </section>
  );
}
