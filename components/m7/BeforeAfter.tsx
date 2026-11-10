import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { BEFORE_AFTER } from "@/lib/images";

/**
 * Before/after slider (kept as the centerpiece). Native range input drives a
 * clip-path, so it is keyboard and screen-reader accessible with no library.
 */
export function BeforeAfter({ id = "before-after" }: { id?: string }) {
  const first = BEFORE_AFTER[0];
  return (
    <section id={id} className="band band-muted" aria-labelledby="ba-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Real East Texas Jobs</p>
          <h2 id="ba-h" className="display h-sec">See It Gone. Drag the Slider.</h2>
          <p className="lede">Real Call Me Gone jobs, photographed before and after. Slide to compare.</p>
        </div>
        <div className="ba reveal" data-ba>
          <div>
            <div className="ba-stage" style={{ ["--pos" as string]: "50%" }}>
              <Image data-ba-after src={first.afterSrc} alt={first.afterAlt} fill sizes="(min-width:1024px) 60vw, 100vw" />
              <Image data-ba-before className="ba-before" src={first.beforeSrc} alt={first.beforeAlt} fill sizes="(min-width:1024px) 60vw, 100vw" />
              <span className="ba-tag l">Before</span>
              <span className="ba-tag r">After</span>
              <span className="ba-handle" aria-hidden="true"><span className="ba-knob"><MoveHorizontal aria-hidden="true" /></span></span>
              <input className="ba-range" type="range" min={0} max={100} defaultValue={50} aria-label="Before and after comparison: slide to reveal the before photo" />
            </div>
            <p className="ba-hint muted-text"><MoveHorizontal size={18} aria-hidden="true" /> <span data-ba-caption>{first.label}</span> · drag, swipe, or use arrow keys</p>
          </div>
          <div className="ba-pairs" role="group" aria-label="Choose a job">
            {BEFORE_AFTER.map((p, i) => (
              <button
                key={p.label}
                type="button"
                className="ba-pair"
                aria-pressed={i === 0}
                data-ba-pick
                data-before={p.beforeSrc}
                data-after={p.afterSrc}
                data-before-alt={p.beforeAlt}
                data-after-alt={p.afterAlt}
                data-label={p.label}
              >
                <Image src={p.afterSrc} alt="" width={96} height={72} sizes="96px" />
                <span>
                  <span className="t">{p.label}</span>
                  <span className="s muted-text" style={{ display: "block", marginTop: 4 }}>Tap to compare before &amp; after</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
