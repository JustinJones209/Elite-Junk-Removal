import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for reaching out to Call Me Gone Junk Removal. We've received your request and will be in touch shortly.",
  // Keep confirmation pages out of search results.
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center bg-gray-light px-4 py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <CheckCircle2 className="h-11 w-11 text-gold" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-4xl font-800 text-ink md:text-5xl">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;ve received your request and Gus&apos;s team will be in
          touch shortly with your free quote. Need us fast? Give us a call and
          we&apos;ll do our best to get you same-day service.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call Now — {PHONE_DISPLAY}
          </CTAButton>
          <CTAButton href="/" variant="secondary" size="lg">
            Back to Home
          </CTAButton>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          In the meantime, have a question?{" "}
          <Link href="/faq" className="font-600 text-gold hover:underline">
            Check our FAQ
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
