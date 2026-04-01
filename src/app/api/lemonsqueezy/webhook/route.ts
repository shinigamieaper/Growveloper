/* ============================================================
   This route has been removed.
   Payments are now handled via Flutterwave.
   Webhook: /api/flutterwave/webhook
   ============================================================ */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has been deprecated. Use Flutterwave." },
    { status: 410 },
  );
}
