"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  Monitor,
  Gauge,
  Database,
  Code2,
  Plug2,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { SubServicesData } from "@/lib/types";
import LogoLoop from "@/components/ui/logo-loop";

/* ─── Tech stack inline SVGs for bento footer strip ─── */

function BentoNextjsIcon() {
  return (
    <svg viewBox="0 0 180 180" className="h-5 w-5" aria-hidden fill="currentColor">
      <mask id="bento-next-m" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white" />
      </mask>
      <g mask="url(#bento-next-m)">
        <circle cx="90" cy="90" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1383V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </g>
    </svg>
  );
}

function BentoVercelIcon() {
  return (
    <svg viewBox="0 0 116 100" className="h-4 w-4" aria-hidden fill="currentColor">
      <path d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
  );
}

function BentoTSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.727-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.009z" />
    </svg>
  );
}

function BentoTailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function BentoSanityIcon() {
  return (
    <svg viewBox="0 0 256 291" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M67.092 89.002c0 23.484 14.071 38.752 42.214 46.028l57.281 15.246c25.357 6.87 41.607 22.811 41.607 48.168 0 5.058-.674 9.712-1.887 14.031C197.83 235.01 173.277 249 141.46 249c-33.699 0-59.998-16.584-68.73-44.393l-1.279 1.818H54l5.8-68.15c17.086 29.083 44.192 43.885 73.274 43.885 24.009 0 40.666-11.262 40.666-27.709 0-14.709-9.678-24.421-36.649-31.425l-54.99-14.439c-26.162-7.007-43.11-23.35-43.11-50.384v-.003c0-3.77.354-7.389 1.013-10.845C48.01 22.53 74.16 7 106.542 7c28.675 0 53.94 12.476 63.68 38.12l.918-1.538H187.7L182.067 109c-15.813-29.9-42.107-44.875-70.243-44.875-26.56 0-44.732 10.44-44.732 24.877z" />
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

function BentoGA4Icon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.372 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zM4.296 15.108a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V7.704a.96.96 0 011.92 0v8.592a.96.96 0 01-.96.96zm4.296-4.296a.96.96 0 01-.96-.96v-4.296a.96.96 0 011.92 0V12a.96.96 0 01-.96.96zm4.296 2.148a.96.96 0 01-.96-.96V9.852a.96.96 0 011.92 0v4.296a.96.96 0 01-.96.96z" />
    </svg>
  );
}

const BENTO_TOOL_ICON_MAP: Record<string, React.ComponentType> = {
  "Next.js": BentoNextjsIcon,
  "Vercel": BentoVercelIcon,
  "TypeScript": BentoTSIcon,
  "Tailwind CSS": BentoTailwindIcon,
  "Sanity": BentoSanityIcon,
  "GTM": BentoGTMIcon,
  "GA4": BentoGA4Icon,
};

function buildLogoItems(tools: { name: string; logo?: string }[]) {
  return tools.map((t) => {
    const Icon = BENTO_TOOL_ICON_MAP[t.name];
    return {
      node: (
        <span className="inline-flex items-center gap-2.5 rounded-2xl border border-glass-border bg-glass-bg px-5 py-3 backdrop-blur-sm">
          {t.logo ? (
            <img src={t.logo} alt={t.name} width={20} height={20} className="h-5 w-5 object-contain logo-tint" aria-hidden />
          ) : Icon ? (
            <span className="h-5 w-5 text-brand-mid" aria-hidden><Icon /></span>
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-mid/20 font-mono text-[10px] font-bold text-brand-mid">
              {t.name.charAt(0)}
            </span>
          )}
          <span className="whitespace-nowrap text-sm text-text-primary">{t.name}</span>
        </span>
      ),
      ariaLabel: t.name,
    };
  });
}

const ICON_MAP: Record<string, LucideIcon> = {
  monitor: Monitor,
  gauge: Gauge,
  database: Database,
  code: Code2,
  plug: Plug2,
  shield: Shield,
};

/* ─── Skeleton: Next.js Performance Builds — Lighthouse dial ─── */

function SkeletonNextjs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(Math.round(eased * 97));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView]);

  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="none"
            stroke={score >= 90 ? "var(--color-brand-mid)" : score >= 50 ? "#eab308" : "#ef4444"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>
        <span className="absolute heading-font text-3xl font-bold text-text-primary">
          {score}
        </span>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
        Performance Score
      </p>
    </div>
  );
}

/* ─── Skeleton: Core Web Vitals — animated metric bars ─── */

