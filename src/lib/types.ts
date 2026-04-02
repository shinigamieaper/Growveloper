import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

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
  logo?: string;
  logoDark?: string;
  serviceLinks: NavDropdownItem[];
  industryLinks: NavDropdownItem[];
  staticLinks: NavLink[];
  ctaLabel: string;
  ctaUrl: string;
  servicesLabel?: string;
  industriesLabel?: string;
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
  newsletterHighlightedWord?: string;
  newsletterSubCopy?: string;
  newsletterCtaLabel?: string;
  newsletterSuccessHeadline?: string;
  newsletterSuccessSubCopy?: string;
  newsletterEmailPlaceholder?: string;
}

/* --- GrowveloperCard --- */
export type GrowveloperCardVariant =
  | "industry"
  | "diagnosis"
  | "resource"
  | "automation"
  | "sound-like-you";

export type GrowveloperCardColorScheme =
  | "dark"
  | "glass-dark"
  | "glass-light"
  | "teal-solid"
  | "light-teal";

export interface GrowveloperCardBaseProps {
  variant: GrowveloperCardVariant;
  colorScheme?: GrowveloperCardColorScheme;
  headline: string;
  subCopy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
  tag?: string;
  badge?: string;
  image?: string;
}

export interface GrowveloperCardProps
  extends ComponentPropsWithoutRef<"article">,
    GrowveloperCardBaseProps {}

/* --- Homepage Hero --- */
export interface HomeHeroData {
  socialProofText?: string;
  headline: string;
  highlightedWord?: string;
  subStatement: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  scrollCueText?: string;
  scrollCueTargetId?: string;
}

/* --- Shared CMS Components --- */

export interface SocialProofPillData {
  text: string;
}

export interface DiagnosisCardData {
  icon: string;
  headline: string;
  body: string;
}

export type DiagnosisLayoutStyle = "grid-2x2" | "grid-3col" | "single-col";

export interface DiagnosisSectionData {
  label?: string;
  headline: string;
  highlightedWord?: string;
  description?: string;
  layoutStyle: DiagnosisLayoutStyle;
  cards: DiagnosisCardData[];
}

export type LucideIconComponent = ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;

export interface ServiceRowData {
  pillarName: string;
  outcomeStatement: string;
  subServices: string[];
  link: string;
  visualType?: "dev" | "marketing" | "ai";
}

export interface StickyScrollItem {
  stepNumber: string;
  heading: string;
  description: string;
  subItems?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  lottiePath?: string;
  fallbackGradient?: string;
  icon?: string;
}

