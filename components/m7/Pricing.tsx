import Link from "next/link";
import { PRICING_TIERS } from "@/lib/pricing";
import { Estimator } from "@/components/m7/Estimator";

/** Cost-to-action pricing band: estimator + the three published tiers. */
export function PricingBand() {
  return (
    <section id="pricing" className="band band-white" aria-labelledby="price-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Upfront Pricing</p>
          <h2 id="price-h" className="display h-sec">What Will My Load Cost?</h2>
          <p className="lede">
            We price by how much space your junk takes up in our trailer. Slide to your load size and see
            our published starting prices, then lock in your exact number.
          </p>
        </div>
        <Estimator />
        <PriceLadder className="mt-l" />
        <p className="mt-m muted-text">
          10% off for military, first responders, seniors (65+), and repeat customers.{" "}
          <Link className="prose-link" href="/pricing">See full pricing &amp; discounts</Link>
        </p>
      </div>
    </section>
  );
}

export function PriceLadder({ className = "" }: { className?: string }) {
  const nums = [50, 175, 750];
  return (
    <div className={`ladder reveal ${className}`}>
      {PRICING_TIERS.map((t, i) => (
        <div key={t.label} className={`rung ${i === 2 ? "big" : ""}`}>
          <p className="k">{t.label}</p>
          <span className="pfx">{t.priceFrom.replace(/\$\d+/, "").trim()}</span>
          <p className="p display"><span data-count={nums[i]} data-prefix="$">${nums[i]}</span></p>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}
