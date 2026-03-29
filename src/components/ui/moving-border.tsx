"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export type MovingBorderVariant = "default" | "inverted";

export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  variant = "default",
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  variant?: MovingBorderVariant;
  className?: string;
  [key: string]: unknown;
}) {
  const innerStyles: Record<MovingBorderVariant, string> = {
    default:
      "bg-brand-dark text-base-white",
    inverted:
      "bg-bg-secondary text-brand-dark",
  };

  return (
    <Component
      className={cn(
        "relative min-h-[44px] overflow-hidden bg-transparent p-[1.5px] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95",
        containerClassName,
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8]",
              "bg-[radial-gradient(var(--brand-mid)_40%,transparent_60%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center whitespace-nowrap px-5 py-2.5 text-sm font-semibold antialiased backdrop-blur-xl",
          innerStyles[variant],
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  /* respect prefers-reduced-motion */
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useAnimationFrame((time) => {
    if (prefersReduced) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    const el = pathRef.current;
    if (!el || el.getTotalLength() === 0) return 0;
    return el.getPointAtLength(val).x;
  });
  const y = useTransform(progress, (val) => {
    const el = pathRef.current;
    if (!el || el.getTotalLength() === 0) return 0;
    return el.getPointAtLength(val).y;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
