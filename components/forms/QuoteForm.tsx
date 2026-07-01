"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { submitQuote } from "@/app/actions";
import {
  quoteSchema,
  SERVICE_TYPES,
  type QuoteFormValues,
} from "@/lib/quote-schema";

interface QuoteFormProps {
  /**
   * "compact" hides the optional photo/date fields and uses a single column —
   * meant for the inline homepage embed. "full" is the dedicated /quote page.
   */
  variant?: "full" | "compact";
}

const inputBase =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/30 aria-[invalid=true]:border-red-500";

export function QuoteForm({ variant = "full" }: QuoteFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const isFull = variant === "full";

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
    const result = await submitQuote(values);
    if (result.success) {
      router.push("/thank-you");
    } else {
      setFormError(result.message);
    }
  };

  /** Small helper to render a field's error message with a11y wiring. */
  const errorFor = (name: keyof QuoteFormValues) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
        {errors[name]?.message as string}
      </p>
    ) : null;

  const describedBy = (name: keyof QuoteFormValues) =>
    errors[name] ? `${name}-error` : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className={`grid gap-5 ${isFull ? "sm:grid-cols-2" : ""}`}>
        {/* Name */}
        <div className={isFull ? "" : ""}>
          <label htmlFor="name" className="mb-1.5 block font-600 text-navy">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputBase}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
          {errorFor("name")}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-600 text-navy">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(903) 555-0100"
            className={inputBase}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            {...register("phone")}
          />
          {errorFor("phone")}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block font-600 text-navy">
            Email <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputBase}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
          {errorFor("email")}
        </div>

        {/* ZIP */}
        <div>
          <label htmlFor="zip" className="mb-1.5 block font-600 text-navy">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            id="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="75701"
            maxLength={5}
            className={inputBase}
            aria-invalid={!!errors.zip}
            aria-describedby={describedBy("zip")}
            {...register("zip")}
          />
          {errorFor("zip")}
        </div>

        {/* Service type */}
        <div className={isFull ? "sm:col-span-2" : ""}>
          <label htmlFor="serviceType" className="mb-1.5 block font-600 text-navy">
            Service Type <span className="text-red-500">*</span>
          </label>
          <select
            id="serviceType"
            defaultValue=""
            className={inputBase}
            aria-invalid={!!errors.serviceType}
            aria-describedby={describedBy("serviceType")}
            {...register("serviceType")}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errorFor("serviceType")}
        </div>

        {/* Preferred date (full only) */}
        {isFull && (
          <div className="sm:col-span-2">
            <label htmlFor="preferredDate" className="mb-1.5 block font-600 text-navy">
              Preferred Date <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="preferredDate"
              type="date"
              className={inputBase}
              {...register("preferredDate")}
            />
          </div>
        )}

        {/* Description */}
        <div className={isFull ? "sm:col-span-2" : ""}>
          <label htmlFor="description" className="mb-1.5 block font-600 text-navy">
            What needs to go? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={isFull ? 4 : 3}
            placeholder="e.g. Old couch, mattress, and a few boxes from the garage."
            className={`${inputBase} resize-y`}
            aria-invalid={!!errors.description}
            aria-describedby={describedBy("description")}
            {...register("description")}
          />
          {errorFor("description")}
        </div>

        {/* Photo upload (full only, optional) */}
        {isFull && (
          <div className="sm:col-span-2">
            <label htmlFor="photo" className="mb-1.5 block font-600 text-navy">
              Add a Photo <span className="text-gray-400">(optional)</span>
            </label>
            {/*
              TODO(launch): This file input is intentionally NOT wired to the
              Server Action yet. To support uploads, switch submission to a
              FormData flow and stream the file to object storage
              (Vercel Blob / S3 / UploadThing), then include the URL in the lead.
            */}
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-safety-orange file:px-4 file:py-2 file:font-600 file:text-white hover:file:bg-safety-orange-dark"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              A photo helps us give you a faster, more accurate quote.
            </p>
          </div>
        )}
      </div>

      {/* Form-level error */}
      {formError && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <div className="mt-6">
        <CTAButton type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Get My Free Quote"
          )}
        </CTAButton>
        <p className="mt-3 text-center text-xs text-gray-400">
          No obligation. We&apos;ll only use your info to prepare your quote.
        </p>
      </div>
    </form>
  );
}
