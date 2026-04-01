/* ============================================================
   POST /api/flutterwave/checkout
   Body: { resourceSlug: string; resourceTitle: string; currency: "USD"|"GBP"|"NGN"; amount: number; email: string }
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

  const { resourceSlug, resourceTitle, currency, amount, email } = body as Record<string, unknown>;

  if (
    typeof resourceSlug !== "string" || !resourceSlug ||
    typeof resourceTitle !== "string" || !resourceTitle ||
    typeof currency !== "string" || !VALID_CURRENCIES.has(currency as FlutterwaveCurrency) ||
    typeof amount !== "number" || amount <= 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const tx_ref = `growveloper-resource-${resourceSlug}-${Date.now()}`;
  const redirect_url = `${SITE_URL}/resources/${resourceSlug}/confirmed`;

  try {
    const { url } = await createFlutterwaveCheckout({
      tx_ref,
      amount,
      currency: currency as FlutterwaveCurrency,
      redirect_url,
      customer: { email },
      customizations: {
        title: "GROWVELOPER",
        description: resourceTitle,
      },
      meta: {
        resource_slug: resourceSlug,
        product_type: "resource",
      },
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[flutterwave/checkout]", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
