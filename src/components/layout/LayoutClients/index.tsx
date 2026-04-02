"use client";

import dynamic from "next/dynamic";
import type { PopupConfig } from "@/lib/types";

// Defer these to client-side only within a Client Component wrapper
// so they don't block static prerendering in the Server Component layout
const PopupController = dynamic(() => import("@/components/layout/PopupController").then((m) => ({ default: m.PopupController })), {
  ssr: false,
});

const ScrollDepthTracker = dynamic(() => import("@/components/layout/ScrollDepthTracker").then((m) => ({ default: m.ScrollDepthTracker })), {
  ssr: false,
});

interface LayoutClientsProps {
  popupConfigs: PopupConfig[];
}

export function LayoutClients({ popupConfigs }: LayoutClientsProps) {
  return (
    <>
      <PopupController configs={popupConfigs} />
      <ScrollDepthTracker />
    </>
  );
}
