export const metadata = {
  title: 'projects',
  description: 'things i\'ve built.',
}

type Project = { name: string; href: string; desc?: string }

const projects: Project[] = []

export default function Page() {
  return (
    <section className="max-w-[42rem]">
      <h1 className="font-bold text-[18px] mb-2">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-[15px] text-neutral-500">Coming soon.</p>
      ) : (
        <ul className="text-[18px] leading-[1.5] space-y-4">
          {projects.map((p) => (
            <li key={p.href}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline">
                {p.name}
              </a>
              {p.desc && <span> — {p.desc}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
