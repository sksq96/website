// Parses the "## The year" section of /root/github/twitter/READING.md into
// app/links/curated.json. Re-run after READING.md is refilled:
//   node scripts/parse-curated.mjs [path/to/READING.md]
import fs from 'fs'
import path from 'path'

const SRC = process.argv[2] || '/root/github/twitter/READING.md'
const OUT = path.join(process.cwd(), 'app', 'links', 'curated.json')

const lines = fs.readFileSync(SRC, 'utf8').split('\n')

// slice out the year section
const start = lines.findIndex((l) => /^## The year/.test(l))
if (start === -1) throw new Error('no "## The year" section in ' + SRC)
let end = lines.findIndex((l, i) => i > start && /^## /.test(l))
if (end === -1) end = lines.length

const clusters = []
let current = null

for (const line of lines.slice(start + 1, end)) {
  const heading = line.match(/^###\s+(.+)$/)
  if (heading) {
    // "RL, post-training, evals — 78 (held, ...)" -> name, count
    const raw = heading[1]
    const m = raw.match(/^(.*?)\s+—\s+(\d+)/)
    current = { name: (m ? m[1] : raw).trim(), count: m ? Number(m[2]) : null, items: [] }
    clusters.push(current)
    continue
  }
  if (!current) continue

  // "- Author — [Title](url) — note — saved YYYY-MM-DD"  (note optional)
  const item = line.match(/^-\s+(.*?)\s+—\s+\[(.+?)\]\((.+?)\)\s+—\s+(.*)$/)
  if (!item) continue
  const [, author, title, url, rest] = item
  const saved = rest.match(/saved\s+(\d{4}-\d{2}-\d{2})\s*$/)
  const note = rest.replace(/—?\s*saved\s+\d{4}-\d{2}-\d{2}\s*$/, '').replace(/\s*—\s*$/, '').trim()
  current.items.push({
    author: author.trim(),
    title: title.trim(),
    url: url.trim(),
    note,
    saved: saved ? saved[1] : '',
  })
}

const total = clusters.reduce((n, c) => n + c.items.length, 0)
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(clusters, null, 2))
console.log(`${clusters.length} clusters, ${total} links -> ${path.relative(process.cwd(), OUT)}`)
