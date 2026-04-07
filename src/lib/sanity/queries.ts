import { client } from "./client";
import type {
  SiteSettings,
  NavigationData,
  FooterData,
  HomeHeroData,
  DiagnosisSectionData,
  StickyScrollSectionData,
  IndustriesGridData,
  CTABannerData,
  FAQItem,
  TestimonialData,
  CaseStudyCardData,
  CaseStudyPageData,
  BeforeAfterData,
  LabContentCard,
  BlogPostCardData,
  BlogPostPageData,
  VideoCardData,
  AuditHeroData,
  AuditQualifierData,
  AuditScopeData,
  AuditDeliverablesData,
  AuditProcessData,
  AuditFindingsData,
  AuditPricingData,
  AuditPageData,
  ServicePageHeroData,
  ServiceProblemData,
  SubServicesData,
  ServiceQualifierData,
  StatsBandItem,
  AboutHeroData,
  AboutShortVersionData,
  AboutStoryData,
  AboutStatItem,
  AboutPastCompaniesData,
  AboutHowIWorkData,
  AboutSkillsToolsData,
  AboutInterestsData,
  IndustryPageData,
  ResourcePageData,
  ResourceCardData,
  AutomationFullData,
  AutomationCardData,
  PopupConfig,
  ServicePageCmsData,
  WorkPageData,
  PrivacyPageData,
  TermsPageData,
  AutomationsPageData,
  StartPageData,
  StartConfirmedPageData,
  AuditConfirmedPageData,
} from "@/lib/types";

/* ============================================================
   GROQ Queries — Stage 4 CMS
   Each function is async and uses "use cache" for Next.js caching.
   ============================================================ */

// ── Globals ──

