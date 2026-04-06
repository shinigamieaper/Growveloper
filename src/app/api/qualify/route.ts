import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@sanity/client";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const sanityWriteClient = process.env.SANITY_API_TOKEN
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    })
  : null;

interface DynamicResponse {
  fieldId: string;
  label: string;
  value: string;
}

interface LeadPayload {
  name: string;
  email: string;
  company: string;
  websiteUrl?: string;
  servicesInterested: string[];
  problemStatement: string;
  budgetRange: string;
  timeline: string;
  preferredContact: string;
  additionalContext?: string;
  responses?: DynamicResponse[];
  submittedAt: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Step 1: Create Sanity document
    let sanityDocId: string | undefined;
    try {
      sanityDocId = await createSanityLead(body);
    } catch (err) {
      console.error("[Qualify] Sanity lead creation failed:", err);
    }

    // Step 2: Send notification email
    let emailSent = false;
    try {
      await sendNotificationEmail(body);
      emailSent = true;
    } catch (err) {
      console.error("[Qualify] Email send failed:", err);
    }

    // Step 3: Patch notificationSent on the lead document
    if (sanityDocId) {
      try {
        await patchNotificationSent(sanityDocId, emailSent);
      } catch (err) {
        console.error("[Qualify] Failed to patch notificationSent:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Qualify] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createSanityLead(lead: LeadPayload): Promise<string> {
  if (!sanityWriteClient) {
    console.warn("[Qualify] Sanity write client not configured — skipping lead creation");
    return "";
  }

  const doc = await sanityWriteClient.create({
    _type: "lead",
    name: lead.name,
    email: lead.email,
    company: lead.company,
    websiteUrl: lead.websiteUrl || undefined,
    servicesInterested: lead.servicesInterested,
    problemStatement: lead.problemStatement,
    budgetRange: lead.budgetRange,
    timeline: lead.timeline,
    preferredContact: lead.preferredContact,
    additionalContext: lead.additionalContext || undefined,
    submittedAt: lead.submittedAt,
    status: "new",
    notificationSent: false,
    responses: (lead.responses ?? []).map((r) => ({
      _key: crypto.randomUUID(),
      fieldId: r.fieldId,
      label: r.label,
      value: r.value,
    })),
  });

  return doc._id;
}

async function patchNotificationSent(docId: string, sent: boolean): Promise<void> {
  if (!sanityWriteClient || !docId) return;
  await sanityWriteClient.patch(docId).set({ notificationSent: sent }).commit();
}

async function sendNotificationEmail(lead: LeadPayload): Promise<void> {
  if (!resend) {
    console.warn("[Qualify] Resend not configured — skipping email");
    return;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "hello@growveloper.com";
  const servicesFormatted = lead.servicesInterested.join(", ");

  const responsesHtml = (lead.responses ?? [])
    .map(
      (r) =>
        `<tr><td style="padding:8px;font-weight:bold;">${r.label}</td><td style="padding:8px;">${r.value}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: "Growveloper <hello@growveloper.com>",
    to: notificationEmail,
    subject: `New Lead: ${lead.name} — ${lead.company}`,
    html: `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${lead.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${lead.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${lead.company}</td></tr>
        ${lead.websiteUrl ? `<tr><td style="padding:8px;font-weight:bold;">Website</td><td style="padding:8px;">${lead.websiteUrl}</td></tr>` : ""}
        <tr><td style="padding:8px;font-weight:bold;">Services</td><td style="padding:8px;">${servicesFormatted}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Problem</td><td style="padding:8px;">${lead.problemStatement}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${lead.budgetRange}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Timeline</td><td style="padding:8px;">${lead.timeline}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Contact</td><td style="padding:8px;">${lead.preferredContact}</td></tr>
        ${lead.additionalContext ? `<tr><td style="padding:8px;font-weight:bold;">Notes</td><td style="padding:8px;">${lead.additionalContext}</td></tr>` : ""}
        ${responsesHtml}
      </table>
      <p style="margin-top:16px;font-size:12px;color:#666;">Submitted ${lead.submittedAt}</p>
    `,
  });
}
