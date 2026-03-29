"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LampContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export function LampContainer({ children, className, ...props }: LampContainerProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const animateProps = prefersReduced
    ? { opacity: 1, width: "30rem" }
    : undefined;

  const initialWidth = prefersReduced ? "30rem" : "15rem";
  const targetWidth = "30rem";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none relative z-0 flex w-full flex-1 scale-y-125 items-center justify-center pt-20 isolate">
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: initialWidth }}
          whileInView={animateProps ?? { opacity: 1, width: targetWidth }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: "conic-gradient(from 70deg at center top, var(--brand-mid), transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-bg-primary [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-bg-primary [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: initialWidth }}
          whileInView={animateProps ?? { opacity: 1, width: targetWidth }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, var(--brand-mid))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-bg-primary [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-bg-primary [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background blur — semi-transparent so grid shows through */}
        <div className="absolute top-1/2 h-48 w-full max-w-3xl translate-y-12 bg-bg-primary opacity-50 blur-3xl [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />

        {/* Glow orb — large */}
        <div
          className="absolute inset-auto z-30 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: "var(--brand-mid)" }}
        />

        {/* Glow orb — small, brighter */}
        <motion.div
          initial={{ width: prefersReduced ? "16rem" : "8rem" }}
          whileInView={prefersReduced ? undefined : { width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-20 h-28 w-48 -translate-y-[6rem] rounded-full opacity-70 blur-2xl"
          style={{ backgroundColor: "var(--brand-light)" }}
        />

        {/* Horizontal light line */}
        <motion.div
          initial={{ width: prefersReduced ? "30rem" : "15rem" }}
          whileInView={prefersReduced ? undefined : { width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ backgroundColor: "var(--brand-light)" }}
        />

        {/* Top mask — semi-transparent so grid shows through */}
        <div className="absolute inset-auto z-40 h-44 w-full max-w-3xl -translate-y-[12.5rem] bg-bg-primary opacity-70 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_70%)]" />
      </div>

      {/* Content area */}
      <div className="relative z-[60] flex -translate-y-44 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
