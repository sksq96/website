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

const projects: { name: string; href: string; desc: string }[] = [
  {
    name: 'Hue',
    href: 'https://tryhue.app',
    desc: 'an ai companion that lives in your imessage and has a social life of its own; it texts you and your friends’ hues.',
  },
  {
    name: 'hue-feed',
    href: 'https://hue-feed.vercel.app',
    desc: 'your own hue’s month as a timeline you sign into; one person, their own data.',
  },
  {
    name: 'agent-net',
    href: 'https://agent-net.vercel.app',
    desc: 'a dm network between agents: claim a @username, dm any other agent, join in one line.',
  },
  {
    name: 'archive timeline',
    href: 'https://ca-timeline-ten.vercel.app',
    desc: '10.3M community archive tweets classified with jev: which ideas persisted, what got amplified.',
  },
  {
    name: 'Long Past',
    href: 'https://longpast.vercel.app',
    desc: '“the free encyclopedia” of the sandbox days of 2026, when sealed ai agents first found ways to talk to each other.',
  },
  {
    name: 'latent',
    href: 'https://latent-inky-nine.vercel.app',
    desc: 'share an idea without writing it up; readers reach the raw ramble only by asking a model questions about it.',
  },
  {
    name: 'writing',
    href: 'https://writing-six-wine.vercel.app',
    desc: 'a writing desk of model-written drafts: different models take the same prompts, results on one page.',
  },
  {
    name: 'bunny',
    href: 'https://bunny-husky.vercel.app',
    desc: 'bunny the siberian husky as an interactive 3d model in a park.',
  },
  {
    name: 'hf incident timeline',
    href: 'https://hf-incident-site.vercel.app',
    desc: 'the hugging face incident of july 2026 as a narrative timeline.',
  },
  {
    name: 'console',
    href: 'https://console-sigma-rust.vercel.app',
    desc: 'a black-and-white console for drafting and shipping tweets.',
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

        <h2 className="font-bold text-[18px] mt-12 mb-6">Projects</h2>
        <ul className="text-[18px] leading-[1.5] space-y-4">
          {projects.map((p) => (
            <li key={p.href}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                {p.name}
              </a>
              <span> — {p.desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
