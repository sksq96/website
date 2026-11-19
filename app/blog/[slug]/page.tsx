import { notFound } from 'next/navigation'
import { DraftMarkdown } from 'app/components/draft-markdown'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return {}
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  let ogImage = image ? image : new URL(`/og?title=${encodeURIComponent(title)}`, baseUrl).href

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedTime.length === 4 ? undefined : publishedTime,
      url: new URL(`/blog/${post.slug}`, baseUrl).href,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="writing-page max-w-[46rem] mx-auto">
      <a href="/writings" className="writing-back">← writings</a>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt.length === 4 ? undefined : post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt.length === 4 ? undefined : post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: new URL(`/blog/${post.slug}`, baseUrl).href,
            author: {
              '@type': 'Person',
              name: 'shubham',
            },
          }),
        }}
      />
      <h1 className="writing-title">
        {post.metadata.title}
      </h1>
      <div className="writing-meta">
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
      </div>
      {post.metadata.reviewDraft === 'true' && <p className="mb-8 text-[13px] font-normal text-neutral-500">Reconstructed voice draft · historical year, not original publication date · open for revision</p>}
      <article className="writing-body">
        {post.format === '.md' ? <DraftMarkdown source={post.content} /> : <CustomMDX source={post.content} />}
      </article>
    </section>
  )
}