import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Reveal } from "@/components/ui/Reveal";
import { BEFORE_AFTER } from "@/lib/images";

/** Interactive before/after showcase of real (placeholder) jobs. */
export function BeforeAfter() {
  return (
    <section className="bg-white dark:bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="See the Difference"
            heading="Before & After"
            subtext="Drag the slider to see what a clean space really looks like. Real results from real East Texas homes."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <BeforeAfterSlider pairs={[...BEFORE_AFTER]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
