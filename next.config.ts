import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
