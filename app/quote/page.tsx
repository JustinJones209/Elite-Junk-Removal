import type { Metadata } from "next";
import { Phone, Clock, Handshake } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free, no-obligation junk removal quote from Call Me Gone Junk Removal. Serving Tyler and all of East Texas with same-day service.",
  alternates: { canonical: "/quote" },
};

const points = [
  { icon: Clock, text: "Same-day service available" },
  { icon: Handshake, text: "Careful, respectful crew" },
  { icon: Phone, text: "Fast, honest, upfront pricing" },
];

export default function QuotePage() {
  return (
    <div className="bg-gray-light">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: pitch */}
          <div>
            <h1 className="font-heading text-4xl font-800 leading-tight text-ink dark:text-white md:text-5xl">
              Get Your Free Quote
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-white/70">
              Fill out the form and we&apos;ll get back to you quickly with an
              honest price — no obligation, no pressure. Prefer to talk? Give us
              a call.
            </p>

            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-6 inline-flex items-center gap-2 font-heading text-xl font-700 text-gold transition-colors hover:text-gold-dark"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <ul className="mt-8 space-y-3">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gray-700 dark:text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-600">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div>
            <QuoteForm variant="full" />
          </div>
        </div>

        <div className="mt-14 border-t border-gray-200 dark:border-white/10 pt-8">
          <TrustBadgeRow />
        </div>
      </div>
    </div>
  );
}
