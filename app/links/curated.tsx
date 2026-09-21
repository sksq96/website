'use client'

import { useState } from 'react'
import clusters from './curated.json'

type Item = { author: string; title: string; url: string; note: string; saved: string }
type Cluster = { name: string; count: number | null; items: Item[] }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function monthLabel(saved: string) {
  return MONTHS[parseInt(saved.split('-')[1], 10) - 1] || ''
}

export default function Curated() {
  const all = clusters as Cluster[]
  const years = [...new Set(all.flatMap((c) => c.items.map((i) => i.saved.slice(0, 4))))].sort().reverse()
  const [year, setYear] = useState(years[0])

  // clusters in READING.md order but AI minds first, filtered to the selected
  // year, links strictly newest first within each cluster
  const shown = all
    .map((c) => ({
      ...c,
      items: c.items
        .filter((i) => i.saved.startsWith(year))
        .sort((a, b) => b.saved.localeCompare(a.saved)),
    }))
    .filter((c) => c.items.length > 0)
    .sort((a, b) => Number(b.name === 'AI minds') - Number(a.name === 'AI minds'))

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

      {shown.map((c, ci) => (
        <div
          key={c.name}
          className={
            ci === 0
              ? 'mb-10'
              : 'mb-10 pt-8 border-t border-neutral-300 dark:border-neutral-700'
          }
        >
          <h2 className="font-bold text-[22px] leading-tight mb-5">
            {c.name} <span className="text-neutral-500 font-normal text-[13px]">· {c.items.length}</span>
          </h2>
          <ul className="space-y-5">
            {c.items.map((i, n) => {
              const month = monthLabel(i.saved)
              const newMonth = n === 0 || month !== monthLabel(c.items[n - 1].saved)
              return (
                <li key={i.url} className={newMonth && n > 0 ? 'pt-3' : undefined}>
                  {newMonth && (
                    <div className="text-[13px] text-neutral-500 mb-1.5">{month}</div>
                  )}
                  <a
                    href={i.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[17px] leading-snug break-words underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-current"
                  >
                    {i.title}
                  </a>
                  <div className="text-[15px] text-neutral-500 leading-snug break-words">{i.author}</div>
                  {i.note && (
                    <div className="text-[15px] text-neutral-500 leading-snug break-words">{i.note}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
