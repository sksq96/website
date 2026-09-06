export const metadata = {
  title: 'work',
  description: 'things i\'ve made.',
}

type Item = { name: string; href: string; desc: string }

const items: Item[] = [
  {
    name: 'Hue',
    href: 'https://tryhue.app',
    desc: 'personal intelligence. like ai, but it actually knows you.',
  },
  {
    name: 'Strange Intelligence',
    href: 'https://www.strangeintelligence.ai/',
    desc: 'the company where hue is being built.',
  },
  {
    name: 'Frontier Language Models',
    href: 'https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz',
    desc: 'a course on llms from the ground up. all lectures on youtube.',
  },
  {
    name: 'pytorch-summary',
    href: 'https://github.com/sksq96/pytorch-summary',
    desc: 'model summaries in pytorch, à la keras. 4.1k★ on github.',
  },
]

export default function Page() {
  return (
    <section className="max-w-[42rem]">
      <h1 className="font-bold text-[18px] mb-6">Work</h1>
      <ul className="text-[18px] leading-[1.5] space-y-5">
        {items.map((p) => (
          <li key={p.href}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline font-bold">
              {p.name}
            </a>
            <span> — {p.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
