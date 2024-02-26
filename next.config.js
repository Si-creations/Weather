/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.weatherapi.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
