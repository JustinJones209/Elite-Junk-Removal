/**
 * Progressive enhancement for the M7 redesign. Plain DOM code, no framework,
 * so the exact same file powers the Next.js site (via components/m7/Enhancer)
 * and the offline single-file prototype. Every widget works (or degrades to
 * readable static content) without this script. Safe to call repeatedly:
 * each element is only wired once.
 *
 * The quote form's real submission stays in React (QuoteForm -> submitQuote).
 * This file only handles step navigation and prefill on that form.
 */

type Root = Document | HTMLElement;

declare global {
  interface Window {
    CMG_PREVIEW?: boolean;
  }
}

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function once(el: Element, key: string): boolean {
  const k = `data-wired-${key}`;
  if (el.hasAttribute(k)) return false;
  el.setAttribute(k, "");
  return true;
}

/** Sets a value so React-controlled / RHF-registered fields notice it. */
function setFieldValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) {
  const proto = Object.getPrototypeOf(el);
  const desc = Object.getOwnPropertyDescriptor(proto, "value");
  if (desc && desc.set) desc.set.call(el, value);
  else el.value = value;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

/* -------------------------------- Header -------------------------------- */
function header(root: Root) {
  const hdr = root.querySelector<HTMLElement>("[data-header]");
  if (hdr && once(hdr, "hdr")) {
    const onScroll = () => hdr.classList.toggle("is-condensed", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-menu-toggle]").forEach((btn) => {
    if (!once(btn, "menu")) return;
    const panel = document.getElementById(btn.getAttribute("aria-controls") || "");
    if (!panel) return;
    const set = (open: boolean) => {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.hidden = !open;
      btn.querySelector("[data-ico-open]")?.toggleAttribute("hidden", open);
      btn.querySelector("[data-ico-close]")?.toggleAttribute("hidden", !open);
    };
    btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
    panel.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) set(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        set(false);
        btn.focus();
      }
    });
  });
}

/* ------------------------- Scroll reveal + count-up ------------------------ */
function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count || "0");
  const prefix = el.dataset.prefix || "";
  if (!to || reduceMotion()) {
    el.textContent = prefix + to;
    return;
  }
  const dur = 700;
  const t0 = performance.now();
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(to * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function reveal(root: Root) {
  const html = document.documentElement;
  const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
  const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count]")).filter((c) => once(c, "count"));
  if (!("IntersectionObserver" in window) || reduceMotion()) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  // Anything already on screen is shown immediately (no flash, no hidden LCP).
  const vh = window.innerHeight;
  els.forEach((e) => {
    const r = e.getBoundingClientRect();
    if (r.top < vh * 0.95) e.classList.add("in");
  });
  html.classList.add("js-motion");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  els.filter((e) => !e.classList.contains("in")).forEach((e) => io.observe(e));
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        countUp(en.target as HTMLElement);
        cio.unobserve(en.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));
}

