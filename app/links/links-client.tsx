'use client'

import { useEffect, useMemo, useState } from 'react'

type Link = {
  title: string
  url: string
  date: string
  description?: string
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
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
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

  // pull every page up front so search covers all links; the first page renders as soon as it lands
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let c: string | null = null
      do {
        const r = await fetch('/api/links' + (c ? '?cursor=' + encodeURIComponent(c) : ''))
        if (!r.ok) throw new Error('fetch failed')
        const data = await r.json()
        if (cancelled) return
        setAllLinks(prev => [...prev, ...data.links])
        c = data.cursor
      } while (c)
    })()
      .catch(() => setError('Failed to load links'))
      .finally(() => setLoading(false))
    return () => { cancelled = true }
  }, [])

  // plain substring match on every word, in memory: no network, no model, instant on any device
  const haystack = useMemo(
    () => allLinks.map(l => `${l.title} ${l.description || ''} ${l.url}`.toLowerCase()),
    [allLinks],
  )
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = terms.length ? allLinks.filter((_, i) => terms.every(t => haystack[i].includes(t))) : null

  const box = (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search my links…"
        className="flex-1 min-w-0 px-3 py-2 text-[16px] bg-transparent border border-neutral-400 dark:border-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
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

  return (
    <div>
      <div className="mb-8">{box}</div>

      {error && <div className="text-[15px] text-neutral-500 py-8">{error}</div>}

      {matches ? (
        <div>
          <div className="text-[15px] text-neutral-500 py-4">
            {matches.length ? `${matches.length} match${matches.length === 1 ? '' : 'es'}` : 'Nothing found.'}
            {loading && ' (still loading)'}
          </div>
          {matches.slice(0, 100).map((l, i) => <LinkItem key={l.url + i} link={l} showDesc />)}
        </div>
      ) : (
        <div>
          {allLinks.length > 0 && (
            <div className="flex justify-between items-baseline pb-1">
              <span className="text-[15px] text-neutral-500">
                {!shuffled && monthLabel(allLinks[0].date) && (
                  <>{monthLabel(allLinks[0].date)} <span className="text-[13px]">· {monthCounts[monthLabel(allLinks[0].date)]}{loading ? '+' : ''}</span></>
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
                    {m} <span className="text-[13px]">· {monthCounts[m]}</span>
                  </div>
                )}
                <LinkItem link={l} showDesc />
              </div>
            )
          })}
          {loading && allLinks.length === 0 && (
            <div className="text-[15px] text-neutral-500 py-8">Loading...</div>
          )}
        </div>
      )}
    </div>
  )
}
