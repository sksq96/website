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
    <header className="flex flex-wrap justify-between items-center gap-x-4 gap-y-2 p-5 md:px-6 md:pt-6">
      <a href="/" className="text-[17px] font-bold">Shubham</a>
      <nav className="flex items-center gap-2 md:gap-4 text-[14px] md:text-[17px] font-bold">
        <a href="/links" className="underline">links</a>
        <a href="/photos" className="underline">photos</a>
        <a href="/work" className="underline">work</a>
        <a href="/nomad" className="underline">nomad</a>
        <a href="/agentworld" className="underline">
          <span className="md:hidden">agents</span>
          <span className="hidden md:inline">agentworld</span>
        </a>
        <button
          onClick={toggle}
          aria-label="toggle black and white theme"
          className="w-4 h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
        />
      </nav>
    </header>
  )
}
