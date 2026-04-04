import { defineField, defineType } from "sanity";

export default defineType({
  name: "labPage",
  title: "The Lab — Page Settings",
  type: "document",
  groups: [
    { name: "header", title: "Page Header" },
    { name: "emptyStates", title: "Empty State Copy" },
    { name: "newsletter", title: "Newsletter Section" },
    { name: "inlineCta", title: "Inline CTA" },
    { name: "sectionCta", title: "Section CTA" },
    { name: "postCta", title: "Lab Post CTAs" },
    { name: "seo", title: "SEO & Metadata" },
  ],
  fields: [
    /* ─── SEO ─── */
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo", description: "Overrides the default page title in search results" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3, group: "seo", description: "Page description for search engines and social sharing" }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image", group: "seo", description: "Image shown when the page is shared on social media" }),

    /* ─── Page Header ─── */
    defineField({ name: "pageHeadline", title: "Page Headline", type: "string", group: "header" }),
    defineField({ name: "pageHighlightedWord", title: "Highlighted Word", type: "string", group: "header" }),
    defineField({ name: "pageDescription", title: "Page Description", type: "text", rows: 3, group: "header" }),

    /* ─── Empty States ─── */
    defineField({ name: "emptyStateFiltered", title: "No Filter Match Copy", type: "string", group: "emptyStates", description: "Shown when active filters return zero results." }),

    /* ─── Newsletter ─── */
    defineField({ name: "newsletterHeadline", title: "Newsletter Headline", type: "string", group: "newsletter" }),
    defineField({ name: "newsletterHighlightedWord", title: "Newsletter Highlighted Word", type: "string", group: "newsletter" }),
    defineField({ name: "newsletterSubCopy", title: "Newsletter Sub Copy", type: "text", rows: 2, group: "newsletter" }),
    defineField({ name: "newsletterCtaLabel", title: "Newsletter CTA Label", type: "string", group: "newsletter" }),

    /* ─── Inline CTA ─── */
    defineField({ name: "inlineCtaHeadline", title: "Inline CTA Headline", type: "string", group: "inlineCta" }),
    defineField({ name: "inlineCtaHighlightedWord", title: "Inline CTA Highlighted Word", type: "string", group: "inlineCta" }),
    defineField({ name: "inlineCtaLabel", title: "Inline CTA Label", type: "string", group: "inlineCta" }),
    defineField({ name: "inlineCtaDestination", title: "Inline CTA Destination URL", type: "string", group: "inlineCta" }),

    /* ─── Section CTA ─── */
    defineField({ name: "sectionCtaHeadline", title: "Section CTA Headline", type: "string", group: "sectionCta" }),
    defineField({ name: "sectionCtaHighlightedWord", title: "Section CTA Highlighted Word", type: "string", group: "sectionCta" }),
    defineField({ name: "sectionCtaLabel", title: "Section CTA Label", type: "string", group: "sectionCta" }),
    defineField({ name: "sectionCtaDestination", title: "Section CTA Destination URL", type: "string", group: "sectionCta" }),

    /* ─── Lab Post CTAs (used on /lab/[slug]) ─── */
    defineField({ name: "postInlineCtaHeadline", title: "Post Inline CTA Headline", type: "string", group: "postCta" }),
    defineField({ name: "postInlineCtaHighlightedWord", title: "Post Inline CTA Highlighted Word", type: "string", group: "postCta" }),
    defineField({ name: "postInlineCtaLabel", title: "Post Inline CTA Label", type: "string", group: "postCta" }),
    defineField({ name: "postInlineCtaDestination", title: "Post Inline CTA Destination URL", type: "string", group: "postCta" }),
    defineField({ name: "postSectionCtaHeadline", title: "Post Section CTA Headline", type: "string", group: "postCta" }),
    defineField({ name: "postSectionCtaHighlightedWord", title: "Post Section CTA Highlighted Word", type: "string", group: "postCta" }),
    defineField({ name: "postSectionCtaLabel", title: "Post Section CTA Label", type: "string", group: "postCta" }),
    defineField({ name: "postSectionCtaDestination", title: "Post Section CTA Destination URL", type: "string", group: "postCta" }),
    defineField({ name: "postNewsletterHeadline", title: "Post Newsletter Headline", type: "string", group: "postCta" }),
    defineField({ name: "postNewsletterHighlightedWord", title: "Post Newsletter Highlighted Word", type: "string", group: "postCta" }),
    defineField({ name: "postNewsletterSubCopy", title: "Post Newsletter Sub Copy", type: "text", rows: 2, group: "postCta" }),
    defineField({ name: "postNewsletterCtaLabel", title: "Post Newsletter CTA Label", type: "string", group: "postCta" }),
  ],
  preview: {
    select: { title: "pageHeadline" },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? "The Lab — Page Settings" }),
  },
});
