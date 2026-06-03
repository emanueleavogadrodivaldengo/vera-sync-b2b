import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for development warnings
  reactStrictMode: true,

  // Image optimization — add remote domains as needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Environment variables available client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
