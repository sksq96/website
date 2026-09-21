'use client'

import { useState } from 'react'
import clusters from './curated.json'

type Item = { author: string; title: string; url: string; note: string; saved: string }
type Cluster = { name: string; count: number | null; items: Item[] }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function monthLabel(saved: string) {
  const [, m] = saved.split('-')
  return MONTHS[parseInt(m, 10) - 1] || ''
}

export default function Curated() {
  const all = clusters as Cluster[]
  const years = [...new Set(all.flatMap((c) => c.items.map((i) => i.saved.slice(0, 4))))].sort().reverse()
  const [year, setYear] = useState(years[0])

  // clusters in READING.md order, filtered to the selected year, links newest first
  const shown = all
    .map((c) => ({
      ...c,
      items: c.items
        .filter((i) => i.saved.startsWith(year))
        .sort((a, b) => b.saved.localeCompare(a.saved)),
    }))
    .filter((c) => c.items.length > 0)

  return (
    <div>
      <div className="flex gap-4 mb-8 text-[15px]">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={y === year ? 'font-bold underline' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}
          >
            {y}
          </button>
        ))}
      </div>

      {shown.map((c) => (
        <div key={c.name} className="mb-10">
          <h2 className="font-bold text-[15px] mb-4">
            {c.name} <span className="text-neutral-500 font-normal text-[13px]">· {c.items.length}</span>
          </h2>
          <ul className="space-y-4">
            {c.items.map((i) => (
              <li key={i.url} className="flex gap-3">
                <span className="text-[13px] text-neutral-500 w-8 shrink-0 pt-1">{monthLabel(i.saved)}</span>
                <div className="min-w-0">
                  <a
                    href={i.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[17px] leading-snug break-words"
                  >
                    <span className="text-neutral-500">{i.author} — </span>
                    <span className="underline font-bold">{i.title}</span>
                  </a>
                  {i.note && (
                    <div className="text-[15px] text-neutral-500 leading-snug break-words mt-0.5">{i.note}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
