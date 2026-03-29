import { NextResponse } from "next/server";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

function getMailchimpDataCenter(): string | null {
  if (!MAILCHIMP_API_KEY) return null;
  const parts = MAILCHIMP_API_KEY.split("-");
  return parts.length === 2 ? parts[1] : null;
}

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

    const dc = getMailchimpDataCenter();

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !dc) {
      console.warn("[Newsletter] Mailchimp not configured — skipping API call");
      return NextResponse.json({ success: true, message: "Subscribed (dev mode)" });
    }

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));

      if (data.title === "Member Exists") {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }

      console.error("[Newsletter] Mailchimp error:", data);
      return NextResponse.json(
        { error: data.detail || "Failed to subscribe" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch (err) {
    console.error("[Newsletter] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
