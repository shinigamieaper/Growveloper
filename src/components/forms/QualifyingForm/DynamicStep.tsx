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
