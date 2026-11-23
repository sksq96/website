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
    <header className="flex justify-between items-center gap-x-3 p-5 pb-3 md:px-6 md:pt-6 text-[13px] md:text-[17px] font-bold whitespace-nowrap">
      <a href="/">Shubham</a>
      <nav className="flex items-center gap-x-2 md:gap-4">
        <a href="/writings" className="underline">writings</a>
        <a href="/links" className="underline">links</a>
        <a href="/photos" className="underline">photos</a>
        <a href="/work" className="underline">work</a>
        <a href="/reading" className="underline">reading</a>
        <button
          onClick={toggle}
          aria-label="toggle black and white theme"
          className="w-3.5 h-3.5 md:w-4 md:h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
        />
      </nav>
    </header>
  )
}
