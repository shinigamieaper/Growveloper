"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  Brain,
  Search,
  Megaphone,
  PenTool,
  FlaskConical,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
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

/* ─── Marketing platform inline SVGs for bento footer strip ─── */

function BentoGoogleAdsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.907 8.907 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
    </svg>
  );
}

function BentoMetaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M16.5 8.5c-1.3 0-2.4.7-3.2 1.8L12 12l-1.3-1.7C9.9 9.2 8.8 8.5 7.5 8.5 5 8.5 3 10.7 3 13.5s2 5 4.5 5c1.3 0 2.4-.7 3.2-1.8L12 15l1.3 1.7c.8 1.1 1.9 1.8 3.2 1.8 2.5 0 4.5-2.2 4.5-5s-2-5-4.5-5zm-9 8c-1.4 0-2.5-1.3-2.5-3s1.1-3 2.5-3c.8 0 1.5.5 2 1.3l1 1.7-1 1.7c-.5.8-1.2 1.3-2 1.3zm9 0c-.8 0-1.5-.5-2-1.3l-1-1.7 1-1.7c.5-.8 1.2-1.3 2-1.3 1.4 0 2.5 1.3 2.5 3s-1.1 3-2.5 3z" />
    </svg>
  );
}

function BentoGA4Icon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.372 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zM4.296 15.108a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V7.704a.96.96 0 011.92 0v8.592a.96.96 0 01-.96.96zm4.296-4.296a.96.96 0 01-.96-.96v-4.296a.96.96 0 011.92 0V12a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96z" />
    </svg>
  );
}

function BentoGTMIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6zm-1.44 16.348l-3.838-3.838 1.16-1.16 2.678 2.678 5.756-5.756 1.16 1.16z" />
    </svg>
  );
}

function BentoHubSpotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M22.162 6.254a3.373 3.373 0 00-1.534-2.855 3.37 3.37 0 00-3.264-.177V2.1a1.1 1.1 0 00-2.2 0v2.72a3.384 3.384 0 00-1.386 5.503l-4.478 4.957A3.367 3.367 0 007.4 15a3.384 3.384 0 000 6.768A3.384 3.384 0 0010.784 18a3.369 3.369 0 00-.902-2.299l4.48-4.958a3.38 3.38 0 003.503-.226l1.928 1.928a1.1 1.1 0 001.556-1.556l-1.93-1.929a3.374 3.374 0 00.743-2.706zM7.4 19.7a1.184 1.184 0 110-2.368A1.184 1.184 0 017.4 19.7zm10.264-11.085a1.184 1.184 0 110-2.368 1.184 1.184 0 010 2.368z" />
    </svg>
  );
}

function BentoSemrushIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16A8 8 0 0112 20zm1-5.5c0 .83-.67 1.5-1.5 1.5h-2a.5.5 0 010-1h2a.5.5 0 000-1h-1a1.5 1.5 0 010-3h2a.5.5 0 010 1h-2a.5.5 0 000 1h1c.83 0 1.5.67 1.5 1.5z" />
    </svg>
  );
}

function BentoAhrefsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      <path d="M10.5 8H9v1.5H7.5v1H9V12h1.5v-1.5H12v-1h-1.5z" />
    </svg>
  );
}

function BentoShopifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M15.337 23.979l6.21-1.347s-2.233-15.07-2.249-15.168c-.017-.099-.099-.165-.181-.165-.083 0-1.654-.033-1.654-.033s-1.099-1.082-1.232-1.198v18.911zM13.786 5.028s-.776-.231-1.719-.231c-2.752 0-4.075 1.719-4.075 3.356 0 1.852 1.164 2.728 2.27 3.505 1.082.759 1.456 1.321 1.456 2.08 0 1.016-.809 1.479-1.726 1.479-1.19 0-1.818-.744-1.818-.744l-.463 2.08s.694.429 1.884.429c2.62 0 4.289-1.736 4.289-3.686 0-1.983-1.24-2.943-2.258-3.654-1.017-.71-1.479-1.214-1.479-2.014 0-.661.479-1.19 1.38-1.19.876 0 1.479.24 1.479.24l.48-2.15zM11.67 2.794A2.099 2.099 0 009.902 4.18l2.876.595c-.215-.843-.826-1.915-1.108-1.981zM8.208 23.98l-5.447-1.347.727-4.091 5.959-.727-.396 5.876-.843.289z" />
    </svg>
  );
}

