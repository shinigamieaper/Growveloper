import { defineType, defineField } from "sanity";

export default defineType({
  name: "automationsPage",
  title: "Automations Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "cta", title: "Section CTA", options: { collapsible: true } },
  ],
  fields: [
    /* ── Hero ── */
    defineField({ name: "heroHeadline", title: "Headline", type: "string", fieldset: "hero" }),
    defineField({ name: "heroHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSubStatement", title: "Sub-Statement", type: "text", fieldset: "hero" }),
    defineField({ name: "heroScrollCueText", title: "Scroll Cue Text", type: "string", fieldset: "hero" }),

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
