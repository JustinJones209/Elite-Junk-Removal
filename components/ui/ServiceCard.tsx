import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

/**
 * Single service tile: icon + title + short description + "Learn More" link.
 * Hover lifts the card and shifts the arrow to signal interactivity.
 *
 * Kept as a Server Component (CSS-only hover) so lucide icon components can be
 * passed in from server sections without crossing the client boundary.
 */
export function ServiceCard({ icon: Icon, title, description, href = "/quote" }: ServiceCardProps) {
  return (
    <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-brand-gradient group-hover:text-white">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-heading text-xl font-700 text-ink">{title}</h3>
      <p className="mb-5 text-gray-600">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 font-body font-600 text-gold transition-colors hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
