import Link from "next/link";
import { Plus, Check, ArrowRight } from "lucide-react";
import { PICK_ITEMS } from "@/lib/m7-content";

/** Interactive "what we take" picker. Selected items are added to the quote form description. */
export function WhatWeTake({ quoteHref = "/#quote" }: { quoteHref?: string }) {
  return (
    <section id="what-we-take" className="band band-muted" aria-labelledby="take-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">We Take Almost Everything</p>
          <h2 id="take-h" className="display h-sec">Tap What Needs to Go</h2>
          <p className="lede">Build your list and we&apos;ll drop it straight into your quote request. No job too big or too small.</p>
        </div>
        <div className="take reveal" data-picker>
          <div>
            <div className="chips" role="group" aria-label="Items to haul">
              {PICK_ITEMS.map((it) => (
                <button key={it} type="button" className="chip" aria-pressed="false" data-pick={it}>
                  <Plus className="pl" aria-hidden="true" />
                  <Check className="ck" aria-hidden="true" />
                  {it}
                </button>
              ))}
            </div>
            <p className="no-take">
              <strong>What we can&apos;t take:</strong> hazardous materials like paint, chemicals, or asbestos.
              Just ask and we&apos;ll point you in the right direction.
            </p>
          </div>
          <aside className="take-cart" aria-labelledby="cart-h">
            <h3 id="cart-h" className="display" style={{ fontSize: "1.6rem" }}>
              Your List (<span data-pick-count>0</span>)
            </h3>
            <p className="empty muted-text" data-pick-empty>Nothing yet. Tap items on the left.</p>
            <ol data-pick-list hidden />
            <p className="sr-only" aria-live="polite" data-pick-live />
            <Link className="btn btn-accent mt-m" style={{ width: "100%" }} href={quoteHref} data-pick-add aria-disabled="true">
              Add to My Quote <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
