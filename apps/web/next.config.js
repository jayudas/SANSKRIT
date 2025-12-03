/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@sanskrit/ui', '@sanskrit/types'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
