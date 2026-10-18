import { NextResponse } from "next/server";
import { readInviteToken } from "@/lib/newsletterToken";
import { upsertSubscriber, mailerliteConfigured } from "@/lib/mailerlite";

// The join happens only on this POST (the button), never on opening the link: mail scanners open links.
export async function POST(request: Request) {
  try {
    const { t } = await request.json();
    const invite = typeof t === "string" ? readInviteToken(t) : null;
    if (!invite) return NextResponse.json({ error: "expired" }, { status: 400 });

    if (!mailerliteConfigured()) {
      console.error("[NewsletterJoin] MailerLite not configured");
      return NextResponse.json({ error: "Not available" }, { status: 503 });
    }
    const r = await upsertSubscriber({
      email: invite.email,
      groups: [process.env.MAILERLITE_GROUP_NEWSLETTER, process.env.MAILERLITE_GROUP_RESOURCES],
      fields: { last_resource: invite.slug, consent: "email-invite-v1" },
    });
    if (!r.ok) {
      console.error("[NewsletterJoin] MailerLite error:", r.status, r.message);
      return NextResponse.json({ error: "Failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[NewsletterJoin] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
