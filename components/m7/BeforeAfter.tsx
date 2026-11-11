import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { BEFORE_AFTER } from "@/lib/images";

/** Order Justin asked for: storage unit, yard debris, garage. */
const ORDER = ["Storage Unit Cleanout", "Yard Debris Haul", "Garage Cleanout"] as const;
const SHORT: Record<string, string> = {
  "Storage Unit Cleanout": "Storage Unit",
  "Yard Debris Haul": "Yard Debris",
  "Garage Cleanout": "Garage",
};
const JOBS = ORDER.map((l) => BEFORE_AFTER.find((p) => p.label === l)!).filter(Boolean);

/**
 * Full-bleed before/after slider. The job switcher is a segmented strip that
 * sits ON the slider (no side column). Each job is its own pair of layers, so
 * Next serves responsive images; hidden pairs lazy-load when picked. A native
 * range input drives the clip, so it works by touch, mouse and keyboard.
 */
export function BeforeAfter({ id = "before-after" }: { id?: string }) {
  return (
    <section id={id} className="band band-muted ba-band" aria-labelledby="ba-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Before &amp; After</p>
          <h2 id="ba-h" className="display h-sec">See It Gone. Drag the Slider.</h2>
          <p className="lede">See the difference a haul-off makes — storage units, yard debris, and garages. Pick one, then slide to compare.</p>
        </div>
      </div>
      <div className="ba-full reveal" data-ba>
        <div className="ba-stage" style={{ ["--pos" as string]: "50%" }}>
          {JOBS.map((p, i) => (
            <div key={p.label} className="ba-pair-layer" data-ba-layer={i} hidden={i !== 0}>
              <Image src={p.afterSrc} alt={p.afterAlt} fill sizes="100vw" />
              <Image className="ba-before" src={p.beforeSrc} alt={p.beforeAlt} fill sizes="100vw" />
            </div>
          ))}
          <div className="ba-tabs" role="group" aria-label="Choose a cleanout to compare">
            {JOBS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                className="ba-tab"
                aria-pressed={i === 0}
                aria-label={`Show ${p.label} before and after`}
                data-ba-pick={i}
                data-label={p.label}
              >
                {SHORT[p.label]}
              </button>
            ))}
          </div>
          <span className="ba-tag l">Before</span>
          <span className="ba-tag r">After</span>
          <span className="ba-handle" aria-hidden="true"><span className="ba-knob"><MoveHorizontal aria-hidden="true" /></span></span>
          <input
            className="ba-range"
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            aria-label={`Before and after comparison, ${JOBS[0].label}: slide to reveal the before photo`}
          />
        </div>
        <div className="wrap">
          <p className="ba-hint muted-text" aria-live="polite">
            <MoveHorizontal size={18} aria-hidden="true" /> <strong data-ba-caption>{JOBS[0].label}</strong> · drag, swipe, or use arrow keys
          </p>
        </div>
      </div>
    </section>
  );
}
