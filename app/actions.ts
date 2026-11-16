"use server";

import { headers } from "next/headers";
import { quoteSchema, type QuoteActionResult } from "@/lib/quote-schema";
import { EMAIL, PHONE_DISPLAY } from "@/lib/site";
import {
  checkToken,
  htmlNote,
  issueToken,
  logLine,
  rateLimited,
  scoreSubmission,
} from "@/lib/form-guard";

/**
 * Server Action that receives a quote request and emails it to the business.
 *
 * Security note: Server Actions are reachable via direct POST, so we ALWAYS
 * re-validate the payload on the server rather than trusting client validation.
 *
 * Email delivery uses Resend (https://resend.com) via its REST API — no extra
 * npm dependency required. Configured mostly through env vars, but the "to"
 * address defaults to the business's own public EMAIL (lib/site.ts) rather
 * than requiring a QUOTE_TO_EMAIL env var — some hosting plans cap the
 * number of custom environment variables, and this address isn't a secret:
 *
 *   RESEND_API_KEY   – your Resend API key (starts with "re_")
 *   QUOTE_TO_EMAIL   – optional override for the recipient (defaults to EMAIL)
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

/** Signed form-timer token for the quote form (see lib/form-guard.ts). */
export async function getFormToken(): Promise<string> {
  return issueToken();
}

export async function submitQuote(values: unknown): Promise<QuoteActionResult> {
  const raw = (values && typeof values === "object" ? values : {}) as Record<string, unknown>;

  // 1) Honeypot: real visitors never fill this hidden field. Pretend success.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    logLine("call-me-gone", "honeypot", { score: 0, reasons: [] });
    return { success: true, message: "Thanks! We received your request and will be in touch shortly." };
  }

  // 2) Signed time-to-submit check: under 3 seconds is a bot.
  const timer = checkToken(raw._ft);
  if (timer.status === "too_fast") {
    logLine("call-me-gone", "rejected-too-fast", { score: 0, reasons: [`submitted in ${timer.age}s`] });
    return {
      success: false,
      message: `That was quick! Please wait a few seconds and press send again, or call ${PHONE_DISPLAY}.`,
    };
  }

  // 3) IP rate limit (5 per 15 minutes, 20 per day).
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    logLine("call-me-gone", "rate-limited", { score: 0, reasons: [] });
    return { success: false, message: `Too many requests from this connection. Please call ${PHONE_DISPLAY}.` };
  }

  const parsed = quoteSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Some fields need attention. Please review and try again.",
    };
  }

  const lead = parsed.data;

  // 4) Solicitation score. Flagged = still delivered, with a subject prefix.
  const guard = scoreSubmission(
    { name: lead.name, email: lead.email, phone: lead.phone, message: lead.description },
    { profile: "trade", tokenStatus: timer.status }
  );
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
  const toEmail = process.env.QUOTE_TO_EMAIL || EMAIL;
  const fromEmail =
    process.env.QUOTE_FROM_EMAIL || "Call Me Gone Junk Removal <onboarding@resend.dev>";

  // Dev / not-yet-configured fallback: log instead of send.
  if (!apiKey) {
    console.log("[QUOTE LEAD — email not configured, logging instead]", {
      ...lead,
      receivedAt,
      possibleSpam: guard.flagged,
    });
    logLine("call-me-gone", guard.flagged ? "logged-flagged" : "logged-clean", guard);
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
    ${htmlNote(guard)}
  `;

  const text = rows.map(([label, val]) => `${label}: ${val}`).join("\n") +
    (guard.flagged ? `\n\nPossible spam or sales pitch (score ${guard.score}): ${guard.reasons.join("; ")}` : "");

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
        subject: `${guard.flagged ? "[Possible Spam] " : ""}New quote request — ${lead.name} (${lead.serviceType})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[QUOTE LEAD] Resend error:", res.status, detail);
      logLine("call-me-gone", "send-failed", guard);
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

  logLine("call-me-gone", guard.flagged ? "sent-flagged" : "sent-clean", guard);
  return {
    success: true,
    message: "Thanks! We received your request and will be in touch shortly.",
  };
}
