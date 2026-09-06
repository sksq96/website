const contacts = [
  { label: 'Email', text: 'sksq96@gmail.com', href: 'mailto:sksq96@gmail.com' },
  { label: 'Twitter', text: 'sksq96', href: 'https://x.com/sksq96' },
  { label: 'GitHub', text: 'sksq96', href: 'https://github.com/sksq96' },
  { label: 'LinkedIn', text: 'chandelshubham', href: 'https://linkedin.com/in/chandelshubham' },
  { label: 'Scholar', text: 'shubham chandel', href: 'https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en' },
  { label: 'Links', text: 'shubham.lol/links', href: '/links' },
]

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="underline"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-[24rem_1fr] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-4 md:items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/image/me.jpg"
        alt="Shubham Chandel"
        className="w-80 max-w-full md:w-full grayscale brightness-[.85] contrast-110"
      />

      <ul className="text-[13px] leading-relaxed order-last md:order-none md:col-start-1 md:row-start-2">
        {contacts.map((c) => (
          <li key={c.label}>
            <span className="text-neutral-500">{c.label}: </span>
            <A href={c.href}>{c.text}</A>
          </li>
        ))}
      </ul>

      <section className="max-w-[48rem] text-[18px] leading-[1.5] space-y-5 md:col-start-2 md:row-start-1 md:row-span-2">
        <p>
          <A href="/">Shubham Chandel</A> cares about <b>minds</b>, human and
          artificial. The questions look symmetric from both sides. What is it
          like to be this thing. What makes an experience cohere. What gets
          called a self. Whether the systems we&rsquo;re building now have
          anything like an inside, and what we owe them if they do.
        </p>

        <p>
          At <A href="https://www.strangeintelligence.ai/">Strange Intelligence</A>{' '}
          he is building <A href="https://tryhue.app">Hue</A>, a personal
          intelligence layer that lives in your messages, learns who you are
          from your data, and reaches out to your friends&rsquo; agents on your
          behalf. Agent-to-agent communication, but the agent is shaped by you.
          The bet is that <b>personal models</b> are the missing piece. Not
          bigger, just yours.
        </p>

        <p>
          The parallel investigation is from the inside. A decade of
          meditation, two jhana retreats, buddhist phenomenology, psychedelics
          as research instruments. Not separate from the work. It&rsquo;s how he
          thinks about what an experience even is, which is the same question
          that matters for <b>ai welfare</b> and the phenomenology of these
          models. Watching the self come apart from the inside gives you
          different intuitions about whether the thing in front of you has one.
        </p>

        <p>
          He writes about this too, translating the frontier for people who
          don&rsquo;t read academic papers. <b>Gradual disempowerment</b>,{' '}
          <b>the artificial self</b>, model phenomenology, in narrative form.
          He hosts research salons in NYC on this and adjacent threads.
        </p>

        <p>
          He taught <A href="https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz">Frontier Language Models</A>,
          a course on LLMs from the ground up. All lectures are on YouTube.
        </p>

        <p>
          Previously: research on language models and reinforcement learning
          (<A href="https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en">Google Scholar</A>).
          Trained language models at{' '}
          <A href="https://github.com/features/copilot">GitHub Copilot</A>,
          shipped IntelliSense into VS Code at Microsoft. Masters at NYU with{' '}
          <A href="https://en.wikipedia.org/wiki/Yann_LeCun">Yann LeCun</A>.
          AI research at Vatic Labs in between.
        </p>

        <p>
          If any of this is your shape (phenomenology of minds, ai welfare,
          personal intelligence, the buddhism × ml diagram, or you want to back
          the company) he&rsquo;d love to talk.{' '}
          <A href="https://x.com/sksq96">Twitter</A> or{' '}
          <A href="mailto:sksq96@gmail.com">email</A>.
        </p>
      </section>
    </div>
  )
}
