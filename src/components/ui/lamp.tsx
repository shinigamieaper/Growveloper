"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LampContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export function LampContainer({ children, className, ...props }: LampContainerProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.matchMedia("(max-width: 639px)").matches);
  }, []);

  const targetWidth = isMobile ? "16rem" : "30rem";
  const initialWidth = prefersReduced ? targetWidth : isMobile ? "8rem" : "15rem";

  const animateProps = prefersReduced
    ? { opacity: 1, width: targetWidth }
    : undefined;

  const smallOrbInitial = prefersReduced ? (isMobile ? "10rem" : "16rem") : isMobile ? "5rem" : "8rem";
  const smallOrbTarget = isMobile ? "10rem" : "16rem";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none relative z-0 flex w-full flex-1 sm:scale-y-125 items-center justify-center pt-20 isolate">
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
          className="absolute inset-auto right-1/2 h-56 w-[16rem] overflow-visible z-10 sm:w-[22rem] md:w-[30rem]"
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
          className="absolute inset-auto left-1/2 h-56 w-[16rem] overflow-visible z-10 sm:w-[22rem] md:w-[30rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-bg-primary [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-bg-primary [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background blur — semi-transparent so grid shows through */}
        <div className="absolute top-1/2 h-48 w-full max-w-3xl translate-y-12 bg-bg-primary opacity-50 blur-3xl z-5 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />

        {/* Glow orb — large */}
        <div
          className="absolute inset-auto z-30 h-36 w-[14rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl sm:w-[20rem] md:w-[28rem]"
          style={{ backgroundColor: "var(--brand-mid)" }}
        />

        {/* Glow orb — small, brighter */}
        <motion.div
          initial={{ width: smallOrbInitial }}
          whileInView={prefersReduced ? undefined : { width: smallOrbTarget }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-20 h-16 w-28 -translate-y-[6rem] rounded-full opacity-70 blur-2xl sm:h-20 sm:w-36 md:h-28 md:w-48"
          style={{ backgroundColor: "var(--brand-light)" }}
        />

        {/* Horizontal light line */}
        <motion.div
          initial={{ width: prefersReduced ? targetWidth : initialWidth }}
          whileInView={prefersReduced ? undefined : { width: targetWidth }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-40 h-0.5 w-[16rem] -translate-y-[7rem] sm:w-[22rem] md:w-[30rem]"
          style={{ backgroundColor: "var(--brand-light)" }}
        />

        {/* Top mask — semi-transparent so grid shows through */}
        <div className="absolute inset-auto z-40 h-44 w-full max-w-3xl -translate-y-[12.5rem] bg-bg-primary opacity-70 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_70%)]" />
      </div>

      {/* Content area */}
      <div className="relative z-[60] flex -translate-y-24 flex-col items-center px-5 sm:-translate-y-32 md:-translate-y-44">
        {children}
      </div>
    </div>
  );
}
