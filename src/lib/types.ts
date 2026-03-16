/* ============================================================
   GROWVELOPER — Shared Type Definitions
   All types exported from this file. Never define types inline.
   ============================================================ */

/* --- Navigation --- */
export interface NavLink {
  label: string;
  url: string;
}

export interface NavDropdownItem {
  label: string;
  url: string;
  highlighted?: boolean;
}

export interface NavigationData {
  serviceLinks: NavDropdownItem[];
  industryLinks: NavDropdownItem[];
  staticLinks: NavLink[];
  ctaLabel: string;
  ctaUrl: string;
}

/* --- Footer --- */
export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterData {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  legalLinks: NavLink[];
  ctaLabel: string;
  ctaUrl: string;
  copyrightText: string;
}

/* --- Site Settings --- */
export interface SiteSettings {
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  socialLinks: SocialLink[];
  contactEmail: string;
  whatsappNumber?: string;
  newsletterHeadline?: string;
  newsletterSubCopy?: string;
}

/* --- Shared CMS Components --- */
export interface CTABannerData {
  headline: string;
  subCopy: string;
  ctaLabel: string;
  ctaDestination: string;
}

export interface MicroCTAData {
  copy: string;
  ctaLabel: string;
  ctaDestination: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/* --- Testimonial --- */
export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar?: string;
  rating: number;
  industry?: string;
  service?: string;
  featured?: boolean;
}

/* --- Case Study --- */
export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyCardData {
  title: string;
  slug: string;
  clientIndustry: string;
  heroImage: string;
  situation: string;
  resultHeadline: string;
  techStack: string[];
  featured?: boolean;
}

/* --- Blog Post --- */
export interface BlogPostCardData {
  title: string;
  slug: string;
  excerpt?: string;
  heroImage?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  readTime?: string;
  platform?: "blog";
}

/* --- Video (Lab) --- */
export interface VideoCardData {
  title: string;
  platform: "youtube" | "tiktok";
  videoUrl: string;
  thumbnail: string;
  description?: string;
  publishedAt: string;
  featuredToggle?: boolean;
}

/* --- Lab Content (union of blog + video) --- */
export type LabContentCard = BlogPostCardData | VideoCardData;

/* --- Resource --- */
export interface ResourceCardData {
  title: string;
  slug: string;
  description: string;
  resourceType: "Template" | "Guide" | "Framework" | "Playbook";
  category: string;
  accessType: "free" | "paid";
  price?: number;
  coverImage?: string;
  featuredToggle?: boolean;
}

/* --- Automation --- */
export interface AutomationCardData {
  title: string;
  slug: string;
  tagline: string;
  accessType: "fixed" | "custom";
  price?: number;
  category: string;
  featured?: boolean;
}

/* --- Industry Page --- */
export interface IndustryServiceCard {
  title: string;
  description: string;
  link: string;
}

export interface IndustryOutcomeStat {
  label: string;
  value: string;
}

/* --- Popup Config --- */
export interface PopupConfig {
  pageReference: string;
  enabled: boolean;
  triggerType: "scroll_depth" | "time_on_page" | "inactivity";
  triggerValue: number;
  offerType: "newsletter" | "lead_magnet" | "consultation" | "audit";
  headline: string;
  subCopy: string;
  ctaLabel: string;
  ctaDestination: string;
}

/* --- Lead (form submission) --- */
export interface LeadSubmission {
  name: string;
  email: string;
  company: string;
  websiteUrl?: string;
  servicesInterested: string[];
  problemStatement: string;
  budgetRange: string;
  timeline: string;
  preferredContact: "email" | "whatsapp" | "call";
  additionalContext?: string;
  submittedAt: string;
}
