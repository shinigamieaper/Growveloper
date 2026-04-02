"use client";

import dynamic from "next/dynamic";

export const SubServicesBentoAI = dynamic(
  () => import("@/components/ai/SubServicesBento").then((m) => ({ default: m.SubServicesBento })),
  { ssr: false }
);

export const SubServicesBentoDevelopment = dynamic(
  () => import("@/components/development/SubServicesBento").then((m) => ({ default: m.SubServicesBento })),
  { ssr: false }
);

export const SubServicesBentoMarketing = dynamic(
  () => import("@/components/marketing/SubServicesBento").then((m) => ({ default: m.SubServicesBento })),
  { ssr: false }
);

export const BeforeAfterCompareClient = dynamic(
  () => import("@/components/shared/BeforeAfterCompare").then((m) => ({ default: m.BeforeAfterCompare })),
  { ssr: false }
);
