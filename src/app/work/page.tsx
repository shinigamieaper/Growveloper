import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Our Work — GROWVELOPER",
  description:
    "Real projects. Real results. See how development and marketing working as one system compounds growth.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}