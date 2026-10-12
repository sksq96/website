export const metadata = {
  title: 'my favorite depiction of utopia',
  description:
    'A reading guide to Caleb Biddulph’s adaptation of the epilogue of Alexander Wales’s Worth the Candle: what happens after an all-powerful, kind Authority ends scarcity, pain and death.',
}

const POST = 'https://www.lesswrong.com/posts/to9cSGgD6nALByKjg/my-favorite-depiction-of-utopia'
const FULL = 'https://docs.google.com/document/d/12OGnyYXAkRNp8VD2CC3eosrTsKHhTPOsIEE6uxCefTQ'
const WTC = 'https://www.royalroad.com/fiction/25137/worth-the-candle'

const CHAPTERS = [
  {
    words: 9418,
    title: 'The world ends',
    synopsis:
      'The old world ends in ten minutes, and gently. Avatars of “Transition Services”, each a small thread of an all-powerful mind called the Authority, visit person after person to explain: no money, no scarcity, pain removed on request, a range of heavens from hard, risky low ones to fully transhuman high ones, and everything bounded by informed consent. A farmer, a grieving mother, a skeptical professor, a man denied revenge and a thief each take it differently. This chapter stands on its own.',
    cast: 'Rance Su, Garrett Voss, Perrina Wharf, Sutsu Su, Mercen Honth, Randall Vox, Pollanny FePonn, Mark Perperson, Clarabell Brown and Trish, Sonia, Lurida Vane',
  },
  {
    words: 7203,
    title: 'Road trip',
    synopsis:
      'A year in, six old friends switch off their enhancements and drive a minivan across South Dakota to Wall Drug, “for authenticity”, past clerks and waitresses played by ’spians. The banter is about bodies, clones and taste. Underneath, Jamie worries about Wren, who lives with a ’spian of Oliver, the man she loved, who chose to die rather than live in the Authority’s world. In the back seat she explains it as a slow, deliberate goodbye.',
    cast: 'Jamie, Marigold, Nia, Seraphina, Bram, Wren, the Heifer of Six Moons',
  },
  {
    words: 4216,
    title: 'The witch on the hill',
    synopsis:
      'Seraphina raises her children in a small, mostly unenhanced family heaven of seasons, gardens and play witchcraft. Marigold arrives by broomstick to say she is pregnant, and Jamie brings the children gifts, a cape that commands leaves and a sword for hunting monsters. The gifts start a gentle argument about how much pain and danger a child in heaven should be allowed.',
    cast: 'Seraphina, Ricardo, Goldie, Jamie the Younger, Marigold, Jamie',
  },
  {
    words: 4170,
    title: 'Khazad Brunn',
    synopsis:
      'Bram visits the dwarfhold he grew up in, resurrected exactly as it was, a low heaven whose young keep leaving. His father calls him the enemy of their way of life. At night, the dwarf he was once promised to comes to ask how long leaving hurts. Back home in the middle heavens, Bram lets his assistant find him company.',
    cast: 'Bram, his father, Nari, Kradoh, Lanik',
  },
  {
    words: 4989,
    title: 'The Angel and the Devil',
    synopsis:
      'Nia and her clone, the Angel and the Devil, live with Jamie C, a clone of Jamie who keeps losing at a world-building game the Jamies invented. A visit from Caelen, the grown son Nia has only recently reconnected with, leaves both Nias thinking about having children. Meanwhile everyone discovers that barrisball, a sport with ten thousand players, is absurdly complicated.',
    cast: 'Nia (the Angel and the Devil), Jamie C, Caelen',
  },
  {
    words: 5387,
    title: 'Ten years in',
    synopsis:
      'Ten years on, Wren feels everyone has moved on but her. She has spent years helping to resurrect the long dead, one at a time, by reading their lives closely enough to care, and the chapter follows one fae knight from 20,000 years ago back to life. Burned out, she finally lets her assistant set her up on a date, and it ends with a plan to spend the next few years together in a deep dive.',
    cast: 'Wren, Lil (her assistant), Shermarin of the Glasswood, Clarke Rinsome',
  },
]

const min = (w: number) => Math.round(w / 250)

export default function Page() {
  return (
    <section className="max-w-[40rem]">
      <h1 className="font-bold text-[22px] mb-3">My favorite depiction of utopia</h1>
      <p className="text-[18px] leading-[1.6] mb-4">
        A story about the day an all-powerful, kind Authority takes over the world and ends scarcity, pain and
        death, and the years after, when people still have to work out what to do with themselves. What makes it
        good is that it doesn’t pretend utopia is perfect: even with unlimited power some things stay hard, and some
        people would rather have the old world back.
      </p>
      <p className="text-[18px] leading-[1.6] mb-8">
        It is the epilogue of Alexander Wales’s serial <i>Worth the Candle</i>, adapted by Caleb Biddulph so it reads
        without the 1.5 million words before it. Six chapters, about 35,000 words, roughly 2½ hours.
      </p>

      <div className="flex flex-col gap-2 mb-10 text-[18px]">
        <a href={POST} target="_blank" rel="noopener noreferrer" className="underline font-bold">
          Read it on LessWrong ↗
        </a>
        <span className="text-[15px] text-neutral-500 -mt-1">Caleb’s post, with chapter 1 and his note on why it matters</span>
        <a href={FULL} target="_blank" rel="noopener noreferrer" className="underline font-bold mt-2">
          The full adaptation, all six chapters ↗
        </a>
        <a href={WTC} target="_blank" rel="noopener noreferrer" className="underline font-bold mt-2">
          Worth the Candle, by Alexander Wales ↗
        </a>
        <span className="text-[15px] text-neutral-500 -mt-1">
          The original. This epilogue is its ending, so if you plan to read the book, read it first.
        </span>
      </div>

      <blockquote className="border-l-2 border-neutral-400 dark:border-neutral-600 pl-4 mb-10 text-[18px] leading-[1.6]">
        “The world ended about ten minutes ago, but that’s perfectly fine, because we have a new one.”
        <div className="text-[13px] text-neutral-500 mt-1">chapter 1</div>
      </blockquote>

      <h2 className="text-[13px] uppercase tracking-[.04em] text-neutral-500 mb-4">Contents</h2>
      <ol className="space-y-7 mb-10">
        {CHAPTERS.map((c, i) => (
          <li key={c.title}>
            <div className="text-[18px] font-bold">
              {i + 1}. {c.title}
              <span className="text-[13px] font-normal text-neutral-500"> · {c.words.toLocaleString()} words · {min(c.words)} min</span>
            </div>
            <p className="text-[17px] leading-[1.55] mt-1">{c.synopsis}</p>
            <p className="text-[13px] text-neutral-500 mt-1">{c.cast}</p>
          </li>
        ))}
      </ol>

      <blockquote className="border-l-2 border-neutral-400 dark:border-neutral-600 pl-4 mb-10 text-[18px] leading-[1.6]">
        “Before its ascension, the Authority had often thought that you could never have a utopia, because one
        person’s utopia would always be the dystopia of someone else.”
        <div className="text-[13px] text-neutral-500 mt-1">chapter 1</div>
      </blockquote>

      <p className="text-[13px] text-neutral-500 leading-[1.6] pt-6 border-t border-neutral-300 dark:border-neutral-700">
        Story by Alexander Wales; adaptation by Caleb Biddulph, published with the author’s permission. The
        adaptation carries a content warning for sex, violence and profanity. The summaries above are mine; the
        story isn’t reproduced here.
      </p>
    </section>
  )
}
