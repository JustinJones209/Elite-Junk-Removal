import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTAButton } from "@/components/ui/CTAButton";
import { breadcrumbSchema } from "@/lib/schema";
import { FAQS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Call Me Gone Junk Removal — pricing, what we take, how fast we can come out, and responsible disposal across East Texas.",
  alternates: { canonical: "/faq" },
};

// FAQPage structured data for rich results.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FAQPage() {
  return (
    <div className="bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Header */}
      <div className="bg-gray-light">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-sm font-600 uppercase tracking-widest text-gold">
            Questions
          </p>
          <h1 className="font-heading text-4xl font-800 text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Everything you need to know about junk removal with Call Me Gone. Don&apos;t
            see your question? Give us a call — we&apos;re happy to help.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <FAQAccordion faqs={FAQS} />

        {/* CTA */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-ink-dark p-8 text-center">
          <h2 className="font-heading text-2xl font-700 text-white">
            Still have questions?
          </h2>
          <p className="mt-2 text-white/80">
            We&apos;re a call away and happy to talk through your project.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </CTAButton>
            <CTAButton href="/quote" variant="ghost" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
