import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'multpoint.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'cdn.multpoint.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
