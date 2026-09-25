import { Archivo, Source_Serif_4 } from 'next/font/google'
import data from './data.json'
import './aw.css'

// The Agentworld brief in its own visual language (blue on white, wide heavy
// display type, outlined pull quotes, serif body) rather than the site theme.
// Text and figures come from the PDF via scripts/agentworld.

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--aw-display' })
const serif = Source_Serif_4({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--aw-serif' })

export const metadata = {
  title: 'agentworld',
  description:
    'Agentworld: a preemptive anthropology of open-world centaur societies. Benjamin Bratton’s brief for the Antikythera research unit, readable, with highlights.',
}

const PDF = 'https://cdn.antikythera.org/agentworld/Antikythera_AGENTWORLD-Brief.pdf'
const SITE = 'https://agentworld.antikythera.org'

type Block = {
  t: string
  text?: string
  hl?: string[]
  src?: string
  w?: number
  h?: number
  alt?: string
  title?: string
  intro?: string
  note?: string
  items?: (string | { term: string; text: string })[]
  rows?: string[][]
  href?: string
}

const blocks = data.blocks as Block[]
const slug = (s: string) => s.toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// group the flat block list into sections, one per chapter heading
const sections: { id: string; title: string; blocks: Block[] }[] = []
for (const b of blocks) {
  if (b.t === 'h2') sections.push({ id: slug(b.text!), title: b.text!, blocks: [] })
  sections.at(-1)?.blocks.push(b)
}
const total = blocks.reduce((n, b) => n + (b.hl?.length || 0), 0)

// marks each highlighted passage in place without touching the text
function mark(text: string, quotes: string[] = []) {
  const spans = quotes
    .map((q) => ({ s: text.indexOf(q), q }))
    .filter((x) => x.s !== -1)
    .sort((a, b) => a.s - b.s)
  if (!spans.length) return text
  const out: React.ReactNode[] = []
  let at = 0
  spans.forEach(({ s, q }, i) => {
    if (s < at) return
    if (s > at) out.push(text.slice(at, s))
    out.push(<mark key={i} data-s={data.status}>{q}</mark>)
    at = s + q.length
  })
  if (at < text.length) out.push(text.slice(at))
  return out
}

function Heading({ text }: { text: string }) {
  const m = text.match(/^(\d+\.)\s*(.*)$/)
  return (
    <h2 className="aw-d aw-h2">
      {m && <span className="aw-o">{m[1]} </span>}
      {m ? m[2] : text}
    </h2>
  )
}

function Block({ b }: { b: Block }) {
  const hl = b.hl?.length ? { 'data-hl': '1' } : {}
  switch (b.t) {
    case 'h2':
      return <Heading text={b.text!} />
    case 'h3': {
      const m = b.text!.match(/^(\d+\.\d+)\s*(.*)$/)
      return (
        <h3 className="aw-d aw-h3">
          {m ? <><span className="aw-n">{m[1]}</span><span>{m[2]}</span></> : <span>{b.text}</span>}
        </h3>
      )
    }
    case 'lead':
      return <p className="aw-lead" {...hl}>{mark(b.text!, b.hl)}</p>
    case 'p':
      return <p className="aw-p" {...hl}>{mark(b.text!, b.hl)}</p>
    case 'quote':
      return <blockquote className="aw-d aw-o aw-q">{b.text}</blockquote>
    case 'scenario':
      return (
        <p className="aw-sc">
          <span className="aw-d">Scenario:</span> {b.text}
        </p>
      )
    case 'fig':
      return (
        <figure className="aw-fig">
          <img src={b.src} width={b.w} height={b.h} alt={b.alt} loading="lazy" decoding="async" />
        </figure>
      )
    case 'lexicon':
      return (
        <aside className="aw-box">
          <p className="aw-small">{b.intro}</p>
          <h4 className="aw-d">{b.title}</h4>
          <dl>
            {(b.items as { term: string; text: string }[]).map((x) => (
              <div key={x.term}>
                <dt>{x.term}</dt> <dd>{x.text}</dd>
              </div>
            ))}
          </dl>
          <p className="aw-small">{b.note}</p>
        </aside>
      )
    case 'fromto':
      return (
        <div className="aw-ft">
          {b.rows!.map(([a, z]) => (
            <div key={a}>
              <span>{a}</span>
              <span aria-hidden>→</span>
              <span>{z}</span>
            </div>
          ))}
        </div>
      )
    case 'questions':
      return (
        <ol className="aw-qs">
          {(b.items as string[]).map((q, i) => (
            <li key={i}>
              <span className="aw-d">{i + 1}.</span> {q}
            </li>
          ))}
        </ol>
      )
    case 'ul':
      return (
        <ul className="aw-ul">
          {(b.items as string[]).map((x) => <li key={x}>{x}</li>)}
        </ul>
      )
    case 'small':
      return <p className="aw-small aw-inv-p">{b.text}</p>
    case 'masthead':
      return (
        <dl className="aw-mast">
          {b.rows!.map(([r, n]) => (
            <div key={r}>
              <dt>{r}</dt>
              <dd>{n}</dd>
            </div>
          ))}
        </dl>
      )
    case 'cta':
      return (
        <a href={b.href} target="_blank" rel="noopener noreferrer" className="aw-d aw-cta">
          {b.text}
        </a>
      )
  }
  return null
}

export default function Page() {
  return (
    <div className={`aw ${display.variable} ${serif.variable}`}>
      {/* css-only toggle: no client js needed to hide the unmarked text */}
      <input type="radio" name="aw-mode" id="aw-full" className="sr-only" defaultChecked />
      <input type="radio" name="aw-mode" id="aw-only" className="sr-only" />

      <div className="md:grid md:grid-cols-[13rem_minmax(0,44rem)] md:gap-12">
        <aside className="aw-rail">
          <div className="aw-card">
            <div className="aw-d text-[15px] normal-case tracking-normal">antikythera journal</div>
            <div>AGENTWORLD</div>
            <div>
              by <a href="https://bratton.info" target="_blank" rel="noopener noreferrer" className="underline">Benjamin Bratton</a>
            </div>
            <div className="flex justify-between mt-2">
              <span>Call for Papers</span>
              <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline">pdf ↗</a>
            </div>
          </div>
          <div className="aw-toggle">
            <label htmlFor="aw-full" className="aw-pill aw-full">full brief</label>
            <label htmlFor="aw-only" className="aw-pill aw-hl">highlights only ({total})</label>
          </div>
          <p className="aw-small mt-2">
            <mark data-s={data.status}>dashed</mark> = {data.status} highlight
          </p>
        </aside>

        <div className="aw-flow">
          <img src="/agentworld/cover.webp" width={1100} height={1424} alt="Agentworld, cover" className="aw-cover" />

          <header className="mb-14">
            <h1 className="aw-d aw-title">Agentworld</h1>
            <p className="aw-d aw-o aw-sub">A preemptive anthropology of open-world centaur societies</p>
          </header>

          <nav className="aw-toc aw-d" aria-label="contents">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>{s.title}</a>
            ))}
          </nav>

          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              {s.blocks.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}

          <p className="aw-small aw-colophon">
            Benjamin Bratton, <i>Agentworld: Scenarios for a Preemptive Anthropology of Open-World Centaur Societies</i>,
            Antikythera research unit brief and call for papers (2026). Text as published, set for the web; figures
            rendered from the{' '}
            <a href={PDF} target="_blank" rel="noopener noreferrer" className="underline">original PDF</a>. Submit at{' '}
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="underline">agentworld.antikythera.org</a>.
            The highlighting is mine, not the author’s.
          </p>
        </div>
      </div>

      <div className="aw-spine aw-d" aria-hidden>
        <span>Agentworld</span>
        <span className="aw-o">Scenarios for a preemptive anthropology of open-world centaur societies</span>
      </div>
    </div>
  )
}
