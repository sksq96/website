import Link from 'next/link'
import data from '../data.json'

export const metadata = {
  title: 'nomad — highlights',
  description: 'The passages worth returning to, from the Nomad letters 2001–2014.',
}

type Letter = {
  id: string
  kind: string
  period: string
  highlights: { para: number; quote: string; why: string }[]
}

const MONTH = { '01': 'January', '06': 'June', '12': 'December' } as const
const label = (id: string) => {
  const [y, m] = id.split('-')
  return `${MONTH[m as keyof typeof MONTH] ?? m} ${y}`
}

export default function Page() {
  const letters = (data.letters as unknown as Letter[]).filter((l) => l.highlights.length)
  const total = letters.reduce((n, l) => n + l.highlights.length, 0)

  return (
    <section className="max-w-[36rem]">
      <div className="text-[13px] text-neutral-500 mb-6">
        <Link href="/nomad" className="underline">all letters</Link>
      </div>

      <h1 className="font-bold text-[22px] mb-2">Highlights</h1>
      <p className="text-[18px] leading-[1.6] mb-10">
        {total} passages from the {letters.length} letters, in order. Every word
        is theirs; the choosing is mine.
      </p>

      {letters.map((l) => (
        <div key={l.id} className="mb-10 pt-8 border-t border-neutral-300 dark:border-neutral-700 first:border-0 first:pt-0">
          <h2 className="font-bold text-[15px] mb-5">
            <Link href={`/nomad/${l.id}`} className="underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-current">
              {l.kind} letter, {label(l.id)}
            </Link>
          </h2>
          <ul className="space-y-7">
            {l.highlights.map((h, n) => (
              <li key={n}>
                <blockquote className="text-[19px] leading-[1.7] font-normal border-l border-neutral-400 dark:border-neutral-600 pl-4">
                  {h.quote}
                </blockquote>
                <div className="text-[13px] text-neutral-500 mt-1.5 pl-4">{h.why}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-[13px] text-neutral-500 leading-[1.6] mt-10 pt-6 border-t border-neutral-300 dark:border-neutral-700">
        Nick Sleep and Qais Zakaria, Nomad Investment Partnership. From the
        authors&rsquo; approved collection published by the{' '}
        <a href="https://www.igyfoundation.org.uk/" target="_blank" rel="noopener noreferrer" className="underline">
          IGY Foundation
        </a>
        . Quoted verbatim.
      </p>
    </section>
  )
}
