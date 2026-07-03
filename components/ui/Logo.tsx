interface LogoProps {
  /** "light" = for light backgrounds (navy text); "dark" = for dark backgrounds (white text). */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Refined text wordmark for Elite Junk Removal.
 *
 * A one-line lockup: "Elite" in the amber→orange brand gradient, "Junk
 * Removal" in bold navy, anchored by a slim gradient bar as the brand
 * device. No icon — the name carries it.
 */
export function Logo({ variant = "light", className = "" }: LogoProps) {
  const primaryText = variant === "dark" ? "text-white" : "text-navy";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Gradient brand device */}
      <span
        aria-hidden="true"
        className="h-9 w-1.5 shrink-0 rounded-full bg-brand-gradient"
      />
      <span className={`font-heading text-xl font-800 tracking-tight whitespace-nowrap ${primaryText}`}>
        <span className="text-brand-gradient">Elite</span> Junk Removal
      </span>
    </span>
  );
}
