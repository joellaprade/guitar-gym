import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactStrictMode: false,
  allowedDevOrigins: ['10.45.1.122'],
};

export default nextConfig;
