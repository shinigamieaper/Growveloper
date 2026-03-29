import type { Metadata } from "next";
import { LabPageClient } from "./LabPageClient";

export const metadata: Metadata = {
  title: "The Lab \u2014 GROWVELOPER",
  description:
    "Blog posts, breakdowns, and video content on development, marketing, and automation.",
};

export default function LabPage() {
  return <LabPageClient />;
}
