import { MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/site";

/**
 * Placeholder service-area map. Renders a styled graphic with pins so the
 * page looks complete before a real map is wired up.
 *
 * TODO(launch): Replace this placeholder with a real Google Maps embed
 * (an <iframe> from Google Maps "Share > Embed a map", or the Maps
 * JavaScript API) centered on Tyler, TX with the service radius shown.
 */
export function ServiceAreaMap() {
  // Rough decorative pin positions (percentages) — purely visual.
  const pins = [
    { top: "38%", left: "46%", primary: true }, // Tyler (hub)
    { top: "28%", left: "62%" },
    { top: "55%", left: "58%" },
    { top: "48%", left: "32%" },
    { top: "66%", left: "42%" },
    { top: "30%", left: "34%" },
  ];

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 via-surface to-ink shadow-inner"
      role="img"
      aria-label={`Map showing Call Me Gone Junk Removal's service area centered on ${BUSINESS.city}, ${BUSINESS.region} and surrounding East Texas`}
    >
      {/* Subtle grid to read as a map */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Service-radius ring around the hub */}
      <div
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gold/40 bg-gold/5 sm:h-56 sm:w-56"
        style={{ top: "38%", left: "46%" }}
        aria-hidden="true"
      />

      {/* Pins */}
      {pins.map((pin, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: pin.top, left: pin.left }}
          aria-hidden="true"
        >
          <MapPin
            className={
              pin.primary
                ? "h-9 w-9 fill-gold text-white drop-shadow"
                : "h-6 w-6 fill-white/90 text-ink drop-shadow"
            }
          />
        </div>
      ))}

      {/* Hub label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-center shadow backdrop-blur-sm">
        <span className="font-heading text-sm font-700 text-ink">
          Serving {BUSINESS.city} &amp; All of East Texas
        </span>
      </div>
    </div>
  );
}
