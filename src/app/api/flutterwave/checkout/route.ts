/* ============================================================
   POST /api/flutterwave/checkout
   Supports two product types:

   Resource:
   { productType?: "resource"; resourceSlug: string; resourceTitle: string; currency; amount; email }

   Audit:
   { productType: "audit"; tierName: string; currency; amount; email }

   Returns: { url: string }
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { createFlutterwaveCheckout, type FlutterwaveCurrency } from "@/lib/flutterwave";

const VALID_CURRENCIES = new Set<FlutterwaveCurrency>(["USD", "GBP", "NGN"]);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://growveloper.com";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { productType, resourceSlug, resourceTitle, tierName, currency, amount, email } =
    body as Record<string, unknown>;

  /* ── Shared validation ── */
  if (
    typeof currency !== "string" || !VALID_CURRENCIES.has(currency as FlutterwaveCurrency) ||
    typeof amount !== "number" || amount <= 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  /* ── Product-specific validation + tx_ref / redirect_url ── */
  let tx_ref: string;
  let redirect_url: string;
  let description: string;
  let meta: Record<string, string>;

  if (productType === "audit") {
    if (typeof tierName !== "string" || !tierName) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    tx_ref = `growveloper-audit-${Date.now()}`;
    redirect_url = `${SITE_URL}/audit/confirmed`;
    description = `Growth Audit \u2014 ${tierName}`;
    meta = { tier_name: tierName, product_type: "audit" };
  } else {
    /* Default: resource checkout (backwards compatible) */
    if (
      typeof resourceSlug !== "string" || !resourceSlug ||
      typeof resourceTitle !== "string" || !resourceTitle
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    tx_ref = `growveloper-resource-${resourceSlug}-${Date.now()}`;
    redirect_url = `${SITE_URL}/resources/${resourceSlug}/confirmed`;
    description = resourceTitle;
    meta = { resource_slug: resourceSlug, product_type: "resource" };
  }

  try {
    const { url } = await createFlutterwaveCheckout({
      tx_ref,
      amount,
      currency: currency as FlutterwaveCurrency,
      redirect_url,
      customer: { email },
      customizations: {
        title: "GROWVELOPER",
        description,
      },
      meta,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[flutterwave/checkout]", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
