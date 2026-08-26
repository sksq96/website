'use client'

import { useEffect, useState, useCallback } from 'react'

type Link = {
  title: string
  url: string
  date: string
  description?: string
  score?: number
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
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-4 border-b border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/30 px-2 -mx-2"
    >
      <div className="text-[18px] font-semibold tracking-tight leading-snug break-words line-clamp-2">{title}</div>
      {showDesc && link.description && (
        <div className="text-[15px] text-neutral-700 dark:text-neutral-300 mt-1.5 line-clamp-2 leading-snug break-words">
          {link.description.slice(0, 200)}
        </div>
      )}
      <div className="flex gap-3 mt-1.5 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 flex-wrap">
        <span className="truncate max-w-[60%]">{shortenUrl(link.url)}</span>
        {date && <span>{date}</span>}
      </div>
    </a>
  )
}

export default function LinksClient() {
  const [allLinks, setAllLinks] = useState<Link[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<Link[] | null>(null)
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

  const doSearch = async () => {
    const q = query.trim()
    if (!q || searching) return
    setSearching(true)
    setResults(null)
    try {
      const resp = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await resp.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults(null)
  }

  const monthCounts: Record<string, number> = {}
  for (const l of allLinks) {
    const m = monthLabel(l.date)
    if (m) monthCounts[m] = (monthCounts[m] || 0) + 1
  }
  const lastMonth = allLinks.length > 0 ? monthLabel(allLinks[allLinks.length - 1].date) : ''

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && doSearch()}
          placeholder="search again, get different links every time..."
          className="flex-1 min-w-0 px-3 py-2.5 text-[16px] bg-transparent border border-neutral-300 dark:border-neutral-700 rounded focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-500"
        />
        <button
          onClick={doSearch}
          disabled={searching || !query.trim()}
          className="px-4 py-2.5 text-[15px] font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded disabled:opacity-40 transition-opacity"
        >
          {searching ? '...' : 'search'}
        </button>
        {results && (
          <button
            onClick={clearSearch}
            className="px-3 py-2.5 text-[15px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            clear
          </button>
        )}
      </div>

      {error && <div className="text-[15px] text-neutral-500 py-8">{error}</div>}

      {results !== null ? (
        <div>
          <div className="text-[14px] font-medium text-neutral-500 mb-3">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </div>
          {results.length === 0 ? (
            <div className="text-[15px] text-neutral-500 py-8">No links found.</div>
          ) : (
            results.map((r, i) => <LinkItem key={i} link={r} showDesc />)
          )}
        </div>
      ) : (
        <div>
          {allLinks.length > 0 && (
            <div className="flex justify-end mb-1">
              <button
                onClick={shuffled ? unshuffle : shuffle}
                className="text-[14px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
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
                {!shuffled && m && m !== prev && (
                  <div className={`text-[15px] italic text-neutral-500 dark:text-neutral-400 pb-1 ${i === 0 ? '' : 'pt-8'}`}>
                    {m} <span className="not-italic text-[13px]">· {monthCounts[m]}{cursor && m === lastMonth ? '+' : ''}</span>
                  </div>
                )}
                <LinkItem link={l} showDesc />
              </div>
            )
          })}
          {cursor && !loading && (
            <button
              onClick={() => fetchPage(cursor)}
              className="w-full py-6 text-[14px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
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
