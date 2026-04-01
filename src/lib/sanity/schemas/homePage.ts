import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "diagnosis", title: "Diagnosis", options: { collapsible: true } },
    { name: "services", title: "Services", options: { collapsible: true } },
    { name: "industries", title: "Industries", options: { collapsible: true } },
    { name: "process", title: "Process", options: { collapsible: true } },
    { name: "caseStudies", title: "Case Studies", options: { collapsible: true } },
    { name: "ctaBanners", title: "CTA Banners", options: { collapsible: true } },
    { name: "testimonials", title: "Testimonials", options: { collapsible: true } },
    { name: "faq", title: "FAQ", options: { collapsible: true } },
    { name: "liveFeed", title: "Live Feed", options: { collapsible: true } },
    { name: "beforeAfter", title: "Before & After", options: { collapsible: true } },
    { name: "successMetrics", title: "Success Metrics", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ── Hero ── */
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHighlightedWord",
      title: "Hero Highlighted Word",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSubStatement",
      title: "Hero Sub-Statement",
      type: "text",
      fieldset: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Hero Primary CTA Label",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaUrl",
      title: "Hero Primary CTA URL",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Hero Secondary CTA Label",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaUrl",
      title: "Hero Secondary CTA URL",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSocialProofText",
      title: "Hero Social Proof Text",
      type: "string",
      fieldset: "hero",
    }),

    /* ── Diagnosis ── */
    defineField({
      name: "diagnosisHeadline",
      title: "Diagnosis Headline",
      type: "string",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisHighlightedWord",
      title: "Diagnosis Highlighted Word",
      type: "string",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisDescription",
      title: "Diagnosis Description",
      type: "text",
      fieldset: "diagnosis",
    }),
    defineField({
      name: "diagnosisCards",
      title: "Diagnosis Cards",
      type: "array",
      fieldset: "diagnosis",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string" }),
            defineField({ name: "headline", title: "Headline", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text" }),
          ],
        }),
      ],
    }),

    /* ── Services ── */
    defineField({
      name: "servicesHeadline",
      title: "Services Headline",
      type: "string",
      fieldset: "services",
    }),
    defineField({
      name: "servicesHighlightedWord",
      title: "Services Highlighted Word",
      type: "string",
      fieldset: "services",
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Description",
      type: "text",
      fieldset: "services",
    }),
    defineField({
      name: "serviceItems",
      title: "Service Items",
      type: "array",
      fieldset: "services",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "subItems",
              title: "Sub Items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
            defineField({ name: "lottiePath", title: "Lottie Path", type: "string" }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
            defineField({ name: "icon", title: "Icon", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Industries ── */
    defineField({
      name: "industriesHeadline",
      title: "Industries Headline",
      type: "string",
      fieldset: "industries",
    }),
    defineField({
      name: "industriesHighlightedWord",
      title: "Industries Highlighted Word",
      type: "string",
      fieldset: "industries",
    }),
    defineField({
      name: "industriesDescription",
      title: "Industries Description",
      type: "text",
      fieldset: "industries",
    }),
    defineField({
      name: "industryCards",
      title: "Industry Cards",
      type: "array",
      fieldset: "industries",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "industryPage" }],
        }),
      ],
    }),
    defineField({ name: "industriesCtaHeadline", title: "Industries CTA Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaLabel", title: "Industries CTA Label", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaUrl", title: "Industries CTA URL", type: "string", fieldset: "industries" }),

    /* ── Process ── */
    defineField({
      name: "processHeadline",
      title: "Process Headline",
      type: "string",
      fieldset: "process",
    }),
    defineField({
      name: "processHighlightedWord",
      title: "Process Highlighted Word",
      type: "string",
      fieldset: "process",
    }),
    defineField({
      name: "processDescription",
      title: "Process Description",
      type: "text",
      fieldset: "process",
    }),
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
            defineField({ name: "lottiePath", title: "Lottie Path", type: "string" }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Case Studies ── */
    defineField({
      name: "caseStudiesHeadline",
      title: "Case Studies Headline",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "caseStudiesHighlightedWord",
      title: "Case Studies Highlighted Word",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "caseStudiesDescription",
      title: "Case Studies Description",
      type: "text",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      fieldset: "caseStudies",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
        }),
      ],
    }),

    /* ── CTA Banners ── */
    defineField({
      name: "ctaBanner1",
      title: "CTA Banner 1",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaBanner2",
      title: "CTA Banner 2",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),

    /* ── Testimonials ── */
    defineField({
      name: "testimonialHeadline",
      title: "Testimonial Headline",
      type: "string",
      fieldset: "testimonials",
    }),
    defineField({
      name: "testimonialHighlightedWord",
      title: "Testimonial Highlighted Word",
      type: "string",
      fieldset: "testimonials",
    }),
    defineField({
      name: "testimonialDescription",
      title: "Testimonial Description",
      type: "text",
      fieldset: "testimonials",
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      fieldset: "testimonials",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
    }),
    defineField({ name: "testimonialCtaHeadline", title: "Testimonial CTA Headline", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialCtaLabel", title: "Testimonial CTA Label", type: "string", fieldset: "testimonials" }),
    defineField({ name: "testimonialCtaUrl", title: "Testimonial CTA URL", type: "string", fieldset: "testimonials" }),

    /* ── FAQ ── */
    defineField({
      name: "faqHeadline",
      title: "FAQ Headline",
      type: "string",
      fieldset: "faq",
    }),
    defineField({
      name: "faqHighlightedWord",
      title: "FAQ Highlighted Word",
      type: "string",
      fieldset: "faq",
    }),
    defineField({
      name: "faqDescription",
      title: "FAQ Description",
      type: "text",
      fieldset: "faq",
    }),
    defineField({ name: "faqCtaHeadline", title: "FAQ CTA Headline", type: "string", fieldset: "faq" }),
    defineField({ name: "faqCtaDescription", title: "FAQ CTA Description", type: "text", fieldset: "faq" }),
    defineField({ name: "faqCtaLabel", title: "FAQ CTA Label", type: "string", fieldset: "faq" }),
    defineField({ name: "faqCtaUrl", title: "FAQ CTA URL", type: "string", fieldset: "faq" }),

    /* ── Live Feed ── */
    defineField({
      name: "liveFeedHeadline",
      title: "Live Feed Headline",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedHighlightedWord",
      title: "Live Feed Highlighted Word",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedSeeAllLabel",
      title: "Live Feed See All Label",
      type: "string",
      fieldset: "liveFeed",
    }),
    defineField({
      name: "liveFeedDescription",
      title: "Live Feed Description",
      type: "text",
      fieldset: "liveFeed",
    }),

    /* ── Before & After ── */
    defineField({
      name: "beforeAfterHeadline",
      title: "Before & After Headline",
      type: "string",
      fieldset: "beforeAfter",
    }),
    defineField({
      name: "beforeAfterHighlightedWord",
      title: "Before & After Highlighted Word",
      type: "string",
      fieldset: "beforeAfter",
    }),
    defineField({
      name: "beforeAfterDescription",
      title: "Before & After Description",
      type: "text",
      fieldset: "beforeAfter",
    }),
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
            defineField({
              name: "beforeImage",
              title: "Before Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "afterImage",
              title: "After Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "beforeLabel", title: "Before Label", type: "string" }),
            defineField({ name: "afterLabel", title: "After Label", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Success Metrics ── */
    defineField({
      name: "successMetrics",
      title: "Success Metrics",
      type: "array",
      fieldset: "successMetrics",
      description: "Metrics shown in the animated Success section. State 0 = Lighthouse (index 0: Score, index 1: Load Time). State 2 = Traffic (index 0: ROAS, index 1: Conversion Rate).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "stateIndex", title: "State Index (0-4)", type: "number" }),
            defineField({ name: "pillar", title: "Pillar ID", type: "string", description: "e.g. lighthouse-score, load-time, roas, conversion-rate" }),
            defineField({ name: "metricLabel", title: "Label", type: "string" }),
            defineField({ name: "metricValue", title: "Value", type: "number" }),
            defineField({ name: "metricSuffix", title: "Suffix", type: "string", description: "e.g. s, ×, %" }),
            defineField({ name: "metricPrefix", title: "Prefix", type: "string", description: "e.g. +" }),
            defineField({ name: "decimals", title: "Decimal Places", type: "number" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
