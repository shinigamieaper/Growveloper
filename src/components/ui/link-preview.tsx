"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export function LinkPreview({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) {
  let src: string;
  if (isStatic) {
    src = imageSrc;
  } else {
    /* For non-static mode, use microlink screenshot API */
    const params = new URLSearchParams({
      url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": String(width * 3),
      "viewport.height": String(height * 3),
    });
    src = `https://api.microlink.io/?${params.toString()}`;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {/* Preload image */}
      {isMounted && (
        <span className="hidden">
          {isStatic ? (
            <Image src={src} width={width} height={height} alt="" aria-hidden="true" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={src} width={width} height={height} alt="" aria-hidden="true" />
          )}
        </span>
      )}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => setOpen(open)}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "relative inline-block text-brand-mid font-bold text-[1.05em] no-underline transition-colors hover:text-brand-light",
            className,
          )}
          asChild
        >
          <a href={url}>
            {children}
          </a>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="rounded-xl shadow-xl"
                style={{ x: translateX }}
              >
                <a
                  href={url}
                  className="block rounded-xl border-2 border-transparent bg-bg-secondary p-1 shadow hover:border-glass-border"
                  style={{ fontSize: 0 }}
                >
                  {isStatic ? (
                    <Image
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="Preview"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="Preview"
                    />
                  )}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
}
