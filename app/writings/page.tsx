import { BlogPosts } from 'app/components/posts'
import { WithSidebar } from 'app/components/sidebar'

export const metadata = {
  title: 'writings — shubham',
  description: 'Notes and essays by Shubham Chandel.',
  alternates: { canonical: '/writings' },
}

export default function Page() {
  return (
    <WithSidebar>
      <section className="max-w-[48rem]">
        <h1 className="text-[24px] font-bold mb-8">writings</h1>
        <BlogPosts />
      </section>
    </WithSidebar>
  )
}
