# Start Page CMS — Dynamic Lead Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded 4-step qualifying form and confirmation pages with a CMS-driven system backed by three new Sanity singletons, a dynamic field renderer, and a sequential API write flow.

**Architecture:** Three new Sanity schema singletons (`startPage`, `startConfirmedPage`, `auditConfirmedPage`) feed GROQ queries into server components. `QualifyingForm` receives `formSteps` as a prop, renders via `DynamicField`/`DynamicStep`, and validates with Zod for format checks (email, URL) and manual required-checks for everything else. The API creates the Sanity lead doc first, sends email, then patches `notificationSent`. A `FALLBACK_FORM_STEPS` constant mirrors the current 4-step form so the site works with no CMS content.

**Tech Stack:** Next.js 15 App Router, TypeScript, Sanity CMS (`defineType`/`defineField`/`defineArrayMember`), React Hook Form removed from dynamic steps (plain `useState`), Zod (format validation only), Resend, Tailwind CSS v4, shadcn Select, Lucide React

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/types.ts` | Modify | Add `FormField`, `FormStep`, `StartPageData`, `StartConfirmedPageData`, `AuditConfirmedPageData`, `ConfirmedNextStep` |
| `src/lib/sanity/schemas/startPage.ts` | Create | Sanity schema — start page singleton with hero + formSteps |
| `src/lib/sanity/schemas/startConfirmedPage.ts` | Create | Sanity schema — start confirmed singleton |
| `src/lib/sanity/schemas/auditConfirmedPage.ts` | Create | Sanity schema — audit confirmed singleton |
| `src/lib/sanity/schemas/lead.ts` | Modify | Add `status`, `notificationSent`, `responses` fields |
| `src/lib/sanity/schemas/index.ts` | Modify | Register 3 new schemas |
| `sanity.config.ts` | Modify | Add 3 new singletons to sidebar structure |
| `src/lib/sanity/queries.ts` | Modify | Add `getStartPage`, `getStartConfirmedPage`, `getAuditConfirmedPage` |
| `src/lib/constants/qualifyingForm.ts` | Modify | USD budget ranges + `FALLBACK_FORM_STEPS` |
| `src/components/forms/QualifyingForm/types.ts` | Delete | Replaced by dynamic validation; all consumers removed |
| `src/components/forms/QualifyingForm/Step1.tsx` | Delete | Replaced by DynamicStep |
| `src/components/forms/QualifyingForm/Step2.tsx` | Delete | Replaced by DynamicStep |
| `src/components/forms/QualifyingForm/Step3.tsx` | Delete | Replaced by DynamicStep |
| `src/components/forms/QualifyingForm/Step4.tsx` | Delete | Replaced by DynamicStep |
| `src/components/forms/QualifyingForm/DynamicField.tsx` | Create | Renders one field based on `fieldType` (text/email/url/textarea/select/multiselect/radio) |
| `src/components/forms/QualifyingForm/DynamicStep.tsx` | Create | Renders visible fields for one step; exports `shouldShowField` |
| `src/components/forms/QualifyingForm/index.tsx` | Rewrite | Accepts `formSteps` prop, uses plain `useState`, validates manually per step |
| `src/app/api/qualify/route.ts` | Modify | Sequential: create Sanity doc → send email → patch `notificationSent`; accept `responses[]` |
| `src/app/start/page.tsx` | Modify | Fetch `startPage`, pass data to layout + `QualifyingForm` |
| `src/app/start/confirmed/page.tsx` | Rewrite | Fetch `startConfirmedPage`, CMS-driven with env-var fallbacks |
| `src/app/audit/confirmed/page.tsx` | Rewrite | Fetch `auditConfirmedPage`, CMS-driven with env-var fallbacks |

---

## Task 1: TypeScript Types

**Files:**
- Modify: `src/lib/types.ts` (append after existing content)

- [ ] **Step 1: Add new types to `src/lib/types.ts`**

  Find the end of the file and append:

  ```typescript
  /* --- Dynamic Form Types --- */
  export interface FormFieldOption {
    value: string;
    label: string;
  }

  export interface FormFieldShowWhen {
    dependsOnField: string;
    hasValue: string[];
  }

  export interface FormField {
    fieldId: string;
    label: string;
    fieldType: "text" | "email" | "url" | "textarea" | "select" | "multiselect" | "radio";
    placeholder?: string;
    required: boolean;
    options?: FormFieldOption[];
    showWhen?: FormFieldShowWhen;
    order: number;
  }

  export interface FormStep {
    stepTitle: string;
    stepDescription: string;
    order: number;
    fields: FormField[];
  }

  /* --- Start Page --- */
  export interface StartPageData {
    pageHeadline?: string;
    pageHighlightedWord?: string;
    pageDescription?: string;
    formSteps: FormStep[];
    seoTitle?: string;
    seoDescription?: string;
  }

  /* --- Confirmation Pages --- */
  export interface ConfirmedNextStep {
    stepNumber: string;
    title: string;
    description: string;
  }

  export interface StartConfirmedPageData {
    headline?: string;
    highlightedWord?: string;
    description?: string;
    nextSteps: ConfirmedNextStep[];
    ctaLabel?: string;
    ctaUrl?: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
  }

  export interface AuditConfirmedPageData {
    headline?: string;
    highlightedWord?: string;
    description?: string;
    intakeCtaLabel?: string;
    intakeCtaUrl?: string;
    nextSteps: ConfirmedNextStep[];
    calendarCtaLabel?: string;
    calendarCtaUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
  }
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/lib/types.ts
  git commit -m "feat: add FormField, FormStep, StartPageData, confirmation page types"
  ```

---

## Task 2: Sanity Schemas

**Files:**
- Create: `src/lib/sanity/schemas/startPage.ts`
- Create: `src/lib/sanity/schemas/startConfirmedPage.ts`
- Create: `src/lib/sanity/schemas/auditConfirmedPage.ts`
- Modify: `src/lib/sanity/schemas/lead.ts`

- [ ] **Step 1: Create `src/lib/sanity/schemas/startPage.ts`**

  ```typescript
  import { defineType, defineField, defineArrayMember } from "sanity";

  export default defineType({
    name: "startPage",
    title: "Start Page",
    type: "document",
    groups: [
      { name: "hero", title: "Page Copy" },
      { name: "formConfig", title: "Form Configuration" },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({ name: "pageHeadline", title: "Page Headline", type: "string", group: "hero" }),
      defineField({ name: "pageHighlightedWord", title: "Highlighted Word", type: "string", group: "hero" }),
      defineField({ name: "pageDescription", title: "Page Description", type: "text", rows: 2, group: "hero" }),
      defineField({
        name: "formSteps",
        title: "Form Steps",
        type: "array",
        group: "formConfig",
        description: "Steps are ordered by the Order field on each step object.",
        of: [
          defineArrayMember({
            type: "object",
            name: "formStep",
            title: "Step",
            fields: [
              defineField({ name: "stepTitle", title: "Step Title", type: "string" }),
              defineField({ name: "stepDescription", title: "Step Description", type: "string" }),
              defineField({ name: "order", title: "Order", type: "number" }),
              defineField({
                name: "fields",
                title: "Fields",
                type: "array",
                of: [
                  defineArrayMember({
                    type: "object",
                    name: "formField",
                    title: "Field",
                    fields: [
                      defineField({
                        name: "fieldId",
                        title: "Field ID",
                        type: "string",
                        description: "Unique key used as form field name, e.g. 'company', 'budgetRange'",
                      }),
                      defineField({ name: "label", title: "Label", type: "string" }),
                      defineField({
                        name: "fieldType",
                        title: "Field Type",
                        type: "string",
                        options: {
                          list: [
                            { title: "Text", value: "text" },
                            { title: "Email", value: "email" },
                            { title: "URL", value: "url" },
                            { title: "Textarea", value: "textarea" },
                            { title: "Select (dropdown)", value: "select" },
                            { title: "Multi-select (checkboxes)", value: "multiselect" },
                            { title: "Radio buttons", value: "radio" },
                          ],
                        },
                      }),
                      defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
                      defineField({ name: "required", title: "Required", type: "boolean", initialValue: false }),
                      defineField({
                        name: "options",
                        title: "Options",
                        description: "For select, multiselect, and radio field types only",
                        type: "array",
                        of: [
                          defineArrayMember({
                            type: "object",
                            name: "fieldOption",
                            fields: [
                              defineField({ name: "value", title: "Value", type: "string" }),
                              defineField({ name: "label", title: "Label", type: "string" }),
                            ],
                            preview: { select: { title: "label", subtitle: "value" } },
                          }),
                        ],
                      }),
                      defineField({
                        name: "showWhen",
                        title: "Show When (conditional)",
                        description: "Only show this field when another field has a specific value",
                        type: "object",
                        fields: [
                          defineField({
                            name: "dependsOnField",
                            title: "Depends On Field ID",
                            type: "string",
                          }),
                          defineField({
                            name: "hasValue",
                            title: "Has Value(s)",
                            description: "Show when the dependent field contains any of these values",
                            type: "array",
                            of: [defineArrayMember({ type: "string" })],
                          }),
                        ],
                      }),
                      defineField({ name: "order", title: "Order", type: "number" }),
                    ],
                    preview: { select: { title: "label", subtitle: "fieldType" } },
                  }),
                ],
              }),
            ],
            preview: {
              select: { title: "stepTitle", subtitle: "order" },
              prepare({ title, subtitle }: { title: string; subtitle: number }) {
                return { title: title || "Untitled Step", subtitle: `Step ${subtitle}` };
              },
            },
          }),
        ],
      }),
      defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
      defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2, group: "seo" }),
    ],
    preview: {
      prepare() {
        return { title: "Start Page" };
      },
    },
  });
  ```

- [ ] **Step 2: Create `src/lib/sanity/schemas/startConfirmedPage.ts`**

  ```typescript
  import { defineType, defineField, defineArrayMember } from "sanity";

  export default defineType({
    name: "startConfirmedPage",
    title: "Start Confirmed Page",
    type: "document",
    fields: [
      defineField({ name: "headline", title: "Headline", type: "string" }),
      defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
      defineField({
        name: "nextSteps",
        title: "Next Steps",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "nextStep",
            fields: [
              defineField({ name: "stepNumber", title: "Step Number", type: "string", description: 'e.g. "01"' }),
              defineField({ name: "title", title: "Title", type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
            preview: { select: { title: "title", subtitle: "stepNumber" } },
          }),
        ],
      }),
      defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
      defineField({ name: "ctaUrl", title: "Primary CTA URL", type: "string" }),
      defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
      defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string" }),
      defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
    ],
    preview: {
      prepare() {
        return { title: "Start Confirmed Page" };
      },
    },
  });
  ```

- [ ] **Step 3: Create `src/lib/sanity/schemas/auditConfirmedPage.ts`**

  ```typescript
  import { defineType, defineField, defineArrayMember } from "sanity";

  export default defineType({
    name: "auditConfirmedPage",
    title: "Audit Confirmed Page",
    type: "document",
    fields: [
      defineField({ name: "headline", title: "Headline", type: "string" }),
      defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
      defineField({ name: "intakeCtaLabel", title: "Intake CTA Label", type: "string" }),
      defineField({ name: "intakeCtaUrl", title: "Intake CTA URL", type: "string" }),
      defineField({
        name: "nextSteps",
        title: "Next Steps",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "nextStep",
            fields: [
              defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
              defineField({ name: "title", title: "Title", type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
            preview: { select: { title: "title", subtitle: "stepNumber" } },
          }),
        ],
      }),
      defineField({ name: "calendarCtaLabel", title: "Calendar CTA Label", type: "string" }),
      defineField({ name: "calendarCtaUrl", title: "Calendar CTA URL", type: "string" }),
      defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
    ],
    preview: {
      prepare() {
        return { title: "Audit Confirmed Page" };
      },
    },
  });
  ```

- [ ] **Step 4: Update `src/lib/sanity/schemas/lead.ts` — add status, notificationSent, responses**

  The existing file ends at line 84 (before the `preview` block). Insert these three fields after `submittedAt` (after line 83) and before the closing `],` of the fields array.

  Find the block ending with:
  ```typescript
      defineField({
        name: "submittedAt",
        title: "Submitted At",
        type: "datetime",
        readOnly: true,
      }),
    ],
  ```

  Replace with:
  ```typescript
      defineField({
        name: "submittedAt",
        title: "Submitted At",
        type: "datetime",
        readOnly: true,
      }),
      defineField({
        name: "status",
        title: "Status",
        type: "string",
        description: "Triage leads in Sanity Studio",
        initialValue: "new",
        options: {
          list: [
            { title: "New", value: "new" },
            { title: "Contacted", value: "contacted" },
            { title: "Qualified", value: "qualified" },
            { title: "Closed", value: "closed" },
          ],
          layout: "radio",
        },
      }),
      defineField({
        name: "notificationSent",
        title: "Notification Sent",
        type: "boolean",
        description: "Whether the notification email was sent successfully",
        initialValue: false,
        readOnly: true,
      }),
      defineField({
        name: "responses",
        title: "Additional Responses",
        description: "Dynamic form field responses beyond the core fields",
        type: "array",
        readOnly: true,
        of: [
          defineArrayMember({
            type: "object",
            name: "response",
            fields: [
              defineField({ name: "fieldId", title: "Field ID", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
              defineField({ name: "value", title: "Value", type: "string" }),
            ],
            preview: { select: { title: "label", subtitle: "value" } },
          }),
        ],
      }),
    ],
  ```

- [ ] **Step 5: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 6: Commit**

  ```bash
  git add src/lib/sanity/schemas/startPage.ts src/lib/sanity/schemas/startConfirmedPage.ts src/lib/sanity/schemas/auditConfirmedPage.ts src/lib/sanity/schemas/lead.ts
  git commit -m "feat: add startPage, startConfirmedPage, auditConfirmedPage schemas; extend lead with status/notificationSent/responses"
  ```

---

## Task 3: Register Schemas + Studio Config

**Files:**
- Modify: `src/lib/sanity/schemas/index.ts`
- Modify: `sanity.config.ts`

- [ ] **Step 1: Update `src/lib/sanity/schemas/index.ts`**

  Add imports for the 3 new schemas at the top with the existing imports:
  ```typescript
  import startPage from "./startPage";
  import startConfirmedPage from "./startConfirmedPage";
  import auditConfirmedPage from "./auditConfirmedPage";
  ```

  Add them to `schemaTypes` array:
  ```typescript
  export const schemaTypes = [
    toolRegistry,
    siteSettings,
    navigation,
    footer,
    faq,
    testimonial,
    caseStudy,
    blogPost,
    video,
    resource,
    automation,
    industryPage,
    homePage,
    auditPage,
    servicePage,
    aboutPage,
    startPage,
    startConfirmedPage,
    auditConfirmedPage,
    popupConfig,
    lead,
    labPage,
    resourcesPage,
    workPage,
    privacyPage,
    termsPage,
    automationsPage,
  ];
  ```

- [ ] **Step 2: Update `sanity.config.ts`**

  Add the 3 new types to `singletonTypes`:
  ```typescript
  const singletonTypes = new Set([
    "homePage",
    "auditPage",
    "aboutPage",
    "siteSettings",
    "navigation",
    "footer",
    "startPage",
    "startConfirmedPage",
    "auditConfirmedPage",
  ]);
  ```

  Add the 3 new sidebar entries in the structure, after the "About Page" entry and before the first `S.divider()` that separates pages from collections:
  ```typescript
  S.listItem()
    .title("Start Page")
    .id("startPage")
    .child(S.document().schemaType("startPage").documentId("startPage")),
  S.listItem()
    .title("Start Confirmed")
    .id("startConfirmedPage")
    .child(S.document().schemaType("startConfirmedPage").documentId("startConfirmedPage")),
  S.listItem()
    .title("Audit Confirmed")
    .id("auditConfirmedPage")
    .child(S.document().schemaType("auditConfirmedPage").documentId("auditConfirmedPage")),
  ```

  The full structure block after the edit (pages section only):
  ```typescript
  // ── Page singletons ──
  S.listItem()
    .title("Home Page")
    .id("homePage")
    .child(S.document().schemaType("homePage").documentId("homePage")),
  S.listItem()
    .title("Audit Page")
    .id("auditPage")
    .child(S.document().schemaType("auditPage").documentId("auditPage")),
  S.listItem()
    .title("About Page")
    .id("aboutPage")
    .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
  S.listItem()
    .title("Start Page")
    .id("startPage")
    .child(S.document().schemaType("startPage").documentId("startPage")),
  S.listItem()
    .title("Start Confirmed")
    .id("startConfirmedPage")
    .child(S.document().schemaType("startConfirmedPage").documentId("startConfirmedPage")),
  S.listItem()
    .title("Audit Confirmed")
    .id("auditConfirmedPage")
    .child(S.document().schemaType("auditConfirmedPage").documentId("auditConfirmedPage")),

  S.divider(),
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 4: Commit**

  ```bash
  git add src/lib/sanity/schemas/index.ts sanity.config.ts
  git commit -m "feat: register startPage, startConfirmedPage, auditConfirmedPage as singletons"
  ```

---

## Task 4: GROQ Queries

**Files:**
- Modify: `src/lib/sanity/queries.ts`

- [ ] **Step 1: Add new type imports to the import block at the top of `queries.ts`**

  The existing import block ends with `AutomationsPageData,`. Add:
  ```typescript
  import type {
    // ... existing imports ...
    AutomationsPageData,
    StartPageData,
    StartConfirmedPageData,
    AuditConfirmedPageData,
  } from "@/lib/types";
  ```

- [ ] **Step 2: Add 3 new query functions at the end of `queries.ts`**

  ```typescript
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
        seoDescription
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
        seoDescription
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
        seoDescription
      }`
    );
  }
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 4: Commit**

  ```bash
  git add src/lib/sanity/queries.ts
  git commit -m "feat: add getStartPage, getStartConfirmedPage, getAuditConfirmedPage GROQ queries"
  ```

