import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Apex form guard (free, server-side), added 2026-11-16. TypeScript port of
 * knowledge/client-forms/spam-guard/form-guard.php.
 *
 * 1) Signed time-to-submit token (getFormToken server action). Under
 *    MIN_SECONDS: reject. Missing/bad/stale: scored only.
 * 2) Solicitation score. Score >= FLAG_AT: deliver with a "[Possible Spam]"
 *    subject prefix. This guard never drops an entry by itself.
 * 3) In-memory IP rate limit (5 / 15 min, 20 / day per server process).
 */

const MIN_SECONDS = 3;
const MAX_AGE = 43200;
export const FLAG_AT = 4;

const SECRET_SEED =
  process.env.FORM_TIMER_SECRET || process.env.RESEND_API_KEY || randomBytes(32).toString("hex");
const SECRET = createHmac("sha256", SECRET_SEED).update("apex-form-timer-v1").digest("hex");

const sign = (ts: string) => createHmac("sha256", SECRET).update(ts).digest("hex").slice(0, 32);

export function issueToken(): string {
  const ts = String(Math.floor(Date.now() / 1000));
  return `${ts}.${sign(ts)}`;
}

export type TokenStatus = "ok" | "too_fast" | "missing" | "bad" | "stale";

export function checkToken(token: unknown): { status: TokenStatus; age: number | null } {
  const t = typeof token === "string" ? token.trim() : "";
  if (!t) return { status: "missing", age: null };
  const m = /^(\d{9,11})\.([a-f0-9]{32})$/.exec(t);
  if (!m) return { status: "bad", age: null };
  const expect = Buffer.from(sign(m[1]));
  const got = Buffer.from(m[2]);
  if (expect.length !== got.length || !timingSafeEqual(expect, got)) return { status: "bad", age: null };
  const age = Math.floor(Date.now() / 1000) - Number(m[1]);
  if (age < MIN_SECONDS) return { status: "too_fast", age };
  if (age > MAX_AGE) return { status: "stale", age };
  return { status: "ok", age };
}

const PITCH: Record<string, number> = {
  "i noticed your website": 4, "i came across your website": 4, "i was checking out your website": 4,
  "i visited your website": 3, "i was looking at your website": 3, "i found your website": 2,
  "hope this email finds you": 3, "hope this message finds you": 3, "dear business owner": 3,
  "first page of google": 4, "page one of google": 4, "page 1 of google": 4, "top of google": 3,
  backlink: 4, "guest post": 4, "link building": 4, "link insertion": 4, "domain authority": 4,
  "sponsored post": 3, "white label": 3, "white-label": 3, outsourc: 2, offshore: 2,
  crypto: 3, bitcoin: 3, forex: 3, nft: 2,
  "business loan": 4, "business funding": 4, "merchant cash advance": 4, "working capital": 3,
  "line of credit": 3, "pre-approved": 3, preapproved: 3, "sba loan": 3,
  "virtual assistant": 3, "appointment setting": 3, unsubscribe: 3, "reply stop": 3, "opt out": 2,
  "google my business": 2, "gmb ": 2, "would you be interested": 2, "are you open to": 2,
  "can i send you": 2, "let me know if you are interested": 2, "let me know if you're interested": 2,
  "quick call": 1, "schedule a call": 1, "zoom call": 1, "free audit": 2, "free proposal": 2,
  "our agency": 3, "our team of experts": 2, "we help businesses": 3, "we help companies": 3,
  "hire our": 2, upwork: 2, fiverr: 2, "partnership opportunity": 3, "investment opportunity": 3,
};
const TRADE_ONLY: Record<string, number> = {
  seo: 3, "search engine optimization": 4, "website redesign": 4, "redesign your website": 4,
  "web design": 3, "website design": 3, "web development": 3, "new website": 2,
  "digital marketing": 4, marketing: 2, "lead generation": 4, "more leads": 3, "qualified leads": 3,
  leads: 1, ranking: 2, "rank higher": 3, "google ranking": 3, "grow your business": 3,
  "more customers": 2, "more calls": 2, "social media management": 3, "google reviews": 1,
  "app development": 3, "mobile app": 2, traffic: 1,
};
const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com", "hotmail.com", "outlook.com",
  "live.com", "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "protonmail.com", "proton.me",
  "att.net", "sbcglobal.net", "bellsouth.net", "comcast.net", "verizon.net", "charter.net", "suddenlink.net",
  "optimum.net", "cox.net", "earthlink.net", "mail.com", "gmx.com", "zoho.com", "yahoo.co.uk", "windstream.net",
  "centurylink.net", "frontier.com", "embarqmail.com", "consolidated.net", "eastex.net",
]);
const TEXAS = new Set(["903", "430", "936", "214", "469", "972", "945", "817", "682", "409", "713", "281", "832", "346",
  "512", "737", "210", "726", "254", "325", "361", "432", "806", "830", "915", "940", "956", "979", "318"]);
const TOLL_FREE = new Set(["800", "833", "844", "855", "866", "877", "888"]);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export interface GuardResult { score: number; reasons: string[]; flagged: boolean }

