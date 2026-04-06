"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import type { AutomationFullData } from "@/lib/types";

interface AutomationHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AutomationFullData;
}

export function AutomationHero({ data, className, ...props }: AutomationHeroProps) {
  const isFixed = data.accessType === "fixed" && data.price != null;

  return (
    <section className={cn("relative", className)} {...props}>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-6 text-center"
        >
          {/* Title */}
          <h1 className="heading-font text-3xl font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            <CanvasText text={data.title} />
          </h1>

          {/* Tagline */}
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {data.tagline}
          </p>
        </motion.div>
      </LampContainer>

      {/* Price card + CTAs — outside LampContainer. No ScrollFadeUp — must be visible on load. */}
      <div className="relative z-60 mx-auto -mt-48 flex max-w-2xl flex-col items-center gap-8 px-6 pb-24">
        <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-glass-border bg-glass-bg px-8 py-6 backdrop-blur-sm">
          {isFixed ? (
            <>
              <span className="font-mono text-3xl font-bold text-brand-mid">
                &pound;{data.price!.toLocaleString()}
              </span>
              <span className="text-sm text-text-tertiary">One-time payment &middot; no subscription</span>
            </>
          ) : (
            <>
              <span className="font-mono text-xl font-bold text-text-primary">
                Custom pricing
              </span>
              <span className="text-sm text-text-tertiary">
                Scoped to your requirements after a free consultation
              </span>
            </>
          )}
          <div className="flex items-center gap-1.5 text-text-tertiary">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            <span className="font-mono text-xs">
              Live in {data.setupTimeDays} {data.setupTimeDays === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticElement strength={0.4}>
            <MovingBorderButton
              as={Link}
              href={isFixed ? `/start?service=ai&automation=${data.slug}` : "/start?service=ai"}
              duration={3000}
              containerClassName="inline-flex"
            >
              {isFixed ? "Get This Automation" : "Book a Free Consultation"}
            </MovingBorderButton>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <MovingBorderButton
              as="a"
              href="#whats-included"
              duration={3500}
              variant="inverted"
              containerClassName="inline-flex"
            >
              See what&apos;s included
            </MovingBorderButton>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}
