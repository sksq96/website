import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://shubham.lol/'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, baseUrl).href,
    ...(post.metadata.publishedAt.length > 4 ? { lastModified: post.metadata.publishedAt } : {}),
  }))

  let routes = ['', '/writings', '/links'].map((route) => ({
    url: new URL(route, baseUrl).href,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
