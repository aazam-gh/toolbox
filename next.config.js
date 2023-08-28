/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["fzrshniiuucrbgkslcgg.supabase.co"],
      },
    
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
}

module.exports = nextConfig
