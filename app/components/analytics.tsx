'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'

// No key (local dev, or before the project exists) -> this whole component
// is inert. NEXT_PUBLIC_* is inlined at build time.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export default function PostHog() {
  const pathname = usePathname()

  useEffect(() => {
    if (!KEY || posthog.__loaded) return
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // sent manually below so hash tabs count
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: false,
      person_profiles: 'always',
    })
  }, [])

  // Pageview on load, on route change, and on hash change — /links#curated and
  // /work#projects are hash-routed, and Tabs fires hashchange when it switches.
  useEffect(() => {
    if (!KEY) return
    const capture = () => posthog.capture('$pageview')
    capture()
    window.addEventListener('hashchange', capture)
    return () => window.removeEventListener('hashchange', capture)
  }, [pathname])

  return null
}
