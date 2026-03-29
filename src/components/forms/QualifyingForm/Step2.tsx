"use client";

import React from "react";
import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_OPTIONS } from "@/lib/constants/qualifyingForm";
import type { QualifyingFormValues } from "@/components/forms/QualifyingForm/types";

interface Step2Props extends React.ComponentPropsWithoutRef<"div"> {
  register: UseFormRegister<QualifyingFormValues>;
  watch: UseFormWatch<QualifyingFormValues>;
  setValue: UseFormSetValue<QualifyingFormValues>;
  errors: FieldErrors<QualifyingFormValues>;
}

export function Step2({ register, watch, setValue, errors, className, ...props }: Step2Props) {
  const selected = watch("servicesInterested") || [];

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue("servicesInterested", next, { shouldValidate: true });
  };

  return (
    <div className={cn("space-y-5", className)} {...props}>
      <input type="hidden" {...register("servicesInterested")} />

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-text-primary">
          Which services are you interested in?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={cn(
                  "group flex min-h-[44px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                  isSelected
                    ? "border-brand-mid bg-brand-dark/10 text-text-primary"
                    : "border-glass-border bg-bg-secondary text-text-secondary hover:border-brand-mid/50"
                )}
                aria-pressed={isSelected}
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
        {errors.servicesInterested && (
          <p className="mt-2 text-xs text-red-500">{errors.servicesInterested.message}</p>
        )}
      </fieldset>
    </div>
  );
}
