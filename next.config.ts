import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "@neondatabase/serverless",
    "@prisma/adapter-neon",
    "@prisma/client",
  ],
};

export default nextConfig;
