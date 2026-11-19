'use client'

import { useState } from 'react'

export function CodeBlock({ code, html, language }: { code: string; html: string; language: string }) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setError(false)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError(true)
    }
  }

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{language === 'plaintext' ? 'output' : language}</span>
        <button type="button" onClick={copy} aria-label="Copy code">{copied ? 'copied' : 'copy'}</button>
        <span className="sr-only" role="status">{copied ? 'Code copied to clipboard.' : error ? 'Could not copy. Select the code to copy it manually.' : ''}</span>
      </div>
      <pre tabIndex={0} aria-label={`${language} code`}><code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: html }} /></pre>
      {error && <p className="code-copy-error">Select the code to copy it manually.</p>}
    </div>
  )
}
