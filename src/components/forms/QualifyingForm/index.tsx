"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { trackFormStart, trackFormComplete } from "@/lib/analytics";
import Stepper, { Step } from "@/components/ui/stepper";
import { qualifyingFormSchema, STEP_FIELDS } from "./types";
import type { QualifyingFormValues } from "./types";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

interface QualifyingFormProps extends React.ComponentPropsWithoutRef<"div"> {
  preSelectedService?: string;
}

export function QualifyingForm({ preSelectedService, className, ...props }: QualifyingFormProps) {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<QualifyingFormValues>({
    resolver: zodResolver(qualifyingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      websiteUrl: "",
      servicesInterested: preSelectedService ? [preSelectedService] : [],
      problemStatement: "",
      budgetRange: "",
      timeline: "",
      preferredContact: undefined,
      additionalContext: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    trackFormStart();
  }, []);

  useEffect(() => {
    if (preSelectedService) {
      setValue("servicesInterested", [preSelectedService]);
    }
  }, [preSelectedService, setValue]);

  const validateStep = useCallback(
    async (stepNumber: number): Promise<boolean> => {
      const fieldIndex = stepNumber - 1;
      const fields = STEP_FIELDS[fieldIndex];
      if (!fields) return true;
      return trigger(fields);
    },
    [trigger]
  );

  const handleFinalStep = useCallback(async () => {
    setSubmitStatus("loading");
    setSubmitError("");

    try {
      const data = getValues();
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong");
      }

      trackFormComplete();
      router.push(ROUTES.startConfirmed);
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [getValues, router]);

  return (
    <div className={cn("mx-auto max-w-2xl", className)} {...props}>
      <Stepper
        initialStep={1}
        onBeforeNext={validateStep}
        onFinalStepCompleted={handleFinalStep}
        backButtonText="Back"
        nextButtonText="Next"
        disableStepIndicators
        stepCircleContainerClassName="border-glass-border bg-bg-secondary"
        contentClassName="px-8 pb-2"
        footerClassName="px-8 pb-8"
      >
        <Step>
          <h2 className="heading-font mb-1 text-lg font-bold text-text-primary md:text-xl">
            About You
          </h2>
          <p className="mb-5 text-sm text-text-secondary">Tell us who you are</p>
          <Step1 register={register} errors={errors} />
        </Step>

        <Step>
          <h2 className="heading-font mb-1 text-lg font-bold text-text-primary md:text-xl">
            What You Need
          </h2>
          <p className="mb-5 text-sm text-text-secondary">Select the services you&apos;re interested in</p>
          <Step2 register={register} watch={watch} setValue={setValue} errors={errors} />
        </Step>

        <Step>
          <h2 className="heading-font mb-1 text-lg font-bold text-text-primary md:text-xl">
            Your Situation
          </h2>
          <p className="mb-5 text-sm text-text-secondary">Describe your current challenge</p>
          <Step3 register={register} watch={watch} setValue={setValue} errors={errors} />
        </Step>

        <Step>
          <h2 className="heading-font mb-1 text-lg font-bold text-text-primary md:text-xl">
            Confirm
          </h2>
          <p className="mb-5 text-sm text-text-secondary">How should we reach you?</p>
          <Step4 register={register} watch={watch} errors={errors} />

          {submitStatus === "error" && submitError && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">
              {submitError}
            </p>
          )}
          {submitStatus === "loading" && (
            <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </div>
          )}
        </Step>
      </Stepper>
    </div>
  );
}
