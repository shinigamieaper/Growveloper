import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — GROWVELOPER",
  description: "Page not found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* 404 page — CMS-driven content in Stage 5 */}
    </main>
  );
}
