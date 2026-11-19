import { getBlogPosts } from 'app/blog/utils'
import { WritingList } from './writing-list'
export function BlogPosts() {
  const posts = getBlogPosts().sort((a,b)=> b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)).map(({slug,metadata})=>({slug,title:metadata.title,date:metadata.publishedAt}))
  return <WritingList posts={posts}/>
}
