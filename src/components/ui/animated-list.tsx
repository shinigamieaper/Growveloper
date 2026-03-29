"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedListItemProps {
  children: React.ReactNode;
  delay?: number;
  index: number;
}

function AnimatedListItem({ children, delay = 0, index }: AnimatedListItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <motion.div
      ref={ref}
      data-index={index}
      initial={prefersReduced ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      animate={
        prefersReduced
          ? { scale: 1, opacity: 1 }
          : inView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.85, opacity: 0 }
      }
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedListProps {
  items: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function AnimatedList({ items, staggerDelay = 0.08, className }: AnimatedListProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item, index) => (
        <AnimatedListItem key={index} index={index} delay={index * staggerDelay}>
          {item}
        </AnimatedListItem>
      ))}
    </div>
  );
}
