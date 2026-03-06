import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@atomazing-org/design-system"],
};

export default nextConfig;
