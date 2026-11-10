import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/m7/Header";
import { Footer } from "@/components/m7/Footer";
import { MobileBar, FloatingGus } from "@/components/m7/MobileBar";
import { Enhancer } from "@/components/m7/Enhancer";
import { SITE_URL, PHONE_TEL, EMAIL, BUSINESS, SERVICE_AREAS, SOCIALS, SERVICES } from "@/lib/site";

// M7: heavy condensed uppercase display + clean humanist body. 3 weights total.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "600"], display: "swap" });

const DESCRIPTION =
  "Junk removal in Tyler, TX and East Texas. Single items from $50, partial trailer loads from $175. Same-day service available, free estimates. Call (903) 279-5441.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Junk Removal in Tyler & East Texas | Call Me Gone Junk Removal",
    template: "%s | Call Me Gone Junk Removal",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Junk Removal in Tyler & East Texas | Call Me Gone Junk Removal",
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Call Me Gone Junk Removal",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Call Me Gone Junk Removal truck and trailer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junk Removal in Tyler & East Texas | Call Me Gone Junk Removal",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

// HomeAndConstructionBusiness + WebSite graph. City-level address only (no storefront published).
const BUSINESS_ID = `${SITE_URL}/#business`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": BUSINESS_ID,
      name: BUSINESS.name,
      url: `${SITE_URL}/`,
      telephone: PHONE_TEL,
      email: EMAIL,
      logo: `${SITE_URL}/photos/logo.png`,
      image: `${SITE_URL}/og-image.jpg`,
      slogan: BUSINESS.slogan,
      description:
        "Call Me Gone Junk Removal provides junk removal, cleanouts, and debris hauling across Tyler and East Texas. Same-day service available, free estimates, locally owned.",
      address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressRegion: BUSINESS.region, addressCountry: BUSINESS.country },
      areaServed: SERVICE_AREAS.map((c) => ({ "@type": "City", name: `${c}, TX` })),
      employee: { "@type": "Person", name: BUSINESS.manager, jobTitle: BUSINESS.managerTitle },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "16:00" },
      ],
      priceRange: "$50–$750",
      sameAs: Object.values(SOCIALS).filter(Boolean),
      makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.description, provider: { "@id": BUSINESS_ID } } })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BUSINESS.name,
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`}>
      <body>
        {gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <FloatingGus />
        <Enhancer />
      </body>
    </html>
  );
}
