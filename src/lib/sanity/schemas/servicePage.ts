import { defineType, defineField, defineArrayMember } from "sanity";
import { ICON_OPTIONS } from "./iconOptions";

export default defineType({
  name: "servicePage",
  title: "Service Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "problem", title: "Problem", options: { collapsible: true } },
    { name: "subServices", title: "Sub-Services", options: { collapsible: true } },
    { name: "qualifiers", title: "Qualifiers", options: { collapsible: true } },
    { name: "process", title: "Process", options: { collapsible: true } },
    { name: "ctaBanners", title: "CTA Banners", options: { collapsible: true } },
    { name: "stats", title: "Stats Band", options: { collapsible: true, collapsed: true } },
    { name: "beforeAfter", title: "Before & After", options: { collapsible: true, collapsed: true } },
    { name: "caseStudies", title: "Case Studies", options: { collapsible: true, collapsed: true } },
    { name: "testimonials", title: "Testimonials", options: { collapsible: true, collapsed: true } },
    { name: "industries", title: "Industries Grid", options: { collapsible: true, collapsed: true } },
    { name: "featuredAutomations", title: "Featured Automations (AI only)", options: { collapsible: true, collapsed: true } },
    { name: "lab", title: "From The Lab", options: { collapsible: true, collapsed: true } },
    { name: "faqSection", title: "FAQ Section", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO & Metadata", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "pageId",
      title: "Page ID",
      type: "string",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "Marketing", value: "marketing" },
          { title: "AI", value: "ai" },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    /* ── SEO ── */
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", fieldset: "seo", description: "Overrides the default page title in search results" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3, fieldset: "seo", description: "Page description for search engines and social sharing" }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image", fieldset: "seo", description: "Image shown when the page is shared on social media" }),

    /* ── Hero ── */
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", fieldset: "hero" }),
    defineField({ name: "heroHighlightedWord", title: "Hero Highlighted Word", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSubStatement", title: "Hero Sub-Statement", type: "text", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Hero Primary CTA Label", type: "string", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCtaUrl", title: "Hero Primary CTA URL", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Hero Secondary CTA Label", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaUrl", title: "Hero Secondary CTA URL", type: "string", fieldset: "hero" }),
    defineField({ name: "heroScrollCueText", title: "Hero Scroll Cue Text", type: "string", fieldset: "hero" }),
    defineField({
      name: "heroScrollCueTargetId",
      title: "Hero Scroll Cue Target",
      type: "string",
      fieldset: "hero",
      description: "Section the scroll cue scrolls to",
      options: {
        list: [
          { title: "Stats", value: "stats" },
          { title: "The Problem", value: "problem" },
          { title: "Sub-Services (Dev)", value: "dev-services" },
          { title: "Sub-Services (Marketing)", value: "sub-services" },
          { title: "Sub-Services (AI)", value: "ai-services" },
          { title: "Process", value: "process" },
          { title: "Before vs After", value: "before-after" },
          { title: "Case Studies", value: "case-studies" },
          { title: "Testimonials", value: "testimonials" },
          { title: "FAQ", value: "faq" },
        ],
      },
    }),

    /* ── Problem ── */
    defineField({ name: "problemHeadline", title: "Problem Headline", type: "string", fieldset: "problem" }),
    defineField({ name: "problemHighlightedWord", title: "Problem Highlighted Word", type: "string", fieldset: "problem" }),
    defineField({
      name: "problemPainPoints",
      title: "Problem Pain Points",
      type: "array",
      fieldset: "problem",
      of: [defineArrayMember({ type: "string" })],
    }),

    /* ── Sub-Services ── */
    defineField({ name: "subServicesHeadline", title: "Sub-Services Headline", type: "string", fieldset: "subServices" }),
    defineField({ name: "subServicesHighlightedWord", title: "Sub-Services Highlighted Word", type: "string", fieldset: "subServices" }),
    defineField({ name: "subServicesDescription", title: "Sub-Services Description", type: "text", fieldset: "subServices" }),
    defineField({
      name: "subServiceItems",
      title: "Sub-Service Items",
      type: "array",
      fieldset: "subServices",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "bentoTools",
      title: "Bento Tools / Platforms",
      description: "Tool names shown in the scrolling strip inside the sub-services bento grid (e.g. React, Node.js, Figma). Add as many as you need.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Tool Name", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Qualifiers ── */
    defineField({ name: "qualifiersHeadline", title: "Qualifiers Headline", type: "string", fieldset: "qualifiers" }),
    defineField({ name: "qualifiersHighlightedWord", title: "Qualifiers Highlighted Word", type: "string", fieldset: "qualifiers" }),
    defineField({
      name: "qualifiers",
      title: "Qualifiers",
      type: "array",
      fieldset: "qualifiers",
      of: [defineArrayMember({ type: "string" })],
    }),

    /* ── Process ── */
    defineField({ name: "processHeadline", title: "Process Headline", type: "string", fieldset: "process" }),
    defineField({ name: "processHighlightedWord", title: "Process Highlighted Word", type: "string", fieldset: "process" }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      fieldset: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        }),
      ],
    }),

    /* ── CTA Banners ── */
    defineField({
      name: "ctaBannerMid",
      title: "CTA Banner Mid",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaBannerFinal",
      title: "CTA Banner Final",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),

    /* ── Stats Band ── */
    defineField({ name: "statsHeadline", title: "Stats Headline", type: "string", fieldset: "stats" }),
    defineField({ name: "statsHighlightedWord", title: "Stats Highlighted Word", type: "string", fieldset: "stats" }),
    defineField({ name: "statsDescription", title: "Stats Description", type: "text", fieldset: "stats" }),
    defineField({
      name: "statsItems",
      title: "Stats Items",
      type: "array",
      fieldset: "stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Numeric Value", type: "number" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "suffix", title: "Suffix (e.g. +, %)", type: "string" }),
            defineField({ name: "prefix", title: "Prefix (e.g. £)", type: "string" }),
            defineField({ name: "decimals", title: "Decimal Places", type: "number" }),
          ],
        }),
      ],
    }),

    /* ── Before & After ── */
    defineField({ name: "beforeAfterHeadline", title: "Before & After Headline", type: "string", fieldset: "beforeAfter" }),
    defineField({ name: "beforeAfterHighlightedWord", title: "Before & After Highlighted Word", type: "string", fieldset: "beforeAfter" }),
    defineField({ name: "beforeAfterDescription", title: "Before & After Description", type: "text", fieldset: "beforeAfter" }),
    defineField({
      name: "beforeAfterPairs",
      title: "Before & After Pairs",
      type: "array",
      fieldset: "beforeAfter",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "clientName", title: "Client Name", type: "string" }),
            defineField({ name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "afterImage", title: "After Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "beforeLabel", title: "Before Label", type: "string" }),
            defineField({ name: "afterLabel", title: "After Label", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Case Studies ── */
    defineField({ name: "caseStudiesHeadline", title: "Case Studies Headline", type: "string", fieldset: "caseStudies" }),
    defineField({ name: "caseStudiesHighlightedWord", title: "Case Studies Highlighted Word", type: "string", fieldset: "caseStudies" }),
    defineField({ name: "caseStudiesDescription", title: "Case Studies Description", type: "text", fieldset: "caseStudies" }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      fieldset: "caseStudies",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
    }),

    /* ── Testimonials ── */
    defineField({ name: "testimonialsHeadline", title: "Testimonials Headline", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialsHighlightedWord", title: "Testimonials Highlighted Word", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialsDescription", title: "Testimonials Description", type: "text", fieldset: "testimonials" }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      fieldset: "testimonials",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
    }),

    /* ── Industries Grid ── */
    defineField({ name: "industriesHeadline", title: "Industries Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesHighlightedWord", title: "Industries Highlighted Word", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesDescription", title: "Industries Description", type: "text", fieldset: "industries" }),
    defineField({ name: "industriesCtaHeadline", title: "Industries CTA Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaLabel", title: "Industries CTA Label", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaUrl", title: "Industries CTA URL", type: "string", fieldset: "industries" }),
    defineField({
      name: "featuredIndustries",
      title: "Featured Industries",
      type: "array",
      fieldset: "industries",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industryPage" }] })],
    }),

    /* ── Featured Automations (AI page only) ── */
    defineField({ name: "featuredAutomationsHeadline", title: "Featured Automations Headline", type: "string", fieldset: "featuredAutomations" }),
    defineField({ name: "featuredAutomationsHighlightedWord", title: "Featured Automations Highlighted Word", type: "string", fieldset: "featuredAutomations" }),
    defineField({ name: "featuredAutomationsDescription", title: "Featured Automations Description", type: "text", fieldset: "featuredAutomations" }),
    defineField({ name: "featuredAutomationsViewAllLabel", title: "View All Label", type: "string", fieldset: "featuredAutomations" }),
    defineField({ name: "featuredAutomationsViewAllUrl", title: "View All URL", type: "string", fieldset: "featuredAutomations" }),

    /* ── From The Lab ── */
    defineField({ name: "labHeadline", title: "Lab Section Headline", type: "string", fieldset: "lab" }),
    defineField({ name: "labHighlightedWord", title: "Lab Highlighted Word", type: "string", fieldset: "lab" }),
    defineField({ name: "labDescription", title: "Lab Description", type: "text", fieldset: "lab" }),
    defineField({ name: "labSectionTitle", title: "Lab Section Sub-Title", type: "string", fieldset: "lab" }),
    defineField({ name: "labSeeAllLabel", title: "Lab See All Label", type: "string", fieldset: "lab" }),
    defineField({ name: "labSeeAllUrl", title: "Lab See All URL", type: "string", fieldset: "lab" }),

    /* ── FAQ Section ── */
    defineField({ name: "faqSectionHeadline", title: "FAQ Headline", type: "string", fieldset: "faqSection" }),
    defineField({ name: "faqSectionHighlightedWord", title: "FAQ Highlighted Word", type: "string", fieldset: "faqSection" }),
    defineField({ name: "faqSectionDescription", title: "FAQ Description", type: "text", fieldset: "faqSection" }),
    defineField({ name: "faqCtaHeadline", title: "FAQ CTA Headline", type: "string", fieldset: "faqSection" }),
    defineField({ name: "faqCtaDescription", title: "FAQ CTA Description", type: "text", fieldset: "faqSection" }),
    defineField({ name: "faqCtaLabel", title: "FAQ CTA Label", type: "string", fieldset: "faqSection" }),
    defineField({ name: "faqCtaUrl", title: "FAQ CTA URL", type: "string", fieldset: "faqSection" }),
  ],
  preview: {
    select: { pageId: "pageId" },
    prepare({ pageId }: { pageId?: string }) {
      return {
        title: pageId
          ? pageId.charAt(0).toUpperCase() + pageId.slice(1) + " Service Page"
          : "Service Page",
      };
    },
  },
});
