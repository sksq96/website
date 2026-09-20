import { Photo, Contacts } from '../components/sidebar'

export const metadata = {
  title: 'work',
  description: 'things i\'ve made.',
}

type Item = { year: string; name: string; href?: string; desc: string }

const items: Item[] = [
  {
    year: '2025–now',
    name: 'Hue',
    href: 'https://tryhue.app',
    desc: 'personal intelligence. like ai, but it actually knows you. building it at Strange Intelligence, the company i founded.',
  },
  {
    year: '2025',
    name: 'Frontier Language Models',
    href: 'https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz',
    desc: 'taught a course on llms from the ground up. all lectures on youtube.',
  },
  {
    year: '2022–2024',
    name: 'Vatic Labs',
    desc: 'ai research at a quant trading firm. language models meet markets.',
  },
  {
    year: '2020–2022',
    name: 'GitHub Copilot',
    href: 'https://github.com/features/copilot',
    desc: 'trained the language models behind copilot.',
  },
  {
    year: '2019–2020',
    name: 'Microsoft',
    desc: 'shipped intellisense into vs code.',
  },
  {
    year: '2017–2019',
    name: 'NYU',
    href: 'https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en',
    desc: 'masters with yann lecun. research on language models and reinforcement learning.',
  },
  {
    year: '2018',
    name: 'pytorch-summary',
    href: 'https://github.com/sksq96/pytorch-summary',
    desc: 'model summaries in pytorch, à la keras. 4.1k★ on github.',
  },
]

export default function Page() {
  return (
    <div className="md:grid md:grid-cols-[24rem_1fr] md:gap-x-8 md:items-start">
      <aside className="hidden md:block space-y-4">
        <Photo />
        <Contacts />
      </aside>
      <section className="max-w-[42rem]">
        <h1 className="font-bold text-[18px] mb-6">Work</h1>
        <ul className="text-[18px] leading-[1.5] space-y-6">
          {items.map((p) => (
            <li key={p.name}>
              <div className="text-[13px] text-neutral-500">{p.year}</div>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  {p.name}
                </a>
              ) : (
                <span className="font-bold">{p.name}</span>
              )}
              <span> — {p.desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