export function scoreSubmission(
  f: { name?: string; email?: string; phone?: string; message?: string; company?: string },
  opt: { profile?: "trade" | "agency"; tokenStatus?: TokenStatus } = {}
): GuardResult {
  const profile = opt.profile === "agency" ? "agency" : "trade";
  const name = f.name ?? "";
  const email = (f.email ?? "").trim().toLowerCase();
  const phone = (f.phone ?? "").trim();
  const company = f.company ?? "";
  const msg = f.message ?? "";
  const all = `${name} ${company} ${msg}`.toLowerCase().replace(/\s+/g, " ");
  let score = 0;
  const reasons: string[] = [];
  const add = (pts: number, why: string) => { score += pts; reasons.push(`${why} +${pts}`); };

  let kw = 0;
  const hits: string[] = [];
  for (const list of profile === "agency" ? [PITCH] : [PITCH, TRADE_ONLY]) {
    for (const [needle, pts] of Object.entries(list)) {
      if (new RegExp(`(?<![a-z])${esc(needle)}`).test(all)) { kw += pts; hits.push(needle.trim()); }
    }
  }
  if (kw > 0) add(Math.min(kw, 10), `phrases: ${hits.slice(0, 6).join(", ")}`);

  const urls = (msg.match(/(https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(com|net|org|io|co|biz|info|xyz|top|online|site|ru|cn)\/\S*/gi) || []).length;
  if (urls > 0) add(profile === "agency" ? (urls >= 2 ? 2 : 1) : (urls >= 2 ? 3 : 2), `${urls} link(s) in message`);

  if (email.includes("@")) {
    const domain = email.slice(email.lastIndexOf("@") + 1);
    if (!FREE_MAIL.has(domain)) {
      if (/(seo|digital|market|media|leads?|agency|growth|rank|web|solution|studio|labs|outreach|infotech|soft|pixel|brand|consult|ventures|capital|funding|lending)/.test(domain)) add(2, "sales-style email domain");
      if (/\.(ru|cn|xyz|top|online|site|click|shop|store|icu|buzz|space|website|pk|in|bd|ph|vn|ng)$/.test(domain)) add(2, "unusual email domain ending");
      if (company) {
        const root = domain.split(".")[0].replace(/[^a-z0-9]/g, "");
        const co = company.toLowerCase().replace(/[^a-z0-9]/g, "");
        const word = (company.toLowerCase().trim().split(" ")[0] || "").replace(/[^a-z0-9]/g, "");
        if (root && co && !co.includes(root) && !root.includes(co) && (word.length < 3 || !root.includes(word))) add(1, "email domain does not match business name");
      }
    }
  }

  const digits = phone.replace(/\D/g, "");
  if (digits) {
    const foreign = (phone.startsWith("+") && !phone.startsWith("+1")) || phone.startsWith("00") || digits.length > 11 || (digits.length === 11 && digits[0] !== "1");
    if (foreign) add(3, "foreign phone number");
    else if (digits.length >= 10) {
      const us = digits.length === 11 ? digits.slice(1) : digits;
      const area = us.slice(0, 3);
      if (TOLL_FREE.has(area)) add(2, "toll-free phone");
      else if (profile === "trade" && !TEXAS.has(area)) add(1, `out-of-area phone (${area})`);
    }
  }

  if (/\b(llc|ltd|pvt|agency|seo|marketing|digital|solutions|technologies|infotech)\b/i.test(name)) add(2, "business name in the name field");
  if (/[\u0400-\u04FF\u4E00-\u9FFF\u0600-\u06FF]/.test(msg + name)) add(2, "non-Latin script");

  if (opt.tokenStatus === "missing") add(2, "no form timer (direct post or no JavaScript)");
  else if (opt.tokenStatus === "bad") add(3, "forged form timer");
  else if (opt.tokenStatus === "stale") add(1, "form open over 12 hours");

  return { score, reasons, flagged: score >= FLAG_AT };
}

// In-memory per-process IP rate limit: 5 per 15 minutes and 20 per day.
const hitsByIp = new Map<string, number[]>();
export function rateLimited(ip: string, limit = 5, windowSec = 900, daily = 20): boolean {
  const now = Date.now() / 1000;
  const kept = (hitsByIp.get(ip) || []).filter((t) => t > now - 86400);
  const inWindow = kept.filter((t) => t > now - windowSec).length;
  if (inWindow >= limit || kept.length >= daily) { hitsByIp.set(ip, kept); return true; }
  kept.push(now);
  hitsByIp.set(ip, kept);
  if (hitsByIp.size > 5000) hitsByIp.clear();
  return false;
}

export function logLine(site: string, outcome: string, r: Pick<GuardResult, "score" | "reasons">) {
  // One short line in the server log. No names, emails, phones or message text.
  console.log(`[form-guard] ${new Date().toISOString()} ${site} ${outcome} score=${r.score} ${r.reasons.join("; ")}`);
}

export function htmlNote(r: GuardResult): string {
  if (!r.flagged) return "";
  const why = r.reasons.join("; ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<p style="margin:16px 0 0;padding:10px 12px;background:#fff4e5;border:1px solid #f0c27b;color:#5a3b00;font-family:sans-serif;font-size:13px"><b>Possible spam or sales pitch</b> (score ${r.score}). Delivered anyway so no real customer is lost. Why: ${why}</p>`;
}
