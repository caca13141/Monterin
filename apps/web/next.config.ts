import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config: any) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  output: "standalone",
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
