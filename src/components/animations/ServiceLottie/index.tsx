"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

interface ServiceLottieProps {
  animationPath: string;
  className?: string;
}

export function ServiceLottie({ animationPath, className = "" }: ServiceLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReduced || !containerRef.current || hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && dotLottieRef.current) {
          dotLottieRef.current.play();
          setHasPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [prefersReduced, hasPlayed]);

  if (prefersReduced) {
    return (
      <div ref={containerRef} className={className}>
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-brand-dark/10">
          <span className="text-sm text-text-tertiary">Animation disabled</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <DotLottieReact
        src={animationPath}
        loop={false}
        autoplay={false}
        dotLottieRefCallback={(dotLottie) => {
          dotLottieRef.current = dotLottie;
        }}
      />
    </div>
  );
}
