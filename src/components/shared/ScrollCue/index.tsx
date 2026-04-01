"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollCueProps extends React.ComponentPropsWithoutRef<"div"> {
  text?: string;
  targetId: string;
  spinDuration?: number;
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
});

export function ScrollCue({
  text = "EXPLORE OUR WORK · EXPLORE OUR WORK · ",
  targetId,
  spinDuration = 20,
  className,
  ...props
}: ScrollCueProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    if (prefersReduced) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, controls, rotation, prefersReduced]);

  const handleHoverStart = () => {
    if (prefersReduced) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration / 4, start),
    });
  };

  const handleHoverEnd = () => {
    if (prefersReduced) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: navigate to work page if target doesn't exist
      window.location.href = "/work";
    }
  };

  return (
    <div
      className={cn("relative flex items-center justify-center py-12", className)}
      {...props}
    >
      <button
        onClick={handleClick}
        className="relative flex h-[140px] w-[140px] cursor-pointer items-center justify-center md:h-[160px] md:w-[160px]"
        aria-label={`Scroll to ${targetId}`}
      >
        {/* Spinning text ring */}
        <motion.div
          className="absolute inset-0"
          style={{ rotate: rotation }}
          initial={{ rotate: 0 }}
          animate={controls}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          {letters.map((letter, i) => {
            const rotationDeg = (360 / letters.length) * i;
            const radius = 60;
            const angle = (rotationDeg * Math.PI) / 180;
            const x = Math.round(radius * Math.cos(angle - Math.PI / 2) * 100) / 100;
            const y = Math.round(radius * Math.sin(angle - Math.PI / 2) * 100) / 100;

            return (
              <span
                key={`${letter}-${i}`}
                className="absolute left-1/2 top-1/2 text-[11px] font-bold uppercase tracking-[0.15em] text-text-secondary md:text-xs"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </motion.div>

        {/* Center arrow */}
        <svg
          className="relative z-10 h-6 w-6 text-brand-mid transition-transform hover:translate-y-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
