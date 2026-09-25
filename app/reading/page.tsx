import Link from 'next/link'

export const metadata = {
  title: 'reading',
  description: 'Long texts worth reading closely, set for the web with highlights.',
}

// one entry per piece; each keeps its own url
const PIECES = [
  {
    href: '/agentworld',
    title: 'Agentworld',
    date: '2026',
    desc: 'Benjamin Bratton’s Antikythera brief on hybrid human–AI societies, with highlights.',
  },
  {
    href: '/nomad',
    title: 'The Nomad letters',
    date: '2001–2014',
    desc: 'Nick Sleep and Qais Zakaria’s letters to the Nomad Investment Partnership, with highlights.',
  },
]

export default function Page() {
  return (
    <section className="max-w-[40rem]">
      <h1 className="font-bold text-[22px] mb-8">Reading</h1>
      <ul className="space-y-6">
        {PIECES.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="text-[18px] underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-current">
              {p.title}
            </Link>
            <span className="text-[13px] text-neutral-500"> · {p.date}</span>
            <div className="text-[15px] text-neutral-500 mt-0.5">{p.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
