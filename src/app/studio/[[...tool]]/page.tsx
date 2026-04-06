"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return (
    <div style={{ marginTop: "calc(var(--navbar-height) * -1)" }}>
      <NextStudio config={config} />
    </div>
  );
}
