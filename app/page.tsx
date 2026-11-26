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
          exploring social AI.
        </p>

        <p>
          I care about minds, human and artificial. I&rsquo;m curious about
          what makes an experience, how a self emerges, whether language models
          have an inner life, and what we owe them if they do. I explore these
          questions through model psychology,{' '}
          <A href="https://www.anthropic.com/research/claude-character">character training</A>,{' '}
          <A href="https://en.wikipedia.org/wiki/Buddhist_meditation">meditation</A>,
          and Buddhist phenomenology.
        </p>

        <p>
          I <A href="/writings">write</A> about these ideas, host research
          salons in NYC, and maintain{' '}
          <A href="https://charactergarden.com">Character Garden</A>, a
          collection of experiments in AI character training.
        </p>

        <p>
          Previously, I pretrained code language models at{' '}
          <A href="https://github.com/features/copilot">GitHub Copilot</A>, did
          quantitative AI research at{' '}
          <A href="https://www.vaticlabs.com">Vatic Labs</A>, worked on{' '}
          <A href="https://kyunghyuncho.me/bert-has-a-mouth-and-must-speak-but-it-is-not-an-mrf/">BERT</A>{' '}
          as a <A href="/blog/bert-out-of-equilibrium">non-autoregressive generative model</A>,
          and did RL research with{' '}
          <A href="https://en.wikipedia.org/wiki/Yann_LeCun">Yann LeCun</A> at{' '}
          <A href="https://cds.nyu.edu">NYU</A>. I also taught{' '}
          <A href="https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz">Frontier Language Models</A>.
        </p>

        <p>
          If any of this resonates, I&rsquo;d love to{' '}
          <A href={`mailto:${EMAIL}`}>talk</A>!
        </p>
      </section>
    </div>
  )
}
