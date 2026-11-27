'use client'

export default function Header() {
  const toggle = () => {
    const el = document.documentElement
    el.classList.toggle('dark')
    try {
      localStorage.setItem('theme', el.classList.contains('dark') ? 'dark' : 'light')
    } catch {}
  }

  return (
    <header className="flex justify-between items-center gap-x-3 px-4 pt-5 pb-3 md:px-6 md:pt-6 text-[12px] md:text-[17px] font-bold whitespace-nowrap">
      <a href="/">Shubham</a>
      <nav className="flex items-center gap-x-[5px] md:gap-4">
        <a href="/links" className="underline">links</a>
        <a href="/writings" className="underline">writings</a>
        <a href="/photos" className="underline">photos</a>
        <a href="/work" className="underline">work</a>
        <a href="/reading" className="underline">reading</a>
        <a href="/vibes" className="underline">vibes</a>
        <button
          onClick={toggle}
          aria-label="toggle black and white theme"
          className="w-3.5 h-3.5 md:w-4 md:h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
        />
      </nav>
    </header>
  )
}
