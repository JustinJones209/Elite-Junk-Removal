import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/site";

/**
 * 4-step process. Horizontal with a connecting line on desktop; a vertical
 * stepper on mobile.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="How It Works"
            heading="Junk Gone in 4 Simple Steps"
            subtext="No hassle, no surprises. Here's exactly what to expect when you book with us."
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting line (desktop only) */}
          <div
            className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gold/20 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08}>
                <ProcessStep
                  number={i + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
