import Link from "next/link";
import { Phone } from "lucide-react";
import { LOAD_STEPS } from "@/lib/m7-content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const TRAILER_W = 520;

/**
 * Load-size estimator ("what fits in the trailer"). Prices come only from
 * lib/pricing.ts tiers; 3/4 load says call for exact quote. Server-rendered
 * on the half-load step so it reads correctly with no JS.
 */
export function Estimator({ quoteHref = "/#quote" }: { quoteHref?: string }) {
  const start = 2;
  const s = LOAD_STEPS[start];
  const fillMax = TRAILER_W - 40;
  return (
    <div className="est reveal" data-estimator={JSON.stringify(LOAD_STEPS)}>
      <div className="est-panel">
        <p className="eyebrow">Our 14-foot dump trailer</p>
        <div className="est-trailer" aria-hidden="true">
          <svg viewBox={`0 0 ${TRAILER_W} 190`} role="presentation">
            <rect x="16" y="20" width={TRAILER_W - 32} height="120" fill="#fff" stroke="#161616" strokeWidth="4" />
            <rect data-est-fill data-max={fillMax} x="20" y="24" width={(fillMax * s.fill) / 100} height="112" fill="#c8890a" className="est-fill" />
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={20 + fillMax * f} y1="24" x2={20 + fillMax * f} y2="136" stroke="#161616" strokeOpacity=".25" strokeDasharray="5 6" strokeWidth="2" />
            ))}
            <rect x="0" y="140" width={TRAILER_W} height="10" fill="#161616" />
            <circle cx={TRAILER_W * 0.62} cy="165" r="22" fill="#161616" />
            <circle cx={TRAILER_W * 0.62} cy="165" r="8" fill="#f2f3f5" />
            <circle cx={TRAILER_W * 0.76} cy="165" r="22" fill="#161616" />
            <circle cx={TRAILER_W * 0.76} cy="165" r="8" fill="#f2f3f5" />
          </svg>
        </div>
        <label htmlFor="est-range" className="sr-only">How full is your load?</label>
        <input
          id="est-range"
          className="est-range"
          type="range"
          min={0}
          max={LOAD_STEPS.length - 1}
          step={1}
          defaultValue={start}
          data-est-range
          aria-valuetext={`${s.label}: ${s.prefix} ${s.price}`}
        />
        <div className="est-steps" role="radiogroup" aria-label="Load size">
          {LOAD_STEPS.map((st, i) => (
            <button key={st.short} type="button" role="radio" className="est-step" aria-checked={i === start} data-est-step>
              {st.short}
            </button>
          ))}
        </div>
        <p className="help" style={{ marginTop: 14 }}>Drag the slider or tap a size. Not sure? Pick the closest and we&apos;ll confirm on site.</p>
      </div>
      <div className="est-out" aria-live="polite">
        <div>
          <p className="lbl">Your load</p>
          <p className="size" data-est-size>{s.label}</p>
          <p className="lbl" style={{ marginTop: 18 }} data-est-prefix>{s.prefix}</p>
          <p className="price" data-est-price>{s.price}</p>
          <p className="ex" data-est-ex>{s.examples}</p>
        </div>
        <div>
          <p className="fine">
            Final price depends on volume, weight, and material. We always confirm the exact number with you
            before we start. No obligation.
          </p>
          <div className="btn-row">
            <Link className="btn btn-accent" href={quoteHref} data-prefill-link data-est-go data-prefill={`Load size: ${s.hint}. `}>
              Get This Quote
            </Link>
            <a className="btn btn-outline-light" href={`tel:${PHONE_TEL}`}>
              <Phone aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