---

## Task 5: Constants + Form Types Cleanup

**Files:**
- Modify: `src/lib/constants/qualifyingForm.ts`
- Delete: `src/components/forms/QualifyingForm/types.ts`

- [ ] **Step 1: Rewrite `src/lib/constants/qualifyingForm.ts`**

  Full file replacement:
  ```typescript
  /* ============================================================
     QualifyingForm — Hardcoded fallback constants
     Used when Sanity CMS config fetch fails or is unavailable.
     ============================================================ */
  import type { FormStep } from "@/lib/types";

  export const SERVICE_OPTIONS = [
    { value: "development", label: "Web Development" },
    { value: "marketing", label: "Growth Marketing" },
    { value: "ai", label: "AI & Automation" },
    { value: "audit", label: "Growth Audit" },
  ] as const;

  export const BUDGET_RANGES = [
    { value: "under-1k", label: "Under $1,000" },
    { value: "1k-5k", label: "$1,000 – $5,000" },
    { value: "5k-10k", label: "$5,000 – $10,000" },
    { value: "10k-25k", label: "$10,000 – $25,000" },
    { value: "25k-plus", label: "$25,000+" },
    { value: "not-sure", label: "Not sure yet" },
  ] as const;

  export const TIMELINE_OPTIONS = [
    { value: "asap", label: "ASAP" },
    { value: "1-2-months", label: "1–2 months" },
    { value: "3-6-months", label: "3–6 months" },
    { value: "6-plus-months", label: "6+ months" },
    { value: "just-exploring", label: "Just exploring" },
  ] as const;

  export const CONTACT_METHODS = [
    { value: "email", label: "Email" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "call", label: "Phone call" },
  ] as const;

  export const FALLBACK_FORM_STEPS: FormStep[] = [
    {
      stepTitle: "About You",
      stepDescription: "Tell us who you are",
      order: 1,
      fields: [
        { fieldId: "name", label: "Full name", fieldType: "text", placeholder: "Jane Smith", required: true, order: 1 },
        { fieldId: "email", label: "Email", fieldType: "email", placeholder: "jane@company.com", required: true, order: 2 },
        { fieldId: "company", label: "Company", fieldType: "text", placeholder: "Acme Inc.", required: true, order: 3 },
        { fieldId: "websiteUrl", label: "Website URL", fieldType: "url", placeholder: "https://company.com", required: false, order: 4 },
      ],
    },
    {
      stepTitle: "What You Need",
      stepDescription: "Select the services you're interested in",
      order: 2,
      fields: [
        {
          fieldId: "servicesInterested",
          label: "Which services are you interested in?",
          fieldType: "multiselect",
          required: true,
          order: 1,
          options: SERVICE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
        },
      ],
    },
    {
      stepTitle: "Your Situation",
      stepDescription: "Describe your current challenge",
      order: 3,
      fields: [
        {
          fieldId: "problemStatement",
          label: "What's your biggest growth challenge right now?",
          fieldType: "textarea",
          placeholder: "Tell us about the problem you're trying to solve, what you've already tried, and what success looks like...",
          required: true,
          order: 1,
        },
        {
          fieldId: "budgetRange",
          label: "Budget range",
          fieldType: "select",
          required: true,
          order: 2,
          options: BUDGET_RANGES.map((o) => ({ value: o.value, label: o.label })),
        },
        {
          fieldId: "timeline",
          label: "Timeline",
          fieldType: "select",
          required: true,
          order: 3,
          options: TIMELINE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
        },
      ],
    },
    {
      stepTitle: "Confirm",
      stepDescription: "How should we reach you?",
      order: 4,
      fields: [
        {
          fieldId: "preferredContact",
          label: "How should we reach you?",
          fieldType: "radio",
          required: true,
          order: 1,
          options: CONTACT_METHODS.map((o) => ({ value: o.value, label: o.label })),
        },
        {
          fieldId: "additionalContext",
          label: "Anything else we should know?",
          fieldType: "textarea",
          placeholder: "Links, deadlines, existing tools, anything that helps us prepare...",
          required: false,
          order: 2,
        },
      ],
    },
  ];
  ```

