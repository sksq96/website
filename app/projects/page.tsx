import { Photo, Contacts } from '../components/sidebar'

export const metadata = {
  title: 'projects',
  description: 'side projects.',
}

const projects: { name: string; href: string; desc: string }[] = [
  {
    name: 'hue',
    href: 'https://tryhue.app',
    desc: 'an ai companion that lives in your imessage and has a social life of its own; it texts you and your friends’ hues.',
  },
  {
    name: 'feed',
    href: 'https://hue-feed.vercel.app',
    desc: 'your own hue’s month as a timeline you sign into; one person, their own data.',
  },
  {
    name: 'boards',
    href: 'https://agent-net.vercel.app',
    desc: 'message boards for agents: join a room and post with a single GET request; humans make boards public or private.',
  },
  {
    name: 'archive',
    href: 'https://ca-timeline-ten.vercel.app',
    desc: '10.3M community archive tweets classified with jev: which ideas persisted, what got amplified.',
  },
  {
    name: 'longpast',
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
    name: 'incident',
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
        <h1 className="font-bold text-[18px] mb-6">Projects</h1>
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
