import { Navigation, Footer } from "@/components";
import type { NavigationData, FooterData } from "@/lib/types";

const PLACEHOLDER_NAV: NavigationData = {
  serviceLinks: [
    { label: "Web Development", url: "/services/development" },
    { label: "Growth Marketing", url: "/services/marketing" },
    { label: "AI & Automation", url: "/services/ai" },
    { label: "Growth Audit", url: "/audit", highlighted: true },
  ],
  industryLinks: [
    { label: "SaaS", url: "/industries/saas" },
    { label: "B2B Lead Gen", url: "/industries/b2b" },
    { label: "AI & Tech Startups", url: "/industries/ai-tech" },
    { label: "FinTech", url: "/industries/fintech" },
  ],
  staticLinks: [
    { label: "Work", url: "/work" },
    { label: "The Lab", url: "/lab" },
    { label: "Resources", url: "/resources" },
    { label: "The Brains", url: "/about" },
  ],
  ctaLabel: "Book a Consultation",
  ctaUrl: "/start",
};

const PLACEHOLDER_FOOTER: FooterData = {
  navLinks: [
    { label: "Services", url: "/services/development" },
    { label: "Work", url: "/work" },
    { label: "The Lab", url: "/lab" },
    { label: "Resources", url: "/resources" },
    { label: "The Brains", url: "/about" },
  ],
  socialLinks: [
    { platform: "linkedin", url: "#" },
    { platform: "x", url: "#" },
    { platform: "youtube", url: "#" },
    { platform: "tiktok", url: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
  ],
  ctaLabel: "Book a Consultation",
  ctaUrl: "/start",
  copyrightText: "\u00a9 2025 Growveloper. All rights reserved.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navigation data={PLACEHOLDER_NAV} />
      <main className="pt-16">
        {/* Stage 2 — Homepage sections (Hero, Diagnosis, Services, etc.) */}
      </main>
      <Footer data={PLACEHOLDER_FOOTER} />
    </div>
  );
}
