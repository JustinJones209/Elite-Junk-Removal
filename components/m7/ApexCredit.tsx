/**
 * Site by Apex Tech Designs footer credit (React / Next.js).
 * variant: "chalk" (light lockup on dark footers, default) or "ink" (dark lockup on light footers).
 * Place the matching SVG in /public/brand/. Import apex-credit.css (or copy its rules).
 */
type Props = { variant?: "chalk" | "ink" };

export function ApexCredit({ variant = "chalk" }: Props) {
  const src =
    variant === "ink"
      ? "/brand/apex-footer-credit-ink.svg"
      : "/brand/apex-footer-credit-chalk.svg";
  return (
    <a
      className="apex-credit apex-credit--end"
      href="https://apextechdesigns.com/"
      target="_blank"
      rel="noopener"
      aria-label="Site by Apex Tech Designs"
    >
      {/* Native img so the SVG is not run through a framework image optimizer. */}
      <img src={src} alt="Site by Apex Tech Designs" width={270} height={28} />
    </a>
  );
}
