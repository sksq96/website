export const EMAIL = 'shubhamchandel@nyu.edu'

const contacts = [
  { label: 'Email', text: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Twitter', text: 'sksq96', href: 'https://x.com/sksq96' },
  { label: 'GitHub', text: 'sksq96', href: 'https://github.com/sksq96' },
  { label: 'LinkedIn', text: 'chandelshubham', href: 'https://linkedin.com/in/chandelshubham' },
  { label: 'Scholar', text: 'shubham chandel', href: 'https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en' },
  { label: 'Links', text: 'links', href: '/links' },
]

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="underline"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Photo() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/image/me.jpg"
      alt="Shubham Chandel"
      className="w-full grayscale brightness-[.85] contrast-110"
    />
  )
}

export function Contacts({ className = '' }: { className?: string }) {
  return (
    <ul className={`text-[13px] leading-relaxed ${className}`}>
      {contacts.map((c) => (
        <li key={c.label}>
          <span className="text-neutral-500">{c.label}: </span>
          <A href={c.href}>{c.text}</A>
        </li>
      ))}
    </ul>
  )
}
