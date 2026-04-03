import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Page Hero", options: { collapsible: true } },
    { name: "emptyStates", title: "Empty State Copy", options: { collapsible: true, collapsed: true } },
    { name: "services", title: "Services Section", options: { collapsible: true } },
    { name: "process", title: "Process Section", options: { collapsible: true } },
    { name: "beforeAfter", title: "Before & After Section", options: { collapsible: true } },
    { name: "industries", title: "Industries Section", options: { collapsible: true } },
    { name: "ctaInline", title: "Inline CTA Banner", options: { collapsible: true } },
    { name: "ctaSection", title: "Section CTA Banner", options: { collapsible: true } },
  ],
  fields: [
    /* ── Hero ── */
    defineField({ name: "pageHeadline", title: "Page Headline", type: "string", fieldset: "hero" }),
    defineField({ name: "pageHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "hero" }),
    defineField({ name: "pageDescription", title: "Page Description", type: "text", fieldset: "hero" }),

    /* ── Empty States ── */
    defineField({ name: "emptyStatePrimary", title: "No Case Studies Copy", type: "string", fieldset: "emptyStates", description: "Shown when no case studies exist in CMS." }),
    defineField({ name: "emptyStateFiltered", title: "No Filter Match Copy", type: "string", fieldset: "emptyStates", description: "Shown when active filters return zero results." }),

    /* ── Services ── */
    defineField({ name: "servicesHeadline", title: "Headline", type: "string", fieldset: "services" }),
    defineField({ name: "servicesHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "services" }),
    defineField({ name: "servicesDescription", title: "Description", type: "text", fieldset: "services" }),
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
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
            defineField({ name: "lottiePath", title: "Lottie Animation", type: "string", options: { list: [{ title: "Chat Bot", value: "/lottie-json/Chat Bot.json" }, { title: "Digital Marketing", value: "/lottie-json/Digital Marketing.json" }, { title: "Web Development", value: "/lottie-json/Web Development.json" }, { title: "Step — Architect", value: "/lottie-json/step-architect.json" }, { title: "Step — Audit", value: "/lottie-json/step-audit.json" }, { title: "Step — Build", value: "/lottie-json/step-build.json" }, { title: "Step — Scale", value: "/lottie-json/step-scale.json" }] } }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Process ── */
    defineField({ name: "processHeadline", title: "Headline", type: "string", fieldset: "process" }),
    defineField({ name: "processHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "process" }),
    defineField({ name: "processDescription", title: "Description", type: "text", fieldset: "process" }),
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
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "lottiePath", title: "Lottie Animation", type: "string", options: { list: [{ title: "Chat Bot", value: "/lottie-json/Chat Bot.json" }, { title: "Digital Marketing", value: "/lottie-json/Digital Marketing.json" }, { title: "Web Development", value: "/lottie-json/Web Development.json" }, { title: "Step — Architect", value: "/lottie-json/step-architect.json" }, { title: "Step — Audit", value: "/lottie-json/step-audit.json" }, { title: "Step — Build", value: "/lottie-json/step-build.json" }, { title: "Step — Scale", value: "/lottie-json/step-scale.json" }] } }),
            defineField({ name: "fallbackGradient", title: "Fallback Gradient", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Before & After ── */
    defineField({ name: "beforeAfterHeadline", title: "Headline", type: "string", fieldset: "beforeAfter" }),
    defineField({ name: "beforeAfterHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "beforeAfter" }),
    defineField({ name: "beforeAfterDescription", title: "Description", type: "text", fieldset: "beforeAfter" }),
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
            defineField({ name: "beforeLabel", title: "Before Label", type: "string", description: 'Defaults to "Before"' }),
            defineField({ name: "afterLabel", title: "After Label", type: "string", description: 'Defaults to "After"' }),
          ],
        }),
      ],
    }),

    /* ── Industries ── */
    defineField({ name: "industriesHeadline", title: "Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesDescription", title: "Description", type: "text", fieldset: "industries" }),
    defineField({
      name: "industryCards",
      title: "Industry Cards",
      type: "array",
      fieldset: "industries",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industryPage" }] })],
    }),
    defineField({ name: "industriesCtaHeadline", title: "CTA Headline", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaLabel", title: "CTA Label", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesCtaUrl", title: "CTA URL", type: "string", fieldset: "industries" }),

    /* ── Inline CTA ── */
    defineField({ name: "ctaInlineHeadline", title: "Headline", type: "string", fieldset: "ctaInline" }),
    defineField({ name: "ctaInlineHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "ctaInline" }),
    defineField({ name: "ctaInlineLabel", title: "CTA Label", type: "string", fieldset: "ctaInline" }),
    defineField({ name: "ctaInlineDestination", title: "CTA Destination URL", type: "string", fieldset: "ctaInline" }),

    /* ── Section CTA ── */
    defineField({ name: "ctaSectionHeadline", title: "Headline", type: "string", fieldset: "ctaSection" }),
    defineField({ name: "ctaSectionHighlightedWord", title: "Highlighted Word", type: "string", fieldset: "ctaSection" }),
    defineField({ name: "ctaSectionLabel", title: "CTA Label", type: "string", fieldset: "ctaSection" }),
    defineField({ name: "ctaSectionDestination", title: "CTA Destination URL", type: "string", fieldset: "ctaSection" }),
  ],
  preview: {
    prepare() {
      return { title: "Work Page" };
    },
  },
});
