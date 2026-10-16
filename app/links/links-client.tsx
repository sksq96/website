'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { warm, instant } from './instant'

type Link = {
  title: string
  url: string
  date: string
  description?: string
}

type Result = { title: string; url: string; why?: string }

// a live search lane answers each query (see /root/github/search/README.md); the page sends it, then polls
const RELAY = 'https://80.190.78.211/search'

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
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<Result[] | null>(null)
  const [note, setNote] = useState('')
  const [quick, setQuick] = useState<Result[] | null>(null)
  const typed = useRef({ seq: 0, timer: undefined as ReturnType<typeof setTimeout> | undefined })
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

  useEffect(() => {
    fetchPage(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const search = async () => {
    const q = query.trim()
    if (!q || searching) return
    setSearching(true)
    setResults(null)
    setNote('')
    try {
      const r = await fetch(`${RELAY}/q`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      if (!r.ok) throw new Error(r.status === 429 ? 'Too many searches for now. Try again in a minute.' : 'Search is unavailable right now.')
      const { id, status, note } = await r.json()
      // over the relay's limits nothing is queued; the instant results stay up with the relay's note
      if (status === 'capped') return setNote(note || 'Search is busy. The instant results are below.')
      // a live lane writes the answer, so the page waits up to a minute for it
      for (let i = 0; i < 60; i++) {
        await new Promise((ok) => setTimeout(ok, 1000))
        const a = await fetch(`${RELAY}/a/${id}`)
        if (a.status === 202) continue
        if (!a.ok) throw new Error('Search is unavailable right now.')
        const data = await a.json()
        setResults(data.results || [])
        return
      }
      throw new Error('No answer came back. Try again.')
    } catch (e: any) {
      setNote(e.message || 'Search is unavailable right now.')
    } finally {
      setSearching(false)
    }
  }

  // instant results as he types, computed in the browser; keystrokes never go to the relay
  const type = (q: string) => {
    setQuery(q)
    setResults(null)
    setNote('')
    const t = typed.current
    clearTimeout(t.timer)
    const seq = ++t.seq
    if (!q.trim()) return setQuick(null)
    t.timer = setTimeout(() => {
      instant(q.trim())
        .then((r) => seq === t.seq && setQuick(r.map((x) => ({ title: x.title, url: x.url, why: x.snippet }))))
        .catch(() => {})
    }, 100)
  }

  const box = (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={query}
        onFocus={() => warm().catch(() => {})}
        onChange={(e) => type(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && search()}
        placeholder="search my links…"
        className="flex-1 min-w-0 px-3 py-2 text-[16px] bg-transparent border border-neutral-400 dark:border-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100"
      />
      <button onClick={search} disabled={searching || !query.trim()} className="text-[16px] underline disabled:opacity-40">
        search
      </button>
      {(results || quick) && !searching && (
        <button
          onClick={() => type('')}
          className="text-[16px] underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          clear
        </button>
      )}
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
      <div className="mb-8">{box}</div>

      {error && <div className="text-[15px] text-neutral-500 py-8">{error}</div>}

      {searching || note || results || quick ? (
        <div>
          {(searching || note) && <div className="text-[15px] text-neutral-500 py-4">{searching ? 'thinking…' : note}</div>}
          {(results ?? quick ?? []).length ? (
            (results ?? quick)!.map((r) => (
              <div key={r.url} className="py-4 border-b border-neutral-300 dark:border-neutral-700">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[18px] font-bold underline leading-snug break-words line-clamp-2">
                  {r.title}
                </a>
                {r.why && <div className="text-[15px] text-neutral-600 dark:text-neutral-400 mt-1.5 leading-snug break-words">{r.why}</div>}
                <div className="mt-1.5 text-[13px] text-neutral-500 truncate">{shortenUrl(r.url)}</div>
              </div>
            ))
          ) : (
            !searching && !note && (
              <div className="text-[15px] text-neutral-500 py-4">{results ? 'Nothing found.' : 'No close matches yet. Press Enter to ask.'}</div>
            )
          )}
        </div>
      ) : (
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
      )}
    </div>
  )
}
