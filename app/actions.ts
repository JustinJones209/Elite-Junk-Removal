"use server";

import { quoteSchema, type QuoteActionResult } from "@/lib/quote-schema";

/**
 * Server Action that receives a quote request and emails it to the business.
 *
 * Security note: Server Actions are reachable via direct POST, so we ALWAYS
 * re-validate the payload on the server rather than trusting client validation.
 *
 * Email delivery uses Resend (https://resend.com) via its REST API — no extra
 * npm dependency required. It is configured entirely through env vars so no
 * secrets live in the code:
 *
 *   RESEND_API_KEY   – your Resend API key (starts with "re_")
 *   QUOTE_TO_EMAIL   – where quote requests are sent (Gus's inbox)
 *   QUOTE_FROM_EMAIL – optional "From" (default: onboarding@resend.dev for testing)
 *
 * If RESEND_API_KEY is not set (e.g. local dev), it falls back to logging the
 * lead to the console so the form still works end-to-end.
 *
 * TODO(launch): See .env.local.example for setup steps.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitQuote(values: unknown): Promise<QuoteActionResult> {
  const parsed = quoteSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Some fields need attention. Please review and try again.",
    };
  }

  const lead = parsed.data;
  const receivedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["ZIP", lead.zip],
    ["Service", lead.serviceType],
    ["Preferred date", lead.preferredDate || "—"],
    ["Details", lead.description],
    ["Received", receivedAt],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail =
    process.env.QUOTE_FROM_EMAIL || "Call Me Gone Junk Removal <onboarding@resend.dev>";

  // Dev / not-yet-configured fallback: log instead of send.
  if (!apiKey || !toEmail) {
    console.log("[QUOTE LEAD — email not configured, logging instead]", {
      ...lead,
      receivedAt,
    });
    return {
      success: true,
      message: "Thanks! We received your request and will be in touch shortly.",
    };
  }

  const html = `
    <h2 style="font-family:sans-serif;">New quote request — Call Me Gone Junk Removal</h2>
    <table style="font-family:sans-serif;border-collapse:collapse;">
      ${rows
        .map(
          ([label, val]) =>
            `<tr>
              <td style="padding:6px 12px;font-weight:bold;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:6px 12px;">${escapeHtml(val)}</td>
            </tr>`
        )
        .join("")}
    </table>
  `;

  const text = rows.map(([label, val]) => `${label}: ${val}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        // Let Gus hit "reply" to reach the customer directly (if they gave an email).
        reply_to: lead.email || undefined,
        subject: `New quote request — ${lead.name} (${lead.serviceType})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[QUOTE LEAD] Resend error:", res.status, detail);
      return {
        success: false,
        message:
          "Something went wrong sending your request. Please call us instead.",
      };
    }
  } catch (err) {
    console.error("[QUOTE LEAD] Failed to send email:", err);
    return {
      success: false,
      message:
        "Something went wrong sending your request. Please call us instead.",
    };
  }

  return {
    success: true,
    message: "Thanks! We received your request and will be in touch shortly.",
  };
}
