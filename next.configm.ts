import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", 
      allowedOrigins: ["*"], 
    },
  },
};

export default nextConfig;
