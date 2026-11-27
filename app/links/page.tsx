import { PageHeading } from 'app/components/page-heading'
import LinksClient from './links-client'
import Curated from './curated'
import Tabs from '../components/tabs'
import { CenteredContent } from '../components/sidebar'

export const metadata = {
  title: 'links',
  description: '2000+ links. things i\'ve read, saved, and thought about.',
}

export const revalidate = 3600

// same rule as /api/links: every saved link with an http url
async function countLinks() {
  try {
    let n = 0, cursor: string | null = null
    do {
      const r = await fetch('https://pleasant-bobcat-119.convex.cloud/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: 'links:list', args: cursor ? { limit: 500, cursor } : { limit: 500 } }),
      })
      const v = (await r.json()).value
      n += v.links.filter((l: { link?: string }) => l.link?.startsWith('http')).length
      cursor = v.done ? null : v.cursor
    } while (cursor)
    return n
  } catch {
    return null
  }
}

export default async function Page() {
  const n = await countLinks()
  return (
    <CenteredContent>
      <PageHeading count={n ? `${n.toLocaleString('en-US')} links` : undefined}>links</PageHeading>
      <section>
        <p className="mb-8 text-[18px] leading-[1.5]">
          Things I&rsquo;ve read, saved, and thought about. Search all of them.
        </p>
        <Tabs
          tabs={[
            { id: 'all', panel: <LinksClient /> },
            { id: 'curated', panel: <Curated /> },
          ]}
        />
      </section>
    </CenteredContent>
  )
}
