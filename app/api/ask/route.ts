const CONVEX_URL = 'https://pleasant-bobcat-119.convex.cloud'
const MODEL = 'anthropic/claude-sonnet-5.5'
const DAILY_CAP = 300 // per server instance; the firewall rules on /api/ask do the real limiting

export const maxDuration = 60

let day = '', used = 0

const convex = async (kind: 'action' | 'query', path: string, args: object) => {
  const r = await fetch(`${CONVEX_URL}/api/${kind}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, args }),
  }).then((r) => r.json())
  if (r.status !== 'success') throw new Error(r.errorMessage || 'convex failed')
  return r.value
}

const slim = (l: any) => ({
  title: l.title || l.link,
  link: l.link,
  description: (l.description || '').slice(0, 160),
  date: (l.ogdate || '').slice(0, 10),
  ...(l._score ? { score: Math.round(l._score * 1000) / 1000 } : {}),
})

// several phrasings at once, deduped by link keeping the best score
async function search_links({ queries, limit = 10 }: { queries: string[]; limit?: number }) {
  const lists = await Promise.all(queries.slice(0, 5).map((query) => convex('action', 'links:search', { query, limit: Math.min(limit, 15) })))
  const best = new Map<string, any>()
  for (const l of lists.flat()) if (l.link && (best.get(l.link)?._score ?? -1) < l._score) best.set(l.link, l)
  return [...best.values()].sort((a, b) => b._score - a._score).slice(0, 30).map(slim)
}

// newest first, so page until we pass `since`
async function list_links({ since, until = '9999' }: { since: string; until?: string }) {
  const out: any[] = []
  let cursor: string | undefined
  for (let i = 0; i < 10; i++) {
    const page = await convex('query', 'links:list', { limit: 200, ...(cursor ? { cursor } : {}) })
    for (const l of page.links) if (l.ogdate >= since && l.ogdate <= until) out.push(slim(l))
    if (page.done || page.links.at(-1)?.ogdate < since) break
    cursor = page.cursor
  }
  return out.slice(0, 120)
}

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_links',
      description: 'Semantic (vector) search over Shubham’s saved links. Pass 3-5 different phrasings of the ask; results come back merged and deduped, best match first.',
      parameters: {
        type: 'object',
        properties: {
          queries: { type: 'array', items: { type: 'string' }, description: '3-5 varied phrasings' },
          limit: { type: 'number', description: 'results per phrasing, default 10' },
        },
        required: ['queries'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_links',
      description: 'Every link saved in a date range (ISO dates, by save date). Use for time asks like "last week"; semantic search misses recent saves.',
      parameters: {
        type: 'object',
        properties: { since: { type: 'string' }, until: { type: 'string' } },
        required: ['since'],
      },
    },
  },
  { type: 'openrouter:web_search', parameters: { max_results: 5, max_uses: 2 } },
]

const RUN: Record<string, (a: any) => Promise<any>> = { search_links, list_links }

const system = () => `You help visitors find links Shubham Chandel has saved (2000+, on shubham.lol/links). Today is ${new Date().toISOString().slice(0, 10)}.
Search his links first: search_links with 3-5 varied phrasings, and list_links for anything about when he saved it. People misremember dates, so for "last week" list the last 14 days through today. Many saves have vague titles and descriptions (a person's name, an X post), so read the URLs too. If nothing in his links clearly matches, search the web rather than offering a near miss.
Answer short. One link per line, formatted exactly:
[Title](url) — one-line description · Mon YYYY
Start a web result's line with "web:" so it is clear it is not from his links, and say so in a short line before them. Give as many as asked (default 3). No preamble, no headings, no bold. If nothing fits, say so in one line.`

export async function POST(request: Request) {
  const { messages } = await request.json().catch(() => ({ messages: null }))
  if (!Array.isArray(messages) || !messages.length) return Response.json({ error: 'messages required' }, { status: 400 })

  const today = new Date().toISOString().slice(0, 10)
  if (day !== today) (day = today), (used = 0)
  if (++used > DAILY_CAP) return Response.json({ error: 'ask is resting for today, try tomorrow' }, { status: 429 })

  const convo: any[] = [
    { role: 'system', content: system() },
    ...messages.slice(-12).map((m: any) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content).slice(0, 2000) })),
  ]

  try {
    for (let step = 0; step < 6; step++) {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, messages: convo, tools: TOOLS, max_tokens: 1200 }),
      }).then((r) => r.json())
      const msg = r.choices?.[0]?.message
      if (!msg) throw new Error(r.error?.message || 'no reply')
      if (!msg.tool_calls?.length) return Response.json({ reply: msg.content || '' })
      convo.push(msg)
      for (const c of msg.tool_calls) {
        const fn = RUN[c.function.name]
        const out = fn ? await fn(JSON.parse(c.function.arguments || '{}')).catch((e) => ({ error: e.message })) : { error: 'unknown tool' }
        convo.push({ role: 'tool', tool_call_id: c.id, content: JSON.stringify(out) })
      }
    }
    return Response.json({ reply: 'That took too many steps. Try asking more specifically.' })
  } catch (err: any) {
    return Response.json({ error: err.message || 'ask failed' }, { status: 500 })
  }
}
