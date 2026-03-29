/* ============================================================
   Stripe Integration
   STRIPE_SECRET_KEY required — configure before going live.
   ============================================================ */

import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "[stripe] STRIPE_SECRET_KEY is not set. Configure it in .env before going live.",
      );
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}
