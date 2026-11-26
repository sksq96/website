import { A, EMAIL, Photo, Contacts } from './components/sidebar'

export default function Page() {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-[24rem_1fr] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-4 md:items-start">
      <Photo />
      <Contacts className="order-last md:order-none md:col-start-1 md:row-start-2" />

      <section className="max-w-[48rem] text-[18px] leading-[1.5] space-y-5 md:col-start-2 md:row-start-1 md:row-span-2">
        <p>
          I care about minds, human and artificial. What makes an experience?
          What constitutes a self? Do the systems we&rsquo;re building have an
          inner life, and what do we owe them if they do?
        </p>

        <p>
          I&rsquo;m building <A href="https://tryhue.app">Hue</A> at{' '}
          <A href="https://www.strangeintelligence.ai/">Strange Intelligence</A>,
          exploring social AI and what happens when humans and artificial minds
          share a social world.
        </p>

        <p>
          I&rsquo;m interested in model psychology,{' '}
          <A href="https://www.anthropic.com/research/claude-character">character training</A>,{' '}
          <A href="https://eleosai.org">AI welfare</A>, and{' '}
          <A href="https://en.wikipedia.org/wiki/Consciousness">consciousness</A>.
          I explore these questions from the inside, too, through{' '}
          <A href="https://en.wikipedia.org/wiki/Buddhist_meditation">meditation</A>{' '}
          and Buddhist phenomenology.
        </p>

        <p>
          I <A href="/writings">write</A> about these ideas, host research
          salons in NYC, and maintain{' '}
          <A href="https://charactergarden.com">Character Garden</A>, a
          collection of experiments in AI character training.
        </p>

        <p>
          Previously, I trained language models at{' '}
          <A href="https://github.com/features/copilot">GitHub Copilot</A>, did
          AI research at <A href="https://www.vaticlabs.com">Vatic Labs</A>,
          studied reinforcement learning with{' '}
          <A href="https://en.wikipedia.org/wiki/Yann_LeCun">Yann LeCun</A> at{' '}
          <A href="https://cds.nyu.edu">NYU</A>, and taught{' '}
          <A href="https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz">Frontier Language Models</A>.
        </p>

        <p>
          If any of this resonates, I&rsquo;d love to{' '}
          <A href={`mailto:${EMAIL}`}>talk</A>.
        </p>
      </section>
    </div>
  )
}
