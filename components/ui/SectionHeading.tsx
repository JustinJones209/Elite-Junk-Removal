interface SectionHeadingProps {
  kicker?: string;
  heading: string;
  subtext?: string;
  light?: boolean;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  kicker,
  heading,
  subtext,
  light = false,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {kicker && (
        <p
          className={`text-sm font-body font-600 uppercase tracking-widest mb-3 ${
            light ? "text-safety-orange" : "text-safety-orange"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`font-heading font-800 text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={`text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-gray-600"}`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
