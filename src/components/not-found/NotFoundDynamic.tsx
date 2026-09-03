"use client";

import dynamic from "next/dynamic";

/**
 * The 404 page's ASCII/three.js hero effect is purely decorative (a canvas
 * animation that renders nothing without JS). Loading it as a normal static
 * import pulled the full `three` dependency (~120 KiB gzipped) into the root
 * not-found boundary's client reference manifest — which Next.js includes in
 * every route's initial JS, not just the 404 page, since any route can hit
 * notFound(). Deferring it here with `ssr: false` keeps it working exactly
 * the same on the 404 page while removing it from every other page's bundle.
 */
export const ASCIITextClient = dynamic(() => import("@/components/ASCIIText"), {
  ssr: false,
});
