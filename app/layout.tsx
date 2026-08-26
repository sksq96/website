import './global.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import TopRight from './components/top-right'
import Background from './components/background'

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

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark')`,
          }}
        />
      </head>
      <body className="antialiased max-w-6xl mx-4 md:mx-8 mt-4 lg:mx-auto relative">
        <Background />
        <div className="flex-auto min-w-0 mt-2 flex flex-col px-2 md:px-8 relative z-10">
          <div className="flex justify-between items-center gap-3 mb-8">
            <nav className="flex gap-5 text-[16px] text-neutral-500 dark:text-neutral-400">
              <Link href="/" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">home</Link>
              <Link href="/links" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">links</Link>
            </nav>
            <TopRight />
          </div>
          <main>
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
