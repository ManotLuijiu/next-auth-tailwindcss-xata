/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['localhost'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'flowbite.s3.amazonaws.com',
  //       port: '',
  //       pathname: '/blocks/marketing-ui/**',
  //     },
  //   ],
  // },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
