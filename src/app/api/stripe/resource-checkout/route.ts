/* ============================================================
   Stripe Resource Checkout — Route Handler
   STRIPE_SECRET_KEY required — configure before going live.
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface CheckoutRequestBody {
  resourceTitle: string;
  price: number;
  slug: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutRequestBody;
    const { resourceTitle, price, slug } = body;

    if (!resourceTitle || !price || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: resourceTitle, price, slug" },
        { status: 400 },
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: "Price must be greater than 0" },
        { status: 400 },
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: resourceTitle,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        resourceSlug: slug,
        resourceTitle,
      },
      success_url: `${origin}/resources/${slug}/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/resources/${slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/resource-checkout]", err);
    const message = err instanceof Error ? err.message : "Stripe checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
