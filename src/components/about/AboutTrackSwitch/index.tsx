"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { AboutTrackKey, AboutTrackTab, AboutViewKey } from "@/lib/types";
import { resolveAboutTrack } from "@/lib/data/aboutTracks";
import styles from "../about.module.css";

export interface AboutTrackSwitchProps extends React.ComponentPropsWithoutRef<"div"> {
  tabs: AboutTrackTab[];
  /** Server-rendered panels, one per view, keyed by view ("all" plus each tab). */
  panels: Record<AboutViewKey, React.ReactNode>;
  initialView: AboutViewKey;
  resetLabel: string;
  prompt: string;
}

const PARAM_FOR: Record<AboutTrackKey, string> = { dev: "dev", marketing: "marketing", growth: "growth" };

/* The chosen side lives in the URL (?track=), read as an external store:
   the server and the first client render see the combined view, then the
   URL takes over with no hydration mismatch. */
const TRACK_EVENT = "about-track-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(TRACK_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(TRACK_EVENT, onChange);
  };
}

function readView(): AboutViewKey {
  return resolveAboutTrack(new URLSearchParams(window.location.search).get("track") ?? undefined) ?? "all";
}

/**
 * Development / Marketing / Growth Engineering. Text-led: the active side
 * gets one teal underline that slides across, nothing else. Every panel is
 * in the HTML (display:none until chosen, via a class rather than the hidden
 * attribute so the pre-hydration deep-link CSS can override it), so crawlers
 * and AI readers see all of it; switching updates ?track= without a reload
 * or a scroll jump.
 */
export function AboutTrackSwitch({
  tabs,
  panels,
  initialView,
  resetLabel,
  prompt,
  className,
  ...props
}: AboutTrackSwitchProps) {
  const view = useSyncExternalStore(subscribe, readView, () => initialView);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Keep the address bar in step without adding history entries. */
  const select = useCallback((next: AboutViewKey) => {
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("track");
    else url.searchParams.set("track", PARAM_FOR[next]);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(TRACK_EVENT));
  }, []);

  /* The inline boot script showed the right side before hydration; the URL
     store has taken over, so clear its mark. */
  useEffect(() => {
    document.documentElement.removeAttribute("data-about-view");
  }, []);

  const activeIndex = tabs.findIndex((t) => t.key === view);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    select(tabs[next].key);
  }

  return (
    <div className={className} {...props}>
      <p className={styles.kicker} id="about-switch-prompt">
        {prompt}
      </p>

      <div role="tablist" aria-labelledby="about-switch-prompt" className={cn(styles.switchRow, "mt-4")}>
        {tabs.map((tab, i) => {
          const selected = tab.key === view;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`about-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`about-panel-${tab.key}`}
              tabIndex={selected || (view === "all" && i === 0) ? 0 : -1}
              onClick={() => select(tab.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={styles.tab}
            >
              {tab.label}
            </button>
          );
        })}
        <span
          aria-hidden="true"
          className={styles.underline}
          style={{
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
            opacity: activeIndex < 0 ? 0 : 1,
          }}
        />
      </div>

      {/* Always takes its row, so nothing moves when a side is chosen; hidden in the combined view. */}
      <div className="flex h-11 items-center justify-end">
        <button
          type="button"
          onClick={() => select("all")}
          className={cn(styles.quietLink, "text-sm", view === "all" && "invisible")}
          aria-hidden={view === "all"}
          tabIndex={view === "all" ? -1 : 0}
        >
          {resetLabel}
        </button>
      </div>

      {(Object.keys(panels) as AboutViewKey[]).map((key) => {
        const isTrack = key !== "all";
        return (
          <div
            key={key}
            id={`about-panel-${key}`}
            {...(isTrack ? { role: "tabpanel", "aria-labelledby": `about-tab-${key}` } : {})}
            className={view === key ? styles.panel : styles.panelOff}
          >
            {panels[key]}
          </div>
        );
      })}
    </div>
  );
}
