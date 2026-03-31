/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    // Ensure server-side dynamic chunks are loaded from the generated chunks directory.
    // Next outputs server chunks into `.next/server/chunks/*`, but the runtime expects them
    // relative to `.next/server` unless publicPath is configured.
    if (isServer) {
      config.output = config.output || {};
      config.output.publicPath = './chunks/';
    }
    return config;
  },
}

module.exports = nextConfig



