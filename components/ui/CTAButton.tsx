"use client";

import { motion } from "framer-motion";
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

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white border-2 border-transparent shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 hover:brightness-[1.06]",
  secondary:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white",
  ghost:
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-ink",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      variant = "primary",
      href,
      tel,
      onClick,
      children,
      className = "",
      type = "button",
      disabled = false,
      size = "md",
    },
    ref
  ) => {
    const base = `inline-flex items-center justify-center gap-2 font-heading font-700 rounded-lg transition-colors duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring" as const, stiffness: 400, damping: 20 },
    };

    if (href) {
      const isExternal = href.startsWith("http");
      const isTel = tel || href.startsWith("tel:");
      return (
        <motion.a
          href={href}
          target={isExternal && !isTel ? "_blank" : undefined}
          rel={isExternal && !isTel ? "noopener noreferrer" : undefined}
          className={base}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} disabled:opacity-50 disabled:cursor-not-allowed`}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

CTAButton.displayName = "CTAButton";
