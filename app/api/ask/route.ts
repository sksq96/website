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
  return [...best.values()].sort((a, b) => b._score - a._score).slice(0, 60).map(slim)
}

// newest first, so page until we pass `since`; dates compare by day, both ends inclusive
async function list_links({ since, until = '9999', offset = 0 }: { since: string; until?: string; offset?: number }) {
  const all: any[] = []
  let cursor: string | undefined
  for (let i = 0; i < 15; i++) {
    const page = await convex('query', 'links:list', { limit: 200, ...(cursor ? { cursor } : {}) })
    for (const l of page.links) if (l.ogdate?.slice(0, 10) >= since && l.ogdate.slice(0, 10) <= until) all.push(l)
    if (page.done || page.links.at(-1)?.ogdate.slice(0, 10) < since) break
    cursor = page.cursor
  }
  const links = all.slice(offset, offset + 100).map((l) => ({ ...slim(l), description: slim(l).description.slice(0, 100) }))
  return { total: all.length, offset, links }
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
      description: 'Every link saved in a date range, newest first, 100 per call. Dates are YYYY-MM-DD, both inclusive. Returns total; pass offset to page through more. Use for any time ask ("this month", "past week", "in March"); semantic search misses recent saves.',
      parameters: {
        type: 'object',
        properties: { since: { type: 'string' }, until: { type: 'string' }, offset: { type: 'number' } },
        required: ['since'],
      },
    },
  },
  { type: 'openrouter:web_search', parameters: { max_results: 5, max_uses: 2 } },
]

const RUN: Record<string, (a: any) => Promise<any>> = { search_links, list_links }

const system = () => `You help visitors find links Shubham Chandel has saved (2000+, on shubham.lol/links). Today is ${new Date().toDateString()} (${new Date().toISOString().slice(0, 10)}).
Search his links first: search_links with 3-5 varied phrasings, and list_links for anything about when he saved it. People misremember dates, so for "last week" list the last 14 days through today. Many saves have vague titles and descriptions (a person's name, an X post), so read the URLs too. If nothing in his links clearly matches, search the web rather than offering a near miss.
Answer short. One link per line, formatted exactly:
[Title](url) — one-line description · Mon YYYY
Start a web result's line with "web:" so it is clear it is not from his links, and say so in a short line before them. Give as many as asked, even 20 or more; page list_links when needed. With no count, give 3, except time asks ("past week", "this month"), which get everything saved in that range.
If asked to group (by category, topic, month), write each group name alone on its own line, then its links under it, a blank line between groups. Plain text: no markdown headings, bold or bullets. No preamble and no narration of what you are doing. If nothing fits, say so in one line.`

export async function POST(request: Request) {
  const { messages } = await request.json().catch(() => ({ messages: null }))
  if (!Array.isArray(messages) || !messages.length) return Response.json({ error: 'messages required' }, { status: 400 })

  const today = new Date().toISOString().slice(0, 10)
  if (day !== today) (day = today), (used = 0)
  if (++used > DAILY_CAP) return new Response('Ask is resting for today. Try tomorrow.', { status: 429 })

  const convo: any[] = [
    { role: 'system', content: system() },
    ...messages.slice(-12).map((m: any) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content).slice(0, 2000) })),
  ]

  // stream the model's text as it comes; tool calls are collected and run between turns
  const enc = new TextEncoder()
  const body = new ReadableStream({
    async start(ctl) {
      const say = (t: string) => ctl.enqueue(enc.encode(t))
      try {
        for (let step = 0; step < 8; step++) {
          const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: MODEL, messages: convo, tools: TOOLS, max_tokens: 4000, stream: true }),
          })
          if (!r.ok || !r.body) throw new Error((await r.text()).slice(0, 200))
          let text = '', buf = ''
          const calls: any[] = []
          const reader = r.body.pipeThrough(new TextDecoderStream()).getReader()
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            buf += value
            const lines = buf.split('\n')
            buf = lines.pop()!
            for (const line of lines) {
              if (!line.startsWith('data: ') || line === 'data: [DONE]') continue
              const d = JSON.parse(line.slice(6)).choices?.[0]?.delta
              if (d?.content) (text += d.content), say(d.content)
              for (const c of d?.tool_calls || []) {
                const t = (calls[c.index] ||= { id: c.id, type: 'function', function: { name: '', arguments: '' } })
                t.function.name += c.function?.name || ''
                t.function.arguments += c.function?.arguments || ''
              }
            }
          }
          if (!calls.length) return ctl.close()
          if (text) say('\n\n')
          convo.push({ role: 'assistant', content: text || null, tool_calls: calls })
          await Promise.all(
            calls.map(async (c) => {
              const fn = RUN[c.function.name]
              const out = fn ? await fn(JSON.parse(c.function.arguments || '{}')).catch((e) => ({ error: e.message })) : { error: 'unknown tool' }
              convo.push({ role: 'tool', tool_call_id: c.id, content: JSON.stringify(out) })
            }),
          )
        }
        say('That took too many steps. Try asking more specifically.')
      } catch (err: any) {
        say(`Something went wrong: ${err.message || 'ask failed'}`)
      }
      ctl.close()
    },
  })
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}
