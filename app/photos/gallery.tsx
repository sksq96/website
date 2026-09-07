'use client'

import { useEffect, useState } from 'react'

export type Photo = { name: string; w: number; h: number; date: string }
export type Group = { label: string; items: Photo[] }

// deterministic pseudo-random per photo, so the layout is stable
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = ((h ^ s.charCodeAt(i)) * 16777619) >>> 0
  return h
}

export default function Gallery({ groups }: { groups: Group[] }) {
  const flat = groups.flatMap((g) => g.items)
  const [idx, setIdx] = useState<number | null>(null)

  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null)
      if (e.key === 'ArrowRight') setIdx((i) => (i === null ? null : (i + 1) % flat.length))
      if (e.key === 'ArrowLeft') setIdx((i) => (i === null ? null : (i - 1 + flat.length) % flat.length))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [idx === null, flat.length])

  let offset = 0
  const sections = groups.map((g) => {
    const start = offset
    offset += g.items.length
    return { ...g, start }
  })

  return (
    <>
      {sections.map((g) => (
        <div key={g.label} className="mb-10">
          <h2 className="font-bold text-[18px] mb-6">{g.label}</h2>
          {/* phone: dense google-photos tiling, edge to edge. desktop: scattered prints */}
          <div className="grid grid-cols-3 grid-flow-dense gap-0.5 -mx-5 md:mx-0 md:flex md:flex-wrap md:items-start md:gap-4">
            {g.items.map((p, i) => {
              const h = hash(p.name)
              const width = 190 + ((h >> 4) % 150)
              const mt = (h >> 8) % 20
              const big = h % 9 < 2
              return (
                <button
                  key={p.name}
                  onClick={() => setIdx(g.start + i)}
                  style={{ ['--w' as string]: `${width}px`, ['--mt' as string]: `${mt}px` }}
                  className={`block relative aspect-square ${big ? 'col-span-2 row-span-2' : ''} md:aspect-auto md:w-[calc(var(--w)*1.4)] md:mt-(--mt) md:hover:scale-105 md:hover:z-10 transition-transform duration-200 md:bg-white md:p-1.5 md:pb-4 md:shadow-[0_2px_10px_rgba(0,0,0,0.18)] cursor-pointer`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/photos/thumbs/${p.name}.webp`}
                    alt=""
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover md:h-auto"
                  />
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {idx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIdx(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/photos/full/${flat[idx].name}.jpg`}
            alt=""
            className="max-h-[92vh] max-w-[94vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="previous photo"
            onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + flat.length) % flat.length) }}
            className="absolute left-0 top-0 h-full px-4 md:px-6 text-white/80 hover:text-white text-4xl cursor-pointer"
          >
            ‹
          </button>
          <button
            aria-label="next photo"
            onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % flat.length) }}
            className="absolute right-0 top-0 h-full px-4 md:px-6 text-white/80 hover:text-white text-4xl cursor-pointer"
          >
            ›
          </button>
          <button
            aria-label="close"
            onClick={() => setIdx(null)}
            className="absolute top-3 right-4 text-white/80 hover:text-white text-3xl cursor-pointer"
          >
            ×
          </button>
          <div className="absolute bottom-3 inset-x-0 text-center text-white/60 text-[13px]">
            {idx + 1} / {flat.length}
          </div>
          {/* preload neighbors */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/photos/full/${flat[(idx + 1) % flat.length].name}.jpg`} alt="" className="hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/photos/full/${flat[(idx - 1 + flat.length) % flat.length].name}.jpg`} alt="" className="hidden" />
        </div>
      )}
    </>
  )
}
