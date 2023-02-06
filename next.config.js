/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media-3.api-sports.io',
      'media.api-sports.io',
      'localhost',
      'media-1.api-sports.io',
      'media-2.api-sports.io',
      process.env.NEXT_PUBLIC_BACK_URL,
    ],
  },
}

module.exports = nextConfig
