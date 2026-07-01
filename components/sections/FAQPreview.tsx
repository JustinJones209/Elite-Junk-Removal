import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/lib/site";

/** Condensed FAQ accordion with a link to the full /faq page. */
export function FAQPreview() {
  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Questions"
            heading="Frequently Asked Questions"
            subtext="Everything you need to know before you book. Still curious? Give us a call."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            {/* Show the first five on the homepage; full list lives at /faq */}
            <FAQAccordion faqs={FAQS.slice(0, 5)} />
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 font-heading font-700 text-safety-orange transition-colors hover:text-safety-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safety-orange"
              >
                See all FAQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
