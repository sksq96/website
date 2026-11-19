import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function DraftMarkdown({source}: {source:string}) {
  return <Markdown remarkPlugins={[remarkGfm]} components={{
    h2: ({children}) => <h2 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}>{children}</h2>,
    h3: ({children}) => <h3 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}>{children}</h3>,
    a: ({href,children}) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
    img: ({alt}) => <span className="block my-6 border border-dashed border-neutral-400 p-4 text-[13px] font-normal text-neutral-500">Image to restore{alt ? `: ${alt}` : ''}</span>,
  }}>{source}</Markdown>
}
