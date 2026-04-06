"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  Filter,
  BarChart2,
  MessageCircle,
  GitBranch,
  Database,
  Bell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TypeAnimation } from "react-type-animation";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { SubServicesData } from "@/lib/types";
import LogoLoop from "@/components/ui/logo-loop";

/* ─── AI tool icons from shared module ─── */

import { AUTOMATION_TOOL_ICON_MAP } from "@/components/shared/AutomationToolIcons";

function buildLogoItems(tools: { name: string }[]) {
  return tools.map((t) => {
    const Icon = AUTOMATION_TOOL_ICON_MAP[t.name];
    return {
      node: (
        <div className="flex items-center gap-2">
          {Icon && <span className="text-brand-mid"><Icon className="h-5 w-5" /></span>}
          <span className="font-mono text-xs text-text-secondary">{t.name}</span>
        </div>
      ),
      ariaLabel: t.name,
    };
  });
}

const ICON_MAP: Record<string, LucideIcon> = {
  filter: Filter,
  "bar-chart-2": BarChart2,
  "message-circle": MessageCircle,
  "git-branch": GitBranch,
  database: Database,
  bell: Bell,
};

/* ─── Visual skeletons per automation category ─── */

function SkeletonLeadQual() {
  const steps = [
    { step: "01", label: "Form submitted", detail: "Lead captured via webhook", badge: "New Lead" },
    { step: "02", label: "AI scoring", detail: "Fit analysis running", badge: "Score: 87", highlight: true },
    { step: "03", label: "CRM entry", detail: "Contact created in HubSpot", badge: "Qualified \u2713" },
  ];

  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.25, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 rounded-lg border border-glass-border bg-bg-tertiary px-4 py-2.5"
        >
          <span className="font-mono text-[10px] text-text-tertiary">{s.step}</span>
          <div className="flex-1">
            <p className="font-mono text-xs font-medium text-text-primary">{s.label}</p>
            <p className="font-mono text-[10px] text-text-tertiary">{s.detail}</p>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.25 + 0.15, type: "spring", stiffness: 300 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
              s.highlight
                ? "bg-brand-mid/20 text-brand-mid"
                : "bg-bg-secondary text-text-tertiary",
            )}
          >
            {s.badge}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

const REPORT_DATA = [
  { day: "Mon", v: 14 },
  { day: "Tue", v: 22 },
  { day: "Wed", v: 18 },
  { day: "Thu", v: 31 },
  { day: "Fri", v: 27 },
  { day: "Sat", v: 9 },
  { day: "Sun", v: 5 },
];

