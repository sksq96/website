import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    // /vibes is a static page (public/vibes/index.html) with its own animation engine
    return [{ source: '/vibes', destination: '/vibes/index.html' }]
  },
  async redirects() {
    // /projects moved into /work as a tab; keep old links working
    return [{ source: '/projects', destination: '/work#projects', permanent: false }]
  },
}

export default nextConfig