/* ------------------------------ Before / after ----------------------------- */
function beforeAfter(root: Root) {
  root.querySelectorAll<HTMLElement>("[data-ba]").forEach((box) => {
    if (!once(box, "ba")) return;
    const stage = box.querySelector<HTMLElement>(".ba-stage");
    const range = box.querySelector<HTMLInputElement>(".ba-range");
    const before = box.querySelector<HTMLImageElement>("[data-ba-before]");
    const after = box.querySelector<HTMLImageElement>("[data-ba-after]");
    const caption = box.querySelector<HTMLElement>("[data-ba-caption]");
    if (!stage || !range) return;
    const apply = () => {
      const v = Number(range.value);
      stage.style.setProperty("--pos", v + "%");
      range.setAttribute("aria-valuetext", `${v}% before photo showing`);
      const tl = stage.querySelector<HTMLElement>(".ba-tag.l");
      const tr = stage.querySelector<HTMLElement>(".ba-tag.r");
      if (tl) tl.style.opacity = v < 12 ? "0" : "1";
      if (tr) tr.style.opacity = v > 88 ? "0" : "1";
    };
    range.addEventListener("input", apply);
    apply();
    box.querySelectorAll<HTMLButtonElement>("[data-ba-pick]").forEach((b) => {
      b.addEventListener("click", () => {
        box.querySelectorAll("[data-ba-pick]").forEach((o) => o.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        if (before && b.dataset.before) {
          before.src = b.dataset.before;
          before.alt = b.dataset.beforeAlt || "";
          before.removeAttribute("srcset");
        }
        if (after && b.dataset.after) {
          after.src = b.dataset.after;
          after.alt = b.dataset.afterAlt || "";
          after.removeAttribute("srcset");
        }
        if (caption) caption.textContent = b.dataset.label || "";
        range.value = "50";
        apply();
      });
    });
  });
}

/* ------------------------------- Estimator ------------------------------- */
function estimator(root: Root) {
  root.querySelectorAll<HTMLElement>("[data-estimator]").forEach((box) => {
    if (!once(box, "est")) return;
    const steps = JSON.parse(box.dataset.estimator || "[]") as {
      short: string; label: string; fill: number; price: string; prefix: string; count: number; examples: string; hint: string;
    }[];
    const range = box.querySelector<HTMLInputElement>("[data-est-range]");
    const fill = box.querySelector<SVGRectElement>("[data-est-fill]");
    const size = box.querySelector<HTMLElement>("[data-est-size]");
    const price = box.querySelector<HTMLElement>("[data-est-price]");
    const prefix = box.querySelector<HTMLElement>("[data-est-prefix]");
    const ex = box.querySelector<HTMLElement>("[data-est-ex]");
    const go = box.querySelector<HTMLAnchorElement>("[data-est-go]");
    const btns = Array.from(box.querySelectorAll<HTMLButtonElement>("[data-est-step]"));
    let current = -1;
    const animatePrice = (from: number, to: number, s: (typeof steps)[number]) => {
      if (!price) return;
      if (!to || reduceMotion() || !from) {
        price.textContent = s.price;
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 380);
        price.textContent = "$" + Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const set = (i: number) => {
      const s = steps[i];
      if (!s) return;
      const prev = current >= 0 ? steps[current] : undefined;
      current = i;
      if (range) {
        range.value = String(i);
        range.setAttribute("aria-valuetext", `${s.label}: ${s.prefix} ${s.price}`);
      }
      if (fill) fill.setAttribute("width", String((Number(fill.dataset.max || "0") * s.fill) / 100));
      if (size) size.textContent = s.label;
      if (prefix) prefix.textContent = s.prefix;
      animatePrice(prev ? prev.count : 0, s.count, s);
      if (ex) ex.textContent = s.examples;
      btns.forEach((b, j) => b.setAttribute("aria-checked", String(j === i)));
      if (go) go.dataset.prefill = `Load size: ${s.hint}. `;
    };
    range?.addEventListener("input", () => set(Number(range.value)));
    btns.forEach((b, j) => b.addEventListener("click", () => set(j)));
    set(Number(range?.value || "2"));
  });
}

/* ------------------------ Prefill + what-we-take picker ---------------------- */
const PREFILL_KEY = "cmg-quote-prefill";

function quoteForm(): HTMLFormElement | null {
  return document.querySelector<HTMLFormElement>("form[data-quote]");
}

function addToDescription(text: string) {
  const form = quoteForm();
  const ta = form?.querySelector<HTMLTextAreaElement>("textarea[name=description]");
  if (!ta) return false;
  const cur = ta.value.trim();
  const next = cur ? (cur.includes(text.trim()) ? cur : `${cur}\n${text.trim()}`) : text.trim();
  setFieldValue(ta, next);
  return true;
}

function goToQuote(prefill: string, href: string) {
  if (addToDescription(prefill)) {
    const form = quoteForm();
    showStep(form!, 0);
    form!.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => form!.querySelector<HTMLElement>("textarea[name=description]")?.focus({ preventScroll: true }), 450);
    return;
  }
  try {
    sessionStorage.setItem(PREFILL_KEY, prefill);
  } catch {
    /* storage blocked: link still works */
  }
  window.location.assign(href);
}

function prefillLinks(root: Root) {
  root.querySelectorAll<HTMLAnchorElement>("[data-prefill-link]").forEach((a) => {
    if (!once(a, "pf")) return;
    a.addEventListener("click", (e) => {
      const text = a.dataset.prefill || "";
      if (!text) return;
      e.preventDefault();
      goToQuote(text, a.getAttribute("href") || "/quote");
    });
  });
}

function picker(root: Root) {
  root.querySelectorAll<HTMLElement>("[data-picker]").forEach((box) => {
    if (!once(box, "pick")) return;
    const list = box.querySelector<HTMLOListElement>("[data-pick-list]");
    const empty = box.querySelector<HTMLElement>("[data-pick-empty]");
    const add = box.querySelector<HTMLAnchorElement>("[data-pick-add]");
    const count = box.querySelector<HTMLElement>("[data-pick-count]");
    const live = box.querySelector<HTMLElement>("[data-pick-live]");
    const chosen: string[] = [];
    const render = () => {
      if (list) {
        list.innerHTML = "";
        chosen.forEach((c) => {
          const li = document.createElement("li");
          li.textContent = c;
          list.appendChild(li);
        });
        list.hidden = chosen.length === 0;
      }
      if (empty) empty.hidden = chosen.length > 0;
      if (count) count.textContent = String(chosen.length);
      if (add) {
        add.setAttribute("aria-disabled", String(chosen.length === 0));
        add.dataset.prefill = chosen.length ? `Items: ${chosen.join(", ")}.` : "";
      }
    };
    box.querySelectorAll<HTMLButtonElement>("[data-pick]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const v = chip.dataset.pick || "";
        const i = chosen.indexOf(v);
        if (i >= 0) chosen.splice(i, 1);
        else chosen.push(v);
        chip.setAttribute("aria-pressed", String(i < 0));
        if (live) live.textContent = `${v} ${i < 0 ? "added" : "removed"}. ${chosen.length} item${chosen.length === 1 ? "" : "s"} on your list.`;
        render();
      });
    });
    add?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!chosen.length) {
        if (live) live.textContent = "Pick at least one item first.";
        return;
      }
      goToQuote(add.dataset.prefill || "", add.getAttribute("href") || "/quote");
    });
    render();
  });
}

