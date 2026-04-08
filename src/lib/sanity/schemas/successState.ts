import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Reusable object type for each "state" in the SuccessAnimation section.
 * Each state has a subtitle (tab label), a visual type, and type-specific content.
 */
export default defineType({
  name: "successState",
  title: "Success State",
  type: "object",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle / Tab Label",
      type: "string",
      description: 'Shown as the tab label and subtitle, e.g. "Lighthouse Perfect Score"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stateType",
      title: "Visual Type",
      type: "string",
      description: "Which animation/visual to render for this state.",
      options: {
        list: [
          { title: "Metric Counters", value: "metrics" },
          { title: "Core Web Vitals", value: "webvitals" },
          { title: "Traffic Chart + Metrics", value: "traffic" },
          { title: "AI Search Preview", value: "ai-visible" },
          { title: "Workflow Steps", value: "workflow" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),

    /* ── Metrics (for "metrics" and "traffic" types) ── */
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      description: 'Counter cards. Used by "Metric Counters" and "Traffic Chart + Metrics" types.',
      hidden: ({ parent }) =>
        parent?.stateType !== "metrics" && parent?.stateType !== "traffic",
      of: [
        defineArrayMember({
          type: "object",
          name: "metricItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "number" }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "s", "%", "×"' }),
            defineField({ name: "prefix", title: "Prefix", type: "string", description: 'e.g. "+"' }),
            defineField({ name: "decimals", title: "Decimal Places", type: "number" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    /* ── Core Web Vitals (for "webvitals" type) ── */
    defineField({
      name: "vitals",
      title: "Web Vitals",
      type: "array",
      description: 'Pass/fail rows. Used by "Core Web Vitals" type.',
      hidden: ({ parent }) => parent?.stateType !== "webvitals",
      of: [
        defineArrayMember({
          type: "object",
          name: "vitalItem",
          fields: [
            defineField({ name: "metric", title: "Metric Name", type: "string", description: 'e.g. "LCP", "FID", "CLS"' }),
            defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "1.2s", "8ms"' }),
            defineField({ name: "threshold", title: "Threshold", type: "string", description: 'e.g. "< 2.5s"' }),
            defineField({ name: "pass", title: "Passing?", type: "boolean", initialValue: true }),
          ],
          preview: {
            select: { title: "metric", subtitle: "value" },
          },
        }),
      ],
    }),

    /* ── AI Search Preview (for "ai-visible" type) ── */
    defineField({
      name: "searchQuery",
      title: "Search Query",
      type: "string",
      description: 'The AI search query shown, e.g. "Best web development agency for SaaS"',
      hidden: ({ parent }) => parent?.stateType !== "ai-visible",
    }),
    defineField({
      name: "searchResponse",
      title: "Search Response",
      type: "text",
      rows: 3,
      description: "The AI-generated response text shown below the query.",
      hidden: ({ parent }) => parent?.stateType !== "ai-visible",
    }),
    defineField({
      name: "brandMention",
      title: "Brand Mention Text",
      type: "string",
      description: 'The brand name highlighted in the response, e.g. "Growveloper"',
      hidden: ({ parent }) => parent?.stateType !== "ai-visible",
    }),

    /* ── Workflow Steps (for "workflow" type) ── */
    defineField({
      name: "workflowSteps",
      title: "Workflow Steps",
      type: "array",
      description: 'Node labels for the workflow diagram. Used by "Workflow Steps" type.',
      hidden: ({ parent }) => parent?.stateType !== "workflow",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "workflowStatValue",
      title: "Workflow Stat Value",
      type: "number",
      description: "The big number shown below the workflow, e.g. 142",
      hidden: ({ parent }) => parent?.stateType !== "workflow",
    }),
    defineField({
      name: "workflowStatLabel",
      title: "Workflow Stat Label",
      type: "string",
      description: 'e.g. "Hours Saved Per Month"',
      hidden: ({ parent }) => parent?.stateType !== "workflow",
    }),
    defineField({
      name: "workflowStatSuffix",
      title: "Workflow Stat Suffix",
      type: "string",
      description: 'e.g. "+"',
      hidden: ({ parent }) => parent?.stateType !== "workflow",
    }),
  ],
  preview: {
    select: { title: "subtitle", subtitle: "stateType" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Untitled State", subtitle: subtitle || "" };
    },
  },
});
