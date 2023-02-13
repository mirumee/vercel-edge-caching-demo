/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: process.env.CONTENTUFUL_IMAGE_HOSTNAME },
      { protocol: "https", hostname: process.env.SALEOR_IMAGE_HOSTNAME },
    ],
  },
};

module.exports = nextConfig