function SkeletonReporting() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Weekly Report
        </p>
        {show && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="rounded-full bg-brand-mid/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-mid"
          >
            Sent Mon 09:00 \u2713
          </motion.span>
        )}
      </div>
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={show ? REPORT_DATA : []}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 9, fill: "var(--text-tertiary)" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="v"
              radius={[3, 3, 0, 0]}
              isAnimationActive
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {REPORT_DATA.map((_, i) => (
                <Cell key={i} fill={i === 3 ? "#5ab1b1" : "rgba(90,177,177,0.4)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkeletonChatbot() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-end"
      >
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-brand-dark/20 px-4 py-2.5">
          <p className="font-mono text-xs text-text-secondary">
            What&apos;s your refund policy?
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        viewport={{ once: true }}
        className="flex items-end gap-2"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-mid/20">
          <span className="h-2 w-2 rounded-full bg-brand-mid" />
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-glass-border bg-bg-tertiary px-4 py-2.5">
          {isInView && (
            <TypeAnimation
              sequence={[
                600,
                "We offer a 14-day money-back guarantee. No questions asked.",
              ]}
              wrapper="p"
              speed={75}
              cursor={false}
              className="font-mono text-xs text-text-secondary"
            />
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <span className="rounded-full bg-brand-mid/10 px-3 py-1 font-mono text-[10px] text-brand-mid">
          Response in 0.8s
        </span>
      </motion.div>
    </div>
  );
}

function SkeletonContentPipeline() {
  const stages = [
    { step: "01", label: "Brief generated", sub: "AI-drafted in 90s" },
    { step: "02", label: "SEO outline added", sub: "12 keywords mapped" },
    { step: "03", label: "Draft complete", sub: "1,240 words" },
    { step: "04", label: "Published to CMS", sub: "Live on site" },
  ];

  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.25, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 rounded-lg border border-glass-border bg-bg-tertiary px-4 py-2.5"
        >
          <span className="font-mono text-[10px] text-text-tertiary">{s.step}</span>
          <div className="flex-1">
            <p className="font-mono text-xs text-text-primary">{s.label}</p>
            <p className="font-mono text-[10px] text-text-tertiary">{s.sub}</p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.25 + 0.2, type: "spring", stiffness: 350 }}
            viewport={{ once: true }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-mid/20"
          >
            <svg
              className="h-2.5 w-2.5 text-brand-mid"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M2 5l2 2 4-4" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function SkeletonCRMAutomation() {
  const fields = [
    { label: "Name", value: "Alex Johnson" },
    { label: "Company", value: "TechFlow Inc." },
    { label: "Source", value: "LinkedIn Ad" },
    { label: "Lead Score", value: "92 / 100", highlight: true },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary">
      <div className="border-b border-glass-border px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Contact Created
        </p>
      </div>
      <div className="divide-y divide-glass-border">
        {fields.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-between px-4 py-2.5"
          >
            <span className="font-mono text-[10px] text-text-tertiary">{field.label}</span>
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 + 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "font-mono text-xs",
                field.highlight ? "font-bold text-brand-mid" : "text-text-primary",
              )}
            >
              {field.value}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        viewport={{ once: true }}
        className="border-t border-glass-border px-4 py-2.5"
      >
        <p className="font-mono text-[10px] text-brand-mid">Synced to HubSpot \u2713</p>
      </motion.div>
    </div>
  );
}

function SkeletonAlerts() {
  const alerts = [
    { metric: "Conversion rate drop", change: "\u221218%", time: "2 min ago", hot: true },
    { metric: "CPA spike detected", change: "+42%", time: "14 min ago", hot: true },
    { metric: "AEO citation added", change: "New mention", time: "1h ago", hot: false },
  ];

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => (
        <motion.div
          key={alert.metric}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 rounded-lg border border-glass-border bg-bg-tertiary px-4 py-2.5"
        >
          <motion.span
            animate={alert.hot ? { scale: [1, 1.15, 1] } : {}}
            transition={{ delay: i * 0.2 + 0.4, duration: 0.3 }}
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
              alert.hot
                ? "bg-red-500/15 text-red-400"
                : "bg-brand-mid/10 text-brand-mid",
            )}
          >
            {alert.change}
          </motion.span>
          <p className="flex-1 font-mono text-xs text-text-primary">{alert.metric}</p>
          <span className="font-mono text-[10px] text-text-tertiary">{alert.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

const SKELETON_MAP: Record<string, React.ComponentType> = {
  filter: SkeletonLeadQual,
  "message-circle": SkeletonChatbot,
  "bar-chart-2": SkeletonReporting,
  "git-branch": SkeletonContentPipeline,
  database: SkeletonCRMAutomation,
  bell: SkeletonAlerts,
};

/* ─── Bento grid layout (4+2, 3+3) ─── */

const SPAN_MAP: Record<number, string> = {
  0: "col-span-1 lg:col-span-4 border-b lg:border-r border-glass-border",
  1: "col-span-1 lg:col-span-2 border-b border-glass-border",
  2: "col-span-1 lg:col-span-3 lg:border-r border-glass-border",
  3: "col-span-1 lg:col-span-3 border-b lg:border-b-0 border-glass-border",
  4: "col-span-1 lg:col-span-3 lg:border-r border-glass-border",
  5: "col-span-1 lg:col-span-3 border-glass-border",
};

interface SubServicesBentoProps extends React.ComponentPropsWithoutRef<"section"> {
  data: SubServicesData | null;
}

export function SubServicesBento({ data, className, ...props }: SubServicesBentoProps) {
  if (!data || data.items.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <ScrollFadeUp>
          <div className="overflow-hidden rounded-2xl border border-glass-border">
            <div className="grid grid-cols-1 lg:grid-cols-6">
              {data.items.map((item, index) => {
                const IconComponent = item.icon ? ICON_MAP[item.icon] : null;
                const Skeleton = item.icon ? SKELETON_MAP[item.icon] : null;

                return (
                  <BentoCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={IconComponent ?? null}
                    skeleton={Skeleton ?? null}
                    className={SPAN_MAP[index] ?? ""}
                  />
                );
              })}
            </div>
            {data.tools && data.tools.length > 0 && (
              <div className="border-t border-glass-border bg-bg-secondary">
                <p className="px-6 pt-5 pb-3 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                  {data.toolsLabel ?? "Integrations"}
                </p>
                <div className="pb-6">
                  <LogoLoop
                    logos={buildLogoItems(data.tools)}
                    speed={50}
                    direction="left"
                    pauseOnHover
                    logoHeight={36}
                    gap={48}
                    ariaLabel="AI automation tools"
                  />
                </div>
              </div>
            )}
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}

function BentoCard({
  title,
  description,
  icon: IconComponent,
  skeleton: Skeleton,
  className,
}: {
  title: string;
  description: string;
  icon: LucideIcon | null;
  skeleton: React.ComponentType | null;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const handleMouseEnter = useCallback(() => {
    if (reduced) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -4, duration: DURATION.normal, ease: EASE.smooth });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { y: -3, rotate: 6, scale: 1.1, duration: DURATION.fast, ease: EASE.snap });
    }
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: DURATION.normal, ease: EASE.smooth });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { y: 0, rotate: 0, scale: 1, duration: DURATION.fast, ease: EASE.snap });
    }
  }, [reduced]);

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden bg-bg-secondary p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-mid/5",
        !reduced && "will-change-transform",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {IconComponent && (
        <div
          ref={iconRef}
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark/10"
        >
          <IconComponent className="h-6 w-6 text-brand-mid" strokeWidth={1.8} aria-hidden />
        </div>
      )}

      <h3 className="heading-font text-xl font-bold tracking-tight text-text-primary md:text-2xl">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
        {description}
      </p>

      {Skeleton && (
        <div className="mt-5 flex-1">
          <Skeleton />
        </div>
      )}
    </article>
  );
}
