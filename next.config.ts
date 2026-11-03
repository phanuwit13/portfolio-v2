import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: {
    agentUpgrade: "latest",
  },
};

export default nextConfig;
