/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["fzrshniiuucrbgkslcgg.supabase.co"],
  },
}

module.exports = nextConfig
