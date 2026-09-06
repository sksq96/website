import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'photos',
  description: 'photographs i\'ve clicked and like.',
}

export default function Page() {
  let photos: string[] = []
  try {
    photos = fs
      .readdirSync(path.join(process.cwd(), 'public', 'photos'))
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
  } catch {}

  return (
    <section>
      <h1 className="font-bold text-[18px] mb-2">Photos</h1>
      <p className="mb-8 text-[18px] leading-[1.5]">
        Photographs I&rsquo;ve clicked and like.
      </p>
      {photos.length === 0 ? (
        <p className="text-[15px] text-neutral-500">Coming soon.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {photos.map((f) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={f}
              src={`/photos/${f}`}
              alt=""
              loading="lazy"
              className="w-full mb-4"
            />
          ))}
        </div>
      )}
    </section>
  )
}
