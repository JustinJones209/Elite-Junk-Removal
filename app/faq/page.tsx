import type { Metadata } from "next";
import { FAQS } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero, ClosingCTA } from "@/components/m7/Bands";
import { FAQList } from "@/components/m7/FAQList";

export const metadata: Metadata = {
  title: "Junk Removal FAQ for Tyler, TX",
  description:
    "Answers about junk removal in Tyler and East Texas: what it costs, what we take, how fast we can come, discounts, and where your junk goes.",
  alternates: { canonical: "/faq" },
};

// FAQPage JSON-LD mirrors the visible Q&A exactly.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero
        h1="Junk Removal FAQ for Tyler, TX"
        title="Frequently Asked Questions"
        lede="Everything you need to know about junk removal with Call Me Gone. Don't see your question? Give us a call. We're happy to help."
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
      />
      <section className="band band-white" aria-label="Questions and answers">
        <div className="wrap">
          <FAQList faqs={FAQS} />
        </div>
      </section>
      <ClosingCTA heading="Still Have Questions? We're a Call Away." />
    </>
  );
}
