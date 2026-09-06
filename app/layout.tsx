import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import Corner from './components/corner'

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
        <main className="p-5 md:p-6 md:pr-16 pb-20">
          {children}
        </main>
        <Corner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
