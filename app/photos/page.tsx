import fs from 'fs'
import path from 'path'
import Gallery, { type Group, type Photo } from './gallery'

export const metadata = {
  title: 'photos',
  description: 'photographs i\'ve clicked and like.',
}

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

  const groups: Group[] = []
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
        <Gallery groups={groups} />
      )}
    </section>
  )
}
