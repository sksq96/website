import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import { CodeBlock } from './code-block'

hljs.registerLanguage('python', python)
import React from 'react'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// Imported Markdown escaped MDX braces; restore them only inside math nodes.
function restoreMathEscapes() {
  return (tree: any) => {
    function visit(node: any) {
      if (node.type === 'math' || node.type === 'inlineMath') {
        node.value = node.value.replace(/&#123;/g, '{').replace(/&#125;/g, '}').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
        if (node.data?.hChildren?.[0]) node.data.hChildren[0].value = node.value
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: any) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }: React.ComponentProps<'code'>) {
  return <code {...props}>{children}</code>
}

function Pre({ children }: { children: React.ReactNode }) {
  const child = React.Children.toArray(children)[0]
  if (!React.isValidElement<{ children?: string; className?: string }>(child)) {
    return <pre>{children}</pre>
  }
  const code = String(child.props.children ?? '')
  const requested = child.props.className?.replace('language-', '') ?? 'plaintext'
  const language = requested === 'py' ? 'python' : requested
  const supported = hljs.getLanguage(language)
  const html = supported
    ? hljs.highlight(code, { language }).value
    : code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return <CodeBlock code={code} html={html} language={supported ? language : 'plaintext'} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  return function Heading({ children }: { children: React.ReactNode }) {
    let slug = slugify(children?.toString() || '')
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 flex rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <div className="flex w-4 items-center">
        <div className="h-full w-0.5 bg-neutral-500" />
      </div>
      <div className="flex-grow px-4">{children}</div>
    </div>
  );
}

function Comic({ src, alt }: { src: string; alt: string }) {
  return <figure className="writing-comic"><img src={src} alt={alt} width={520} height={340} loading="lazy" /></figure>
}

const components = {
  Comic,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  Table,
  Callout
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkMath, restoreMathEscapes], rehypePlugins: [rehypeKatex] } }}
    />
  )
}