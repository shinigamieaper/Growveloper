"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";
import type { StickyScrollBottomCta, StickyScrollItem } from "@/lib/types";

interface StickyScrollProps extends React.ComponentPropsWithoutRef<"div"> {
  items: StickyScrollItem[];
  visualContent?: React.ReactNode[];
  bottomCta?: StickyScrollBottomCta;
}

type LottieAnimationData = Record<string, unknown>;

const lottieDataCache = new Map<string, LottieAnimationData>();

function resolveLottieJsonPath(lottiePath: string) {
  return lottiePath.replace("/lottie/", "/lottie-json/").replace(/\.lottie$/i, ".json");
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}

function useLottieAnimationData(lottiePath?: string) {
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAnimationData() {
      if (!lottiePath) {
        setAnimationData(null);
        return;
      }

      const jsonPath = resolveLottieJsonPath(lottiePath);

      if (lottieDataCache.has(jsonPath)) {
        setAnimationData(lottieDataCache.get(jsonPath) ?? null);
        return;
      }

      const response = await fetch(encodeURI(jsonPath));
      if (!response.ok) {
        setAnimationData(null);
        return;
      }

      const data = (await response.json()) as LottieAnimationData;
      lottieDataCache.set(jsonPath, data);

      if (isMounted) {
        setAnimationData(data);
      }
    }

    void loadAnimationData();

    return () => {
      isMounted = false;
    };
  }, [lottiePath]);

  return animationData;
}