export interface StickyScrollBottomCta {
  headline: string;
  description?: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface StickyScrollSectionData {
  sectionLabel?: string;
  headline?: string;
  highlightedWord?: string;
  description?: string;
  items: StickyScrollItem[];
  bottomCta?: StickyScrollBottomCta;
}

export interface IndustryCardData {
  icon: string;
  name: string;
  hookLine: string;
  slug: string;
  ctaLabel?: string;
}

export interface IndustriesGridData {
  label?: string;
  headline: string;
  highlightedWord?: string;
  description?: string;
  industries: IndustryCardData[];
  ctaHeadline: string;
  ctaLabel: string;
  ctaUrl: string;
}

export type CTABannerColorScheme = "teal-solid" | "light-teal" | "glass";

export type CTABannerPresentationMode = "inline" | "section";

export type CTABannerLegacyVariant = "bar" | "block";

export interface CTABannerData {
  headline: string;
  subCopy?: string;
  ctaLabel: string;
  ctaDestination: string;
  highlightedWord?: string;
  colorScheme?: CTABannerColorScheme;
  presentationMode?: CTABannerPresentationMode;
}

export interface CTABannerProps extends ComponentPropsWithoutRef<"section"> {
  data: CTABannerData | null;
  colorScheme?: CTABannerColorScheme;
  presentationMode?: CTABannerPresentationMode;
  variant?: CTABannerLegacyVariant;
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

/* --- Success Animation Metrics --- */
export interface SuccessMetricItem {
  stateIndex: number;
  pillar: string;
  metricLabel: string;
  metricValue: number;
  metricSuffix?: string;
  metricPrefix?: string;
  decimals?: number;
}

/* --- Stats --- */
export interface StatsBandItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

/* --- Case Study --- */
export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyCardData {
  title: string;
  slug: string;
  tags?: string[];
  heroImage?: string;
  heroVideo?: string;
  situation: string;
  resultHeadline: string;
  techStack: string[];
  techStackLogos?: { name: string; logo?: string }[];
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
  featuredToggle?: boolean;
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

export interface BlogPostPageData extends BlogPostCardData {
  bodyParagraphs: string[];
  pullQuote?: string;
  showCTA?: boolean;
}

/* --- Case Study (detail page) --- */

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudyPageData extends CaseStudyCardData {
  clientIndustry: string;
  situationDetail: string;
  approach: string;
  buildDetail: string;
  resultDetail: string;
  metrics: CaseStudyMetric[];
  testimonial?: CaseStudyTestimonial;
  publishedAt?: string;
}

/* --- Industry (silo page) --- */

export interface IndustryServiceCard {
  title: string;
  description: string;
  link: string;
}

export interface IndustryProcessStep {
  stepNumber: string;
  heading: string;
  description: string;
  lottiePath?: string;
  fallbackGradient?: string;
}

export interface IndustryPageData extends IndustryCardData {
  heroHeadline: string;
  heroHighlightedWord?: string;
  heroSubStatement: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  scrollCueText?: string;
  problemHeadline?: string;
  problemHighlightedWord?: string;
  howWeHelpHeadline?: string;
  howWeHelpHighlightedWord?: string;
  howWeHelpDescription?: string;
  serviceCardCtaLabel?: string;
  qualifierHeadline?: string;
  qualifierHighlightedWord?: string;
  ctaInlineHeadline?: string;
  ctaInlineHighlightedWord?: string;
  ctaInlineLabel?: string;
  ctaInlineDestination?: string;
  otherIndustriesHeadline?: string;
  otherIndustriesHighlightedWord?: string;
  otherIndustriesDescription?: string;
  otherIndustriesCtaHeadline?: string;
  otherIndustriesCtaLabel?: string;
  painPoints: string[];
  serviceCards: IndustryServiceCard[];
  outcomeStats: StatsBandItem[];
  caseStudySlugs: string[];
  testimonials: TestimonialData[];
  faq: FAQItem[];
  beforeAfterHeadline?: string;
  beforeAfterHighlightedWord?: string;
  beforeAfterDescription?: string;
  beforeAfterPairs?: BeforeAfterPair[];
  processHeadline?: string;
  processHighlightedWord?: string;
  processDescription?: string;
  processSteps?: IndustryProcessStep[];
  ctaSectionHeadline?: string;
  ctaSectionHighlightedWord?: string;
  ctaSectionLabel?: string;
  ctaSectionDestination?: string;
}

/* --- Resource --- */
export interface ResourceCardData {
  title: string;
  slug: string;
  description: string;
  resourceType: "Template" | "Guide" | "Framework" | "Playbook";
  category: string;
  accessType: "free" | "paid";
  priceUSD?: number;
  priceGBP?: number;
  priceNGN?: number;
  coverImage?: string;
  featuredToggle?: boolean;
}

export interface ResourcePageData extends ResourceCardData {
  whatItIs: string;
  whatsIncluded: string[];
  whoItIsFor: string[];
  previewImages?: string[];
  showPreview?: boolean;
  fileUrl?: string;
  publishedAt?: string;
}

/* --- Automation --- */

export interface AutomationToolItem {
  name: string;
  iconKey?: string;
}

export interface AutomationStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface AutomationCardData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  accessType: "fixed" | "custom";
  price?: number;
  category: string;
  featured?: boolean;
  coverImage?: string;
  toolsUsed: AutomationToolItem[];
  setupTimeDays: number;
}

export interface AutomationFullData extends AutomationCardData {
  problemStatement: string;
  howItWorks: AutomationStep[];
  whatsIncluded: string[];
  whoItIsFor: string[];
  faq: FAQItem[];
  publishedAt?: string;
}

export interface AutomationCategory {
  label: string;
  value: string;
}

export interface FeaturedAutomationsSection {
  headline: string;
  highlightedWord?: string;
  description?: string;
  items: AutomationCardData[];
  viewAllLabel: string;
  viewAllUrl: string;
}

/* --- Popup Config --- */
export interface PopupConfig {
  id: string;
  pageReference: string;
  enabled: boolean;
  triggerType: "scroll_depth" | "time_on_page" | "inactivity" | "manual";
  triggerValue: number;
  offerType: "newsletter" | "lead_magnet" | "consultation" | "audit" | "download";
  headline: string;
  subCopy: string;
  ctaLabel: string;
  ctaDestination: string;
  /** URL to the downloadable file (used when offerType is 'download') */
  downloadUrl?: string;
  /** Title of the resource being downloaded (for analytics/display) */
  resourceTitle?: string;
}

/* --- Audit Page --- */

export interface AuditHeroData {
  label?: string;
  headline: string;
  highlightedWord?: string;
  price: string;
  priceLabel?: string;
  subStatement: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  scrollCueText?: string;
}

export interface AuditQualifierData {
  headline: string;
  highlightedWord?: string;
  qualifiers: string[];
}

export interface AuditScopeColumn {
  icon: string;
  heading: string;
  bullets: string[];
  lottiePath?: string;
}

export interface AuditScopeData {
  headline: string;
  highlightedWord?: string;
  description?: string;
  columns: AuditScopeColumn[];
}

export interface AuditDeliverable {
  icon: string;
  title: string;
  description: string;
}

export interface AuditDeliverablesData {
  headline: string;
  highlightedWord?: string;
  deliverables: AuditDeliverable[];
}

export interface AuditProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface AuditProcessData {
  headline: string;
  highlightedWord?: string;
  steps: AuditProcessStep[];
}

export interface AuditFinding {
  text: string;
}

export interface AuditFindingsData {
  headline: string;
  highlightedWord?: string;
  findings: AuditFinding[];
  layoutStyle?: "list" | "grid";
}

export interface AuditPricingTier {
  name: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  highlighted?: boolean;
  badge?: string;
}

export interface AuditPricingData {
  headline: string;
  highlightedWord?: string;
  tiers: AuditPricingTier[];
}

export interface AuditSeoData {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface AuditPageData {
  seo: AuditSeoData | null;
  hero: AuditHeroData | null;
  qualifiers: AuditQualifierData | null;
  scope: AuditScopeData | null;
  deliverables: AuditDeliverablesData | null;
  process: AuditProcessData | null;
  findings: AuditFindingsData | null;
  pricing: AuditPricingData | null;
  faq: FAQItem[] | null;
  finalCta: CTABannerData | null;
}

/* --- Service Pages (shared) --- */
export interface ServicePageHeroData {
  headline: string;
  highlightedWord?: string;
  subStatement: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  scrollCueText?: string;
  scrollCueTargetId?: string;
}

export interface ServiceProblemData {
  headline: string;
  highlightedWord?: string;
  painPoints: string[];
}

export interface SubServiceItem {
  title: string;
  description: string;
  lottiePath?: string;
  icon?: string;
}

export interface SubServicesData {
  headline: string;
  highlightedWord?: string;
  description?: string;
  items: SubServiceItem[];
}

export interface ServiceQualifierData {
  headline: string;
  highlightedWord?: string;
  qualifiers: string[];
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceProcessData {
  headline: string;
  highlightedWord?: string;
  steps: ServiceProcessStep[];
}

export interface BeforeAfterPair {
  clientName: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface BeforeAfterData {
  headline: string;
  highlightedWord?: string;
  description?: string;
  pairs: BeforeAfterPair[];
}

export interface ResultStat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  isIcon?: boolean;
  icon?: string;
}

export interface ResultsStatsData {
  headline: string;
  highlightedWord?: string;
  description?: string;
  stats: ResultStat[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface MarketingPageData {
  hero: ServicePageHeroData | null;
  problem: ServiceProblemData | null;
  subServices: SubServicesData | null;
  qualifiers: ServiceQualifierData | null;
  process: ServiceProcessData | null;
  beforeAfter: BeforeAfterData | null;
  resultsStats: ResultsStatsData | null;
  caseStudies: CaseStudyCardData[] | null;
  testimonials: TestimonialData[] | null;
  bannerCta: CTABannerData | null;
  faq: FAQItem[] | null;
  finalCta: CTABannerData | null;
}

/* --- About Page --- */

export interface AboutHeroData {
  name: string;
  identity: string;
  portraitImage?: string;
  portraitAlt?: string;
  scrollCueText?: string;
  scrollCueTargetId?: string;
  namePrefix?: string;
}

export interface AboutShortVersionData {
  headline: string;
  highlightedWord?: string;
  body: string;
}

export interface AboutStoryData {
  headline: string;
  highlightedWord?: string;
  body: string[];
}

export interface AboutStatItem {
  value: string;
  label: string;
}

export interface AboutPastCompany {
  company: string;
  role: string;
  insight: string;
}

export interface AboutPastCompaniesData {
  headline: string;
  highlightedWord?: string;
  companies: AboutPastCompany[];
}

export interface AboutPrincipleItem {
  title: string;
  description: string;
}

export interface AboutHowIWorkData {
  headline: string;
  highlightedWord?: string;
  principles: AboutPrincipleItem[];
}

export interface AboutDisciplineItem {
  name: string;
  tools: string[];
}

export interface AboutSkillsToolsData {
  headline: string;
  highlightedWord?: string;
  disciplines: AboutDisciplineItem[];
}

export interface AboutInterestItem {
  interest: string;
  connection: string;
}

export interface AboutInterestsData {
  headline: string;
  highlightedWord?: string;
  items: AboutInterestItem[];
}

/* --- Service Page (Sanity CMS raw shape) --- */
export interface ServicePageCmsData {
  pageId: string;
  // Hero
  heroHeadline?: string;
  heroHighlightedWord?: string;
  heroSubStatement?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaUrl?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaUrl?: string;
  heroScrollCueText?: string;
  heroScrollCueTargetId?: string;
  // Problem
  problemHeadline?: string;
  problemHighlightedWord?: string;
  problemPainPoints?: string[];
  // Sub Services
  subServicesHeadline?: string;
  subServicesHighlightedWord?: string;
  subServicesDescription?: string;
  subServiceItems?: { icon?: string; title: string; description: string }[];
  // Qualifiers
  qualifiersHeadline?: string;
  qualifiersHighlightedWord?: string;
  qualifiers?: string[];
  // Process
  processHeadline?: string;
  processHighlightedWord?: string;
  processSteps?: { stepNumber: string; title: string; description: string }[];
  // CTA Banners
  ctaBannerMid?: { headline?: string; highlightedWord?: string; ctaLabel?: string; ctaDestination?: string };
  ctaBannerFinal?: { headline?: string; highlightedWord?: string; ctaLabel?: string; ctaDestination?: string };
  // Stats
  statsHeadline?: string;
  statsHighlightedWord?: string;
  statsDescription?: string;
  statsItems?: StatsBandItem[];
  // Before & After
  beforeAfterHeadline?: string;
  beforeAfterHighlightedWord?: string;
  beforeAfterDescription?: string;
  beforeAfterPairs?: BeforeAfterPair[];
  // Case Studies
  caseStudiesHeadline?: string;
  caseStudiesHighlightedWord?: string;
  caseStudiesDescription?: string;
  featuredCaseStudies?: CaseStudyCardData[];
  // Testimonials
  testimonialsHeadline?: string;
  testimonialsHighlightedWord?: string;
  testimonialsDescription?: string;
  featuredTestimonials?: TestimonialData[];
  // Industries
  industriesHeadline?: string;
  industriesHighlightedWord?: string;
  industriesDescription?: string;
  industriesCtaHeadline?: string;
  industriesCtaLabel?: string;
  industriesCtaUrl?: string;
  featuredIndustries?: IndustryCardData[];
  // Featured Automations (AI only)
  featuredAutomationsHeadline?: string;
  featuredAutomationsHighlightedWord?: string;
  featuredAutomationsDescription?: string;
  featuredAutomationsViewAllLabel?: string;
  featuredAutomationsViewAllUrl?: string;
  // Lab
  labHeadline?: string;
  labHighlightedWord?: string;
  labDescription?: string;
  labSectionTitle?: string;
  labSeeAllLabel?: string;
  labSeeAllUrl?: string;
  // FAQ Section
  faqSectionHeadline?: string;
  faqSectionHighlightedWord?: string;
  faqSectionDescription?: string;
  faqCtaHeadline?: string;
  faqCtaDescription?: string;
  faqCtaLabel?: string;
  faqCtaUrl?: string;
}

/* --- About Page CTA Banner shape --- */
export interface AboutCtaBannerCms {
  headline?: string;
  highlightedWord?: string;
  subCopy?: string;
  ctaLabel?: string;
  ctaDestination?: string;
  colorScheme?: CTABannerColorScheme;
}

/* --- Automations Page --- */
export interface AutomationsPageData {
  heroHeadline?: string;
  heroHighlightedWord?: string;
  heroSubStatement?: string;
  heroScrollCueText?: string;
  ctaHeadline?: string;
  ctaHighlightedWord?: string;
  ctaLabel?: string;
  ctaDestination?: string;
}

/* --- Work Page --- */
export interface WorkPageData {
  pageHeadline?: string;
  pageHighlightedWord?: string;
  pageDescription?: string;
  emptyStatePrimary?: string;
  emptyStateFiltered?: string;
  servicesHeadline?: string;
  servicesHighlightedWord?: string;
  servicesDescription?: string;
  serviceItems?: StickyScrollItem[];
  processHeadline?: string;
  processHighlightedWord?: string;
  processDescription?: string;
  processSteps?: StickyScrollItem[];
  beforeAfterHeadline?: string;
  beforeAfterHighlightedWord?: string;
  beforeAfterDescription?: string;
  beforeAfterPairs?: BeforeAfterPair[];
  industriesHeadline?: string;
  industriesHighlightedWord?: string;
  industriesDescription?: string;
  industries?: IndustryCardData[];
  industriesCtaHeadline?: string;
  industriesCtaLabel?: string;
  industriesCtaUrl?: string;
  ctaInlineHeadline?: string;
  ctaInlineHighlightedWord?: string;
  ctaInlineLabel?: string;
  ctaInlineDestination?: string;
  ctaSectionHeadline?: string;
  ctaSectionHighlightedWord?: string;
  ctaSectionLabel?: string;
  ctaSectionDestination?: string;
}

/* --- Legal Pages --- */
export interface LegalPageSection {
  _key?: string;
  heading: string;
  body: unknown[];
}

export interface PrivacyPageData {
  pageTitle?: string;
  lastUpdated?: string;
  contentsLabel?: string;
  sections: LegalPageSection[];
  termsLinkLabel?: string;
  homeLinkLabel?: string;
}

export interface TermsPageData {
  pageTitle?: string;
  lastUpdated?: string;
  contentsLabel?: string;
  sections: LegalPageSection[];
  privacyLinkLabel?: string;
  homeLinkLabel?: string;
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
