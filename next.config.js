/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media-3.api-sports.io', 'media.api-sports.io', 'localhost'],
  },
}

module.exports = nextConfig
