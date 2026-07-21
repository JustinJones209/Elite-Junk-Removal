import type { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * A single numbered step in the "How It Works" flow. The connecting line
 * between steps is drawn by the parent section, not here.
 */
export function ProcessStep({ number, icon: Icon, title, description }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Numbered icon badge */}
      <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-md ring-4 ring-gold/10">
        <div className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-full text-white">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>
        <span
          className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold font-heading text-sm font-800 text-white shadow"
          aria-hidden="true"
        >
          {number}
        </span>
      </div>
      <h3 className="mb-2 font-heading text-lg font-700 text-ink dark:text-white">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <p className="max-w-xs text-gray-600 dark:text-white/70">{description}</p>
    </div>
  );
}
