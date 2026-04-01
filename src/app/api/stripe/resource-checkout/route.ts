/* ============================================================
   This route has been removed.
   Payments are now handled via Lemon Squeezy direct buy URLs.
   Webhook: /api/lemonsqueezy/webhook
   ============================================================ */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has been deprecated. Use Lemon Squeezy." },
    { status: 410 },
  );
}
