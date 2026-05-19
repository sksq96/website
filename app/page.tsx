import { Callout } from './components/callout'
import { CopyEmail } from './components/copy-email'
import Header from './components/header'

export default function Page() {
  return (
    <>
      <section className="mb-0">
        <Header />
      </section>

      <div className="flex flex-col gap-4 mb-6 w-full max-w-2xl">
        <Callout icon="🦋">
          <p className="text-[17px]">
            {`building `}<a href="https://tryhue.app" target="_blank" rel="noopener noreferrer" className="italic underline underline-offset-4 decoration-1">hue</a>{` at `}<a href="https://www.strangeintelligence.ai/" target="_blank" rel="noopener noreferrer" className="italic underline underline-offset-4 decoration-1">strange intelligence</a>{`. personal intelligence. like ai, but it actually knows you.`}
          </p>
        </Callout>
        <Callout icon="🎓">
          <p className="text-[17px]">
            {`taught `}<a href="https://www.youtube.com/playlist?list=PLxebUzBtXdb3c5OXSG_1F7VXqcmh9Xdnz" target="_blank" rel="noopener noreferrer" className="italic underline underline-offset-4 decoration-1">frontier language models</a>{`, llms from the ground up. all lectures on youtube.`}
          </p>
        </Callout>
      </div>

      <section className="mb-0">
        <p className="text-5xl font-biro-script mb-3 text-left">yo,</p>
      </section>

      <div className="w-full max-w-2xl">
        <section className="mb-5">
          <p className="text-left text-[17px] leading-relaxed">
            {`i care about `}<span className="italic">minds</span>{`. human and artificial. the questions look symmetric from both sides. what is it like to be this thing. what makes an experience cohere. what gets called a self.`}
          </p>
        </section>

        <section className="mb-5">
          <p className="text-left text-[17px] leading-relaxed">
            {`at `}<a href="https://www.strangeintelligence.ai/" target="_blank" rel="noopener noreferrer" className="italic underline underline-offset-4 decoration-1">strange intelligence</a>{` i'm building `}<a href="https://tryhue.app" target="_blank" rel="noopener noreferrer" className="italic underline underline-offset-4 decoration-1">hue</a>{`. a personal intelligence layer that lives in your messages, learns who you are, and reaches out to your friends' agents on your behalf. the bet is personal models are the missing piece. not bigger, just `}<span className="italic">yours</span>{`.`}
          </p>
        </section>

        <section className="mb-5">
          <p className="text-left text-[17px] leading-relaxed">
            {`the parallel investigation is from the inside. a decade of meditation, two jhana retreats, buddhist phenomenology, psychedelics as research instruments. not separate from the work. it's how i think about what an experience even `}<span className="italic">is</span>{`, which is the same question that matters for `}<span className="italic">ai welfare</span>{` and the phenomenology of these models.`}
          </p>
        </section>

        <section className="mb-5">
          <p className="text-left text-[17px] leading-relaxed">
            {`previously: research on language models and reinforcement learning (`}<a href="https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-1">google scholar</a>{`). trained language models at `}<a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-1">github copilot</a>{`, shipped intellisense into vs code at microsoft. masters at `}<span className="italic">nyu</span>{` with `}<a href="https://en.wikipedia.org/wiki/Yann_LeCun" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-1">yann lecun</a>{`. ai research at vatic labs in between.`}
          </p>
        </section>

        <section className="mb-5">
          <p className="text-left text-[17px] leading-relaxed">
            {`if any of this is your shape (phenomenology of minds, ai welfare, personal intelligence, the buddhism × ml diagram, or you want to back the company) i'd love to talk. `}<a href="https://x.com/sksq96" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-1">twitter</a>{` or `}<CopyEmail />{`.`}
          </p>
        </section>

        <section className="mb-4">
          <p className="text-5xl font-biro-script mb-4 text-left">- shubham</p>
        </section>
      </div>

      <p className="font-eb-garamond text-3xl text-center">***</p>
    </>
  )
}
