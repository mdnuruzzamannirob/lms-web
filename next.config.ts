import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