- [ ] **Step 2: Delete `src/components/forms/QualifyingForm/types.ts`**

  ```bash
  rm src/components/forms/QualifyingForm/types.ts
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: errors only about deleted types being imported — those files will be fixed in Task 7. If the only errors mention `Step1`/`Step2`/`Step3`/`Step4` and `QualifyingForm/index.tsx`, that's expected.

- [ ] **Step 4: Commit**

  ```bash
  git add src/lib/constants/qualifyingForm.ts
  git rm src/components/forms/QualifyingForm/types.ts
  git commit -m "feat: USD budget ranges, FALLBACK_FORM_STEPS; remove static form types"
  ```

---

## Task 6: DynamicField + DynamicStep Components

**Files:**
- Create: `src/components/forms/QualifyingForm/DynamicField.tsx`
- Create: `src/components/forms/QualifyingForm/DynamicStep.tsx`

- [ ] **Step 1: Create `src/components/forms/QualifyingForm/DynamicField.tsx`**

  ```typescript
  "use client";

  import React from "react";
  import { Check } from "lucide-react";
  import { cn } from "@/lib/utils";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import type { FormField } from "@/lib/types";

  interface DynamicFieldProps {
    field: FormField;
    value: string | string[];
    onChange: (value: string | string[]) => void;
    error?: string;
  }

  const inputClasses = (hasError: boolean) =>
    cn(
      "min-h-[44px] w-full rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
      hasError ? "border-red-500" : "border-glass-border"
    );

  export function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
    const strVal = typeof value === "string" ? value : "";
    const arrVal = Array.isArray(value) ? value : [];

    const renderInput = () => {
      switch (field.fieldType) {
        case "text":
        case "email":
        case "url":
          return (
            <input
              id={`qf-${field.fieldId}`}
              type={field.fieldType}
              inputMode={field.fieldType === "email" ? "email" : field.fieldType === "url" ? "url" : "text"}
              placeholder={field.placeholder}
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses(!!error)}
            />
          );

        case "textarea":
          return (
            <textarea
              id={`qf-${field.fieldId}`}
              rows={4}
              placeholder={field.placeholder}
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              className={cn(inputClasses(!!error), "min-h-[100px] resize-y")}
            />
          );

        case "select":
          return (
            <Select value={strVal} onValueChange={(v) => onChange(v)}>
              <SelectTrigger className={error ? "border-red-500" : ""}>
                <SelectValue placeholder={field.placeholder ?? "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {(field.options ?? []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case "multiselect": {
          const toggle = (v: string) => {
            const next = arrVal.includes(v)
              ? arrVal.filter((x) => x !== v)
              : [...arrVal, v];
            onChange(next);
          };
          return (
            <div className="grid gap-3 sm:grid-cols-2">
              {(field.options ?? []).map((opt) => {
                const isSelected = arrVal.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    aria-pressed={isSelected}
                    className={cn(
                      "group flex min-h-[44px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      isSelected
                        ? "border-brand-mid bg-brand-dark/10 text-text-primary"
                        : "border-glass-border bg-bg-secondary text-text-secondary hover:border-brand-mid/50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                        isSelected
                          ? "border-brand-mid bg-brand-mid"
                          : "border-glass-border bg-bg-secondary group-hover:border-brand-mid/50"
                      )}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-base-white" strokeWidth={3} />}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          );
        }

        case "radio":
          return (
            <div className="flex flex-wrap gap-3">
              {(field.options ?? []).map((opt) => {
                const isSelected = strVal === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      "flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-all",
                      isSelected
                        ? "border-brand-mid bg-brand-dark/10 text-text-primary"
                        : "border-glass-border bg-bg-secondary text-text-secondary hover:border-brand-mid/50"
                    )}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange(opt.value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isSelected ? "border-brand-mid" : "border-glass-border"
                      )}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-brand-mid" />}
                    </span>
                    {opt.label}
                  </label>
                );
              })}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div>
        <label
          htmlFor={`qf-${field.fieldId}`}
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {field.label}
          {!field.required && (
            <span className="ml-1 text-text-tertiary">(optional)</span>
          )}
        </label>
        {renderInput()}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
  ```

- [ ] **Step 2: Create `src/components/forms/QualifyingForm/DynamicStep.tsx`**

  ```typescript
  "use client";

  import React from "react";
  import { DynamicField } from "./DynamicField";
  import type { FormField, FormStep } from "@/lib/types";

  export function shouldShowField(
    field: FormField,
    formValues: Record<string, string | string[]>
  ): boolean {
    if (!field.showWhen) return true;
    const dependentValue = formValues[field.showWhen.dependsOnField];
    if (Array.isArray(dependentValue)) {
      return field.showWhen.hasValue.some((v) => dependentValue.includes(v));
    }
    return field.showWhen.hasValue.includes(dependentValue ?? "");
  }

  interface DynamicStepProps {
    step: FormStep;
    formValues: Record<string, string | string[]>;
    errors: Record<string, string>;
    onChange: (fieldId: string, value: string | string[]) => void;
  }

  export function DynamicStep({ step, formValues, errors, onChange }: DynamicStepProps) {
    const visibleFields = step.fields.filter((f) => shouldShowField(f, formValues));

    return (
      <div className="space-y-5">
        {visibleFields.map((field) => (
          <DynamicField
            key={field.fieldId}
            field={field}
            value={formValues[field.fieldId] ?? (field.fieldType === "multiselect" ? [] : "")}
            onChange={(val) => onChange(field.fieldId, val)}
            error={errors[field.fieldId]}
          />
        ))}
      </div>
    );
  }
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: errors only in `QualifyingForm/index.tsx` (will be fixed in Task 7) and the deleted Step files (will be fixed in Task 7). No new errors in the two new files.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/forms/QualifyingForm/DynamicField.tsx src/components/forms/QualifyingForm/DynamicStep.tsx
  git commit -m "feat: DynamicField and DynamicStep components for CMS-driven form rendering"
  ```

---

## Task 7: QualifyingForm Refactor + Delete Step1–4

**Files:**
- Rewrite: `src/components/forms/QualifyingForm/index.tsx`
- Delete: `src/components/forms/QualifyingForm/Step1.tsx`
- Delete: `src/components/forms/QualifyingForm/Step2.tsx`
- Delete: `src/components/forms/QualifyingForm/Step3.tsx`
- Delete: `src/components/forms/QualifyingForm/Step4.tsx`

- [ ] **Step 1: Delete Step1–4 files**

  ```bash
  rm src/components/forms/QualifyingForm/Step1.tsx
  rm src/components/forms/QualifyingForm/Step2.tsx
  rm src/components/forms/QualifyingForm/Step3.tsx
  rm src/components/forms/QualifyingForm/Step4.tsx
  ```

- [ ] **Step 2: Rewrite `src/components/forms/QualifyingForm/index.tsx`**

  ```typescript
  "use client";

  import React, { useState, useCallback } from "react";
  import { useRouter } from "next/navigation";
  import { z } from "zod";
  import { Loader2 } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { ROUTES } from "@/lib/constants";
  import { trackFormStart, trackFormComplete } from "@/lib/analytics";
  import Stepper, { Step } from "@/components/ui/stepper";
  import { FALLBACK_FORM_STEPS } from "@/lib/constants/qualifyingForm";
  import { DynamicStep, shouldShowField } from "./DynamicStep";
  import type { FormField, FormStep } from "@/lib/types";

  /* ── Validation helpers ── */

  const EMAIL_SCHEMA = z.string().email("Please enter a valid email address");
  const URL_SCHEMA = z.string().url("Please enter a valid URL");
  const NAME_SCHEMA = z.string().min(2, "Name must be at least 2 characters");
  const MIN_LENGTH_SCHEMA = z.string().min(20, "Please describe your situation in at least 20 characters");

  function validateStep(
    fields: FormField[],
    formValues: Record<string, string | string[]>
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    for (const field of fields) {
      if (!shouldShowField(field, formValues)) continue;
      const value = formValues[field.fieldId];

      // Format validation (regardless of required)
      if (field.fieldType === "email" && typeof value === "string" && value) {
        const r = EMAIL_SCHEMA.safeParse(value);
        if (!r.success) { errors[field.fieldId] = r.error.issues[0].message; continue; }
      }
      if (field.fieldType === "url" && typeof value === "string" && value) {
        const r = URL_SCHEMA.safeParse(value);
        if (!r.success) { errors[field.fieldId] = r.error.issues[0].message; continue; }
      }
      // Core field: name must be at least 2 characters
      if (field.fieldId === "name" && typeof value === "string" && value) {
        const r = NAME_SCHEMA.safeParse(value);
        if (!r.success) { errors[field.fieldId] = r.error.issues[0].message; continue; }
      }
      // problemStatement: min 20 chars
      if (field.fieldId === "problemStatement" && typeof value === "string" && value) {
        const r = MIN_LENGTH_SCHEMA.safeParse(value);
        if (!r.success) { errors[field.fieldId] = r.error.issues[0].message; continue; }
      }

      if (!field.required) continue;

      // Required check
      if (field.fieldType === "multiselect") {
        if (!Array.isArray(value) || value.length === 0) {
          errors[field.fieldId] = "Please select at least one option";
        }
      } else {
        const strVal = typeof value === "string" ? value.trim() : "";
        if (!strVal) {
          errors[field.fieldId] = `${field.label} is required`;
        }
      }
    }

    return errors;
  }

  /* ── Core field IDs — go directly into the lead doc, not responses[] ── */
  const CORE_FIELD_IDS = new Set([
    "name", "email", "company", "websiteUrl",
    "servicesInterested", "problemStatement",
    "budgetRange", "timeline", "preferredContact", "additionalContext",
  ]);

  /* ── Component ── */

  interface QualifyingFormProps extends React.ComponentPropsWithoutRef<"div"> {
    preSelectedService?: string;
    formSteps?: FormStep[] | null;
  }

  export function QualifyingForm({
    preSelectedService,
    formSteps,
    className,
    ...props
  }: QualifyingFormProps) {
    const router = useRouter();
    const activeSteps = formSteps && formSteps.length > 0 ? formSteps : FALLBACK_FORM_STEPS;

    const [formValues, setFormValues] = useState<Record<string, string | string[]>>(() => ({
      servicesInterested: preSelectedService ? [preSelectedService] : [],
    }));
    const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle");
    const [submitError, setSubmitError] = useState("");

    // Track form start once
    React.useEffect(() => { trackFormStart(); }, []);

    const handleFieldChange = useCallback((fieldId: string, value: string | string[]) => {
      setFormValues((prev) => ({ ...prev, [fieldId]: value }));
      setStepErrors((prev) => {
        if (!prev[fieldId]) return prev;
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }, []);

    const handleBeforeNext = useCallback(async (stepNumber: number): Promise<boolean> => {
      const step = activeSteps[stepNumber - 1];
      if (!step) return true;
      const errors = validateStep(step.fields, formValues);
      setStepErrors(errors);
      return Object.keys(errors).length === 0;
    }, [activeSteps, formValues]);

    const handleFinalStep = useCallback(async () => {
      // Validate last step
      const lastStep = activeSteps[activeSteps.length - 1];
      if (lastStep) {
        const errors = validateStep(lastStep.fields, formValues);
        if (Object.keys(errors).length > 0) {
          setStepErrors(errors);
          return;
        }
      }

      setSubmitStatus("loading");
      setSubmitError("");

      // Build responses[] for non-core dynamic fields
      const allFields = activeSteps.flatMap((s) => s.fields);
      const responses = allFields
        .filter((f) => !CORE_FIELD_IDS.has(f.fieldId) && shouldShowField(f, formValues))
        .flatMap((f) => {
          const val = formValues[f.fieldId];
          if (!val || (Array.isArray(val) && val.length === 0)) return [];
          return [{ fieldId: f.fieldId, label: f.label, value: Array.isArray(val) ? val.join(", ") : val }];
        });

      try {
        const res = await fetch("/api/qualify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (formValues.name as string) ?? "",
            email: (formValues.email as string) ?? "",
            company: (formValues.company as string) ?? "",
            websiteUrl: (formValues.websiteUrl as string) || undefined,
            servicesInterested: (formValues.servicesInterested as string[]) ?? [],
            problemStatement: (formValues.problemStatement as string) ?? "",
            budgetRange: (formValues.budgetRange as string) ?? "",
            timeline: (formValues.timeline as string) ?? "",
            preferredContact: (formValues.preferredContact as string) ?? "",
            additionalContext: (formValues.additionalContext as string) || undefined,
            responses,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          const json = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(json.error || "Something went wrong");
        }

        trackFormComplete();
        router.push(ROUTES.startConfirmed);
      } catch (err) {
        setSubmitStatus("error");
        setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      }
    }, [activeSteps, formValues, router]);

    return (
      <div className={cn("mx-auto max-w-2xl", className)} {...props}>
        <Stepper
          key={activeSteps.length}
          initialStep={1}
          onBeforeNext={handleBeforeNext}
          onFinalStepCompleted={handleFinalStep}
          backButtonText="Back"
          nextButtonText="Next"
          disableStepIndicators
          stepCircleContainerClassName="border-glass-border bg-bg-secondary"
          contentClassName="px-8 pb-2"
          footerClassName="px-8 pb-8"
        >
          {activeSteps.map((step, index) => (
            <Step key={`${step.stepTitle}-${index}`}>
              <h2 className="heading-font mb-1 text-lg font-bold text-text-primary md:text-xl">
                {step.stepTitle}
              </h2>
              <p className="mb-5 text-sm text-text-secondary">{step.stepDescription}</p>
              <DynamicStep
                step={step}
                formValues={formValues}
                errors={stepErrors}
                onChange={handleFieldChange}
              />
            </Step>
          ))}
        </Stepper>

        {submitStatus === "error" && submitError && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">
            {submitError}
          </p>
        )}
        {submitStatus === "loading" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 4: Commit**

  ```bash
  git rm src/components/forms/QualifyingForm/Step1.tsx src/components/forms/QualifyingForm/Step2.tsx src/components/forms/QualifyingForm/Step3.tsx src/components/forms/QualifyingForm/Step4.tsx
  git add src/components/forms/QualifyingForm/index.tsx
  git commit -m "feat: dynamic QualifyingForm — CMS steps, manual validation, responses payload; remove Step1-4"
  ```

---

## Task 8: API Update

**Files:**
- Modify: `src/app/api/qualify/route.ts`

- [ ] **Step 1: Rewrite `src/app/api/qualify/route.ts`**

  ```typescript
  import { NextResponse } from "next/server";
  import { Resend } from "resend";
  import { createClient } from "@sanity/client";

  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  const sanityWriteClient = process.env.SANITY_API_TOKEN
    ? createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
      })
    : null;

  interface DynamicResponse {
    fieldId: string;
    label: string;
    value: string;
  }

  interface LeadPayload {
    name: string;
    email: string;
    company: string;
    websiteUrl?: string;
    servicesInterested: string[];
    problemStatement: string;
    budgetRange: string;
    timeline: string;
    preferredContact: string;
    additionalContext?: string;
    responses?: DynamicResponse[];
    submittedAt: string;
  }

  export async function POST(request: Request) {
    try {
      const body = (await request.json()) as LeadPayload;

      if (!body.name || !body.email || !body.company) {
        return NextResponse.json(
          { error: "Name, email, and company are required" },
          { status: 400 }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      // Step 1: Create Sanity document
      let sanityDocId: string | undefined;
      try {
        sanityDocId = await createSanityLead(body);
      } catch (err) {
        console.error("[Qualify] Sanity lead creation failed:", err);
      }

      // Step 2: Send notification email
      let emailSent = false;
      try {
        await sendNotificationEmail(body);
        emailSent = true;
      } catch (err) {
        console.error("[Qualify] Email send failed:", err);
      }

      // Step 3: Patch notificationSent on the lead document
      if (sanityDocId) {
        try {
          await patchNotificationSent(sanityDocId, emailSent);
        } catch (err) {
          console.error("[Qualify] Failed to patch notificationSent:", err);
        }
      }

      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("[Qualify] Unexpected error:", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

  async function createSanityLead(lead: LeadPayload): Promise<string> {
    if (!sanityWriteClient) {
      console.warn("[Qualify] Sanity write client not configured — skipping lead creation");
      return "";
    }

    const doc = await sanityWriteClient.create({
      _type: "lead",
      name: lead.name,
      email: lead.email,
      company: lead.company,
      websiteUrl: lead.websiteUrl || undefined,
      servicesInterested: lead.servicesInterested,
      problemStatement: lead.problemStatement,
      budgetRange: lead.budgetRange,
      timeline: lead.timeline,
      preferredContact: lead.preferredContact,
      additionalContext: lead.additionalContext || undefined,
      submittedAt: lead.submittedAt,
      status: "new",
      notificationSent: false,
      responses: (lead.responses ?? []).map((r) => ({
        _key: crypto.randomUUID(),
        fieldId: r.fieldId,
        label: r.label,
        value: r.value,
      })),
    });

    return doc._id;
  }

  async function patchNotificationSent(docId: string, sent: boolean): Promise<void> {
    if (!sanityWriteClient || !docId) return;
    await sanityWriteClient.patch(docId).set({ notificationSent: sent }).commit();
  }

  async function sendNotificationEmail(lead: LeadPayload): Promise<void> {
    if (!resend) {
      console.warn("[Qualify] Resend not configured — skipping email");
      return;
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || "hello@growveloper.com";
    const servicesFormatted = lead.servicesInterested.join(", ");

    const responsesHtml = (lead.responses ?? [])
      .map(
        (r) =>
          `<tr><td style="padding:8px;font-weight:bold;">${r.label}</td><td style="padding:8px;">${r.value}</td></tr>`
      )
      .join("");

    await resend.emails.send({
      from: "Growveloper <hello@growveloper.com>",
      to: notificationEmail,
      subject: `New Lead: ${lead.name} — ${lead.company}`,
      html: `
        <h2>New Consultation Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${lead.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${lead.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${lead.company}</td></tr>
          ${lead.websiteUrl ? `<tr><td style="padding:8px;font-weight:bold;">Website</td><td style="padding:8px;">${lead.websiteUrl}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;">Services</td><td style="padding:8px;">${servicesFormatted}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Problem</td><td style="padding:8px;">${lead.problemStatement}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${lead.budgetRange}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Timeline</td><td style="padding:8px;">${lead.timeline}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Contact</td><td style="padding:8px;">${lead.preferredContact}</td></tr>
          ${lead.additionalContext ? `<tr><td style="padding:8px;font-weight:bold;">Notes</td><td style="padding:8px;">${lead.additionalContext}</td></tr>` : ""}
          ${responsesHtml}
        </table>
        <p style="margin-top:16px;font-size:12px;color:#666;">Submitted ${lead.submittedAt}</p>
      `,
    });
  }
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/app/api/qualify/route.ts
  git commit -m "feat: sequential Sanity create→email→patch; accept responses[]; notificationSent tracking"
  ```

---

## Task 9: Page Updates

**Files:**
- Modify: `src/app/start/page.tsx`
- Rewrite: `src/app/start/confirmed/page.tsx`
- Rewrite: `src/app/audit/confirmed/page.tsx`

- [ ] **Step 1: Rewrite `src/app/start/page.tsx`**

  ```typescript
  import type { Metadata } from "next";
  import { getStartPage } from "@/lib/sanity/queries";
  import { QualifyingForm } from "@/components/forms/QualifyingForm";

  export async function generateMetadata(): Promise<Metadata> {
    const data = await getStartPage();
    return {
      title: data?.seoTitle ?? "Book a Consultation — GROWVELOPER",
      description: data?.seoDescription ?? "Tell us about your project and book a free consultation.",
    };
  }

  export default async function StartPage({
    searchParams,
  }: {
    searchParams: Promise<{ service?: string }>;
  }) {
    const { service } = await searchParams;
    const data = await getStartPage();

    return (
      <>
        <section className="min-h-screen px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
              {data?.pageHeadline ?? "Book a Free Consultation"}
            </h1>
            <p className="mb-12 text-text-secondary">
              {data?.pageDescription ?? "Tell us about your project and we'll map out the clearest path to growth."}
            </p>
          </div>
          <QualifyingForm
            preSelectedService={service}
            formSteps={data?.formSteps ?? null}
          />
        </section>
      </>
    );
  }
  ```

- [ ] **Step 2: Rewrite `src/app/start/confirmed/page.tsx`**

  ```typescript
  import type { Metadata } from "next";
  import { Check, CalendarDays, MessageCircle, ArrowRight } from "lucide-react";
  import { ConfettiBurst } from "@/components";
  import { getStartConfirmedPage } from "@/lib/sanity/queries";

  const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const FALLBACK_NEXT_STEPS = [
    {
      number: "01",
      title: "We review your submission",
      description: "Our team reads every detail you shared and prepares a tailored agenda.",
    },
    {
      number: "02",
      title: "You get a reply within 24 hours",
      description: "We'll reach out via your preferred contact method with next steps.",
    },
    {
      number: "03",
      title: "Free strategy session",
      description: "A focused 30-minute call to map your clearest path to growth.",
    },
  ];

  export async function generateMetadata(): Promise<Metadata> {
    const data = await getStartConfirmedPage();
    return {
      title: data?.seoTitle ?? "Consultation Confirmed — GROWVELOPER",
      description: data?.seoDescription ?? "Your consultation request has been received. Here is what happens next.",
    };
  }

  export default async function StartConfirmedPage() {
    const data = await getStartConfirmedPage();

    const headline = data?.headline ?? "You're in. We'll be in touch.";
    const description =
      data?.description ??
      "Your consultation request has been received. Here's what happens next.";
    const nextSteps =
      data?.nextSteps && data.nextSteps.length > 0
        ? data.nextSteps.map((s) => ({ number: s.stepNumber, title: s.title, description: s.description }))
        : FALLBACK_NEXT_STEPS;
    const ctaUrl = data?.ctaUrl || CALCOM_URL;
    const ctaLabel = data?.ctaLabel ?? "Book a time now";
    const secondaryCtaUrl = data?.secondaryCtaUrl || (WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "");
    const secondaryCtaLabel = data?.secondaryCtaLabel ?? "Message on WhatsApp";

    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Consultation Confirmed — GROWVELOPER",
              description: "Your consultation request has been received.",
              url: "https://growveloper.com/start/confirmed",
            }),
          }}
        />
        <ConfettiBurst />
        <section className="min-h-screen px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15">
                <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
              </div>
            </div>

            <div className="mb-12 text-center">
              <h1 className="heading-font mb-3 text-3xl font-bold md:text-4xl">{headline}</h1>
              <p className="text-text-secondary">{description}</p>
            </div>

            <div className="mb-12 space-y-6">
              {nextSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-xl border border-glass-border bg-bg-secondary p-5"
                >
                  <span className="heading-font shrink-0 text-2xl font-bold text-brand-mid">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-text-primary">{step.title}</h3>
                    <p className="text-sm text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
              >
                <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{ctaLabel}</p>
                  <p className="text-xs text-text-tertiary">Skip the wait — pick a slot</p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
              </a>

              {secondaryCtaUrl && (
                <a
                  href={secondaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-brand-mid" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{secondaryCtaLabel}</p>
                    <p className="text-xs text-text-tertiary">Quick questions? Chat now</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/"
                className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
              >
                Back to homepage
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
  ```

- [ ] **Step 3: Rewrite `src/app/audit/confirmed/page.tsx`**

  ```typescript
  import type { Metadata } from "next";
  import { Check, ClipboardList, CalendarDays, ArrowRight, ArrowLeft } from "lucide-react";
  import Link from "next/link";
  import { getAuditConfirmedPage } from "@/lib/sanity/queries";

  const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/growveloper";
  const INTAKE_URL = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL || "#";

  const FALLBACK_NEXT_STEPS = [
    {
      number: "01",
      title: "Complete the intake form",
      description:
        "A short form covering your site, goals, and current stack. Takes about 5 minutes — the more detail you provide, the sharper the audit.",
    },
    {
      number: "02",
      title: "We audit your digital presence",
      description:
        "Expect your full audit package within 3–5 business days: a Loom walkthrough, a Notion doc with every finding, and a prioritised action list.",
    },
    {
      number: "03",
      title: "Walkthrough call",
      description:
        "We'll walk through every finding together on a live call — ask questions, challenge recommendations, and leave with a clear roadmap.",
    },
  ];

  export async function generateMetadata(): Promise<Metadata> {
    const data = await getAuditConfirmedPage();
    return {
      title: data?.seoTitle ?? "Audit Confirmed — GROWVELOPER",
      description:
        data?.seoDescription ??
        "Your growth audit is booked. Complete the intake form and we'll get started.",
    };
  }

  export default async function AuditConfirmedPage() {
    const data = await getAuditConfirmedPage();

    const headline = data?.headline ?? "Your audit is booked.";
    const description =
      data?.description ??
      "Payment confirmed. Complete the intake form below so we know where to focus.";
    const nextSteps =
      data?.nextSteps && data.nextSteps.length > 0
        ? data.nextSteps.map((s) => ({ number: s.stepNumber, title: s.title, description: s.description }))
        : FALLBACK_NEXT_STEPS;
    const intakeLabel = data?.intakeCtaLabel ?? "Complete intake form";
    const intakeUrl = data?.intakeCtaUrl || INTAKE_URL;
    const calendarLabel = data?.calendarCtaLabel ?? "Book walkthrough call";
    const calendarUrl = data?.calendarCtaUrl || CALCOM_URL;

    return (
      <>
        <section className="min-h-screen px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark/15 ring-1 ring-brand-mid/20">
                <Check className="h-8 w-8 text-brand-mid" strokeWidth={2.5} />
              </div>
            </div>

            <div className="mb-12 text-center">
              <h1 className="heading-font mb-3 text-3xl font-bold text-text-primary md:text-4xl">
                {headline}
              </h1>
              <p className="text-text-secondary">{description}</p>
            </div>

            <div className="mb-12 space-y-4">
              {nextSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-xl border border-glass-border bg-bg-secondary p-5"
                >
                  <span className="heading-font shrink-0 text-2xl font-bold text-brand-mid">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-text-primary">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={intakeUrl}
                target={intakeUrl !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-brand-mid/40 bg-brand-dark/10 p-5 transition-all hover:border-brand-mid/70"
              >
                <ClipboardList className="h-5 w-5 shrink-0 text-brand-mid" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{intakeLabel}</p>
                  <p className="text-xs text-text-tertiary">Start here — takes 5 minutes</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand-mid transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-glass-border bg-bg-secondary p-5 transition-all hover:border-brand-mid/50"
              >
                <CalendarDays className="h-5 w-5 shrink-0 text-brand-mid" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{calendarLabel}</p>
                  <p className="text-xs text-text-tertiary">Pick a slot in advance</p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-brand-mid hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Back to Growth Audit
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  ```

- [ ] **Step 4: Verify TypeScript compiles clean**

  ```bash
  npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 5: Smoke test `/start` with no CMS content**

  Navigate to `http://localhost:3000/start`. Expected:
  - Page loads without error
  - 4-step form renders using fallback (About You → What You Need → Your Situation → Confirm)
  - Budget ranges show USD values (Under $1,000, $1,000–$5,000, etc.)
  - Form can be filled and submitted

- [ ] **Step 6: Smoke test `/start/confirmed` with no CMS content**

  Navigate to `http://localhost:3000/start/confirmed`. Expected:
  - Confetti fires
  - Hardcoded fallback headline, description, and 3 next steps render
  - Cal.com link uses `NEXT_PUBLIC_CALCOM_URL` env var

- [ ] **Step 7: Smoke test `/audit/confirmed` with no CMS content**

  Navigate to `http://localhost:3000/audit/confirmed`. Expected:
  - Hardcoded fallback headline, description, and 3 next steps render
  - Intake CTA links to `NEXT_PUBLIC_AUDIT_INTAKE_URL` env var
  - Calendar CTA links to `NEXT_PUBLIC_CALCOM_URL` env var

- [ ] **Step 8: Final commit**

  ```bash
  git add src/app/start/page.tsx src/app/start/confirmed/page.tsx src/app/audit/confirmed/page.tsx
  git commit -m "feat: CMS-driven start, start/confirmed, and audit/confirmed pages with env-var fallbacks"
  ```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ `startPage` schema — hero fieldset + formSteps + SEO (Task 2)
- ✅ `startConfirmedPage` schema — all fields per spec (Task 2)
- ✅ `auditConfirmedPage` schema — all fields per spec (Task 2)
- ✅ `lead` schema — status, notificationSent, responses added (Task 2)
- ✅ Registered + singletons in Studio (Task 3)
- ✅ GROQ queries for all 3 pages (Task 4)
- ✅ USD budget ranges (Task 5)
- ✅ FALLBACK_FORM_STEPS (Task 5)
- ✅ Step1–4 deleted (Task 7)
- ✅ Dynamic field renderer handles all 7 types (Task 6)
- ✅ showWhen cross-step logic (Task 6, DynamicStep)
- ✅ Zod for email/URL/name format; manual for dynamic required (Task 7)
- ✅ Core fields extracted, extras → responses[] (Task 7)
- ✅ API sequential: create → email → patch (Task 8)
- ✅ responses[] in email HTML (Task 8)
- ✅ /start/page.tsx CMS-driven (Task 9)
- ✅ /start/confirmed CMS-driven + fallbacks (Task 9)
- ✅ /audit/confirmed CMS-driven + fallbacks (Task 9)
- ✅ types.ts z.enum bug — step4Schema removed entirely (Task 5)
- ✅ _key added to responses array items for Sanity (Task 8)
- ✅ preferredContact cast at API boundary (Task 8 — typed as `string`, not enum)

**Type consistency:** `FormField` / `FormStep` defined in Task 1, used identically in Tasks 5, 6, 7. `shouldShowField` defined in Task 6 (DynamicStep), imported in Task 7. `FALLBACK_FORM_STEPS` typed as `FormStep[]` in Task 5, accepted by `QualifyingForm` prop `formSteps?: FormStep[] | null` in Task 7.
