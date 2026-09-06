import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'photos',
  description: 'photographs i\'ve clicked and like.',
}

type Photo = { name: string; w: number; h: number; date: string }

// EXIF date "2025:09:13 17:38:47" -> "2025"
function yearLabel(date: string) {
  const y = date.split(':')[0]
  return /^\d{4}$/.test(y) ? y : 'Undated'
}

// deterministic pseudo-random per photo, so the mess is stable across builds
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = ((h ^ s.charCodeAt(i)) * 16777619) >>> 0
  return h
}

export default function Page() {
  let photos: Photo[] = []
  try {
    photos = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', 'photos', 'manifest.json'), 'utf8')
    )
  } catch {}

  const groups: { label: string; items: Photo[] }[] = []
  for (const p of photos) {
    const label = p.date ? yearLabel(p.date) : 'Undated'
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.items.push(p)
    else groups.push({ label, items: [p] })
  }

  return (
    <section>
      {photos.length === 0 ? (
        <p className="text-[15px] text-neutral-500">Coming soon.</p>
      ) : (
        groups.map((g) => (
          <div key={g.label} className="mb-10">
            <h2 className="font-bold text-[18px] mb-6">{g.label}</h2>
            <div className="flex flex-wrap items-start gap-4 justify-center md:justify-start">
              {g.items.map((p) => {
                const h = hash(p.name)
                const width = 190 + ((h >> 4) % 150) // 190..339 px
                const mt = (h >> 8) % 20 // 0..19 px gentle stagger
                return (
                  <a
                    key={p.name}
                    href={`/photos/full/${p.name}.jpg`}
                    target="_blank"
                    rel="noopener"
                    style={{
                      ['--w' as string]: `${width}px`,
                      marginTop: mt,
                    }}
                    className="block relative w-[calc(var(--w)*0.72)] md:w-[calc(var(--w)*1.4)] hover:scale-105 hover:z-10 transition-transform duration-200 bg-white p-1.5 pb-4 shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/photos/thumbs/${p.name}.webp`}
                      alt=""
                      width={p.w}
                      height={p.h}
                      loading="lazy"
                      decoding="async"
                      className="w-full"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        ))
      )}
    </section>
  )
}
