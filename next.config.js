/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["http://localhost/elephant"],
  },
};

module.exports = nextConfig;
