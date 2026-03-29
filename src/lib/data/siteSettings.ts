import type { SiteSettings, NavigationData, FooterData } from "@/lib/types";

export const SITE_SETTINGS: SiteSettings = {
  seoTitle: "GROWVELOPER — Growth Engineering for Ambitious Brands",
  seoDescription:
    "We build performance-first websites, marketing systems, and AI automations that turn traffic into revenue. Strategy + Development + Automation under one roof.",
  ogImage: "/og-default.jpg",
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/growveloper" },
    { platform: "linkedin", url: "https://linkedin.com/company/growveloper" },
    { platform: "youtube", url: "https://youtube.com/@growveloper" },
    { platform: "tiktok", url: "https://tiktok.com/@growveloper" },
  ],
  contactEmail: "hello@growveloper.com",
  whatsappNumber: "+447000000000",
  newsletterHeadline: "Growth insights, straight to your inbox.",
  newsletterSubCopy:
    "No fluff. Just the strategies, experiments, and tools we\u2019re actually using.",
};

export const NAVIGATION_DATA: NavigationData = {
  serviceLinks: [
    { label: "Web Development", url: "/services/development" },
    { label: "Growth Marketing", url: "/services/marketing" },
    { label: "AI & Automation", url: "/services/ai", highlighted: true },
  ],
  industryLinks: [
    { label: "SaaS", url: "/industries/saas" },
    { label: "B2B Lead Gen", url: "/industries/b2b" },
    { label: "AI & Tech Startups", url: "/industries/ai-tech" },
    { label: "FinTech", url: "/industries/fintech" },
  ],
  staticLinks: [
    { label: "Audit", url: "/audit" },
    { label: "Automations", url: "/automations" },
    { label: "The Lab", url: "/lab" },
  ],
  ctaLabel: "Free Consultation",
  ctaUrl: "/start",
};

export const FOOTER_DATA: FooterData = {
  navLinks: [
    { label: "Web Development", url: "/services/development" },
    { label: "Growth Marketing", url: "/services/marketing" },
    { label: "AI & Automation", url: "/services/ai" },
    { label: "Audit", url: "/audit" },
    { label: "Automations", url: "/automations" },
    { label: "The Lab", url: "/lab" },
  ],
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/growveloper" },
    { platform: "linkedin", url: "https://linkedin.com/company/growveloper" },
    { platform: "youtube", url: "https://youtube.com/@growveloper" },
    { platform: "tiktok", url: "https://tiktok.com/@growveloper" },
  ],
  legalLinks: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
    { label: "Cookie Policy", url: "/cookies" },
  ],
  ctaLabel: "Book a Free Consultation",
  ctaUrl: "/start",
  copyrightText: "\u00a9 2025 GROWVELOPER. All rights reserved.",
};
