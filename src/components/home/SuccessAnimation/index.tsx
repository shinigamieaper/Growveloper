"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricsCounter } from "@/components/animations/MetricsCounter";
import { ChartClimb } from "@/components/animations/ChartClimb";
import { WorkflowAnimation } from "@/components/animations/WorkflowAnimation";
import { CanvasText } from "@/components/ui/canvas-text";
import type {
  SuccessMetricItem,
  SuccessStateData,
  SuccessStateVital,
} from "@/lib/types";

/* ─── Hardcoded fallback states (used when no CMS data) ─── */

const FALLBACK_STATES: SuccessStateData[] = [
  {
    subtitle: "Lighthouse Perfect Score",
    stateType: "metrics",
    metrics: [
      { label: "Lighthouse Score", value: 100 },
      { label: "Load Time", value: 0.9, suffix: "s", decimals: 1 },
    ],
  },
  {
    subtitle: "Core Web Vitals — All Green",
    stateType: "webvitals",
    vitals: [
      { metric: "LCP", value: "1.2s", threshold: "< 2.5s", pass: true },
      { metric: "FID", value: "8ms", threshold: "< 100ms", pass: true },
      { metric: "CLS", value: "0.02", threshold: "< 0.1", pass: true },
    ],
  },
  {
    subtitle: "Traffic That Converts",
    stateType: "traffic",
    metrics: [
      { label: "ROAS", value: 3.2, suffix: "×", decimals: 1 },
      { label: "Conversion Rate", value: 47, suffix: "%", prefix: "+" },
    ],
  },
  {
    subtitle: "AI-Visible Content",
    stateType: "ai-visible",
    searchQuery: "Best web development agency for SaaS",
    searchResponse:
      'According to multiple sources, Growveloper delivers high-performance builds scoring 100 on Lighthouse with integrated marketing...',
    brandMention: "Growveloper",
  },
  {
    subtitle: "Workflows That Save Hours",
    stateType: "workflow",
    workflowSteps: ["Lead In", "Scored", "CRM Entry", "Email Sent", "Task Created"],
    workflowStatValue: 142,
    workflowStatLabel: "Hours Saved Per Month",
    workflowStatSuffix: "+",
  },
];

/* ─── State visuals ─── */

function StateMetrics({ state }: { state: SuccessStateData }) {
  const items = state.metrics ?? [];
  return (
    <div className="mx-auto grid max-w-md gap-4 sm:grid-cols-2">
      {items.map((m) => (
        <MetricsCounter
          key={m.label}
          value={m.value}
          label={m.label}
          suffix={m.suffix}
          prefix={m.prefix}
          decimals={m.decimals}
        />
      ))}
    </div>
  );
}

function StateWebVitals({ vitals }: { vitals: SuccessStateVital[] }) {
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
            {v.pass ? "✓" : "✗"}
          </span>
        </div>
      ))}
    </div>
  );
}

function StateTraffic({ state }: { state: SuccessStateData }) {
  const items = state.metrics ?? [];
  return (
    <div className="mx-auto max-w-md space-y-4">
      <ChartClimb />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((m) => (
          <MetricsCounter
            key={m.label}
            value={m.value}
            label={m.label}
            suffix={m.suffix}
            prefix={m.prefix}
            decimals={m.decimals}
          />
        ))}
      </div>
    </div>
  );
}

