import { defineField, defineType } from "sanity";

export default defineType({
  name: "resourcesPage",
  title: "Resources — Page Settings",
  type: "document",
  groups: [
    { name: "header", title: "Page Header" },
    { name: "emptyStates", title: "Empty State Copy" },
    { name: "newsletter", title: "Newsletter Section" },
    { name: "inlineCta", title: "Inline CTA" },
    { name: "sectionCta", title: "Section CTA" },
  ],
  fields: [
    /* ─── Page Header ─── */
    defineField({ name: "pageHeadline", title: "Page Headline", type: "string", group: "header" }),
    defineField({ name: "pageHighlightedWord", title: "Highlighted Word", type: "string", group: "header" }),
    defineField({ name: "pageDescription", title: "Page Description", type: "text", rows: 3, group: "header" }),

    /* ─── Empty States ─── */
    defineField({ name: "emptyStatePrimary", title: "No Resources Copy", type: "string", group: "emptyStates", description: "Shown when no resources exist in CMS." }),
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
  ],
  preview: {
    select: { title: "pageHeadline" },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? "Resources — Page Settings" }),
  },
});
