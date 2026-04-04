import { defineType, defineField } from "sanity";

export default defineType({
  name: "automationsPage",
  title: "Automations Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "cta", title: "Section CTA", options: { collapsible: true } },
    { name: "seo", title: "SEO & Metadata", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ── SEO ── */
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", fieldset: "seo", description: "Overrides the default page title in search results" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3, fieldset: "seo", description: "Page description for search engines and social sharing" }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image", fieldset: "seo", description: "Image shown when the page is shared on social media" }),

    /* ── Hero ── */
    defineField({ name: "heroHeadline", title: "Headline", type: "string", fieldset: "hero" }),
    defineField({ name: "heroHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSubStatement", title: "Sub-Statement", type: "text", fieldset: "hero" }),
    defineField({ name: "heroScrollCueText", title: "Scroll Cue Text", type: "string", fieldset: "hero" }),
    defineField({ name: "heroScrollCueTargetId", title: "Scroll Cue Target ID", type: "string", fieldset: "hero", description: 'ID of the section to scroll to, e.g. "catalogue"' }),

    /* ── CTA ── */
    defineField({ name: "ctaHeadline", title: "Headline", type: "string", fieldset: "cta" }),
    defineField({ name: "ctaHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "cta" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", fieldset: "cta" }),
    defineField({ name: "ctaDestination", title: "CTA Destination URL", type: "string", fieldset: "cta" }),
  ],
  preview: {
    prepare() {
      return { title: "Automations Page" };
    },
  },
});
