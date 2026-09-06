'use client'

import { usePathname } from 'next/navigation'

export default function Corner() {
  const path = usePathname()
  const onLinks = path === '/links'

  const toggle = () => {
    const el = document.documentElement
    el.classList.toggle('dark')
    try {
      localStorage.setItem('theme', el.classList.contains('dark') ? 'dark' : 'light')
    } catch {}
  }

  return (
    <div className="fixed bottom-5 left-5 hidden md:flex items-center gap-4">
      <a href={onLinks ? '/' : '/links'} className="underline font-bold text-[17px]">
        {onLinks ? 'home' : 'links'}
      </a>
      <button
        onClick={toggle}
        aria-label="toggle black and white theme"
        className="w-4 h-4 rounded-full border border-current bg-current cursor-pointer"
      />
    </div>
  )
}
