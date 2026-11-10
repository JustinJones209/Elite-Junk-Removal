import type { Metadata } from "next";
import { EMAIL, PHONE_DISPLAY, BUSINESS } from "@/lib/site";
import { PageHero } from "@/components/m7/Bands";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Call Me Gone Junk Removal uses the information you send through the quote form.",
  alternates: { canonical: "/privacy" },
};

// TODO(launch): Have Richard review this plain-language notice before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero h1="Privacy Policy" title="Your Info Stays With Us" showCtas={false} crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
      <section className="band band-white">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="lede">
            When you request a quote, {BUSINESS.name} receives the details you type into the form: your name, phone,
            optional email, ZIP code, the service type, your description, and an optional preferred date. We use them
            only to prepare your quote and contact you about your job. We don&apos;t sell or share them.
          </p>
          <p className="lede mt-m">
            Questions or want your info deleted? Call {PHONE_DISPLAY} or email{" "}
            <a className="prose-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
