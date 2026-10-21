const CONVEX_URL = 'https://pleasant-bobcat-119.convex.cloud'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const args: { limit: number; cursor?: string } = { limit: 200 }
    if (cursor) args.cursor = cursor

    const resp = await fetch(`${CONVEX_URL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: 'links:list', args }),
    })
    const data = await resp.json()

    if (data.status !== 'success') {
      return Response.json({ error: 'Failed to fetch links' }, { status: 500 })
    }

    const page = data.value
    const links: Array<{ title: string; date: string; url: string; description: string }> = []
    for (const l of page.links) {
      if (l.link && l.link.startsWith('http')) {
        links.push({
          title: l.title || l.link,
          date: l.ogdate || '',
          url: l.link,
          description: l.description || '',
        })
      }
    }

    return Response.json(
      { links, cursor: page.done ? null : page.cursor },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=60' } },
    )
  } catch (err: any) {
    return Response.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
