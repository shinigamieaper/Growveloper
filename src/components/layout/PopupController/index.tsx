"use client";

import { usePathname } from "next/navigation";
import { Popup } from "@/components/shared/Popup";
import type { PopupConfig } from "@/lib/types";

interface PopupControllerProps {
  configs: PopupConfig[];
}

export function PopupController({ configs }: PopupControllerProps) {
  const pathname = usePathname();

  // Map Sanity pageReference values to URL path prefixes.
  // pageReference is a short slug like "home", "services-marketing", "lab", etc.
  const matchedConfig = configs.find((cfg) => {
    const ref = cfg.pageReference;
    if (ref === "home") return pathname === "/";
    if (ref === "audit") return pathname === "/audit";
    if (ref === "services-development") return pathname === "/services/development";
    if (ref === "services-marketing") return pathname === "/services/marketing";
    if (ref === "services-ai") return pathname === "/services/ai";
    if (ref === "work") return pathname === "/work" || pathname.startsWith("/work/");
    if (ref === "lab") return pathname === "/lab" || pathname.startsWith("/lab/");
    if (ref === "resources") return pathname === "/resources" || pathname.startsWith("/resources/");
    if (ref === "automations") return pathname === "/automations" || pathname.startsWith("/automations/");
    if (ref === "about") return pathname === "/about";
    if (ref === "start") return pathname === "/start";
    // Industry pages
    if (ref.startsWith("industries-")) return pathname.startsWith("/industries/");
    return false;
  }) ?? null;

  return <Popup config={matchedConfig} />;
}
