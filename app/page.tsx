import { Hero } from "@/components/m7/Hero";
import { Services } from "@/components/m7/Services";
import { BeforeAfter } from "@/components/m7/BeforeAfter";
import { PricingBand } from "@/components/m7/Pricing";
import { UrgencyBand, WhyUs, MeetGus, Reviews, Process, ClosingCTA } from "@/components/m7/Bands";
import { WhatWeTake } from "@/components/m7/WhatWeTake";
import { ServiceAreaSection } from "@/components/m7/ServiceAreaSection";
import { FAQList } from "@/components/m7/FAQList";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { FAQS, PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";
import Link from "next/link";
import { Phone, Check } from "lucide-react";

/*
 * M7 Gen 2 home page. Band rhythm:
 * hero(photo) → white → muted → white → DARK → muted → white(Gus) → muted →
 * white → muted → white → muted → white → ACCENT → dark footer.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <BeforeAfter />
      <PricingBand />
      <UrgencyBand />
      <WhyUs />
      <MeetGus />
      <Reviews />
      <Process />
      <WhatWeTake />

      <section id="quote" className="band band-white" aria-labelledby="quote-h">
        <div className="wrap quote">
          <div className="reveal">
            <p className="eyebrow">Get Started</p>
            <h2 id="quote-h" className="display h-sec" style={{ marginTop: 14 }}>Get Your Free Quote in Minutes</h2>
            <p className="lede mt-s">
              Tell us what you need gone and we&apos;ll get right back to you with an honest, upfront price.
              Three quick steps. Prefer to talk? Call {BUSINESS.manager.split(" ")[0]}.
            </p>
            <a className="btn btn-accent btn-lg mt-m" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> {PHONE_DISPLAY}</a>
            <ul className="check-list mt-m">
              <li><Check aria-hidden="true" /> Same-day service available</li>
              <li><Check aria-hidden="true" /> Free estimates, no obligation</li>
              <li><Check aria-hidden="true" /> Exact price confirmed before we lift a thing</li>
            </ul>
            <p className="mt-m muted-text">Want the full form with a photo and preferred date? <Link className="prose-link" href="/quote">Use the quote page</Link>.</p>
          </div>
          <div className="reveal">
            <QuoteForm variant="compact" />
          </div>
        </div>
      </section>

      <ServiceAreaSection />

      <section id="faq" className="band band-white" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Questions?</p>
            <h2 id="faq-h" className="display h-sec">Junk Removal Questions, Answered</h2>
          </div>
          <div className="reveal"><FAQList faqs={FAQS.slice(0, 5)} /></div>
          <p className="mt-m"><Link className="btn btn-outline" href="/faq">See All FAQs</Link></p>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