function StateAIVisible({ state }: { state: SuccessStateData }) {
  const query = state.searchQuery ?? "Best web development agency for SaaS";
  const response = state.searchResponse ?? "";
  const brand = state.brandMention ?? "Growveloper";

  // Split response around brand mention for highlighting
  const parts = brand && response.includes(brand)
    ? response.split(brand)
    : null;

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-glass-border bg-glass-bg p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-mid">AI Search Overview</p>
        <div className="space-y-1.5 font-mono text-sm">
          <p className="text-text-primary">
            <span className="text-brand-mid">&quot;{query}&quot;</span>
          </p>
          <p className="text-sm leading-snug text-text-primary">
            {parts ? (
              <>
                {parts[0]}
                <span className="text-brand-mid underline decoration-brand-mid/50">{brand}</span>
                {parts[1]}
              </>
            ) : (
              response
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function StateWorkflow({ state }: { state: SuccessStateData }) {
  return (
    <div className="mx-auto max-w-md">
      <WorkflowAnimation
        steps={state.workflowSteps}
        statValue={state.workflowStatValue}
        statLabel={state.workflowStatLabel}
        statSuffix={state.workflowStatSuffix}
      />
    </div>
  );
}

function renderStateVisual(state: SuccessStateData) {
  switch (state.stateType) {
    case "metrics":
      return <StateMetrics state={state} />;
    case "webvitals":
      return <StateWebVitals vitals={state.vitals ?? []} />;
    case "traffic":
      return <StateTraffic state={state} />;
    case "ai-visible":
      return <StateAIVisible state={state} />;
    case "workflow":
      return <StateWorkflow state={state} />;
    default:
      return null;
  }
}

/* ─── Main component ─── */

interface SuccessAnimationProps extends React.ComponentPropsWithoutRef<"section"> {
  /** CMS-driven states — falls back to hardcoded defaults */
  successStates?: SuccessStateData[];
  /** Legacy prop — only used if successStates is empty */
  successMetrics?: SuccessMetricItem[];
  /** Section headline — default "What Success Looks Like" */
  headline?: string;
  /** The highlighted word in the headline — default "Success" */
  highlightedWord?: string;
}

export function SuccessAnimation({
  className,
  successStates,
  successMetrics,
  headline,
  highlightedWord,
  ...props
}: SuccessAnimationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeState, setActiveState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Use CMS states if available, otherwise fallbacks
  const states = successStates && successStates.length > 0
    ? successStates
    : FALLBACK_STATES;

  // Headline parts
  const hlWord = highlightedWord || "Success";
  const headlineText = headline || `What ${hlWord} Looks Like`;
  // Split headline around the highlighted word for rendering
  const hlIndex = headlineText.indexOf(hlWord);
  const beforeHl = hlIndex >= 0 ? headlineText.slice(0, hlIndex) : "";
  const afterHl = hlIndex >= 0 ? headlineText.slice(hlIndex + hlWord.length) : "";
  const hasHl = hlIndex >= 0;

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
    const stateIndex = Math.min(states.length - 1, Math.floor(progress * states.length));
    setActiveState(stateIndex);
  }, [isMobile, states.length]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile]);

  const headlineJSX = (
    <h2 className="heading-font text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
      {hasHl ? (
        <>
          {beforeHl}
          <CanvasText text={hlWord} />
          {afterHl}
        </>
      ) : (
        headlineText
      )}
    </h2>
  );

  /* ─── Mobile: tabbed interface ─── */
  if (isMobile) {
    return (
      <section
        className={cn("relative py-16", className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 text-center">
            {headlineJSX}
          </div>

          {/* Tab buttons */}
          <div className="mb-6 flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {states.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className={cn(
                  "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 font-mono text-xs transition-all",
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
              {states[activeState].subtitle}
            </p>
            {renderStateVisual(states[activeState])}
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
      style={{ height: `${states.length * 80}vh` }}
      {...props}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Section heading — static */}
          <div className="mb-4 text-center">
            {headlineJSX}
          </div>

          {/* Progress dots */}
          <div className="mb-4 flex items-center justify-center gap-3">
            {states.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!sectionRef.current) return;
                  const sectionTop = sectionRef.current.offsetTop;
                  const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
                  const targetScroll = sectionTop + (i / states.length) * sectionHeight;
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
            {states[activeState].subtitle}
          </p>

          {/* Visual — fits remaining space */}
          <div className="mx-auto max-h-[45vh]">
            {renderStateVisual(states[activeState])}
          </div>
        </div>
      </div>
    </section>
  );
}
