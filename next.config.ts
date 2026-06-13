import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/clients/\\[id\\]": [path.join(__dirname, "prisma/dev.db")],
    "/api/**": [path.join(__dirname, "prisma/dev.db")],
  },
};

export default nextConfig;