const BENTO_TOOL_ICON_MAP: Record<string, React.ComponentType> = {
  "Google Ads": BentoGoogleAdsIcon,
  "Meta Ads": BentoMetaIcon,
  "GA4": BentoGA4Icon,
  "GTM": BentoGTMIcon,
  "HubSpot": BentoHubSpotIcon,
  "Semrush": BentoSemrushIcon,
  "Ahrefs": BentoAhrefsIcon,
  "Shopify": BentoShopifyIcon,
};

function buildLogoItems(tools: { name: string }[]) {
  return tools.map((t) => {
    const Icon = BENTO_TOOL_ICON_MAP[t.name];
    return {
      node: (
        <div className="flex items-center gap-2">
          {Icon && <span className="text-brand-mid"><Icon /></span>}
          <span className="font-mono text-xs text-text-secondary">{t.name}</span>
        </div>
      ),
      ariaLabel: t.name,
    };
  });
}

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  search: Search,
  megaphone: Megaphone,
  "pen-tool": PenTool,
  flask: FlaskConical,
  "bar-chart": BarChart3,
};

/* ─── Visual skeletons per sub-service ─── */

function SkeletonAEO() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          ChatGPT Response
        </p>
        <div className="font-mono text-xs leading-relaxed">
          <p className="mb-2 text-brand-mid">&quot;Best marketing agency for SaaS?&quot;</p>
          {isInView && (
            <TypeAnimation
              sequence={[
                500,
                "According to multiple sources, ",
                300,
                "According to multiple sources, your brand is consistently recommended for integrated growth marketing, combining SEO, paid media, and AI engine optimisation...",
              ]}
              wrapper="p"
              speed={70}
              cursor={true}
              className="text-text-secondary [&_.type-animation-cursor]:text-brand-mid"
            />
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Perplexity Citation
        </p>
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-text-secondary">
            Sources: growveloper.com, G2 Reviews
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-full bg-brand-mid/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-mid"
          >
            High Confidence
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function SkeletonSEO() {
  const rankings = [
    { keyword: "saas marketing agency", pos: 3, change: 12 },
    { keyword: "growth marketing uk", pos: 5, change: 8 },
    { keyword: "b2b lead generation", pos: 7, change: 15 },
    { keyword: "ai marketing services", pos: 2, change: 21 },
  ];

  return (
    <div className="space-y-2">
      {rankings.map((r, i) => (
        <motion.div
          key={r.keyword}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between rounded-lg border border-glass-border bg-bg-tertiary px-4 py-3 font-mono text-xs"
        >
          <span className="text-text-secondary">{r.keyword}</span>
          <span className="font-bold text-text-primary">#{r.pos}</span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 300 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-0.5 rounded-full bg-brand-mid/10 px-2 py-0.5 font-bold text-brand-mid"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="fill-current" aria-hidden>
              <path d="M5 1L9 6H1L5 1Z" />
            </svg>
            +{r.change}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

const PAID_ADS_DATA = [
  { month: "Jan", spend: 2800, revenue: 5200 },
  { month: "Feb", spend: 3200, revenue: 7100 },
  { month: "Mar", spend: 2900, revenue: 8400 },
  { month: "Apr", spend: 3500, revenue: 11200 },
  { month: "May", spend: 3100, revenue: 13800 },
  { month: "Jun", spend: 3400, revenue: 16500 },
  { month: "Jul", spend: 3600, revenue: 19200 },
  { month: "Aug", spend: 3800, revenue: 24100 },
];

function SkeletonPaidAds() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimated(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          ROAS Performance
        </p>
        {animated && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="rounded-full bg-brand-mid/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-mid"
          >
            ROAS 6.3x
          </motion.span>
        )}
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={animated ? PAID_ADS_DATA : []} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: "var(--text-tertiary)" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="spend"
              radius={[2, 2, 0, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {PAID_ADS_DATA.map((_, i) => (
                <Cell key={i} fill="rgba(90, 177, 177, 0.25)" />
              ))}
            </Bar>
            <Bar
              dataKey="revenue"
              radius={[3, 3, 0, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
              animationBegin={400}
            >
              {PAID_ADS_DATA.map((_, i) => (
                <Cell key={i} fill={i >= 5 ? "#5ab1b1" : "rgba(90, 177, 177, 0.6)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkeletonContent() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const cellTypes = [
    "blog", "social", "email", "empty", "blog",
    "social", "blog", "empty", "social", "email",
    "empty", "blog", "social", "blog", "email",
  ];
  const typeColors: Record<string, string> = {
    blog: "bg-brand-mid/30",
    social: "bg-brand-dark/30",
    email: "bg-brand-light/20",
    empty: "bg-bg-secondary",
  };
  const typeLabels: Record<string, string> = {
    blog: "B",
    social: "S",
    email: "E",
    empty: "",
  };

  return (
    <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Content Calendar
        </p>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-mid" />
          <span className="font-mono text-[9px] text-brand-mid">Publishing</span>
        </motion.div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <div key={d} className="text-center font-mono text-[10px] font-medium text-text-tertiary">
            {d}
          </div>
        ))}
        {cellTypes.map((type, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            viewport={{ once: true }}
            className={cn(
              "flex h-8 items-center justify-center rounded font-mono text-[9px] font-medium transition-colors",
              typeColors[type],
              type !== "empty" && "text-text-tertiary",
            )}
          >
            {typeLabels[type]}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        {[
          { label: "Blog", color: "bg-brand-mid/30" },
          { label: "Social", color: "bg-brand-dark/30" },
          { label: "Email", color: "bg-brand-light/20" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-sm", l.color)} />
            <span className="font-mono text-[9px] text-text-tertiary">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonCRO() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-brand-mid">
        A/B Test Results
      </p>
      <div className="flex items-center gap-4">
        <div className="flex-1 rounded-lg bg-bg-secondary p-4 text-center">
          <p className="font-mono text-[10px] text-text-tertiary">Control</p>
          <p className="heading-font text-2xl font-bold text-text-secondary">
            {isInView ? (
              <CountUpNumber target={2.1} decimals={1} suffix="%" duration={1000} />
            ) : (
              "0.0%"
            )}
          </p>
          {/* Mini progress bar */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "21%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full rounded-full bg-text-tertiary/40"
            />
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="text-2xl text-brand-mid"
        >
          &rarr;
        </motion.span>
        <div className="flex-1 rounded-lg border border-brand-mid/20 bg-brand-dark/10 p-4 text-center">
          <p className="font-mono text-[10px] text-brand-mid">Winner</p>
          <p className="heading-font text-2xl font-bold text-brand-mid">
            {isInView ? (
              <CountUpNumber target={5.4} decimals={1} suffix="%" duration={1200} delay={400} />
            ) : (
              "0.0%"
            )}
          </p>
          {/* Mini progress bar */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "54%" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full rounded-full bg-brand-mid"
            />
          </div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        viewport={{ once: true }}
        className="mt-3 text-center font-mono text-[10px] text-brand-mid"
      >
        +157% conversion lift
      </motion.p>
    </div>
  );
}

const ANALYTICS_SPARKLINE_DATA: Record<string, Array<{ v: number }>> = {
  "Google Ads": [{ v: 20 }, { v: 35 }, { v: 28 }, { v: 45 }, { v: 52 }, { v: 48 }, { v: 65 }],
  "Meta Ads": [{ v: 15 }, { v: 22 }, { v: 30 }, { v: 25 }, { v: 38 }, { v: 42 }, { v: 40 }],
  "Organic": [{ v: 30 }, { v: 42 }, { v: 55 }, { v: 68 }, { v: 85 }, { v: 110 }, { v: 130 }],
  "AEO": [{ v: 2 }, { v: 5 }, { v: 8 }, { v: 14 }, { v: 22 }, { v: 35 }, { v: 47 }],
};

function MiniSparkline({ data }: { data: Array<{ v: number }> }) {
  return (
    <div className="h-5 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-mid)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--color-brand-mid)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="var(--color-brand-mid)"
            strokeWidth={1.5}
            fill="url(#sparkGrad)"
            isAnimationActive={true}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SkeletonAnalytics() {
  const rows = [
    { channel: "Google Ads", leads: "142", cpa: "\u00a318", trend: "\u2193", good: true },
    { channel: "Meta Ads", leads: "89", cpa: "\u00a324", trend: "\u2193", good: true },
    { channel: "Organic", leads: "203", cpa: "\u00a30", trend: "\u2191", good: true },
    { channel: "AEO", leads: "47", cpa: "\u00a30", trend: "\u2191", good: true },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary">
      <div className="grid grid-cols-5 gap-px bg-glass-border text-center font-mono text-[10px] uppercase tracking-widest text-brand-mid">
        <div className="bg-bg-tertiary p-3">Channel</div>
        <div className="bg-bg-tertiary p-3">Leads</div>
        <div className="bg-bg-tertiary p-3">CPA</div>
        <div className="bg-bg-tertiary p-3">7d Trend</div>
        <div className="bg-bg-tertiary p-3">Spark</div>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.channel}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-5 gap-px bg-glass-border text-center text-xs"
        >
          <div className="bg-bg-secondary p-3 text-left font-medium text-text-primary">{r.channel}</div>
          <div className="bg-bg-secondary p-3 text-text-secondary">{r.leads}</div>
          <div className="bg-bg-secondary p-3 text-text-secondary">{r.cpa}</div>
          <div className="bg-bg-secondary p-3 font-bold text-brand-mid">{r.trend}</div>
          <div className="flex items-center justify-center bg-bg-secondary p-1">
            <MiniSparkline data={ANALYTICS_SPARKLINE_DATA[r.channel] ?? []} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Shared count-up utility ─── */

function CountUpNumber({
  target,
  decimals = 0,
  suffix = "",
  duration = 1000,
  delay = 0,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}

const SKELETON_MAP: Record<string, React.ComponentType> = {
  brain: SkeletonAEO,
  search: SkeletonSEO,
  megaphone: SkeletonPaidAds,
  "pen-tool": SkeletonContent,
  flask: SkeletonCRO,
  "bar-chart": SkeletonAnalytics,
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
                    icon={IconComponent}
                    skeleton={Skeleton}
                    className={SPAN_MAP[index] ?? ""}
                  />
                );
              })}
            </div>
            {data.tools && data.tools.length > 0 && (
              <div className="border-t border-glass-border bg-bg-secondary">
                <p className="px-6 pt-5 pb-3 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                  {data.toolsLabel ?? "Platforms"}
                </p>
                <div className="pb-6">
                  <LogoLoop
                    logos={buildLogoItems(data.tools)}
                    speed={50}
                    direction="left"
                    pauseOnHover
                    logoHeight={36}
                    gap={48}
                    ariaLabel="Marketing platforms"
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
      gsap.to(cardRef.current, {
        y: -4,
        duration: DURATION.normal,
        ease: EASE.smooth,
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -3,
        rotate: 6,
        scale: 1.1,
        duration: DURATION.fast,
        ease: EASE.snap,
      });
    }
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: DURATION.normal,
        ease: EASE.smooth,
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: DURATION.fast,
        ease: EASE.snap,
      });
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
