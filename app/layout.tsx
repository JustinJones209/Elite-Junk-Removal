import type { Metadata } from "next";
import { Oswald, Inter, Anton } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyCallBar } from "@/components/ui/StickyCallBar";
import { MotionProvider } from "@/components/MotionProvider";
import {
  SITE_URL,
  PHONE_TEL,
  EMAIL,
  BUSINESS,
  SERVICE_AREAS,
  SOCIALS,
} from "@/lib/site";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Used only for the Hero H1 — a heavier, more impactful display face than Oswald.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase makes all relative OG/canonical URLs absolute.
  // TODO(launch): SITE_URL in lib/site.ts must be the real production domain.
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Call Me Gone Junk Removal | Fast, Honest Junk Removal in Tyler & East Texas",
    template: "%s | Call Me Gone Junk Removal",
  },
  description:
    "Call Me Gone Junk Removal serves Tyler, TX and all of East Texas. Same-day service, free estimates, locally owned. Call now or get a free quote online.",
  keywords: [
    "junk removal Tyler TX",
    "junk removal East Texas",
    "furniture removal Tyler",
    "estate cleanout Tyler TX",
    "appliance removal East Texas",
    "Gus Morales",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Call Me Gone Junk Removal | Tyler & East Texas",
    description:
      "Fast, honest junk removal serving Tyler, TX and all of East Texas. Free estimates, same-day service, locally owned.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Call Me Gone Junk Removal",
    // TODO(launch): Add a real 1200x630 OG image at /public/og-image.jpg
    // and reference it here (e.g. images: ["/og-image.jpg"]).
  },
  twitter: {
    card: "summary_large_image",
    title: "Call Me Gone Junk Removal | Tyler & East Texas",
    description:
      "Fast, honest junk removal serving Tyler, TX and all of East Texas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// LocalBusiness structured data for rich results / local SEO.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  employee: {
    "@type": "Person",
    name: BUSINESS.manager,
    jobTitle: BUSINESS.managerTitle,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
    // TODO(launch): Replace with real street address before launch.
    streetAddress: BUSINESS.streetAddress,
  },
  areaServed: [...SERVICE_AREAS, "East Texas"],
  // TODO(launch): PHONE_TEL / EMAIL / SITE_URL in lib/site.ts must be real.
  telephone: PHONE_TEL,
  email: EMAIL,
  url: SITE_URL,
  description:
    "Call Me Gone Junk Removal provides fast, honest junk removal services across Tyler and all of East Texas. Same-day service, free estimates, locally owned.",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      // TODO(launch): Confirm real business hours.
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  // Only include non-empty social URLs.
  sameAs: Object.values(SOCIALS).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${anton.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Scroll clearance so the fixed StickyCallBar never covers the
              last interactive element (e.g. the quote form's submit button)
              at the bottom of a page on mobile. */}
          <div className="h-20 md:hidden" aria-hidden="true" />
          <StickyCallBar />
        </MotionProvider>
      </body>
    </html>
  );
}
