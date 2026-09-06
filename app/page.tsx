const EMAIL = 'shubhamchandel@nyu.edu'

const contacts = [
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7L22 7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sksq96',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/chandelshubham',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
        <path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.749-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
  {
    label: 'Links',
    href: '/links',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
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

      <div className="flex items-center gap-5 order-last md:order-none md:col-start-1 md:row-start-2">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            aria-label={c.label}
            {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {c.icon}
          </a>
        ))}
        <a
          href="https://x.com/sksq96"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[15px]"
        >
          twitter
        </a>
      </div>

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
          <A href={`mailto:${EMAIL}`}>email</A>.
        </p>
      </section>
    </div>
  )
}
