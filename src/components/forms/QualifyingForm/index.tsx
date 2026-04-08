"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  submitButtonLabel?: string;
}

export function QualifyingForm({
  preSelectedService,
  formSteps,
  submitButtonLabel,
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
        finalButtonText={submitButtonLabel || "Get My Free Strategy Call"}
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

      <p className="mt-3 text-center text-xs text-text-tertiary">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="text-brand-mid underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

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
