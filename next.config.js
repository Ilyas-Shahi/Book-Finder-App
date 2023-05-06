/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'books.google.com',
      },
    ],
  },
};

module.exports = nextConfig;
