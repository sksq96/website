import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../data.json'
import Reader from '../reader'

type Highlight = { para: number; quote: string; why: string }
type Letter = {
  id: string
  kind: string
  period: string
  words: number
  hl: number
  paras: string[]
  highlights: Highlight[]
}

const letters = data.letters as unknown as Letter[]

export function generateStaticParams() {
  return letters.map((l) => ({ id: l.id }))
}

const MONTH = { '01': 'January', '06': 'June', '12': 'December' } as const
const label = (id: string) => {
  const [y, m] = id.split('-')
  return `${MONTH[m as keyof typeof MONTH] ?? m} ${y}`
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const l = letters.find((x) => x.id === id)
  return l ? { title: `nomad — ${l.kind.toLowerCase()} letter, ${label(l.id)}` } : {}
}

// Splits a paragraph around its highlighted passages so they can be marked in
// place without touching the text itself.
function render(text: string, quotes: string[]) {
  const spans: { s: number; e: number }[] = []
  for (const q of quotes) {
    const s = text.indexOf(q)
    if (s !== -1) spans.push({ s, e: s + q.length })
  }
  if (!spans.length) return text
  spans.sort((a, b) => a.s - b.s)
  const out: React.ReactNode[] = []
  let at = 0
  spans.forEach((sp, i) => {
    if (sp.s < at) return
    if (sp.s > at) out.push(text.slice(at, sp.s))
    out.push(<mark key={i}>{text.slice(sp.s, sp.e)}</mark>)
    at = sp.e
  })
  if (at < text.length) out.push(text.slice(at))
  return out
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const i = letters.findIndex((l) => l.id === id)
  if (i === -1) notFound()
  const l = letters[i]
  const prev = letters[i - 1]
  const next = letters[i + 1]

  const byPara = new Map<number, string[]>()
  for (const h of l.highlights) {
    byPara.set(h.para, [...(byPara.get(h.para) || []), h.quote])
  }

  return (
    <section className="max-w-[36rem]">
      <div className="text-[13px] text-neutral-500 mb-6">
        <Link href="/nomad" className="underline">all letters</Link>
      </div>

      <h1 className="font-bold text-[22px] leading-tight mb-1">
        {l.kind} letter, {label(l.id)}
      </h1>
      <p className="text-[13px] text-neutral-500 mb-8">
        For the period ended {l.period} · {l.words.toLocaleString()} words ·{' '}
        {Math.max(1, Math.round(l.words / 250))} min
      </p>

      <Reader count={l.highlights.length}>
        {l.paras.map((p, n) => {
          const quotes = byPara.get(n)
          return (
            <p
              key={n}
              {...(quotes ? { 'data-hl': '1' } : {})}
              className="text-[19px] leading-[1.7] mb-5 font-normal"
            >
              {quotes ? render(p, quotes) : p}
            </p>
          )
        })}
      </Reader>

      <nav className="flex justify-between gap-4 text-[15px] mt-12 pt-6 border-t border-neutral-300 dark:border-neutral-700">
        {prev ? (
          <Link href={`/nomad/${prev.id}`} className="underline">← {label(prev.id)}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/nomad/${next.id}`} className="underline">{label(next.id)} →</Link>
        ) : <span />}
      </nav>

      <p className="text-[13px] text-neutral-500 leading-[1.6] mt-8">
        Nick Sleep and Qais Zakaria. From the authors&rsquo; approved collection
        published by the{' '}
        <a href="https://www.igyfoundation.org.uk/" target="_blank" rel="noopener noreferrer" className="underline">
          IGY Foundation
        </a>
        . Text unchanged; the highlighting is mine.
      </p>
    </section>
  )
}
