import type { NextConfig } from "next";

// Security headers (Apex WEBSITE-SECURITY-STANDARD, 2026-11-16). This is a
// Node.js app on Hostinger, so headers are set here rather than in .htaccess.
// The CSP is conservative: it does not restrict scripts, styles, fonts, images
// or analytics, only framing, plugins, <base> and where forms may post.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "upgrade-insecure-requests; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Old homepage-section path and any leftover /how-it-works bookmarks.
      { source: "/how-it-works", destination: "/#what-we-do", permanent: true },
    ];
  },
};

export default nextConfig;
