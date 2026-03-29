import { z } from "zod";

/* ─── Per-step Zod schemas ─── */

export const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  websiteUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
});

export const step2Schema = z.object({
  servicesInterested: z
    .array(z.string())
    .min(1, "Select at least one service"),
});

export const step3Schema = z.object({
  problemStatement: z
    .string()
    .min(20, "Please describe your situation in at least 20 characters"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
});

export const step4Schema = z.object({
  preferredContact: z.enum(["email", "whatsapp", "call"], "Please select a contact method"),
  additionalContext: z.string().optional(),
});

/* ─── Combined schema ─── */
export const qualifyingFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type QualifyingFormValues = z.infer<typeof qualifyingFormSchema>;

/* ─── Step field keys for per-step validation ─── */
export const STEP_FIELDS: (keyof QualifyingFormValues)[][] = [
  ["name", "email", "company", "websiteUrl"],
  ["servicesInterested"],
  ["problemStatement", "budgetRange", "timeline"],
  ["preferredContact", "additionalContext"],
];
