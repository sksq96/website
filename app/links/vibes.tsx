'use client'

import { useState } from 'react'
import vibes from './vibes.json'

type Vibe = {
  title: string; kind: string[]; media: [string, number, number][]; note: string
  maker: string; via: string; post: string; try?: string; clip?: boolean
}

export default function Vibes() {
  const all = vibes as Vibe[]
  const kinds = ['all', ...[...new Set(all.map((v) => v.kind[0]))].sort()]
  const [kind, setKind] = useState('all')
  const shown = all.filter((v) => kind === 'all' || v.kind[0] === kind)

  return (
    <div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8 text-[15px]">
        {kinds.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={k === kind ? 'font-bold underline' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}
          >
            {k.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-5">
        {shown.map((v) => (
          <div key={v.post + v.title} className="break-inside-avoid mb-7">
            <a href={v.try || v.post} target="_blank" rel="noopener noreferrer" className="relative grid gap-px no-underline group" style={{ gridTemplateColumns: v.media.map(([, w, h]) => `${(w / h) * 100}fr`).join(' '), aspectRatio: Math.max(0.8, v.media.reduce((a, [, w, h]) => a + w / h, 0)) }}>
              {v.media.map(([src]) => (
                <img
                  key={src}
                  src={src}
                  alt={v.title}
                  loading="lazy"
                  className="w-full h-full object-cover bg-neutral-200 dark:bg-neutral-800 transition-opacity group-hover:opacity-85"
                />
              ))}
              {v.clip && (
                <span className="absolute top-2 right-2 text-[11px] leading-none px-1.5 py-1 bg-black/60 text-white">▶</span>
              )}
            </a>
            <a href={v.post} target="_blank" rel="noopener noreferrer" className="block mt-2 font-bold text-[17px] leading-tight">
              {v.title}
            </a>
            <p className="mt-1 text-[14px] leading-snug">{v.note}</p>
            <p className="mt-1 text-[13px] text-neutral-500">
              {v.kind[0].toLowerCase()} · {v.maker || v.via || new URL(v.post, 'https://shubham.lol').hostname.replace('www.', '')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
