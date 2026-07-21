import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FounderStory } from "@/components/sections/FounderStory";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <BeforeAfter />
      <WhyChooseUs />
      <FounderStory />
      <Testimonials />
      <ServiceArea />

      {/* Inline (lighter) quote form */}
      <section id="quote" className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="text-white">
                <SectionHeading
                  light
                  centered={false}
                  kicker="Get Started"
                  heading="Get Your Free Quote in Minutes"
                  subtext="Tell us what you need gone and we'll get right back to you with an honest, upfront price."
                />
                <div className="mt-8">
                  <TrustBadgeRow light className="justify-start" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <QuoteForm variant="compact" />
            </Reveal>
          </div>
        </div>
      </section>

      <FAQPreview />
      <FinalCTA />
    </>
  );
}
