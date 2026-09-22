'use client'

import { useState } from 'react'

// Toggles "highlights only": paragraphs without a marked passage are hidden by
// the CSS rule in global.css. The text itself stays server-rendered.
export default function Reader({ children, count }: { children: React.ReactNode; count: number }) {
  const [only, setOnly] = useState(false)

  return (
    <>
      <div className="flex gap-4 mb-8 text-[15px]">
        <button
          onClick={() => setOnly(false)}
          className={!only ? 'font-bold underline' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}
        >
          full letter
        </button>
        <button
          onClick={() => setOnly(true)}
          disabled={count === 0}
          className={
            only
              ? 'font-bold underline'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-40'
          }
        >
          highlights only{count ? ` (${count})` : ''}
        </button>
      </div>
      <article className={only ? 'only-hl' : undefined}>{children}</article>
    </>
  )
}
