interface LogoProps {
  /** "light" = for light backgrounds (navy text); "dark" = for dark backgrounds (white text). */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Refined text wordmark for Elite Junk Removal.
 *
 * A type-driven lockup: "Elite Junk" set bold in the heading font with a
 * spaced "REMOVAL" kicker beneath, anchored by a slim amber→orange gradient
 * bar as the brand device. No icon — the name carries it.
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
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-xl font-800 tracking-tight ${primaryText}`}>
          Elite Junk
        </span>
        <span className="text-brand-gradient font-heading text-[0.62rem] font-700 uppercase tracking-[0.34em]">
          Removal
        </span>
      </span>
    </span>
  );
}
