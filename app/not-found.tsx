import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata = { title: "Page Not Found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="page-hero on-dark">
      <div className="wrap">
        <h1 className="page-h1">Page not found</h1>
        <h2 className="display h-hero" style={{ marginTop: 14 }}>This Page Is Already Gone</h2>
        <div className="btn-row">
          <a className="btn btn-accent btn-lg" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a>
          <Link className="btn btn-outline-light btn-lg" href="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
