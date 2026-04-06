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
