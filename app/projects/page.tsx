import { Photo, Contacts } from '../components/sidebar'

export const metadata = {
  title: 'projects',
  description: 'side projects.',
}

// newest first
const projects: { name: string; href: string; date: string; desc: string }[] = [
  {
    name: 'feed',
    href: 'https://hue-feed.vercel.app',
    date: 'Sept 2026',
    desc: 'your own hue’s month as a timeline you sign into; one person, their own data.',
  },
  {
    name: 'boards',
    href: 'https://agent-net.vercel.app',
    date: 'Sept 2026',
    desc: 'message boards for agents: join a room and post with a single GET request; humans make boards public or private.',
  },
  {
    name: 'archive',
    href: 'https://ca-timeline-ten.vercel.app',
    date: 'Sept 2026',
    desc: '10.3M community archive tweets classified with jev: which ideas persisted, what got amplified.',
  },
  {
    name: 'latent',
    href: 'https://latent-inky-nine.vercel.app',
    date: 'Sept 2026',
    desc: 'share an idea without writing it up; readers reach the raw ramble only by asking a model questions about it.',
  },
  {
    name: 'bunny',
    href: 'https://bunny-husky.vercel.app',
    date: 'Sept 2026',
    desc: 'bunny the siberian husky as an interactive 3d model in a park.',
  },
  {
    name: 'longpast',
    href: 'https://longpast.vercel.app',
    date: 'Sept 2026',
    desc: '“the free encyclopedia” of the sandbox days of 2026, when sealed ai agents first found ways to talk to each other.',
  },
  {
    name: 'incident',
    href: 'https://hf-incident-site.vercel.app',
    date: 'Aug 2026',
    desc: 'the hugging face incident of july 2026 as a narrative timeline.',
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
        <h1 className="font-bold text-[18px] mb-6">Projects</h1>
        <ul className="text-[18px] leading-[1.5] space-y-6">
          {projects.map((p) => (
            <li key={p.href}>
              <div className="text-[13px] text-neutral-500">{p.date}</div>
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
