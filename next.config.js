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
  //@svg파일 이용을 위한 콛
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
      ㅡ,
    })
    return config
  },
}

module.exports = nextConfig