function StickyVisualFallback({ item }: { item: StickyScrollItem }) {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <span className="heading-font text-8xl font-black leading-none text-brand-mid/20">
          {item.stepNumber}
        </span>
        {item.icon ? (
          <span className="text-5xl leading-none text-text-primary" aria-hidden="true">
            {item.icon}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function StickyLottieVisual({ lottiePath, playToken }: { lottiePath: string; playToken: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const animationData = useLottieAnimationData(lottiePath);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const playAnimation = useCallback(() => {
    if (prefersReduced) return;
    window.requestAnimationFrame(() => {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    });
  }, [prefersReduced]);

  useEffect(() => {
    if (!animationData || prefersReduced) return;
    playAnimation();
  }, [animationData, playAnimation, playToken, prefersReduced]);

  if (!animationData || prefersReduced) {
    return null;
  }

  return (
    <Lottie
      key={playToken}
      lottieRef={lottieRef}
      animationData={animationData}
      autoplay={false}
      loop={false}
      className="h-full w-full"
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      onDOMLoaded={playAnimation}
      onDataReady={playAnimation}
    />
  );
}

function MobileLottieVisual({ lottiePath }: { lottiePath: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const animationData = useLottieAnimationData(lottiePath);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playAnimation = useCallback(() => {
    if (prefersReduced || hasPlayed || !shouldPlay) return;
    window.requestAnimationFrame(() => {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
      setHasPlayed(true);
    });
  }, [hasPlayed, prefersReduced, shouldPlay]);

  useEffect(() => {
    if (prefersReduced || !containerRef.current || hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldPlay(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasPlayed, prefersReduced]);

  useEffect(() => {
    if (!animationData || prefersReduced || hasPlayed || !shouldPlay) return;
    playAnimation();
  }, [animationData, hasPlayed, playAnimation, prefersReduced, shouldPlay]);

  if (!animationData || prefersReduced) {
    return null;
  }

  return (
    <div ref={containerRef} className="flex min-h-[240px] w-full items-center justify-center">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="h-full w-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        onDOMLoaded={playAnimation}
        onDataReady={playAnimation}
      />
    </div>
  );
}

function BottomCtaStrip({ bottomCta }: { bottomCta: StickyScrollBottomCta }) {
  return (
    <div className="mt-8 w-full border-y border-glass-border py-8 md:py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <h3 className="heading-font text-2xl font-bold text-text-primary md:text-3xl">
            {bottomCta.headline}
          </h3>
          {bottomCta.description ? (
            <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
              {bottomCta.description}
            </p>
          ) : null}
        </div>
        <MovingBorderButton as={Link} href={bottomCta.ctaUrl} borderRadius="9999px">
          {bottomCta.ctaLabel}
        </MovingBorderButton>
      </div>
    </div>
  );
}

function DesktopStickyScroll({ items, visualContent }: { items: StickyScrollItem[]; visualContent?: React.ReactNode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const pinDistance = Math.max(items.length * 80, 100);
    const triggers: ScrollTrigger[] = [];
    const pinTween = gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${pinDistance}%`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const trackTween = gsap.to(track, {
      yPercent: -100 * (items.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${pinDistance}%`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(items.length - 1, Math.max(0, Math.round(self.progress * (items.length - 1))));
          setActiveIndex(nextIndex);
        },
      },
    });

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;

      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        containerAnimation: trackTween,
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      trackTween.scrollTrigger?.kill();
      trackTween.kill();
      pinTween.scrollTrigger?.kill();
      pinTween.kill();
    };
  }, [items.length]);

  const activeItem = items[activeIndex];

  return (
    <div className="hidden lg:block">
      <div ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[45%] items-center justify-center">
          <motion.div
            key={`${activeItem.heading}-${activeIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center p-10"
          >
            {visualContent?.[activeIndex] ? (
              visualContent[activeIndex]
            ) : activeItem.lottiePath ? (
              <StickyLottieVisual
                lottiePath={activeItem.lottiePath}
                playToken={`${activeItem.heading}-${activeIndex}`}
              />
            ) : (
              <StickyVisualFallback item={activeItem} />
            )}
          </motion.div>
        </div>

        <div className="absolute inset-y-0 right-0 w-[55%] overflow-hidden pr-4">
          <div ref={trackRef} className="h-full w-full">
            {items.map((item, index) => (
              <div
                key={`${item.heading}-${index}`}
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
                data-index={index}
                className="flex h-screen items-center"
              >
                <motion.div
                  animate={{ opacity: activeIndex === index ? 1 : 0.4 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <span className="mb-2 block text-sm font-semibold text-brand-mid">
                    {item.stepNumber}
                  </span>
                  <h3 className="heading-font text-4xl font-black uppercase tracking-tight text-text-primary md:text-5xl xl:text-6xl">
                    {item.heading}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                    {item.description}
                  </p>
                  {item.subItems && item.subItems.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {item.subItems.map((subItem) => (
                        <span
                          key={subItem}
                          className="rounded-full border border-glass-border px-3 py-1.5 text-xs font-medium text-text-secondary"
                        >
                          {subItem}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {item.ctaLabel && item.ctaUrl ? (
                    <Link
                      href={item.ctaUrl}
                      className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-mid transition-colors hover:text-brand-light"
                    >
                      {item.ctaLabel}
                    </Link>
                  ) : null}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileStickyScroll({ items, visualContent }: { items: StickyScrollItem[]; visualContent?: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-14">
      {items.map((item, index) => (
        <div key={`${item.heading}-${index}`}>
          <div className="mb-6 flex min-h-[260px] w-full items-center justify-center overflow-hidden">
            {visualContent?.[index] ? (
              visualContent[index]
            ) : item.lottiePath ? (
              <MobileLottieVisual lottiePath={item.lottiePath} />
            ) : (
              <StickyVisualFallback item={item} />
            )}
          </div>
          <span className="mb-2 block text-sm font-semibold text-brand-mid">
            {item.stepNumber}
          </span>
          <h3 className="heading-font text-3xl font-black uppercase tracking-tight text-text-primary">
            {item.heading}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {item.description}
          </p>
          {item.subItems && item.subItems.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.subItems.map((subItem) => (
                <span
                  key={subItem}
                  className="rounded-full border border-glass-border px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  {subItem}
                </span>
              ))}
            </div>
          ) : null}
          {item.ctaLabel && item.ctaUrl ? (
            <Link
              href={item.ctaUrl}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-mid transition-colors hover:text-brand-light"
            >
              {item.ctaLabel}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function StickyScroll({ items, visualContent, bottomCta, className, ...props }: StickyScrollProps) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className={cn("w-full overflow-hidden", className)} {...props}>
      {isMobile ? (
        <MobileStickyScroll items={items} visualContent={visualContent} />
      ) : (
        <DesktopStickyScroll items={items} visualContent={visualContent} />
      )}
      {bottomCta ? <BottomCtaStrip bottomCta={bottomCta} /> : null}
    </div>
  );
}
