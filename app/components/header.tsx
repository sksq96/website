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
    <header className="flex justify-between items-center p-5 md:px-6 md:pt-6">
      <nav className="flex items-center gap-4 text-[17px] font-bold">
        <a href="/links" className="underline">links</a>
        <a href="/photos" className="underline">photos</a>
        <button
          onClick={toggle}
          aria-label="toggle black and white theme"
          className="w-4 h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
        />
      </nav>
      <a href="/" className="text-[17px] font-bold">Shubham</a>
    </header>
  )
}
