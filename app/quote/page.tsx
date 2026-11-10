import type { Metadata } from "next";
import { Phone, Check } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Junk Removal Quote in Tyler, TX",
  description:
    "Request a free, no-obligation junk removal quote from Call Me Gone Junk Removal. Serving Tyler and all of East Texas with same-day service available.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="band band-muted" aria-labelledby="qp-h">
      <div className="wrap quote">
        <div>
          <h1 className="page-h1 eyebrow">Free Junk Removal Quote in Tyler, TX</h1>
          <h2 id="qp-h" className="display h-hero" style={{ marginTop: 16 }}>Get Your Free Quote</h2>
          <p className="lede mt-m">
            Fill out the form and we&apos;ll get back to you quickly with an honest price. No obligation, no
            pressure. Prefer to talk? Give {BUSINESS.manager.split(" ")[0]} a call.
          </p>
          <a className="btn btn-accent btn-lg mt-m" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> {PHONE_DISPLAY}</a>
          <ul className="check-list mt-m">
            <li><Check aria-hidden="true" /> Same-day service available</li>
            <li><Check aria-hidden="true" /> Careful, respectful crew</li>
            <li><Check aria-hidden="true" /> Fast, honest, upfront pricing</li>
          </ul>
          <p className="mt-m muted-text">{BUSINESS.hours}</p>
        </div>
        <div>
          <QuoteForm variant="full" />
        </div>
      </div>
    </section>
  );
}
