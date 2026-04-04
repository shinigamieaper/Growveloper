import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "shortVersion", title: "Short Version", options: { collapsible: true } },
    { name: "story", title: "Story", options: { collapsible: true } },
    { name: "stats", title: "Stats", options: { collapsible: true } },
    { name: "companies", title: "Companies", options: { collapsible: true } },
    { name: "principles", title: "Principles", options: { collapsible: true } },
    { name: "skills", title: "Skills", options: { collapsible: true } },
    { name: "interests", title: "Interests", options: { collapsible: true } },
    { name: "caseStudies", title: "Featured Work", options: { collapsible: true, collapsed: true } },
    { name: "ctaBanners", title: "CTA Banners", options: { collapsible: true, collapsed: true } },
    { name: "cta", title: "Final CTA (legacy)", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO & Metadata", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    /* ── SEO ── */
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", fieldset: "seo", description: "Overrides the default page title in search results" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3, fieldset: "seo", description: "Page description for search engines and social sharing" }),
    defineField({ name: "ogImage", title: "Social Share Image", type: "image", fieldset: "seo", description: "Image shown when the page is shared on social media" }),

    /* ── Hero ── */
    defineField({
      name: "heroName",
      title: "Hero Name",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroIdentity",
      title: "Hero Identity",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "portraitImage",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "hero",
    }),
    defineField({
      name: "portraitAlt",
      title: "Portrait Alt Text",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroNamePrefix",
      title: "Hero Name Prefix",
      type: "string",
      fieldset: "hero",
      description: 'The greeting before the name, e.g. "Hello, I\'m"',
    }),
    defineField({ name: "heroScrollCueText", title: "Scroll Cue Text", type: "string", fieldset: "hero", description: 'Marquee text on the scroll cue button, e.g. "EXPLORE · "' }),
    defineField({ name: "heroScrollCueTargetId", title: "Scroll Cue Target ID", type: "string", fieldset: "hero", description: 'ID of the section to scroll to, e.g. "short-version"' }),

    /* ── Short Version ── */
    defineField({
      name: "shortVersionHeadline",
      title: "Short Version Headline",
      type: "string",
      fieldset: "shortVersion",
    }),
    defineField({
      name: "shortVersionHighlightedWord",
      title: "Short Version Highlighted Word",
      type: "string",
      fieldset: "shortVersion",
    }),
    defineField({
      name: "shortVersionBody",
      title: "Short Version Body",
      type: "text",
      fieldset: "shortVersion",
    }),

    /* ── Story ── */
    defineField({
      name: "storyHeadline",
      title: "Story Headline",
      type: "string",
      fieldset: "story",
    }),
    defineField({
      name: "storyHighlightedWord",
      title: "Story Highlighted Word",
      type: "string",
      fieldset: "story",
    }),
    defineField({
      name: "storyBody",
      title: "Story Body",
      description: "Multiple paragraphs stored as an array of strings",
      type: "array",
      fieldset: "story",
      of: [defineArrayMember({ type: "string" })],
    }),

    /* ── Stats ── */
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      fieldset: "stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),

    /* ── Companies ── */
    defineField({
      name: "companiesHeadline",
      title: "Companies Headline",
      type: "string",
      fieldset: "companies",
    }),
    defineField({
      name: "companiesHighlightedWord",
      title: "Companies Highlighted Word",
      type: "string",
      fieldset: "companies",
    }),
    defineField({
      name: "companies",
      title: "Companies",
      type: "array",
      fieldset: "companies",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "insight", title: "Insight", type: "text" }),
            defineField({ name: "logo", title: "Company Logo", type: "image", options: { hotspot: true } }),
          ],
        }),
      ],
    }),

    /* ── Principles ── */
    defineField({
      name: "principlesHeadline",
      title: "Principles Headline",
      type: "string",
      fieldset: "principles",
    }),
    defineField({
      name: "principlesHighlightedWord",
      title: "Principles Highlighted Word",
      type: "string",
      fieldset: "principles",
    }),
    defineField({
      name: "principles",
      title: "Principles",
      type: "array",
      fieldset: "principles",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: [{ title: "👥 Users — Direct work, teamwork", value: "users" }, { title: "📊 Bar Chart — Data-driven", value: "bar-chart" }, { title: "🎯 Target — Customer focus, precision", value: "target" }, { title: "🧠 Brain — Strategy, thinking", value: "brain" }, { title: "⚡ Zap — Speed, efficiency", value: "zap" }, { title: "🛡 Shield — Security, trust", value: "shield" }, { title: "🔧 Wrench — Building, maintenance", value: "wrench" }, { title: "💻 Code — Development", value: "code" }, { title: "🔍 Search — Research, discovery", value: "search" }, { title: "💡 Lightbulb — Ideas, insights", value: "lightbulb" }, { title: "🚀 Rocket — Growth, launch", value: "rocket" }, { title: "🔄 Workflow — Process, systems", value: "workflow" }, { title: "🔗 Link — Integration, connection", value: "link" }, { title: "📈 Trending Up — Growth metrics", value: "trending-up" }, { title: "🤖 Bot — Automation, AI", value: "bot" }] } }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        }),
      ],
    }),

    /* ── Skills ── */
    defineField({
      name: "skillsHeadline",
      title: "Skills Headline",
      type: "string",
      fieldset: "skills",
    }),
    defineField({
      name: "skillsHighlightedWord",
      title: "Skills Highlighted Word",
      type: "string",
      fieldset: "skills",
    }),
    defineField({
      name: "disciplines",
      title: "Disciplines",
      type: "array",
      fieldset: "skills",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "tools",
              title: "Tools",
              type: "array",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [{ type: "toolRegistry" }],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ── Interests ── */
    defineField({
      name: "interestsHeadline",
      title: "Interests Headline",
      type: "string",
      fieldset: "interests",
    }),
    defineField({
      name: "interestsHighlightedWord",
      title: "Interests Highlighted Word",
      type: "string",
      fieldset: "interests",
    }),
    defineField({
      name: "interests",
      title: "Interests",
      type: "array",
      fieldset: "interests",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string", options: { list: [{ title: "👗 Fashion — Creative direction", value: "eye" }, { title: "🏀 Basketball — Teamwork, strategy", value: "target" }, { title: "📚 Education — Learning, growth", value: "lightbulb" }, { title: "🎵 Music — Creative outlet", value: "brain" }, { title: "✈ Travel — Exploration", value: "globe" }, { title: "🎮 Gaming — Problem solving", value: "puzzle" }, { title: "📸 Photography — Visual eye", value: "eye" }, { title: "🔬 Science — Research, curiosity", value: "search" }, { title: "🏋 Fitness — Discipline", value: "zap" }, { title: "🍳 Cooking — Creativity", value: "flame" }] } }),
            defineField({ name: "interest", title: "Interest", type: "string" }),
            defineField({ name: "connection", title: "Connection", type: "text" }),
          ],
        }),
      ],
    }),

    /* ── Featured Work ── */
    defineField({
      name: "caseStudiesHeadline",
      title: "Featured Work Headline",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "caseStudiesHighlightedWord",
      title: "Featured Work Highlighted Word",
      type: "string",
      fieldset: "caseStudies",
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      fieldset: "caseStudies",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
    }),

    /* ── CTA Banners ── */
    defineField({
      name: "inlineCta",
      title: "Inline CTA Banner",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
        defineField({
          name: "colorScheme",
          title: "Color Scheme",
          type: "string",
          options: { list: ["teal-solid", "light-teal", "glass"] },
        }),
      ],
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA Banner",
      type: "object",
      fieldset: "ctaBanners",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
        defineField({ name: "subCopy", title: "Sub Copy", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
        defineField({
          name: "colorScheme",
          title: "Color Scheme",
          type: "string",
          options: { list: ["teal-solid", "light-teal", "glass"] },
        }),
      ],
    }),

    /* ── CTA (legacy single CTA) ── */
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaHighlightedWord",
      title: "CTA Highlighted Word",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
      fieldset: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
