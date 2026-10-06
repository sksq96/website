'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type Link = {
  title: string
  url: string
  date: string
  description?: string
}

type Msg = { role: 'user' | 'assistant'; content: string }

// [title](url) becomes a link; everything else stays text
function linkify(line: string) {
  return line.split(/(\[[^\]]+\]\([^)\s]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    return m ? <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-bold underline">{m[1]}</a> : part
  })
}

function formatDate(raw: string) {
  if (!raw) return ''
  try {
    const d = new Date(raw)
    if (isNaN(d.getTime())) return ''
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  } catch {
    return ''
  }
}

const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

function monthLabel(raw: string) {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return ''
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function shortenUrl(url: string) {
  try {
    const u = new URL(url)
    const path = u.pathname.length > 30 ? u.pathname.slice(0, 30) + '...' : u.pathname
    return u.hostname + path
  } catch {
    return url
  }
}

function LinkItem({ link, showDesc }: { link: Link; showDesc: boolean }) {
  const date = formatDate(link.date)
  const title = link.title.startsWith('http') ? shortenUrl(link.title) : link.title
  return (
    <div className="py-4 border-b border-neutral-300 dark:border-neutral-700">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[18px] font-bold underline leading-snug break-words line-clamp-2"
      >
        {title}
      </a>
      {showDesc && link.description && (
        <div className="text-[15px] text-neutral-600 dark:text-neutral-400 mt-1.5 line-clamp-2 leading-snug break-words">
          {link.description.slice(0, 200)}
        </div>
      )}
      <div className="flex gap-3 mt-1.5 text-[13px] text-neutral-500 flex-wrap">
        <span className="truncate max-w-[60%]">{shortenUrl(link.url)}</span>
        {date && <span>{date}</span>}
      </div>
    </div>
  )
}

export default function LinksClient() {
  const [allLinks, setAllLinks] = useState<Link[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [asking, setAsking] = useState(false)
  const [thread, setThread] = useState<Msg[]>([])
  const [open, setOpen] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [shuffled, setShuffled] = useState(false)

  const shuffle = () => {
    setAllLinks(prev => {
      const a = [...prev]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    })
    setShuffled(true)
  }

  const unshuffle = () => {
    const t = (l: Link) => { const n = new Date(l.date).getTime(); return isNaN(n) ? 0 : n }
    setAllLinks(prev => [...prev].sort((a, b) => t(b) - t(a)))
    setShuffled(false)
  }

  const fetchPage = useCallback(async (c: string | null) => {
    if (loading) return
    setLoading(true)
    try {
      const url = '/api/links' + (c ? '?cursor=' + encodeURIComponent(c) : '')
      const r = await fetch(url)
      if (!r.ok) throw new Error('fetch failed')
      const data = await r.json()
      setAllLinks(prev => [...prev, ...data.links])
      setCursor(data.cursor)
    } catch {
      setError('Failed to load links')
    } finally {
      setLoading(false)
    }
  }, [loading])

  // the chat lives in this browser only
  useEffect(() => {
    try { setThread(JSON.parse(localStorage.getItem('ask') || '[]')) } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('ask', JSON.stringify(thread)) } catch {}
  }, [thread])

  useEffect(() => {
    fetchPage(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keep the newest line in view and the page behind the chat still
  useEffect(() => end.current?.scrollIntoView({ block: 'end' }), [thread, open])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const ask = async () => {
    const q = query.trim()
    if (!q || asking) return
    const next = [...thread, { role: 'user' as const, content: q }]
    setThread([...next, { role: 'assistant', content: '' }])
    setQuery('')
    setOpen(true)
    setAsking(true)
    let reply = ''
    const show = () => setThread([...next, { role: 'assistant', content: reply }])
    try {
      const r = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!r.ok || !r.body) throw new Error(r.status === 429 ? 'Too many asks for now. Try again in a while.' : 'Something went wrong.')
      const reader = r.body.pipeThrough(new TextDecoderStream()).getReader()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        reply += value
        show()
      }
    } catch (e: any) {
      reply = e.message || 'Something went wrong.'
    } finally {
      if (!reply.trim()) reply = 'Something went wrong.'
      show()
      setAsking(false)
    }
  }

  const box = (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && ask()}
        placeholder={asking ? 'looking…' : thread.length ? 'follow up…' : 'ask about my links…'}
        className="flex-1 min-w-0 px-3 py-2 text-[16px] bg-transparent border border-neutral-400 dark:border-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100"
      />
      <button onClick={ask} disabled={asking || !query.trim()} className="text-[16px] underline disabled:opacity-40">
        {asking ? '...' : 'ask'}
      </button>
    </div>
  )

  const monthCounts: Record<string, number> = {}
  for (const l of allLinks) {
    const m = monthLabel(l.date)
    if (m) monthCounts[m] = (monthCounts[m] || 0) + 1
  }
  const lastMonth = allLinks.length > 0 ? monthLabel(allLinks[allLinks.length - 1].date) : ''

  return (
    <div>
      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)]">
          <div className="flex justify-between items-center gap-4 p-5 md:px-6 text-[15px] max-w-[42rem] w-full mx-auto">
            <button onClick={() => setOpen(false)} className="underline">← links</button>
            {!asking && (
              <button onClick={() => { setThread([]); setOpen(false) }} className="underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                clear
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[42rem] mx-auto px-5 md:px-6 pb-6">
              {thread.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="text-[15px] text-neutral-500 pt-6 pb-2">{m.content}</div>
                ) : (
                  <div key={i} className="text-[16px] leading-snug break-words">
                    {m.content ? (
                      m.content.split('\n').map((line, j) => (line.trim() ? <div key={j} className="py-0.5">{linkify(line)}</div> : <div key={j} className="h-3" />))
                    ) : (
                      <div className="text-neutral-500">looking…</div>
                    )}
                  </div>
                ),
              )}
              <div ref={end} />
            </div>
          </div>
          <div className="max-w-[42rem] w-full mx-auto px-5 md:px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">{box}</div>
        </div>
      ) : (
        <div className="mb-8">
          {box}
          {thread.length > 0 && (
            <button onClick={() => setOpen(true)} className="mt-2 text-[14px] underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
              back to the chat →
            </button>
          )}
        </div>
      )}

      {error && <div className="text-[15px] text-neutral-500 py-8">{error}</div>}

        <div>
          {allLinks.length > 0 && (
            <div className="flex justify-between items-baseline pb-1">
              <span className="text-[15px] text-neutral-500">
                {!shuffled && monthLabel(allLinks[0].date) && (
                  <>{monthLabel(allLinks[0].date)} <span className="text-[13px]">· {monthCounts[monthLabel(allLinks[0].date)]}{cursor && monthLabel(allLinks[0].date) === lastMonth ? '+' : ''}</span></>
                )}
              </span>
              <button
                onClick={shuffled ? unshuffle : shuffle}
                className="text-[14px] underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {shuffled ? '↩ by date' : '⤮ shuffle'}
              </button>
            </div>
          )}
          {allLinks.map((l, i) => {
            const m = monthLabel(l.date)
            const prev = i > 0 ? monthLabel(allLinks[i - 1].date) : null
            return (
              <div key={l.url + i}>
                {!shuffled && i > 0 && m && m !== prev && (
                  <div className="text-[15px] text-neutral-500 pb-1 pt-8">
                    {m} <span className="text-[13px]">· {monthCounts[m]}{cursor && m === lastMonth ? '+' : ''}</span>
                  </div>
                )}
                <LinkItem link={l} showDesc />
              </div>
            )
          })}
          {cursor && !loading && (
            <button
              onClick={() => fetchPage(cursor)}
              className="w-full py-6 text-[14px] underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              load more
            </button>
          )}
          {loading && allLinks.length === 0 && (
            <div className="text-[15px] text-neutral-500 py-8">Loading...</div>
          )}
        </div>
    </div>
  )
}