/* ------------------------------ Multi-step form ----------------------------- */
const RULES: Record<string, (v: string) => string | null> = {
  name: (v) => (v.trim().length >= 2 ? null : "Please enter your name."),
  phone: (v) =>
    v.length >= 10 && /^[0-9()+\-.\s]+$/.test(v) ? null : "Please enter a valid phone number (10 digits).",
  email: (v) => (!v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Please enter a valid email address."),
  zip: (v) => (/^\d{5}$/.test(v) ? null : "Please enter a valid 5-digit ZIP code."),
  serviceType: (v) => (v ? null : "Please choose a service type."),
  description: (v) =>
    v.trim().length < 10
      ? "Please tell us a little about the job (10+ characters)."
      : v.length > 1000
        ? "Please keep the description under 1000 characters."
        : null,
};

function fieldError(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, msg: string | null) {
  const id = `${field.id}-verr`;
  let p = document.getElementById(id);
  if (msg) {
    if (!p) {
      p = document.createElement("p");
      p.id = id;
      p.className = "err";
      field.insertAdjacentElement("afterend", p);
    }
    p.textContent = msg;
    field.setAttribute("aria-invalid", "true");
    const db = (field.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
    if (!db.includes(id)) field.setAttribute("aria-describedby", [...db, id].join(" "));
  } else {
    p?.remove();
    if (!document.getElementById(`${field.id}-error`)) field.removeAttribute("aria-invalid");
    const db = (field.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== id);
    if (db.length) field.setAttribute("aria-describedby", db.join(" "));
    else field.removeAttribute("aria-describedby");
  }
}

function validateStep(set: HTMLElement): boolean {
  let firstBad: HTMLElement | null = null;
  set.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[name]").forEach((f) => {
    const rule = RULES[f.name];
    if (!rule) return;
    const msg = rule(f.value);
    fieldError(f, msg);
    if (msg && !firstBad) firstBad = f;
  });
  if (firstBad) (firstBad as HTMLElement).focus();
  return !firstBad;
}

