'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const reading = /^\/(writings|blog)(\/|$)/.test(pathname)
  useEffect(() => {
    try { document.documentElement.classList.toggle('dark', localStorage.getItem(reading ? 'readingTheme' : 'theme') === 'dark') } catch {}
  }, [reading])
  const toggle = () => {
    const el = document.documentElement
    el.classList.toggle('dark')
    try {
      localStorage.setItem(reading ? 'readingTheme' : 'theme', el.classList.contains('dark') ? 'dark' : 'light')
    } catch {}
  }

  return (
    <header className="flex flex-wrap justify-between items-center gap-x-4 gap-y-2 p-5 md:px-6 md:pt-6">
      <a href="/" className="text-[17px] font-bold">Shubham</a>
      <nav className="flex flex-wrap items-center gap-3 md:gap-4 text-[15px] md:text-[17px] font-bold">
        <a href="/writings" className="underline">writings</a>
        <a href="/links" className="underline">links</a>
        <a href="/photos" className="underline">photos</a>
        <a href="/work" className="underline">work</a>
        <a href="/reading" className="underline">reading</a>
        <button
          onClick={toggle}
          aria-label={reading ? 'toggle paper and night reading theme' : 'toggle black and white theme'}
          className="w-4 h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
        />
      </nav>
    </header>
  )
}
