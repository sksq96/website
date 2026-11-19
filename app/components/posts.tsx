import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  const posts = getBlogPosts().sort((a, b) =>
    b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)
  )
  const years = [...new Set(posts.map((post) => post.metadata.publishedAt.slice(0, 4)))]

  if (posts.length === 0) {
    return <p className="text-[18px] text-neutral-600 dark:text-neutral-400">Posts coming soon.</p>
  }

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <section key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="text-[14px] text-neutral-500 mb-4">{year}</h2>
          <ul className="space-y-5">
            {posts.filter((post) => post.metadata.publishedAt.startsWith(year)).map((post) => (
              <li key={post.slug} className="flex items-baseline gap-4">
                <time dateTime={post.metadata.publishedAt} className="w-14 shrink-0 text-[13px] text-neutral-500 tabular-nums">
                  {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                    month: 'short', day: post.metadata.publishedAt.length === 7 ? undefined : 'numeric', timeZone: 'UTC',
                  })}
                </time>
                <Link href={`/blog/${post.slug}`} className="underline text-[18px] leading-snug">
                  {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
