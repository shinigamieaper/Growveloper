"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LogoLoop } from "@/components/ui/logo-loop";
import { AUTOMATION_TOOL_ICON_MAP } from "@/components/shared/AutomationToolIcons";
import type { LogoNodeItem } from "@/components/ui/logo-loop";
import type { AboutSkillsToolsData } from "@/lib/types";

const ROTATIONS = [-2, 1.5, -1, 2.5, -3, 0.5];

function buildLogoItems(tools: string[]): LogoNodeItem[] {
  return tools.map((tool) => {
    const Icon =
      AUTOMATION_TOOL_ICON_MAP[tool] ??
      AUTOMATION_TOOL_ICON_MAP[tool.split(" ")[0]];

    return {
      node: (
        <span className="inline-flex items-center gap-2.5 rounded-2xl border border-glass-border bg-glass-bg px-5 py-3 backdrop-blur-sm">
          {Icon ? (
            <Icon className="h-5 w-5 text-brand-mid" />
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-mid/20 font-mono text-[10px] font-bold text-brand-mid">
              {tool.charAt(0)}
            </span>
          )}
          <span className="whitespace-nowrap text-sm text-text-primary">
            {tool}
          </span>
        </span>
      ),
      ariaLabel: tool,
    };
  });
}

interface AboutSkillsToolsProps {
  data: AboutSkillsToolsData | null;
}

export function AboutSkillsTools({ data }: AboutSkillsToolsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const logos = useMemo(() => {
    if (!data) return [];
    return buildLogoItems(data.disciplines[activeIndex].tools);
  }, [data, activeIndex]);

  if (!data) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeader
        headline={data.headline}
        highlightedWord={data.highlightedWord}
        alignment="left"
        label={null}
        description={null}
      />

      {/* Skill pills — clickable */}
      <div className="mt-10 flex flex-wrap gap-3">
        {data.disciplines.map((d, i) => (
          <button
            key={d.name}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "rounded-full px-5 py-2 text-sm transition-all duration-200",
              activeIndex === i
                ? "bg-brand-mid text-bg-primary shadow-lg shadow-brand-mid/20"
                : "border border-glass-border bg-glass-bg text-text-secondary hover:text-text-primary backdrop-blur-sm",
            )}
            style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Tools — LogoLoop */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LogoLoop
              logos={logos}
              speed={50}
              logoHeight={44}
              gap={12}
              pauseOnHover
              fadeOut
              scaleOnHover
              ariaLabel={`Tools for ${data.disciplines[activeIndex].name}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
