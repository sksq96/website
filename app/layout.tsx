import './global.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import Header from './components/header'
import PostHog from './components/analytics'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'shubham',
  description: 'shubham chandel. llm researcher, accidental quant, deliberate founder. building hue at strange intelligence.',
  openGraph: {
    title: 'shubham',
    description: 'shubham chandel. llm researcher, accidental quant, deliberate founder. building hue at strange intelligence.',
    url: baseUrl,
    siteName: 'shubham',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// phone browser chrome matches the page ground
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4f4' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="p-5 pt-2 md:p-6 md:pt-3 md:pr-16 pb-20">
          {children}
        </main>
        <PostHog />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
