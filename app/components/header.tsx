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
    <>
      <header className="flex justify-between items-center p-5 md:px-6 md:pt-6">
        <a href="/" className="text-[17px] font-bold">Shubham</a>
        <nav className="flex items-center gap-4 text-[17px] font-bold">
          <a href="/links" className="underline md:hidden">links</a>
          <a href="/photos" className="underline md:hidden">photos</a>
          <a href="/work" className="underline md:hidden">work</a>
          <button
            onClick={toggle}
            aria-label="toggle black and white theme"
            className="w-4 h-4 mt-px rounded-full border border-current bg-current cursor-pointer"
          />
        </nav>
      </header>
      <nav className="hidden md:flex fixed bottom-6 left-6 flex-col gap-1 text-[17px] font-bold z-20">
        <a href="/links" className="underline">links</a>
        <a href="/photos" className="underline">photos</a>
        <a href="/work" className="underline">work</a>
      </nav>
    </>
  )
}
