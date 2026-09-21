'use client'

import { useEffect, useState } from 'react'

type Tab = { id: string; panel: React.ReactNode }

// First tab is the default and owns the bare URL; the others are addressable
// as #<id> (e.g. /links#curated, /work#projects).
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id)

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (tabs.some((t) => t.id === id)) setActive(id)
  }, [])

  const select = (id: string) => {
    setActive(id)
    history.replaceState(null, '', id === tabs[0].id ? ' ' : `#${id}`)
  }

  return (
    <div>
      <div className="flex gap-4 mb-6 text-[17px] font-bold">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            className={t.id === active ? 'underline' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}
          >
            {t.id}
          </button>
        ))}
      </div>
      {tabs.find((t) => t.id === active)?.panel}
    </div>
  )
}