function SkeletonCoreWebVitals() {
  const metrics = [
    { label: "LCP", value: "1.2s", target: 78, color: "bg-green-400" },
    { label: "CLS", value: "0.02", target: 92, color: "bg-green-400" },
    { label: "INP", value: "68ms", target: 85, color: "bg-green-400" },
  ];

  return (
    <div className="space-y-3">
      {metrics.map((m, i) => (
        <div key={m.label} className="space-y-1">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="uppercase tracking-widest text-text-tertiary">
              {m.label}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              viewport={{ once: true }}
              className="font-bold text-brand-mid"
            >
              {m.value}
            </motion.span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-bg-tertiary">
            <motion.div
              initial={{ width: "15%", backgroundColor: "rgb(239 68 68)" }}
              whileInView={{
                width: `${m.target}%`,
                backgroundColor: "var(--color-brand-mid)",
              }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Skeleton: CMS Setup — Sanity document tree ─── */

function SkeletonCMS() {
  const fields = [
    { label: "title", type: "string", value: "Growth Marketing..." },
    { label: "hero.headline", type: "text", value: "Marketing that moves..." },
    { label: "hero.cta", type: "string", value: "Book a Consultation" },
    { label: "published", type: "boolean", value: "true" },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-mid" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Sanity Studio
        </p>
      </div>
      <div className="space-y-1.5">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 rounded-md bg-bg-secondary px-3 py-2"
          >
            <span className="shrink-0 font-mono text-[10px] text-brand-mid">
              {f.label}
            </span>
            <span className="truncate font-mono text-[10px] text-text-tertiary">
              {f.value}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="mt-2 ml-3 h-3 w-0.5 bg-brand-mid"
        aria-hidden
      />
    </div>
  );
}

/* ─── Skeleton: GTM & GA4 — dataLayer push animation ─── */

function SkeletonGTM() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Tag Manager
        </p>
        <div className="font-mono text-xs leading-relaxed">
          {isInView && (
            <TypeAnimation
              sequence={[
                400,
                "dataLayer.push({",
                200,
                'dataLayer.push({\n  event: "purchase",',
                200,
                'dataLayer.push({\n  event: "purchase",\n  value: 149.99,',
                200,
                'dataLayer.push({\n  event: "purchase",\n  value: 149.99,\n  currency: "GBP"\n});',
              ]}
              // @ts-expect-error — react-type-animation Wrapper type doesn't include "pre"
              wrapper="pre"
              speed={60}
              cursor={true}
              className="whitespace-pre text-text-secondary [&_.type-animation-cursor]:text-brand-mid"
            />
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 rounded-lg bg-brand-mid/10 px-3 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-brand-mid" />
        <span className="font-mono text-[10px] font-bold text-brand-mid">
          3 Tags Fired Successfully
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Skeleton: API Integrations — req/res chain ─── */

function SkeletonAPI() {
  const endpoints = [
    { method: "GET", path: "/api/products", status: 200, time: "34ms" },
    { method: "POST", path: "/api/orders", status: 201, time: "89ms" },
    { method: "GET", path: "/api/analytics", status: 200, time: "12ms" },
  ];

  return (
    <div className="space-y-2">
      {endpoints.map((ep, i) => (
        <motion.div
          key={ep.path}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between rounded-lg border border-glass-border bg-bg-tertiary px-4 py-3 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-bold",
                ep.method === "GET"
                  ? "bg-brand-mid/15 text-brand-mid"
                  : "bg-brand-dark/15 text-brand-dark",
              )}
            >
              {ep.method}
            </span>
            <span className="text-text-secondary">{ep.path}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.15,
                type: "spring",
                stiffness: 300,
              }}
              viewport={{ once: true }}
              className="rounded-full bg-brand-mid/10 px-2 py-0.5 text-[10px] font-bold text-brand-mid"
            >
              {ep.status}
            </motion.span>
            <span className="text-[10px] text-text-tertiary">{ep.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Skeleton: Ongoing Maintenance — uptime monitor ─── */

function SkeletonMaintenance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const dots = Array.from({ length: 30 }, (_, i) => ({
    status: i === 14 ? "warning" : "ok",
  }));

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-glass-border bg-bg-tertiary p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          Uptime Monitor
        </p>
        {isInView && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="rounded-full bg-brand-mid/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-mid"
          >
            99.9% Uptime
          </motion.span>
        )}
      </div>
      <div className="flex gap-1">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : {}
            }
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className={cn(
              "h-4 flex-1 rounded-sm",
              dot.status === "ok" ? "bg-brand-mid/60" : "bg-yellow-400/60",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-text-tertiary">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

/* ─── Skeleton + icon maps ─── */

const SKELETON_MAP: Record<string, React.ComponentType> = {
  monitor: SkeletonNextjs,
  gauge: SkeletonCoreWebVitals,
  database: SkeletonCMS,
  code: SkeletonGTM,
  plug: SkeletonAPI,
  shield: SkeletonMaintenance,
};

/* ─── Bento grid layout (4+2, 3+3 on lg:6-col) ─── */

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

export function SubServicesBento({
  data,
  className,
  ...props
}: SubServicesBentoProps) {
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
                const IconComponent = item.icon
                  ? ICON_MAP[item.icon]
                  : null;
                const Skeleton = item.icon
                  ? SKELETON_MAP[item.icon]
                  : null;

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
                  {data.toolsLabel ?? "Built with"}
                </p>
                <div className="pb-6">
                  <LogoLoop
                    logos={buildLogoItems(data.tools)}
                    speed={50}
                    direction="left"
                    pauseOnHover
                    logoHeight={36}
                    gap={48}
                    ariaLabel="Tech stack"
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
  const reduced =
    typeof window !== "undefined" ? prefersReducedMotion() : false;

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
          <IconComponent
            className="h-6 w-6 text-brand-mid"
            strokeWidth={1.8}
            aria-hidden
          />
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