function showStep(form: HTMLFormElement, i: number) {
  const sets = Array.from(form.querySelectorAll<HTMLElement>("[data-step]"));
  if (!sets.length || !form.hasAttribute("data-steps-ready")) return;
  sets.forEach((s, j) => (s.hidden = j !== i));
  form.dataset.current = String(i);
  form.querySelectorAll<HTMLElement>("[data-step-ind]").forEach((li, j) => {
    li.dataset.active = String(j === i);
    li.dataset.done = String(j < i);
    if (j === i) li.setAttribute("aria-current", "step");
    else li.removeAttribute("aria-current");
  });
  const back = form.querySelector<HTMLElement>("[data-step-back]");
  const next = form.querySelector<HTMLElement>("[data-step-next]");
  const submit = form.querySelector<HTMLElement>("[data-step-submit]");
  if (back) back.hidden = i === 0;
  if (next) next.hidden = i === sets.length - 1;
  if (submit) submit.hidden = i !== sets.length - 1;
}

function steppedForm(root: Root) {
  root.querySelectorAll<HTMLFormElement>("form[data-quote]").forEach((form) => {
    if (!once(form, "steps")) return;
    const sets = Array.from(form.querySelectorAll<HTMLElement>("[data-step]"));
    if (sets.length > 1) {
      form.setAttribute("data-steps-ready", "");
      form.querySelector<HTMLElement>("[data-steps-bar]")?.removeAttribute("hidden");
      form.querySelector<HTMLElement>("[data-step-nav]")?.removeAttribute("hidden");
      showStep(form, 0);
      form.querySelector("[data-step-next]")?.addEventListener("click", () => {
        const i = Number(form.dataset.current || "0");
        if (!validateStep(sets[i])) return;
        showStep(form, i + 1);
        sets[i + 1].querySelector<HTMLElement>("input,select,textarea")?.focus();
      });
      form.querySelector("[data-step-back]")?.addEventListener("click", () => {
        const i = Number(form.dataset.current || "0");
        showStep(form, Math.max(0, i - 1));
        sets[Math.max(0, i - 1)].querySelector<HTMLElement>("input,select,textarea")?.focus();
      });
    }
    // Clear a step error as soon as the field becomes valid (Baymard).
    form.addEventListener("input", (e) => {
      const f = e.target as HTMLInputElement;
      if (f.name && RULES[f.name] && document.getElementById(`${f.id}-verr`)) {
        fieldError(f, RULES[f.name](f.value));
      }
    });
    // After React/RHF validates on submit, jump to the first step with an error.
    form.addEventListener(
      "submit",
      (e) => {
        if (window.CMG_PREVIEW) {
          e.preventDefault();
          e.stopImmediatePropagation();
          let ok = true;
          sets.forEach((s, j) => {
            if (ok && !validateStep(s)) {
              ok = false;
              showStep(form, j);
            }
          });
          if (!sets.length) ok = validateStep(form);
          let msg = form.querySelector<HTMLElement>("[data-preview-msg]");
          if (!msg) {
            msg = document.createElement("p");
            msg.setAttribute("data-preview-msg", "");
            msg.setAttribute("role", "status");
            msg.className = "preview-msg";
            form.appendChild(msg);
          }
          msg.textContent = ok
            ? "Preview only: nothing was sent. On the live site this same form posts these same fields to the existing quote backend and opens the thank-you page."
            : "Preview only: fix the highlighted field to continue.";
          return;
        }
        window.setTimeout(() => {
          const bad = form.querySelector<HTMLElement>("[aria-invalid=true]");
          if (!bad) return;
          const j = sets.findIndex((s) => s.contains(bad));
          if (j >= 0) {
            showStep(form, j);
            bad.focus();
          }
        }, 60);
      },
      true
    );
    // Prefill from a service card link (?service=) or from the picker/estimator.
    const params = new URLSearchParams(window.location.search || (window.location.hash.split("?")[1] ?? ""));
    const svc = params.get("service");
    const sel = form.querySelector<HTMLSelectElement>("select[name=serviceType]");
    if (svc && sel && Array.from(sel.options).some((o) => o.value === svc)) setFieldValue(sel, svc);
    try {
      const pre = sessionStorage.getItem(PREFILL_KEY);
      if (pre) {
        sessionStorage.removeItem(PREFILL_KEY);
        window.setTimeout(() => addToDescription(pre), 0);
      }
    } catch {
      /* ignore */
    }
  });
}

