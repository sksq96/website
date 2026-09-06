import LinksClient from './links-client'

export const metadata = {
  title: 'links',
  description: '2000+ links. things i\'ve read, saved, and thought about.',
}

export default function Page() {
  return (
    <section className="max-w-[46rem]">
      <p className="text-[15px] mb-6">
        <span className="text-neutral-500">Home: </span>
        <a href="/" className="underline">shubham.lol</a>
      </p>
      <h1 className="font-bold text-[18px] mb-2">Links</h1>
      <p className="mb-8 text-[18px] leading-[1.5]">
        Things I&rsquo;ve read, saved, and thought about. Semantic search
        across 2000+ links.
      </p>
      <LinksClient />
    </section>
  )
}
