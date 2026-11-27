import { PageHeading } from 'app/components/page-heading'
import { CenteredContent } from '../components/sidebar'
import Tabs from '../components/tabs'
import Projects from './projects'

export const metadata = {
  title: 'work',
  description: 'things i\'ve made.',
}

type Item = { year: string; name: string; href?: string; desc: string }

const items: Item[] = [
  {
    year: '2025–now',
    name: 'Strange Intelligence',
    href: 'https://www.strangeintelligence.ai/',
    desc: 'co-founder. building hue and exploring social ai.',
  },
  {
    year: '2025',
    name: 'Frontier Language Models',
    href: 'https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz',
    desc: 'taught a course on llms from the ground up.',
  },
  {
    year: '2022–2024',
    name: 'Vatic Labs',
    href: 'https://www.vaticlabs.com',
    desc: 'quantitative ai research.',
  },
  {
    year: '2019–2022',
    name: 'GitHub Copilot, Microsoft',
    href: 'https://github.com/features/copilot',
    desc: 'pretrained the code language models behind copilot.',
  },
  {
    year: '2017–2019',
    name: 'NYU',
    href: 'https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en',
    desc: 'rl research with yann lecun.',
  },
]

export default function Page() {
  return (
    <CenteredContent>
      <PageHeading>work</PageHeading>
      <section>
        <Tabs
          tabs={[
            {
              id: 'career',
              panel: (
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
              ),
            },
            { id: 'projects', panel: <Projects /> },
          ]}
        />
      </section>
    </CenteredContent>
  )
}
