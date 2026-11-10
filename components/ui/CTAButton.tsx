import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  variant?: Variant;
  href?: string;
  tel?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

/** M7 flat button (kept API so pages like /thank-you are unchanged). */
const variantClasses: Record<Variant, string> = {
  primary: "btn-accent",
  secondary: "btn-outline",
  ghost: "btn-outline-light",
};
const sizeClasses = { sm: "btn-sm", md: "", lg: "btn-lg" };

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ variant = "primary", href, tel, onClick, children, className = "", type = "button", disabled = false, size = "md" }, ref) => {
    const base = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    if (href) {
      const isExternal = href.startsWith("http");
      const isTel = tel || href.startsWith("tel:");
      return (
        <a href={href} target={isExternal && !isTel ? "_blank" : undefined} rel={isExternal && !isTel ? "noopener noreferrer" : undefined} className={base}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref} type={type} onClick={onClick} disabled={disabled} className={base}>
        {children}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";
