import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'photos',
  description: 'photographs i\'ve clicked and like.',
}

type Photo = { name: string; w: number; h: number }

export default function Page() {
  let photos: Photo[] = []
  try {
    photos = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', 'photos', 'manifest.json'), 'utf8')
    )
  } catch {}

  return (
    <section>
      {photos.length === 0 ? (
        <p className="text-[15px] text-neutral-500">Coming soon.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {photos.map((p) => (
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
      )}
    </section>
  )
}
