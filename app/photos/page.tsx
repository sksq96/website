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
            <h2 className="font-bold text-[18px] mb-4">{g.label}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[8rem] md:auto-rows-[11rem] gap-3 grid-flow-dense">
              {g.items.map((p, i) => {
                const portrait = p.h > p.w
                const big = !portrait && i % 7 === 3
                const wide = !portrait && !big && i % 5 === 1
                const span = portrait
                  ? 'row-span-2'
                  : big
                  ? 'col-span-2 row-span-2'
                  : wide
                  ? 'col-span-2'
                  : ''
                return (
                  <a
                    key={p.name}
                    href={`/photos/full/${p.name}.jpg`}
                    target="_blank"
                    rel="noopener"
                    className={`block ${span}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/photos/thumbs/${p.name}.webp`}
                      alt=""
                      width={p.w}
                      height={p.h}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
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
