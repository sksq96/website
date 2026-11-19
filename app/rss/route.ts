import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[character]!)
}

export async function GET() {
  let allBlogs = await getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${new URL(`/blog/${post.slug}`, baseUrl).href}</link>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          ${post.metadata.publishedAt.length > 4 ? `<pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>` : ''}
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>shubham</title>
        <link>${baseUrl}</link>
        <description>shubham.lol, writing on llms, agents, and personal intelligence</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
