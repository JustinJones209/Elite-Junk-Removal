import { TRUST_BADGES } from "@/lib/site";

interface TrustBadgeRowProps {
  light?: boolean;
  className?: string;
}

/**
 * Horizontal strip of trust credentials (Same-Day Service, Free Estimates, etc.).
 * `light` flips colors for use on dark backgrounds.
 */
export function TrustBadgeRow({ light = false, className = "" }: TrustBadgeRowProps) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-x-8 gap-y-4 ${className}`}
      role="list"
      aria-label="Trust credentials"
    >
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          role="listitem"
          className={`flex items-center gap-2 text-sm font-body font-600 ${
            light ? "text-white" : "text-gray-700"
          }`}
        >
          <Icon
            className={`w-5 h-5 flex-shrink-0 ${light ? "text-gold" : "text-gold"}`}
            aria-hidden="true"
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
