/* ============================================================
   POST /api/flutterwave/webhook
   Handles: charge.completed
   Sends confirmation email via Resend on successful payment.
   FLW_SECRET_HASH required in .env
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://growveloper.com";

export async function POST(req: NextRequest) {
  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = req.headers.get("verif-hash");

  if (!secretHash || signature !== secretHash) {
    console.error("[flw-webhook] Invalid or missing verif-hash");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event !== "charge.completed") {
    return NextResponse.json({ received: true });
  }

  const data = event.data as Record<string, unknown> | undefined;
  if (!data || data.status !== "successful") {
    return NextResponse.json({ received: true });
  }

  const customer = data.customer as Record<string, unknown> | undefined;
  const meta = data.meta as Record<string, string> | undefined;

  const customerEmail = customer?.email as string | undefined;
  const customerName = customer?.name as string | undefined;
  const amount = data.amount as number | undefined;
  const currency = data.currency as string | undefined;
  const resourceSlug = meta?.resource_slug;

  if (!customerEmail) {
    console.error("[flw-webhook] No customer email");
    return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
  }

  const confirmationUrl = `${SITE_URL}/resources/${resourceSlug ?? ""}/confirmed`;
  const amountFormatted = amount != null && currency
    ? `${currency} ${amount.toLocaleString()}`
    : undefined;

  try {
    await resend.emails.send({
      from: "Growveloper <hello@growveloper.com>",
      to: customerEmail,
      subject: "Payment confirmed — GROWVELOPER",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
          <p style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Payment confirmed.</p>
          <p style="color: #4a4a4a; margin-bottom: 24px;">
            Hi${customerName ? ` ${customerName}` : ""},${amountFormatted ? ` your payment of <strong>${amountFormatted}</strong> was received.` : " your payment was received."}
            Head to your confirmation page to access your download.
          </p>
          <a href="${confirmationUrl}" style="display: inline-block; background: #2b7575; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 100px; font-weight: 600; font-size: 14px;">
            Get your download
          </a>
          <p style="margin-top: 32px; font-size: 12px; color: #7a7a7a;">
            GROWVELOPER · Questions? Reply to this email.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[flw-webhook] Failed to send confirmation email:", err);
  }

  return NextResponse.json({ received: true });
}
