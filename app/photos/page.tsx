import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'photos',
  description: 'photographs i\'ve clicked and like.',
}

type Photo = { name: string; w: number; h: number; date: string }

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

// EXIF date "2025:09:13 17:38:47" -> "September 2025"
function monthLabel(date: string) {
  const [y, m] = date.split(':')
  const i = parseInt(m, 10) - 1
  return MONTHS[i] ? `${MONTHS[i]} ${y}` : 'Undated'
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
    const label = p.date ? monthLabel(p.date) : 'Undated'
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
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {g.items.map((p) => (
                <a
                  key={p.name}
                  href={`/photos/full/${p.name}.jpg`}
                  target="_blank"
                  rel="noopener"
                  className="block mb-4"
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
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  )
}
