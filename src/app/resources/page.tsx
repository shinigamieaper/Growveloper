import type { Metadata } from "next";
import { ResourcesPageClient } from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "Resources — GROWVELOPER",
  description:
    "Guides, templates, frameworks, and playbooks for founders who build and market.",
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}
