'use client'

import { useEffect, useState } from 'react'
import LinksClient from './links-client'
import Curated from './curated'

export default function Tabs() {
  const [tab, setTab] = useState<'all' | 'curated'>('all')

  // /links#curated opens the curated view directly
  useEffect(() => {
    if (window.location.hash === '#curated') setTab('curated')
  }, [])

  const select = (t: 'all' | 'curated') => {
    setTab(t)
    history.replaceState(null, '', t === 'curated' ? '#curated' : ' ')
  }

  return (
    <div>
      <div className="flex gap-4 mb-6 text-[17px] font-bold">
        {(['all', 'curated'] as const).map((t) => (
          <button
            key={t}
            onClick={() => select(t)}
            className={t === tab ? 'underline' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'all' ? <LinksClient /> : <Curated />}
    </div>
  )
}
