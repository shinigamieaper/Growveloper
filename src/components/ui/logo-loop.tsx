"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import type { ReactNode, CSSProperties, RefObject } from 'react';

/* ─── Internal config ─── */

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

/* ─── Utilities ─── */

const toCssLength = (value: string | number | undefined): string | undefined =>
  typeof value === 'number' ? `${value}px` : value ?? undefined;

const cx = (...parts: (string | boolean | undefined | null)[]): string =>
  parts.filter(Boolean).join(' ');

/* ─── Public types ─── */

export interface LogoNodeItem {
  node: ReactNode;
  ariaLabel?: string;
  title?: string;
  href?: string;
}

export interface LogoImageItem {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
}

export type LogoItem = LogoNodeItem | LogoImageItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

/* ─── Internal hooks ─── */

const useResizeObserver = (
  callback: () => void,
  elements: RefObject<Element | null>[],
  // passed as a single dep reference — array identity triggers re-run
  _deps: unknown[],
): void => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const obs = new ResizeObserver(callback);
      obs.observe(ref.current);
      return obs;
    });

    callback();
    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, elements, _deps]);
};

const useImageLoader = (
  seqRef: RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  _deps: unknown[],
): void => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;
    const handleLoad = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };

    images.forEach(img => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, _deps]);
};

const useAnimationLoop = (
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
): void => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => { lastTimestampRef.current = null; };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easing = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * deltaTime;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

/* ─── Component ─── */

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === 'up' ? 1 : -1
      : direction === 'left' ? 1 : -1;
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const targetH = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${targetH}px`)
          containerRef.current.style.height = `${targetH}px`;
      }
      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  const deps = useMemo(() => [logos, gap, logoHeight, isVertical], [logos, gap, logoHeight, isVertical]);

  useResizeObserver(
    updateDimensions,
    [containerRef as RefObject<Element | null>, seqRef as RefObject<Element | null>],
    deps,
  );
  useImageLoader(seqRef, updateDimensions, deps);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVariables = useMemo(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
    }),
    [gap, logoHeight, fadeOutColor],
  );

  const rootClasses = useMemo(
    () =>
      cx(
        'relative group',
        isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
        '[--logoloop-gap:32px]',
        '[--logoloop-logoHeight:28px]',
        '[--logoloop-fadeColorAuto:#ffffff]',
        'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
        scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
        className,
      ),
    [isVertical, scaleOnHover, className],
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: string): ReactNode => {
      if (renderItem) {
        return (
          <li
            className={cx(
              'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
              isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
              scaleOnHover && 'overflow-visible group/item',
            )}
            key={key}
            role="listitem"
          >
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = 'node' in item;

      const content = isNodeItem ? (
        <span
          className={cx(
            'inline-flex items-center',
            'motion-reduce:transition-none',
            scaleOnHover &&
              'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120',
          )}
          aria-hidden={!!(item.href && !item.ariaLabel)}
        >
          {(item as LogoNodeItem).node}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={cx(
            'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
            '[-webkit-user-drag:none] pointer-events-none',
            '[image-rendering:-webkit-optimize-contrast]',
            'motion-reduce:transition-none',
            scaleOnHover &&
              'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120',
          )}
          src={(item as LogoImageItem).src}
          srcSet={(item as LogoImageItem).srcSet}
          sizes={(item as LogoImageItem).sizes}
          width={(item as LogoImageItem).width}
          height={(item as LogoImageItem).height}
          alt={(item as LogoImageItem).alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem
        ? ((item as LogoNodeItem).ariaLabel ?? item.title)
        : ((item as LogoImageItem).alt ?? item.title);

      const inner = item.href ? (
        <a
          className={cx(
            'inline-flex items-center no-underline rounded',
            'transition-opacity duration-200 ease-linear',
            'hover:opacity-80',
            'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2',
          )}
          href={item.href}
          aria-label={itemAriaLabel ?? 'logo link'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li
          className={cx(
            'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
            isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
            scaleOnHover && 'overflow-visible group/item',
          )}
          key={key}
          role="listitem"
        >
          {inner}
        </li>
      );
    },
    [isVertical, scaleOnHover, renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className={cx('flex items-center', isVertical && 'flex-col')}
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem, isVertical],
  );

  const containerStyle = useMemo(
    () => ({
      width: isVertical
        ? toCssLength(width) === '100%'
          ? undefined
          : toCssLength(width)
        : toCssLength(width) ?? '100%',
      ...cssVariables,
      ...style,
    }),
    [width, cssVariables, style, isVertical],
  );

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle as CSSProperties}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          {isVertical ? (
            <>
              <div
                aria-hidden
                className={cx(
                  'pointer-events-none absolute inset-x-0 top-0 z-10',
                  'h-[clamp(24px,8%,120px)]',
                  'bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]',
                )}
              />
              <div
                aria-hidden
                className={cx(
                  'pointer-events-none absolute inset-x-0 bottom-0 z-10',
                  'h-[clamp(24px,8%,120px)]',
                  'bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]',
                )}
              />
            </>
          ) : (
            <>
              <div
                aria-hidden
                className={cx(
                  'pointer-events-none absolute inset-y-0 left-0 z-10',
                  'w-[clamp(24px,8%,120px)]',
                  'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]',
                )}
              />
              <div
                aria-hidden
                className={cx(
                  'pointer-events-none absolute inset-y-0 right-0 z-10',
                  'w-[clamp(24px,8%,120px)]',
                  'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]',
                )}
              />
            </>
          )}
        </>
      )}

      <div
        className={cx(
          'flex will-change-transform select-none relative z-0',
          'motion-reduce:transform-none',
          isVertical ? 'flex-col h-max w-full' : 'flex-row w-max',
        )}
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
