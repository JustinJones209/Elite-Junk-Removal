import Image from "next/image";

interface LogoProps {
  /** Kept for API compatibility with callers; the real logo art is
   * self-colored (black/gold) and reads the same on light or dark
   * backgrounds, so this no longer switches anything internally. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Real "Call Me Gone Junk Removal" badge lockup (public/photos/logo.png).
 * Self-contained black/gold artwork — same file works on light or dark
 * section backgrounds.
 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/photos/logo.png"
      alt="Call Me Gone Junk Removal"
      width={900}
      height={606}
      priority
      className={`h-12 w-auto sm:h-14 ${className}`}
    />
  );
}
