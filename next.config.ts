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
        protocol: 'https',
        hostname: 'cdn.multpoint.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/webmail',
        destination: 'https://webmail.multpoint.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
