"use client";

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/* ─── Step Variants ─── */
const stepVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

/* ─── Types ─── */
interface StepIndicatorRenderProps {
  step: number;
  currentStep: number;
  onStepClick: (step: number) => void;
}

interface StepperProps extends React.ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  /** Async callback before advancing. Return false to block the step change. */
  onBeforeNext?: (currentStep: number) => Promise<boolean> | boolean;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: StepIndicatorRenderProps) => ReactNode;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ComponentPropsWithoutRef<"button">;
  nextButtonProps?: React.ComponentPropsWithoutRef<"button">;
}

interface StepProps extends React.ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

/* ─── Stepper ─── */
export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeNext,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  className,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (!isLastStep) {
      if (onBeforeNext) {
        const allowed = await onBeforeNext(currentStep);
        if (!allowed) return;
      }
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    if (onBeforeNext) {
      const allowed = await onBeforeNext(currentStep);
      if (!allowed) return;
    }
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div
      className={cn(
        "flex min-h-full flex-1 flex-col items-center justify-center",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-xl rounded-2xl border border-glass-border bg-bg-secondary shadow-xl",
          stepCircleContainerClassName
        )}
      >
        {/* ─── Step indicators ─── */}
        <div className={cn("flex w-full items-center p-8", stepContainerClassName)}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector
                    isComplete={currentStep > stepNumber}
                    prefersReduced={prefersReduced}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ─── Step content ─── */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          prefersReduced={prefersReduced}
          className={cn("space-y-2 px-8", contentClassName)}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* ─── Footer nav ─── */}
        {!isCompleted && (
          <div className={cn("px-8 pb-8", footerClassName)}>
            <div
              className={cn(
                "mt-10 flex",
                currentStep !== 1 ? "justify-between" : "justify-end"
              )}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={cn(
                    "min-h-[44px] rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    currentStep === 1
                      ? "pointer-events-none text-text-tertiary opacity-50"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="min-h-[44px] rounded-xl bg-brand-dark px-5 py-2 text-sm font-semibold text-base-white transition-all hover:bg-brand-mid hover:scale-105 active:scale-95"
                {...nextButtonProps}
              >
                {isLastStep ? "Complete" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step Content Wrapper (animated height) ─── */
interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  prefersReduced: boolean;
  className?: string;
  children: ReactNode;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  prefersReduced,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden", paddingBottom: 8 }}
      animate={{ height: isCompleted ? 0 : parentHeight + 8 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: "spring", duration: 0.4 }
      }
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            prefersReduced={prefersReduced}
            onHeightReady={(h: number) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Slide Transition ─── */
interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  prefersReduced: boolean;
  onHeightReady: (h: number) => void;
}

function SlideTransition({
  children,
  direction,
  prefersReduced,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={prefersReduced ? undefined : stepVariants}
      initial={prefersReduced ? { opacity: 1 } : "enter"}
      animate={prefersReduced ? { opacity: 1 } : "center"}
      exit={prefersReduced ? { opacity: 0 } : "exit"}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Step (child wrapper) ─── */
export function Step({ children, className, ...props }: StepProps) {
  return (
    <div className={cn("px-2", className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Step Indicator (circle) ─── */
interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (step: number) => void;
  disableStepIndicators: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--brand-dark)",
            color: "var(--brand-dark)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--brand-mid)",
            color: "var(--brand-mid)",
          },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-base-white" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-base-white" />
        ) : (
          <span className="text-xs">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Step Connector (line between circles) ─── */
interface StepConnectorProps {
  isComplete: boolean;
  prefersReduced: boolean;
}

function StepConnector({ isComplete, prefersReduced }: StepConnectorProps) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "var(--brand-mid)" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-bg-tertiary">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.4 }}
      />
    </div>
  );
}

/* ─── Check Icon (animated) ─── */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