export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      socialLinks[]{ platform, url },
      contactEmail,
      whatsappNumber,
      newsletterHeadline,
      newsletterHighlightedWord,
      newsletterSubCopy,
      newsletterCtaLabel,
      newsletterSuccessHeadline,
      newsletterSuccessSubCopy,
      newsletterEmailPlaceholder
    }`
  );
}

export async function getNavigation(): Promise<NavigationData | null> {
  "use cache";
  return client.fetch<NavigationData | null>(
    `*[_type == "navigation"][0]{
      "logo": logo.asset->url,
      "logoDark": logoDark.asset->url,
      servicesLabel,
      industriesLabel,
      serviceLinks[]{ label, url, highlighted },
      industryLinks[]{ label, url, highlighted },
      staticLinks[]{ label, url },
      ctaLabel,
      ctaUrl
    }`
  );
}

export async function getFooter(): Promise<FooterData | null> {
  "use cache";
  return client.fetch<FooterData | null>(
    `*[_type == "footer"][0]{
      navLinks[]{ label, url },
      socialLinks[]{ platform, url },
      legalLinks[]{ label, url },
      ctaLabel,
      ctaUrl,
      copyrightText
    }`
  );
}

// ── Home Page ──

export async function getHomePage() {
  "use cache";
  return client.fetch(
    `*[_type == "homePage"][0]{
      // SEO
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,

      // Hero
      heroHeadline,
      heroHighlightedWord,
      heroSubStatement,
      heroPrimaryCtaLabel,
      heroPrimaryCtaUrl,
      heroSecondaryCtaLabel,
      heroSecondaryCtaUrl,
      heroSocialProofText,
      heroScrollCueText,
      heroScrollCueTargetId,

      // Diagnosis
      diagnosisHeadline,
      diagnosisHighlightedWord,
      diagnosisDescription,
      diagnosisCards[]{ icon, headline, body },

      // Services
      servicesHeadline,
      servicesHighlightedWord,
      servicesDescription,
      serviceItems[]{ stepNumber, heading, description, subItems, ctaLabel, ctaUrl, lottiePath, fallbackGradient, icon },

      // Industries
      industriesHeadline,
      industriesHighlightedWord,
      industriesDescription,
      industryCards[]->{ "icon": icon, "name": industryName, hookLine, "slug": slug.current, ctaLabel },

      // Process
      processHeadline,
      processHighlightedWord,
      processDescription,
      processSteps[]{ stepNumber, title, description, lottiePath, fallbackGradient },

      // Case Studies
      caseStudiesHeadline,
      caseStudiesHighlightedWord,
      caseStudiesDescription,
      featuredCaseStudies[]->{
        title,
        "slug": slug.current,
        "heroImage": heroImage.asset->url,
        "situation": pt::text(situation),
        "resultHeadline": metrics[0].label + " " + metrics[0].value,
        "techStack": techStack[]->name,
        featured
      },

      // CTA Banners
      ctaBanner1{ headline, highlightedWord, subCopy, ctaLabel, "ctaDestination": ctaUrl },
      ctaBanner2{ headline, highlightedWord, subCopy, ctaLabel, "ctaDestination": ctaUrl },

      // Testimonials
      testimonialHeadline,
      testimonialHighlightedWord,
      testimonialDescription,
      featuredTestimonials[]->{ quote, name, role, company, "companyLogo": companyLogo.asset->url, "avatar": avatar.asset->url, rating, industry, service, featured },

      // FAQ
      faqHeadline,
      faqHighlightedWord,
      faqDescription,

      // Before/After
      beforeAfterHeadline,
      beforeAfterHighlightedWord,
      beforeAfterDescription,
      beforeAfterPairs[]{ clientName, "beforeImage": beforeImage.asset->url, "afterImage": afterImage.asset->url, beforeLabel, afterLabel },

      // Live Feed
      liveFeedHeadline,
      liveFeedHighlightedWord,
      liveFeedSeeAllLabel,
      liveFeedDescription,

      // Industries CTA
      industriesCtaHeadline,
      industriesCtaLabel,
      industriesCtaUrl,

      // FAQ CTA
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl,

      // Testimonials CTA
      testimonialCtaHeadline,
      testimonialCtaLabel,
      testimonialCtaUrl,

      // Success Metrics
      successMetrics[]{ stateIndex, pillar, metricLabel, metricValue, metricSuffix, metricPrefix, decimals }
    }`
  );
}

export async function getHomeFAQ(): Promise<FAQItem[]> {
  "use cache";
  return client.fetch<FAQItem[]>(
    `*[_type == "faq" && page == "home"] | order(order asc) { question, answer }`
  );
}

// ── Audit Page ──

export async function getAuditPage() {
  "use cache";
  return client.fetch(
    `*[_type == "auditPage"][0]{
      // SEO
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,

      // Hero
      heroHeadline,
      heroHighlightedWord,
      "heroPrice": heroPrice,
      "heroPriceLabel": heroPriceLabel,
      heroSubStatement,
      heroPrimaryCtaLabel,
      heroPrimaryCtaUrl,
      heroSecondaryCtaText,
      heroSecondaryCtaUrl,
      heroScrollCueText,
      heroScrollCueTargetId,
      heroPriceNote,
      heroCardTagline,
      heroFeatures,

      // Qualifiers
      qualifiersHeadline,
      qualifiersHighlightedWord,
      qualifiers,

      // Scope
      scopeHeadline,
      scopeHighlightedWord,
      scopeDescription,
      scopeColumns[]{ icon, heading, bullets, lottiePath },

      // Deliverables
      deliverablesHeadline,
      deliverablesHighlightedWord,
      deliverables[]{ icon, title, description },

      // Process
      processHeadline,
      processHighlightedWord,
      processSteps[]{ stepNumber, title, description },

      // Findings
      findingsHeadline,
      findingsHighlightedWord,
      findings[]{ text },

      // Pricing
      pricingHeadline,
      pricingHighlightedWord,
      pricingTiers[]{ name, price, priceSubtext, features, ctaLabel, ctaUrl, highlighted, badge },

      // Newsletter
      newsletterHeadline,
      newsletterHighlightedWord,
      newsletterSubCopy,
      newsletterCtaLabel,

      // FAQ
      faqHeadline,
      faqHighlightedWord,
      faqDescription,
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl,

      // Final CTA
      finalCtaHeadline,
      finalCtaHighlightedWord,
      finalCtaSubCopy,
      finalCtaLabel,
      finalCtaUrl
    }`
  );
}

export async function getAuditFAQ(): Promise<FAQItem[]> {
  "use cache";
  return client.fetch<FAQItem[]>(
    `*[_type == "faq" && page == "audit"] | order(order asc) { question, answer }`
  );
}

// ── Service Pages ──

export async function getServicePage(pageId: string): Promise<ServicePageCmsData | null> {
  "use cache";
  return client.fetch<ServicePageCmsData | null>(
    `*[_type == "servicePage" && pageId == $pageId][0]{
      pageId,

      // SEO
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,

      // Hero
      heroHeadline,
      heroHighlightedWord,
      heroSubStatement,
      heroPrimaryCtaLabel,
      heroPrimaryCtaUrl,
      heroSecondaryCtaLabel,
      heroSecondaryCtaUrl,
      heroScrollCueText,
      heroScrollCueTargetId,

      // Problem
      problemHeadline,
      problemHighlightedWord,
      problemPainPoints,

      // Sub Services
      subServicesHeadline,
      subServicesHighlightedWord,
      subServicesDescription,
      subServiceItems[]{ icon, title, description },
      bentoToolsLabel,
      "bentoTools": bentoTools[]->{ name, "logo": logo.asset->url },

      // Qualifiers
      qualifiersHeadline,
      qualifiersHighlightedWord,
      qualifiers,

      // Process
      processHeadline,
      processHighlightedWord,
      processSteps[]{ stepNumber, title, description },

      // CTAs
      ctaBannerMid{ headline, highlightedWord, ctaLabel, "ctaDestination": ctaUrl },
      ctaBannerFinal{ headline, highlightedWord, ctaLabel, "ctaDestination": ctaUrl },

      // Stats
      statsHeadline,
      statsHighlightedWord,
      statsDescription,
      statsItems[]{ value, label, suffix, prefix, decimals },

      // Before & After
      beforeAfterHeadline,
      beforeAfterHighlightedWord,
      beforeAfterDescription,
      beforeAfterPairs[]{ clientName, "beforeImage": beforeImage.asset->url, "afterImage": afterImage.asset->url, beforeLabel, afterLabel },

      // Case Studies
      caseStudiesHeadline,
      caseStudiesHighlightedWord,
      caseStudiesDescription,
      featuredCaseStudies[]->{
        title,
        "slug": slug.current,
        "heroImage": heroImage.asset->url,
        "situation": pt::text(situation),
        "resultHeadline": metrics[0].label + " " + metrics[0].value,
        "techStack": techStack[]->name,
        featured
      },

      // Testimonials
      testimonialsHeadline,
      testimonialsHighlightedWord,
      testimonialsDescription,
      featuredTestimonials[]->{ quote, name, role, company, "companyLogo": companyLogo.asset->url, "avatar": avatar.asset->url, rating, industry, service, featured },

      // Industries
      industriesHeadline,
      industriesHighlightedWord,
      industriesDescription,
      industriesCtaHeadline,
      industriesCtaLabel,
      industriesCtaUrl,
      featuredIndustries[]->{ "icon": icon, "name": industryName, hookLine, "slug": slug.current, ctaLabel },

      // Featured Automations (AI only)
      featuredAutomationsHeadline,
      featuredAutomationsHighlightedWord,
      featuredAutomationsDescription,
      featuredAutomationsViewAllLabel,
      featuredAutomationsViewAllUrl,

      // Lab
      labHeadline,
      labHighlightedWord,
      labDescription,
      labSectionTitle,
      labSeeAllLabel,
      labSeeAllUrl,

      // FAQ Section
      faqSectionHeadline,
      faqSectionHighlightedWord,
      faqSectionDescription,
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl
    }`,
    { pageId }
  );
}

export async function getServiceFAQ(pageId: string): Promise<FAQItem[]> {
  "use cache";
  return client.fetch<FAQItem[]>(
    `*[_type == "faq" && page == $pageId] | order(order asc) { question, answer }`,
    { pageId }
  );
}

// ── About Page ──

export async function getAboutPage() {
  "use cache";
  return client.fetch(
    `*[_type == "aboutPage"][0]{
      // SEO
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,

      heroName,
      heroIdentity,
      "portraitImage": portraitImage.asset->url,
      portraitAlt,
      heroNamePrefix,
      heroScrollCueText,
      heroScrollCueTargetId,

      shortVersionHeadline,
      shortVersionHighlightedWord,
      shortVersionBody,

      storyHeadline,
      storyHighlightedWord,
      storyBody,

      stats[]{ value, label },

      companiesHeadline,
      companiesHighlightedWord,
      companies[]{ company, role, insight, "logo": logo.asset->url },

      principlesHeadline,
      principlesHighlightedWord,
      principles[]{ icon, title, description },

      skillsHeadline,
      skillsHighlightedWord,
      disciplines[]{ name, tools[]->{ name, "logo": logo.asset->url } },

      interestsHeadline,
      interestsHighlightedWord,
      interests[]{ icon, interest, connection },

      ctaHeadline,
      ctaHighlightedWord,
      ctaLabel,
      ctaUrl,

      // Featured Work
      caseStudiesHeadline,
      caseStudiesHighlightedWord,
      featuredCaseStudies[]->{
        title,
        "slug": slug.current,
        "heroImage": heroImage.asset->url,
        "situation": pt::text(situation),
        "resultHeadline": metrics[0].label + " " + metrics[0].value,
        "techStack": techStack[]->name,
        featured
      },

      // FAQ
      faqHeadline,
      faqHighlightedWord,
      faqDescription,
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl,

      // CTA Banners
      inlineCta{ headline, highlightedWord, subCopy, ctaLabel, "ctaDestination": ctaUrl, colorScheme },
      finalCta{ headline, highlightedWord, subCopy, ctaLabel, "ctaDestination": ctaUrl, colorScheme }
    }`
  );
}

export async function getAboutFAQ(): Promise<FAQItem[]> {
  "use cache";
  return client.fetch<FAQItem[]>(
    `*[_type == "faq" && page == "about"] | order(order asc) { question, answer }`
  );
}

// ── Case Studies ──

export async function getAllCaseStudies(): Promise<CaseStudyCardData[]> {
  "use cache";
  return client.fetch<CaseStudyCardData[]>(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      "heroImage": heroImage.asset->url,
      "situation": pt::text(situation),
      "resultHeadline": metrics[0].label + " " + metrics[0].value,
      "techStack": techStack[]->name,
      "techStackLogos": techStack[]->{ name, "logo": logo.asset->url },
      featured
    }`
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyPageData | null> {
  "use cache";
  return client.fetch<CaseStudyPageData | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      clientIndustry,
      tags,
      "heroImage": heroImage.asset->url,
      heroVideo,
      "situation": pt::text(situation),
      "situationDetail": pt::text(situation),
      "approach": pt::text(approach),
      "buildDetail": pt::text(buildSection),
      "resultDetail": pt::text(result),
      "resultHeadline": metrics[0].label + " " + metrics[0].value,
      metrics[]{ label, value },
      "techStack": techStack[]->name,
      "techStackLogos": techStack[]->{ name, "logo": logo.asset->url },
      testimonial->{ quote, name, role, company },
      featured,
      publishedAt
    }`,
    { slug }
  );
}

// ── Testimonials ──

export async function getAllTestimonials(): Promise<TestimonialData[]> {
  "use cache";
  return client.fetch<TestimonialData[]>(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      quote, name, role, company,
      "companyLogo": companyLogo.asset->url,
      "avatar": avatar.asset->url,
      rating, industry, service, featured
    }`
  );
}

