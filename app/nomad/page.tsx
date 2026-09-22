import Link from 'next/link'
import data from './data.json'

export const metadata = {
  title: 'nomad letters',
  description:
    'The Nomad Investment Partnership letters to partners, 2001–2014, by Nick Sleep and Qais Zakaria — readable, with highlights.',
}

type Letter = { id: string; kind: string; period: string; words: number; hl: number }

const MONTH = { '01': 'January', '06': 'June', '12': 'December' } as const

function label(id: string) {
  const [y, m] = id.split('-')
  return `${MONTH[m as keyof typeof MONTH] ?? m} ${y}`
}

export default function Page() {
  const letters = data.letters as unknown as Letter[]
  const words = letters.reduce((n, l) => n + l.words, 0)
  const hl = letters.reduce((n, l) => n + l.hl, 0)
  const years: Record<string, Letter[]> = {}
  for (const l of letters) (years[l.id.slice(0, 4)] ||= []).push(l)

  return (
    <section className="max-w-[40rem]">
      <h1 className="font-bold text-[22px] mb-3">The Nomad letters</h1>
      <p className="text-[18px] leading-[1.6] mb-4">
        Every letter Nick Sleep and Qais Zakaria wrote to the partners of the
        Nomad Investment Partnership, from its launch in September 2001 to its
        closing in 2014. {letters.length} letters, about{' '}
        {Math.round(words / 1000)},000 words.
      </p>
      <p className="text-[18px] leading-[1.6] mb-8">
        <Link href="/nomad/highlights" className="underline font-bold">
          Read the highlights
        </Link>
        <span className="text-neutral-500">
          {' '}— {hl} passages pulled out of the {letters.length} letters, or
          start at the beginning below. Inside a letter you can switch to
          highlights only.
        </span>
      </p>

      {Object.entries(years).map(([year, ls]) => (
        <div key={year} className="mb-8">
          <h2 className="text-[13px] text-neutral-500 mb-2">{year}</h2>
          <ul className="space-y-3">
            {ls.map((l) => (
              <li key={l.id}>
                <Link href={`/nomad/${l.id}`} className="text-[18px] underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-current">
                  {l.kind} letter, {label(l.id)}
                </Link>
                <div className="text-[13px] text-neutral-500">
                  {l.words.toLocaleString()} words · {Math.max(1, Math.round(l.words / 250))} min · {l.hl} highlights
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-[13px] text-neutral-500 leading-[1.6] mt-10 pt-6 border-t border-neutral-300 dark:border-neutral-700">
        Written by Nick Sleep and Qais Zakaria, Sleep, Zakaria and Company Ltd.
        Reproduced from the authors&rsquo; approved collection, published for
        free by the{' '}
        <a href="https://www.igyfoundation.org.uk/" target="_blank" rel="noopener noreferrer" className="underline">
          IGY Foundation
        </a>
        . The authors ask that references link to that approved version rather
        than to the copies circulating elsewhere. This page is a reading
        interface only; the words are theirs and are unchanged. Highlighting is
        mine.
      </p>
    </section>
  )
}
