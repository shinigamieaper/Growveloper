"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiBurst() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const brandColors = ["#aeeeee", "#5ab1b1", "#2b7575", "#f8f8f8"];

    const fire = (
      particleRatio: number,
      opts: confetti.Options
    ) => {
      confetti({
        ...opts,
        origin: { y: 0.6 },
        colors: brandColors,
        particleCount: Math.floor(200 * particleRatio),
        zIndex: 9999,
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    return () => {
      confetti.reset();
    };
  }, []);

  return null;
}