/* ---------------------------- Service-area check ---------------------------- */
function zipCheck(root: Root) {
  root.querySelectorAll<HTMLFormElement>("[data-zipcheck]").forEach((f) => {
    if (!once(f, "zip")) return;
    const zips = (f.dataset.zips || "").split(",");
    const cities = JSON.parse(f.dataset.cities || "[]") as { name: string; href: string }[];
    const input = f.querySelector<HTMLInputElement>("input");
    const out = f.parentElement?.querySelector<HTMLElement>("[data-zip-result]");
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!input || !out) return;
      const v = input.value.trim();
      out.className = "zip-result";
      out.innerHTML = "";
      if (!v) {
        out.textContent = "Enter a 5-digit ZIP or your town name.";
        return;
      }
      const city = cities.find((c) => c.name.toLowerCase() === v.toLowerCase().replace(/,?\s*(tx|texas)$/, ""));
      if (/^\d{5}$/.test(v) && zips.includes(v)) {
        out.classList.add("ok");
        out.textContent = `Yes, ${v} is on our service list. Call or request a quote and we'll get you on the schedule.`;
      } else if (city) {
        out.classList.add("ok");
        out.append(`Yes, we serve ${city.name}. `);
        const a = document.createElement("a");
        a.href = city.href;
        a.className = "prose-link";
        a.textContent = `See junk removal in ${city.name}`;
        out.append(a);
      } else {
        out.classList.add("maybe");
        out.textContent = `${v} isn't on our published list, but we cover a wide radius around Tyler. Call to confirm and we'll tell you straight.`;
      }
    });
  });
}

/* ------------------------------ Hours status ------------------------------ */
function hoursStatus(root: Root) {
  root.querySelectorAll<HTMLElement>("[data-hours-status]").forEach((el) => {
    if (!once(el, "hrs")) return;
    try {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
      const wd = parts.find((p) => p.type === "weekday")?.value || "";
      const hr = Number(parts.find((p) => p.type === "hour")?.value || "0") % 24;
      const open = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(wd) ? hr >= 7 && hr < 18 : wd === "Sat" ? hr >= 8 && hr < 16 : false;
      const dot = el.querySelector(".dot");
      const txt = el.querySelector("[data-hours-text]");
      dot?.classList.toggle("open", open);
      if (txt) txt.textContent = open ? "Open now. Call and talk to a person." : "Closed right now. Send a quote request and we'll call you when we open.";
      el.hidden = false;
    } catch {
      /* leave hidden */
    }
  });
}

/* ------------------------------ Floating Gus ------------------------------ */
function floatingGus(root: Root) {
  root.querySelectorAll<HTMLElement>("[data-fgus]").forEach((box) => {
    if (!once(box, "fgus")) return;
    const btn = box.querySelector<HTMLButtonElement>("button");
    const pop = box.querySelector<HTMLElement>("[data-fgus-pop]");
    if (!btn || !pop) return;
    const set = (o: boolean) => {
      btn.setAttribute("aria-expanded", String(o));
      pop.hidden = !o;
    };
    btn.addEventListener("click", () => set(pop.hidden));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !pop.hidden) {
        set(false);
        btn.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target as Node)) set(false);
    });
  });
}

export function enhance(root: Root = document) {
  header(root);
  beforeAfter(root);
  estimator(root);
  prefillLinks(root);
  picker(root);
  steppedForm(root);
  zipCheck(root);
  hoursStatus(root);
  floatingGus(root);
  reveal(root);
}
