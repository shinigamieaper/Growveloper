/* ============================================================
   Lemon Squeezy — webhook signature verification
   LEMONSQUEEZY_WEBHOOK_SECRET required in .env
   ============================================================ */

import crypto from "crypto";

export function verifyLemonSqueezyWebhook(
  payload: string,
  signature: string,
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[lemonsqueezy] LEMONSQUEEZY_WEBHOOK_SECRET is not set.");
    return false;
  }
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
}