export async function getFeaturedTestimonials(): Promise<TestimonialData[]> {
  "use cache";
  return client.fetch<TestimonialData[]>(
    `*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      quote, name, role, company,
      "companyLogo": companyLogo.asset->url,
      "avatar": avatar.asset->url,
      rating, industry, service, featured
    }`
  );
}

// ── Blog Posts ──

export async function getAllBlogPosts(): Promise<BlogPostCardData[]> {
  "use cache";
  return client.fetch<BlogPostCardData[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      "heroImage": heroImage.asset->url,
      category,
      tags,
      publishedAt,
      "readTime": readTime + " min read",
      "platform": "blog",
      "featuredToggle": featuredToggle
    }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostPageData | null> {
  "use cache";
  return client.fetch<BlogPostPageData | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      excerpt,
      "heroImage": heroImage.asset->url,
      body,
      category,
      tags,
      publishedAt,
      "readTime": readTime + " min read",
      "platform": "blog",
      featuredToggle,
      showCTA
    }`,
    { slug }
  );
}

// ── Videos ──

export async function getAllVideos(): Promise<VideoCardData[]> {
  "use cache";
  return client.fetch<VideoCardData[]>(
    `*[_type == "video"] | order(publishedAt desc) {
      title,
      platform,
      videoUrl,
      "thumbnail": thumbnail.asset->url,
      description,
      publishedAt,
      featuredToggle
    }`
  );
}

// ── Lab Content (union of blog + video) ──

export async function getAllLabContent(): Promise<LabContentCard[]> {
  "use cache";
  const blogs = await client.fetch<BlogPostCardData[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      "heroImage": heroImage.asset->url,
      category,
      tags,
      publishedAt,
      "readTime": readTime + " min read",
      "platform": "blog",
      featuredToggle
    }`
  );
  const videos = await client.fetch<VideoCardData[]>(
    `*[_type == "video"] | order(publishedAt desc) {
      title,
      platform,
      videoUrl,
      "thumbnail": thumbnail.asset->url,
      description,
      publishedAt,
      featuredToggle
    }`
  );
  return [...blogs, ...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// ── Resources ──

export async function getAllResources(): Promise<ResourceCardData[]> {
  "use cache";
  return client.fetch<ResourceCardData[]>(
    `*[_type == "resource"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      "description": pt::text(description),
      resourceType,
      category,
      accessType,
      priceUSD,
      priceGBP,
      priceNGN,
      "coverImage": coverImage.asset->url,
      featuredToggle
    }`
  );
}

export async function getResourceBySlug(slug: string): Promise<ResourcePageData | null> {
  "use cache";
  return client.fetch<ResourcePageData | null>(
    `*[_type == "resource" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      "description": pt::text(description),
      "whatItIs": pt::text(description),
      resourceType,
      category,
      accessType,
      priceUSD,
      priceGBP,
      priceNGN,
      "coverImage": coverImage.asset->url,
      "previewImages": previewImages[].asset->url,
      whatsIncluded,
      whoItIsFor,
      "fileUrl": coalesce(fileUrl, fileAsset.asset->url),
      featuredToggle,
      publishedAt,
      showPreview
    }`,
    { slug }
  );
}

// ── Automations ──

export async function getAllAutomations(): Promise<AutomationCardData[]> {
  "use cache";
  return client.fetch<AutomationCardData[]>(
    `*[_type == "automation"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      tagline,
      "description": pt::text(problemStatement),
      accessType,
      price,
      category,
      featured,
      "coverImage": null,
      "toolsUsed": toolsUsed[]->{ name, "iconKey": name },
      "setupTimeDays": coalesce(setupTime, 0)
    }`
  );
}

export async function getAutomationBySlug(slug: string): Promise<AutomationFullData | null> {
  "use cache";
  return client.fetch<AutomationFullData | null>(
    `*[_type == "automation" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      tagline,
      "description": pt::text(problemStatement),
      "problemStatement": pt::text(problemStatement),
      accessType,
      price,
      category,
      featured,
      "coverImage": null,
      "toolsUsed": toolsUsed[]->{ name, "iconKey": name },
      "setupTimeDays": coalesce(setupTime, 0),
      setupTime,
      howItWorks[]{ "stepNumber": string(step), title, description },
      whatsIncluded,
      whoItIsFor,
      faq[]{ question, answer },
      publishedAt
    }`,
    { slug }
  );
}

export async function getFeaturedAutomationsCMS(): Promise<AutomationCardData[]> {
  "use cache";
  return client.fetch<AutomationCardData[]>(
    `*[_type == "automation" && featured == true] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      tagline,
      "description": pt::text(problemStatement),
      accessType,
      price,
      category,
      featured,
      "coverImage": null,
      "toolsUsed": toolsUsed[]->{ name, "iconKey": name },
      "setupTimeDays": coalesce(setupTime, 0)
    }`
  );
}

// ── Industry Pages ──

export async function getAllIndustries(): Promise<IndustriesGridData["industries"]> {
  "use cache";
  return client.fetch(
    `*[_type == "industryPage"] | order(industryName asc) {
      "icon": icon,
      "name": industryName,
      hookLine,
      "slug": slug.current,
      ctaLabel
    }`
  );
}

export async function getIndustryBySlug(slug: string): Promise<IndustryPageData | null> {
  "use cache";
  return client.fetch<IndustryPageData | null>(
    `*[_type == "industryPage" && slug.current == $slug][0]{
      "icon": icon,
      "name": industryName,
      hookLine,
      "slug": slug.current,
      heroHeadline,
      heroHighlightedWord,
      heroSubStatement,
      primaryCtaLabel,
      primaryCtaUrl,
      secondaryCtaLabel,
      secondaryCtaUrl,
      scrollCueText,
      scrollCueTargetId,
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      problemHeadline,
      problemHighlightedWord,
      howWeHelpHeadline,
      howWeHelpHighlightedWord,
      howWeHelpDescription,
      serviceCardCtaLabel,
      qualifierHeadline,
      qualifierHighlightedWord,
      ctaInlineHeadline,
      ctaInlineHighlightedWord,
      ctaInlineLabel,
      ctaInlineDestination,
      otherIndustriesHeadline,
      otherIndustriesHighlightedWord,
      otherIndustriesDescription,
      otherIndustriesCtaHeadline,
      otherIndustriesCtaLabel,
      painPoints,
      serviceCards[]{ title, description, "link": linkUrl, icon },
      outcomeStats[]{ label, value, prefix, suffix },
      "caseStudySlugs": featuredCaseStudies[]->slug.current,
      "testimonials": featuredTestimonials[]->{ quote, name, role, company, "companyLogo": companyLogo.asset->url, "avatar": avatar.asset->url, rating, industry, service },
      "faq": *[_type == "faq" && page == "home"] | order(order asc) { question, answer },
      beforeAfterHeadline,
      beforeAfterHighlightedWord,
      beforeAfterDescription,
      beforeAfterPairs[]{ clientName, "beforeImage": beforeImage.asset->url, "afterImage": afterImage.asset->url, beforeLabel, afterLabel },
      processHeadline,
      processHighlightedWord,
      processDescription,
      processSteps[]{ stepNumber, heading, description, lottiePath, fallbackGradient },
      ctaSectionHeadline,
      ctaSectionHighlightedWord,
      ctaSectionLabel,
      ctaSectionDestination,
      statsHeadline,
      statsHighlightedWord,
      statsDescription,
      caseStudiesHeadline,
      caseStudiesHighlightedWord,
      caseStudiesDescription,
      testimonialsHeadline,
      testimonialsHighlightedWord,
      testimonialCtaHeadline,
      testimonialCtaLabel,
      testimonialCtaUrl,
      faqHeadline,
      faqHighlightedWord,
      faqDescription,
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl
    }`,
    { slug }
  );
}

// ── Popup Config ──

export async function getPopupConfig(page: string): Promise<PopupConfig | null> {
  "use cache";
  return client.fetch<PopupConfig | null>(
    `*[_type == "popupConfig" && pageReference == $page && enabled == true][0]{
      "id": _id,
      pageReference,
      enabled,
      triggerType,
      triggerValue,
      offerType,
      headline,
      subCopy,
      ctaLabel,
      ctaDestination,
      downloadUrl,
      resourceTitle
    }`,
    { page }
  );
}

export async function getAllPopupConfigs(): Promise<PopupConfig[]> {
  "use cache";
  return client.fetch<PopupConfig[]>(
    `*[_type == "popupConfig" && enabled == true]{
      "id": _id,
      pageReference,
      enabled,
      triggerType,
      triggerValue,
      offerType,
      headline,
      subCopy,
      ctaLabel,
      ctaDestination,
      downloadUrl,
      resourceTitle
    }`
  );
}

// ── Lab Page Settings ──

export async function getLabPage() {
  "use cache";
  return client.fetch(
    `*[_type == "labPage"][0]{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      pageHeadline,
      pageHighlightedWord,
      pageDescription,
      emptyStateFiltered,
      newsletterHeadline,
      newsletterHighlightedWord,
      newsletterSubCopy,
      newsletterCtaLabel,
      inlineCtaHeadline,
      inlineCtaHighlightedWord,
      inlineCtaLabel,
      inlineCtaDestination,
      sectionCtaHeadline,
      sectionCtaHighlightedWord,
      sectionCtaLabel,
      sectionCtaDestination,
      postInlineCtaHeadline,
      postInlineCtaHighlightedWord,
      postInlineCtaLabel,
      postInlineCtaDestination,
      postSectionCtaHeadline,
      postSectionCtaHighlightedWord,
      postSectionCtaLabel,
      postSectionCtaDestination,
      postNewsletterHeadline,
      postNewsletterHighlightedWord,
      postNewsletterSubCopy,
      postNewsletterCtaLabel
    }`
  );
}

// ── Work Page Settings ──

export async function getWorkPage(): Promise<WorkPageData | null> {
  "use cache";
  return client.fetch<WorkPageData | null>(
    `*[_type == "workPage"][0]{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      pageHeadline,
      pageHighlightedWord,
      pageDescription,
      emptyStatePrimary,
      emptyStateFiltered,
      servicesHeadline,
      servicesHighlightedWord,
      servicesDescription,
      serviceItems[]{ stepNumber, heading, description, ctaLabel, ctaUrl, lottiePath, fallbackGradient },
      processHeadline,
      processHighlightedWord,
      processDescription,
      processSteps[]{ stepNumber, heading, description, lottiePath, fallbackGradient },
      beforeAfterHeadline,
      beforeAfterHighlightedWord,
      beforeAfterDescription,
      beforeAfterPairs[]{ clientName, "beforeImage": beforeImage.asset->url, "afterImage": afterImage.asset->url, beforeLabel, afterLabel },
      industriesHeadline,
      industriesHighlightedWord,
      industriesDescription,
      "industries": industryCards[]->{ "icon": icon, "name": industryName, hookLine, "slug": slug.current, ctaLabel },
      industriesCtaHeadline,
      industriesCtaLabel,
      industriesCtaUrl,
      ctaInlineHeadline,
      ctaInlineHighlightedWord,
      ctaInlineLabel,
      ctaInlineDestination,
      ctaSectionHeadline,
      ctaSectionHighlightedWord,
      ctaSectionLabel,
      ctaSectionDestination,
      faqHeadline,
      faqHighlightedWord,
      faqDescription,
      faqCtaHeadline,
      faqCtaDescription,
      faqCtaLabel,
      faqCtaUrl
    }`
  );
}

export async function getWorkFAQ(): Promise<FAQItem[]> {
  "use cache";
  return client.fetch<FAQItem[]>(
    `*[_type == "faq" && page == "work"] | order(order asc) { question, answer }`
  );
}

// ── Automations Page ──

export async function getAutomationsPage(): Promise<AutomationsPageData | null> {
  "use cache";
  return client.fetch<AutomationsPageData | null>(
    `*[_type == "automationsPage"][0]{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      heroHeadline,
      heroHighlightedWord,
      heroSubStatement,
      heroScrollCueText,
      heroScrollCueTargetId,
      ctaHeadline,
      ctaHighlightedWord,
      ctaLabel,
      ctaDestination
    }`
  );
}

// ── Privacy Page ──

export async function getPrivacyPage(): Promise<PrivacyPageData | null> {
  "use cache";
  return client.fetch<PrivacyPageData | null>(
    `*[_type == "privacyPage"][0]{
      pageTitle,
      "lastUpdated": lastUpdated,
      contentsLabel,
      sections[]{ _key, heading, body },
      termsLinkLabel,
      homeLinkLabel
    }`
  );
}

// ── Terms Page ──

export async function getTermsPage(): Promise<TermsPageData | null> {
  "use cache";
  return client.fetch<TermsPageData | null>(
    `*[_type == "termsPage"][0]{
      pageTitle,
      "lastUpdated": lastUpdated,
      contentsLabel,
      sections[]{ _key, heading, body },
      privacyLinkLabel,
      homeLinkLabel
    }`
  );
}

// ── Resources Page Settings ──

export async function getResourcesPage() {
  "use cache";
  return client.fetch(
    `*[_type == "resourcesPage"][0]{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      pageHeadline,
      pageHighlightedWord,
      pageDescription,
      emptyStatePrimary,
      emptyStateFiltered,
      newsletterHeadline,
      newsletterHighlightedWord,
      newsletterSubCopy,
      newsletterCtaLabel,
      inlineCtaHeadline,
      inlineCtaHighlightedWord,
      inlineCtaLabel,
      inlineCtaDestination,
      sectionCtaHeadline,
      sectionCtaHighlightedWord,
      sectionCtaLabel,
      sectionCtaDestination
    }`
  );
}

// ── Start Page ──

export async function getStartPage(): Promise<StartPageData | null> {
  "use cache";
  return client.fetch<StartPageData | null>(
    `*[_type == "startPage"][0]{
      pageHeadline,
      pageHighlightedWord,
      pageDescription,
      formSteps[] | order(order asc) {
        stepTitle,
        stepDescription,
        order,
        fields[] | order(order asc) {
          fieldId,
          label,
          fieldType,
          placeholder,
          required,
          options[] { value, label },
          showWhen { dependsOnField, hasValue },
          order
        }
      },
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }`
  );
}

// ── Start Confirmed Page ──

export async function getStartConfirmedPage(): Promise<StartConfirmedPageData | null> {
  "use cache";
  return client.fetch<StartConfirmedPageData | null>(
    `*[_type == "startConfirmedPage"][0]{
      headline,
      highlightedWord,
      description,
      nextSteps[] { stepNumber, title, description },
      ctaLabel,
      ctaUrl,
      secondaryCtaLabel,
      secondaryCtaUrl,
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }`
  );
}

// ── Audit Confirmed Page ──

export async function getAuditConfirmedPage(): Promise<AuditConfirmedPageData | null> {
  "use cache";
  return client.fetch<AuditConfirmedPageData | null>(
    `*[_type == "auditConfirmedPage"][0]{
      headline,
      highlightedWord,
      description,
      intakeCtaLabel,
      intakeCtaUrl,
      nextSteps[] { stepNumber, title, description },
      calendarCtaLabel,
      calendarCtaUrl,
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }`
  );
}
