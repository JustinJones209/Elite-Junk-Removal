interface LogoProps {
  /** "light" = for light backgrounds (ink text); "dark" = for dark backgrounds (white text). */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Crown-and-shield badge mark + "CALL ME GONE" wordmark lockup.
 *
 * "GONE" carries the brand gradient (gold), everything else follows the
 * variant's ink/white treatment. The badge mirrors app/icon.svg so the
 * header and favicon read as the same mark at any size.
 */
export function Logo({ variant = "light", className = "" }: LogoProps) {
  const primaryText = variant === "dark" ? "text-white" : "text-ink";
  const shieldStroke = variant === "dark" ? "#ffffff" : "#161616";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      >
        <path
          d="M32 4c-3 3-7 4.5-11 4.5S13.5 7 12 5c-.6 3 .3 5.5 2 7.5-2.3.2-4 1-5.5 2.3 2.3 1 4 1 5.8.6-1 1.6-1.3 3-1.1 4.6 1.7-1 3.4-1.6 5.2-1.7-.7 1.6-.7 3-.2 4.6 1.8-.7 3.2-1.6 4.3-3 .9 1.6 .9 3-.1 4.6 1.9-.4 3.4-1.2 4.5-2.6 1.1 1.4 2.6 2.2 4.5 2.6-1-1.6-1-3-.1-4.6 1.1 1.4 2.5 2.3 4.3 3 .5-1.6 .5-3-.2-4.6 1.8 .1 3.5 .7 5.2 1.7 .2-1.6-.1-3-1.1-4.6 1.8 .4 3.5 .4 5.8-.6-1.5-1.3-3.2-2.1-5.5-2.3 1.7-2 2.6-4.5 2-7.5-1.5 2-3.4 3.5-9 3.5S35 7 32 4Z"
          fill="var(--color-gold)"
        />
        <path
          d="M13 20h38v6c0 14-8 24-19 30-11-6-19-16-19-30v-6Z"
          fill={variant === "dark" ? "#000000" : "#161616"}
          stroke={shieldStroke}
          strokeWidth="1.5"
        />
        <path
          d="M13 20h38v6c0 14-8 24-19 30-11-6-19-16-19-30v-6Z"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
        />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight={700}
          fontSize="17"
          fill="var(--color-gold)"
        >
          CMG
        </text>
      </svg>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={`font-heading text-lg font-700 tracking-tight uppercase sm:text-xl ${primaryText}`}
        >
          Call Me <span className="text-brand-gradient">Gone</span>
        </span>
        <span
          className={`font-heading text-[0.55rem] font-600 tracking-[0.25em] uppercase sm:text-[0.6rem] ${
            variant === "dark" ? "text-white/70" : "text-ink/60"
          }`}
        >
          Junk Removal
        </span>
      </span>
    </span>
  );
}
