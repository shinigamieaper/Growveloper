"use client";

import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { QualifyingFormValues } from "@/components/forms/QualifyingForm/types";

interface Step1Props extends React.ComponentPropsWithoutRef<"div"> {
  register: UseFormRegister<QualifyingFormValues>;
  errors: FieldErrors<QualifyingFormValues>;
}

export function Step1({ register, errors, className, ...props }: Step1Props) {
  return (
    <div className={cn("space-y-5", className)} {...props}>
      <div>
        <label htmlFor="qf-name" className="mb-1.5 block text-sm font-medium text-text-primary">
          Full name
        </label>
        <input
          id="qf-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          className={cn(
            "min-h-[44px] w-full rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
            errors.name ? "border-red-500" : "border-glass-border"
          )}
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="qf-email" className="mb-1.5 block text-sm font-medium text-text-primary">
          Email
        </label>
        <input
          id="qf-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jane@company.com"
          className={cn(
            "min-h-[44px] w-full rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
            errors.email ? "border-red-500" : "border-glass-border"
          )}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="qf-company" className="mb-1.5 block text-sm font-medium text-text-primary">
          Company
        </label>
        <input
          id="qf-company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Inc."
          className={cn(
            "min-h-[44px] w-full rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
            errors.company ? "border-red-500" : "border-glass-border"
          )}
          {...register("company")}
        />
        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="qf-website" className="mb-1.5 block text-sm font-medium text-text-primary">
          Website URL <span className="text-text-tertiary">(optional)</span>
        </label>
        <input
          id="qf-website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://company.com"
          className={cn(
            "min-h-[44px] w-full rounded-xl border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-mid",
            errors.websiteUrl ? "border-red-500" : "border-glass-border"
          )}
          {...register("websiteUrl")}
        />
        {errors.websiteUrl && <p className="mt-1 text-xs text-red-500">{errors.websiteUrl.message}</p>}
      </div>
    </div>
  );
}
