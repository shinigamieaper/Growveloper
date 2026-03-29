"use client";

import React from "react";
import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { cn } from "@/lib/utils";
import { BUDGET_RANGES, TIMELINE_OPTIONS } from "@/lib/constants/qualifyingForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QualifyingFormValues } from "@/components/forms/QualifyingForm/types";

interface Step3Props extends React.ComponentPropsWithoutRef<"div"> {
  register: UseFormRegister<QualifyingFormValues>;
  watch: UseFormWatch<QualifyingFormValues>;
  setValue: UseFormSetValue<QualifyingFormValues>;
  errors: FieldErrors<QualifyingFormValues>;
}

export function Step3({ register, watch, setValue, errors, className, ...props }: Step3Props) {
  const budgetValue = watch("budgetRange");
  const timelineValue = watch("timeline");

  return (
    <div className={cn("space-y-5", className)} {...props}>
      <div>
        <label htmlFor="qf-problem" className="mb-1.5 block text-sm font-medium text-text-primary">
          What&apos;s your biggest growth challenge right now?
        </label>
        <textarea
          id="qf-problem"
          rows={4}
          placeholder="Tell us about the problem you're trying to solve, what you've already tried, and what success looks like..."
          className={cn(
            "min-h-[100px] w-full resize-y rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
            errors.problemStatement ? "border-red-500" : "border-glass-border"
          )}
          {...register("problemStatement")}
        />
        {errors.problemStatement && (
          <p className="mt-1 text-xs text-red-500">{errors.problemStatement.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-primary">
          Budget range
        </label>
        <Select
          value={budgetValue}
          onValueChange={(val) => setValue("budgetRange", val, { shouldValidate: true })}
        >
          <SelectTrigger className={errors.budgetRange ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            {BUDGET_RANGES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.budgetRange && (
          <p className="mt-1 text-xs text-red-500">{errors.budgetRange.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-primary">
          Timeline
        </label>
        <Select
          value={timelineValue}
          onValueChange={(val) => setValue("timeline", val, { shouldValidate: true })}
        >
          <SelectTrigger className={errors.timeline ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a timeline" />
          </SelectTrigger>
          <SelectContent>
            {TIMELINE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timeline && (
          <p className="mt-1 text-xs text-red-500">{errors.timeline.message}</p>
        )}
      </div>
    </div>
  );
}
