# Elite Junk Removal — Marketing Site

Premium, mobile-first, lead-generation site for **Elite Junk Removal** (Tyler, TX — owner Gustavo Morales).

Built with **Next.js 16 (App Router)**, **TypeScript (strict)**, **Tailwind CSS v4**, **Framer Motion**, **lucide-react**, and **React Hook Form + Zod**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender static)
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/
  layout.tsx            Root shell: fonts, metadata, LocalBusiness JSON-LD, Header/Footer/StickyCallBar
  page.tsx              Homepage (composed of section components, in brief order)
  actions.ts            submitQuote Server Action (STUB — logs the lead)
  quote/                Dedicated full quote form page
  thank-you/            Post-submit confirmation (noindex)
  faq/                  Full FAQ page (+ FAQPage JSON-LD)
  service-areas/        Map + city/ZIP list
  sitemap.ts, robots.ts SEO file conventions
components/
  sections/             Header, Hero, Services, HowItWorks, BeforeAfter, WhyChooseUs,
                        FounderStory, Testimonials, ServiceArea, FAQPreview, FinalCTA, Footer
  ui/                   CTAButton, SectionHeading, TrustBadgeRow, StickyCallBar, ServiceCard,
                        ProcessStep, BeforeAfterSlider, TestimonialCard/Carousel, FAQAccordion,
                        ServiceAreaMap, Reveal (scroll-reveal wrapper)
  forms/QuoteForm.tsx   RHF + Zod form (full & compact variants)
  MotionProvider.tsx    Global prefers-reduced-motion handling
lib/
  site.ts               SINGLE SOURCE OF TRUTH — phone, email, business info, services,
                        testimonials, FAQs, service areas
  images.ts             Placeholder Unsplash imagery (swap for real job photos)
  quote-schema.ts       Shared Zod schema + service types
```

## ⚠️ Before launch — replace every placeholder

Most placeholders live in **`lib/site.ts`** (edit once, updates everywhere):

- **Phone** — `PHONE_DISPLAY` / `PHONE_TEL` (currently `(903) 555-0100`)
- **Email** — `EMAIL`
- **Domain** — `SITE_URL` (drives canonical URLs, OG, sitemap, robots, JSON-LD)
- **Address / hours** — `BUSINESS.streetAddress`, `BUSINESS.hours`, and hours in `app/layout.tsx` JSON-LD
- **Social links** — `SOCIALS` (empty = icons hidden)
- **Testimonials** — `TESTIMONIALS` (use real, permission-granted reviews)

Elsewhere:

- **Images** — `lib/images.ts`: every image is a temporary Unsplash stock photo. Replace with real Elite job photos (recommend local files in `/public`) and update alt text. Remove the Unsplash entry from `next.config.ts` `remotePatterns` once done.
- **OG image** — add `/public/og-image.jpg` (1200×630) and reference it in `app/layout.tsx` metadata.
- **Map** — `components/ui/ServiceAreaMap.tsx` is a styled placeholder; swap for a real Google Maps embed.
- **ZIP codes** — verify the list in `app/service-areas/page.tsx`.
- **Form delivery** — `app/actions.ts` only `console.log`s leads. Wire up email/CRM (Resend, SendGrid, Jobber, Zapier, etc.).
- **Photo upload** — the file input in `QuoteForm` is intentionally not transmitted yet; see the TODO to add object-storage upload.

Search the codebase for `TODO(launch)` to find them all in context.
