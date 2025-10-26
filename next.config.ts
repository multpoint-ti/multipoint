import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'multpoint.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
