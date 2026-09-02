import type { Metadata } from "next";

/* Component playground. Never something a search engine should list. */
export const metadata: Metadata = {
  title: "Component playground",
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
