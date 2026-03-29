"use client";

import React from "react";
import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CONTACT_METHODS } from "@/lib/constants/qualifyingForm";
import type { QualifyingFormValues } from "./types";

interface Step4Props extends React.ComponentPropsWithoutRef<"div"> {
  register: UseFormRegister<QualifyingFormValues>;
  watch: UseFormWatch<QualifyingFormValues>;
  errors: FieldErrors<QualifyingFormValues>;
}

export function Step4({ register, watch, errors, className, ...props }: Step4Props) {
  const selectedContact = watch("preferredContact");

  return (
    <div className={cn("space-y-5", className)} {...props}>
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-text-primary">
          How should we reach you?
        </legend>
        <div className="flex flex-wrap gap-3">
          {CONTACT_METHODS.map((method) => {
            const isSelected = selectedContact === method.value;
            return (
              <label
                key={method.value}
                className={cn(
                  "flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-all",
                  isSelected
                    ? "border-brand-mid bg-brand-dark/10 text-text-primary"
                    : "border-glass-border bg-bg-secondary text-text-secondary hover:border-brand-mid/50"
                )}
              >
                <input
                  type="radio"
                  value={method.value}
                  className="sr-only"
                  {...register("preferredContact")}
                />
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected ? "border-brand-mid" : "border-glass-border"
                  )}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-brand-mid" />
                  )}
                </span>
                {method.label}
              </label>
            );
          })}
        </div>
        {errors.preferredContact && (
          <p className="mt-2 text-xs text-red-500">{errors.preferredContact.message}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="qf-context" className="mb-1.5 block text-sm font-medium text-text-primary">
          Anything else we should know? <span className="text-text-tertiary">(optional)</span>
        </label>
        <textarea
          id="qf-context"
          rows={3}
          placeholder="Links, deadlines, existing tools, anything that helps us prepare..."
          className="min-h-[80px] w-full resize-y rounded-xl border border-glass-border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid"
          {...register("additionalContext")}
        />
      </div>
    </div>
  );
}
