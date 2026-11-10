import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, ClipboardList } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/** Sticky mobile Call | Get Quote bar (M7 item 15). Height reserved by .mbar-spacer. */
export function MobileBar() {
  return (
    <>
      <div className="mbar-spacer" aria-hidden="true" />
      <nav className="mbar" aria-label="Quick contact">
        <a className="c" href={`tel:${PHONE_TEL}`} aria-label={`Call now, ${PHONE_DISPLAY}`}>
          <Phone aria-hidden="true" /> Call Now
        </a>
        <Link className="q" href="/quote">
          <ClipboardList aria-hidden="true" /> Get Quote
        </Link>
      </nav>
    </>
  );
}

/** Desktop floating "Call or text Gus" button. Opens a small panel; no fake live chat. */
export function FloatingGus() {
  return (
    <div className="fgus" data-fgus>
      <div className="fgus-pop" id="fgus-pop" data-fgus-pop hidden>
        <p><strong>Gus Morales</strong>, Sales / Manager. He&apos;s usually the voice you&apos;ll hear when you call.</p>
        <a className="btn btn-accent" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
        <a className="btn btn-outline" href={`sms:${PHONE_TEL}`}><MessageSquare aria-hidden="true" /> Text a photo</a>
        <Link className="btn btn-ink" href="/quote">Request a quote online</Link>
      </div>
      <button type="button" className="fgus-btn" aria-expanded="false" aria-controls="fgus-pop">
        <Image src="/photos/gus.jpg" alt="" width={44} height={44} sizes="44px" />
        <span>
          <span className="l1">Questions?</span>
          <span className="l2">Call or text Gus</span>
        </span>
      </button>
    </div>
  );
}
