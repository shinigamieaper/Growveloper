"use client";

import type { LucideIcon } from "lucide-react";
import {
  Zap,
  TrendingDown,
  TrendingUp,
  Puzzle,
  Bot,
  Target,
  BarChart3,
  BarChart2,
  LineChart,
  Code2,
  Megaphone,
  ShieldCheck,
  Shield,
  Workflow,
  Clock,
  DollarSign,
  Users,
  UserX,
  Eye,
  EyeOff,
  AlertTriangle,
  Layers,
  Link,
  Unlink,
  Search,
  Globe,
  Gauge,
  Wrench,
  Inbox,
  Mail,
  MousePointerClick,
  Repeat,
  RefreshCw,
  ArrowDownRight,
  Flame,
  Lock,
  Unlock,
  Database,
  Brain,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { DiagnosisSectionData, DiagnosisLayoutStyle } from "@/lib/types";

interface DiagnosisCardsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: DiagnosisSectionData | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  // Performance & growth
  zap: Zap,
  rocket: Rocket,
  flame: Flame,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "arrow-down-right": ArrowDownRight,
  gauge: Gauge,
  // Data & analytics
  "bar-chart": BarChart3,
  "bar-chart-2": BarChart2,
  "line-chart": LineChart,
  database: Database,
  // Tech & code
  code: Code2,
  wrench: Wrench,
  layers: Layers,
  workflow: Workflow,
  // Marketing & content
  megaphone: Megaphone,
  search: Search,
  globe: Globe,
  mail: Mail,
  inbox: Inbox,
  "mouse-pointer-click": MousePointerClick,
  // Automation & AI
  bot: Bot,
  brain: Brain,
  repeat: Repeat,
  "refresh-cw": RefreshCw,
  // People & leads
  users: Users,
  "user-x": UserX,
  target: Target,
  // Trust & visibility
  shield: ShieldCheck,
  "shield-plain": Shield,
  eye: Eye,
  "eye-off": EyeOff,
  lock: Lock,
  unlock: Unlock,
  // Connectivity & problems
  puzzle: Puzzle,
  link: Link,
  unlink: Unlink,
  "alert-triangle": AlertTriangle,
  // Time & cost
  clock: Clock,
  "dollar-sign": DollarSign,
  // Ideas
  lightbulb: Lightbulb,
};

const gridClasses: Record<DiagnosisLayoutStyle, string> = {
  "grid-2x2": "grid gap-6 md:grid-cols-2",
  "grid-3col": "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
  "single-col": "flex flex-col gap-6 max-w-2xl mx-auto",
};

export function DiagnosisCards({ data, className, ...props }: DiagnosisCardsProps) {
  if (!data || data.cards.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={data.label}
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <StaggerChildren className={gridClasses[data.layoutStyle]}>
          {data.cards.map((card) => {
            const IconComponent = ICON_MAP[card.icon];
            return (
              <GrowveloperCard
                key={card.headline}
                variant="diagnosis"
                colorScheme="glass-dark"
                headline={card.headline}
                subCopy={card.body}
                icon={
                  IconComponent ? (
                    <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                  ) : null
                }
              />
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
