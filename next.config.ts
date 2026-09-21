import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    // /projects moved into /work as a tab; keep old links working
    return [{ source: '/projects', destination: '/work#projects', permanent: false }]
  },
}

export default nextConfig
