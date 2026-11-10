"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { submitQuote } from "@/app/actions";
import {
  quoteSchema,
  SERVICE_TYPES,
  type QuoteFormValues,
} from "@/lib/quote-schema";

interface QuoteFormProps {
  /**
   * "compact" hides the optional photo/date fields — meant for the inline
   * homepage embed. "full" is the dedicated /quote page.
   */
  variant?: "full" | "compact";
}

/**
 * Quote request form. Submission is unchanged: same fields, same
 * submitQuote Server Action, same /thank-you redirect. The 3-step layout is
 * progressive enhancement (lib/enhance.ts hides steps 2-3 and adds Next/Back);
 * without JS every field shows in one plain column.
 */
export function QuoteForm({ variant = "full" }: QuoteFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const isFull = variant === "full";
  const p = isFull ? "q" : "hq"; // unique ids when two forms could exist

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      zip: "",
      serviceType: undefined,
      description: "",
      preferredDate: "",
    },
  });

  const onSubmit = async (values: QuoteFormValues) => {
    setFormError(null);
    try {
      const result = await submitQuote(values);
      if (result.success) {
        router.push("/thank-you");
      } else {
        setFormError(result.message);
      }
    } catch {
      // Covers transport-level failures (e.g. a stale build's Server Action
      // no longer matching the deployed server).
      setFormError(
        "Something went wrong sending your request. Please call us instead or try again after refreshing the page."
      );
    }
  };

  const errorFor = (name: keyof QuoteFormValues) =>
    errors[name] ? (
      <p id={`${p}-${name}-error`} role="alert" className="err">
        {errors[name]?.message as string}
      </p>
    ) : null;

  const describedBy = (name: keyof QuoteFormValues, help?: string) =>
    [errors[name] ? `${p}-${name}-error` : "", help || ""].filter(Boolean).join(" ") || undefined;

  const id = (name: string) => `${p}-${name}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="paper" data-quote aria-label="Free quote request">
      <ol className="steps-bar" data-steps-bar hidden>
        <li data-step-ind>1. The job</li>
        <li data-step-ind>2. Where{isFull ? " & when" : ""}</li>
        <li data-step-ind>3. Your info</li>
      </ol>

      <fieldset data-step>
        <legend>What needs to go?</legend>
        <div className="fld">
          <label htmlFor={id("serviceType")}>Service type <span className="req">(required)</span></label>
          <select
            id={id("serviceType")}
            defaultValue=""
            className="inp"
            aria-invalid={!!errors.serviceType}
            aria-describedby={describedBy("serviceType")}
            {...register("serviceType")}
          >
            <option value="" disabled>Select a service…</option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errorFor("serviceType")}
        </div>
        <div className="fld">
          <label htmlFor={id("description")}>Describe the items <span className="req">(required)</span></label>
          <textarea
            id={id("description")}
            rows={isFull ? 5 : 4}
            placeholder="e.g. Old couch, mattress, and a few boxes from the garage."
            className="inp"
            aria-invalid={!!errors.description}
            aria-describedby={describedBy("description", id("description-help"))}
            {...register("description")}
          />
          <p id={id("description-help")} className="help">Tip: use the item picker or load-size slider and we&apos;ll fill this in for you.</p>
          {errorFor("description")}
        </div>
        {isFull && (
          <div className="fld">
            <label htmlFor={id("photo")}>Add a photo <span className="req">(optional)</span></label>
            {/*
              TODO(launch): This file input is intentionally NOT wired to the
              Server Action (same as the current site).
            */}
            <input id={id("photo")} name="photo" type="file" accept="image/*" className="inp" />
            <p className="help">A photo helps us give you a faster, more accurate quote.</p>
          </div>
        )}
      </fieldset>

      <fieldset data-step>
        <legend>Where{isFull ? " & when" : ""}?</legend>
        <div className="fld">
          <label htmlFor={id("zip")}>ZIP code <span className="req">(required)</span></label>
          <input
            id={id("zip")}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="75701"
            maxLength={5}
            className="inp"
            aria-invalid={!!errors.zip}
            aria-describedby={describedBy("zip")}
            {...register("zip")}
          />
          {errorFor("zip")}
        </div>
        {isFull && (
          <div className="fld">
            <label htmlFor={id("preferredDate")}>Preferred date <span className="req">(optional)</span></label>
            <input id={id("preferredDate")} type="date" className="inp" {...register("preferredDate")} />
          </div>
        )}
      </fieldset>

      <fieldset data-step>
        <legend>How do we reach you?</legend>
        <div className="fld">
          <label htmlFor={id("name")}>Name <span className="req">(required)</span></label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            className="inp"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
          {errorFor("name")}
        </div>
        <div className="fld">
          <label htmlFor={id("phone")}>Phone <span className="req">(required)</span></label>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="(903) 555-0100"
            className="inp"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone", id("phone-help"))}
            {...register("phone")}
          />
          <p id={id("phone-help")} className="help">We call you back with your price, so we need a number.</p>
          {errorFor("phone")}
        </div>
        <div className="fld">
          <label htmlFor={id("email")}>Email <span className="req">(optional)</span></label>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            className="inp"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
          {errorFor("email")}
        </div>
      </fieldset>

      {formError && (
        <div role="alert" className="form-alert">
          <AlertCircle size={18} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginRight: 6 }} />
          {formError}
        </div>
      )}

      <div className="step-nav" data-step-nav hidden>
        <button type="button" className="btn btn-outline" data-step-back hidden>
          <ArrowLeft aria-hidden="true" /> Back
        </button>
        <button type="button" className="btn btn-ink" data-step-next>
          Next <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <div style={{ marginTop: 20 }} data-step-submit>
        <button type="submit" className="btn btn-accent btn-lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            "Get My Free Quote"
          )}
        </button>
      </div>
      <p className="form-note">No obligation. We&apos;ll only use your info to prepare your quote. We call back during business hours.</p>
    </form>
  );
}
