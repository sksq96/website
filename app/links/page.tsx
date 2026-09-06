import LinksClient from './links-client'
import { Photo, Contacts } from '../components/sidebar'

export const metadata = {
  title: 'links',
  description: '2000+ links. things i\'ve read, saved, and thought about.',
}

export default function Page() {
  return (
    <div className="md:grid md:grid-cols-[24rem_1fr] md:gap-x-8 md:items-start">
      <aside className="hidden md:block space-y-4">
        <Photo />
        <Contacts />
      </aside>
      <section className="max-w-[42rem]">
        <h1 className="font-bold text-[18px] mb-2">Links</h1>
        <p className="mb-8 text-[18px] leading-[1.5]">
          Things I&rsquo;ve read, saved, and thought about. Semantic search
          across 2000+ links.
        </p>
        <LinksClient />
      </section>
    </div>
  )
}
