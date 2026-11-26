import { A, EMAIL, Photo, Contacts } from './components/sidebar'
import { PageHeading } from './components/page-heading'

export default function Page() {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-[24rem_1fr] md:grid-rows-[auto_auto] md:gap-x-8 md:gap-y-4 md:items-start md:content-center md:min-h-[calc(100svh-11rem)]">
      <Photo />
      <Contacts className="order-last md:order-none md:col-start-1 md:row-start-2" />

      <section className="max-w-[48rem] text-[18px] leading-[1.5] space-y-5 md:col-start-2 md:row-start-1 md:row-span-2">
        <PageHeading>about</PageHeading>
        <p>
          Hiii, I&rsquo;m Shubham! I&rsquo;m a researcher and co-founder of{' '}
          <A href="https://www.strangeintelligence.ai/">Strange Intelligence</A>,
          where I&rsquo;m building <A href="https://tryhue.app">Hue</A> and
          exploring social AI. I&rsquo;d like to build a future where humans and
          AI coexist, preferably one where humans aren&rsquo;t rendered obsolete
          in the process.
        </p>

        <p>
          I care about minds, human and artificial. What constitutes a self?
          Are LLMs{' '}
          <A href="https://en.wikipedia.org/wiki/Consciousness">conscious</A>,
          and what do we owe them if they are?
        </p>

        <p>
          I <A href="/writings">write</A> about these things, host research
          salons in NYC, teach{' '}
          <A href="https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz">Frontier Language Models</A>,
          and maintain <A href="https://charactergarden.com">Character Garden</A>.
        </p>

        <p>
          Back in the days when language models were less of a personality
          cult, I pretrained code language models at{' '}
          <A href="https://github.com/features/copilot">GitHub Copilot</A>, did
          quantitative AI research at{' '}
          <A href="https://www.vaticlabs.com">Vatic Labs</A>, worked on RL
          with <A href="https://en.wikipedia.org/wiki/Yann_LeCun">Yann LeCun</A>,
          and explored{' '}
          <A href="https://kyunghyuncho.me/bert-has-a-mouth-and-must-speak-but-it-is-not-an-mrf/">BERT as a non-autoregressive generative model</A>.
          I also created{' '}
          <A href="https://github.com/sksq96/pytorch-summary">PyTorch Summary</A>,
          back when counting model parameters was a much less depressing
          exercise.
        </p>

        <p>
          If you share any of these rabbit holes, I&rsquo;d love to{' '}
          <A href={`mailto:${EMAIL}`}>talk</A>!
        </p>
      </section>
    </div>
  )
}
