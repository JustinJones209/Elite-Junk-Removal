import { Recycle, Zap, FileText, MapPin, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Zap,
    title: "Fast Scheduling",
    description:
      "Need it gone fast? Call early and we'll do our best to fit you in the same day.",
  },
  {
    icon: FileText,
    title: "Free, No-Obligation Estimates",
    description: "Honest, upfront pricing before we lift a thing. No pressure.",
  },
  {
    icon: MapPin,
    title: "Locally Owned & Operated",
    description: "A trusted East Texas neighbor — not a faceless franchise.",
  },
  {
    icon: Recycle,
    title: "Responsible Disposal",
    description: "We donate and recycle whatever we can to keep it out of the landfill.",
  },
];

/** Dark trust section highlighting the four core reasons to choose us. */
export function WhyChooseUs() {
  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            light
            kicker="Why Choose Us"
            heading="A Junk Removal Crew You Can Trust"
            subtext="We built our reputation on showing up, working hard, and doing right by every customer."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <pillar.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-700 text-white">
                  {pillar.title}
                </h3>
                <p className="text-white/70">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
