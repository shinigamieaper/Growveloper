import { NextResponse } from "next/server";
import { upsertSubscriber, mailerliteConfigured } from "@/lib/mailerlite";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!mailerliteConfigured()) {
      // In production a missing key must show, not quietly drop the address.
      if (process.env.NODE_ENV === "production") {
        console.error("[Newsletter] MailerLite not configured");
        return NextResponse.json(
          { error: "Sign-up is not available right now. Please try again later." },
          { status: 503 }
        );
      }
      console.warn("[Newsletter] MailerLite not configured — skipping API call");
      return NextResponse.json({ success: true, message: "Subscribed (dev mode)" });
    }

    const r = await upsertSubscriber({ email, groups: [process.env.MAILERLITE_GROUP_NEWSLETTER] });
    if (!r.ok) {
      console.error("[Newsletter] MailerLite error:", r.status, r.message);
      return NextResponse.json(
        { error: "That address was not accepted. Check it, or write to hello@growveloper.com." },
        { status: r.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: r.existed ? "Already subscribed" : "Subscribed",
    });
  } catch (err) {
    console.error("[Newsletter] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
