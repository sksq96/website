import { PageHeading } from 'app/components/page-heading'
import { BlogPosts } from 'app/components/posts'
import { CenteredContent } from 'app/components/sidebar'

export const metadata = {
  title: 'writings — shubham',
  description: 'Notes and essays by Shubham Chandel.',
  alternates: { canonical: '/writings' },
}

export default function Page() {
  return (
    <CenteredContent>
      <PageHeading>writings</PageHeading>
      <section>
        <BlogPosts />
      </section>
    </CenteredContent>
  )
}
