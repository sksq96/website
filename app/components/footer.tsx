'use client';

import { useState } from 'react'

const EMAIL = 'sksq96@gmail.com'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer className="mb-16">
      <style jsx>{`
        .footer-links {
          color: var(--footer-text);
        }
        .footer-link:hover {
          color: var(--footer-text-hover);
        }
        .footer-version {
          color: var(--footer-version);
        }
      `}</style>
      <div className="flex justify-between items-center mt-8">
        <ul className="text-[15px] flex flex-col space-x-0 space-y-2 footer-links md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            rel="noopener noreferrer"
            target="_blank"
            href="https://tryhue.app"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">hue</p>
          </a>
        </li>
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/sksq96"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">twitter (x)</p>
          </a>
        </li>
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/sksq96"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            rel="noopener noreferrer"
            target="_blank"
            href="https://scholar.google.com/citations?user=wyuSCNgAAAAJ&hl=en"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">scholar</p>
          </a>
        </li>
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/chandelshubham"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedin</p>
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={`copy ${EMAIL} to clipboard`}
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em] bg-transparent p-0 border-0 text-inherit font-inherit cursor-pointer"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">{copied ? 'copied!' : 'email'}</p>
          </button>
        </li>
        <li>
          <a
            className="footer-link flex items-center transition-all hover:underline underline-offset-2 decoration-[0.1em]"
            href="/links"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">links</p>
          </a>
        </li>
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="footer-version text-[13px]">
          <a
            href="https://github.com/sksq96/personal"
            target="_blank"
            rel="noopener noreferrer"
          >
            shubham.lol
          </a>
          {' '}
          <span className="opacity-70">
            (stolen from{' '}
            <a
              href="https://idhant.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-[0.1em]"
            >
              idhant.xyz
            </a>
            )
          </span>
        </div>
      </div>
    </footer>
  )
}
