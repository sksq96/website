import { PageHeading } from 'app/components/page-heading'
import LinksClient from './links-client'
import Curated from './curated'
import Tabs from '../components/tabs'
import { CenteredContent } from '../components/sidebar'

export const metadata = {
  title: 'links',
  description: '2000+ links. things i\'ve read, saved, and thought about.',
}

export default function Page() {
  return (
    <CenteredContent>
      <section>
        <PageHeading>links</PageHeading>
        <p className="mb-8 text-[18px] leading-[1.5]">
          Things I&rsquo;ve read, saved, and thought about. Search any of
          my 2000+ links.
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
