import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server serve its hot-reload assets when opened from another
  // device on the LAN (e.g. previewing on a phone via the local IP).
  allowedDevOrigins: ["192.168.3.144"],
  images: {
    // 60 is used for the hero LCP image; 75 is the Next default.
    qualities: [60, 75],
    // TODO(launch): These Unsplash patterns exist only so the placeholder
    // stock photos optimize correctly. Once real job photos are added to
    // /public (or a real CDN), remove any patterns you no longer need.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
