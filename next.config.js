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
      'addit-football-s3.s3.ap-northeast-2.amazonaws.com',
      process.env.NEXT_PUBLIC_BACK_URL,
    ],
  },
  //@svg파일 이용을 위한 콛
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
