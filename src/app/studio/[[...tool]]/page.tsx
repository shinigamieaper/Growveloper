"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Studio is an interactive admin interface — never cache/prerender
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
