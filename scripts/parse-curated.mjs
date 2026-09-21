// Parses the "## The year" section of /root/github/twitter/READING.md into
// app/links/curated.json. Re-run after READING.md is refilled:
//   node scripts/parse-curated.mjs [path/to/READING.md]
import fs from 'fs'
import path from 'path'

const SRC = process.argv[2] || '/root/github/twitter/READING.md'
const OUT = path.join(process.cwd(), 'app', 'links', 'curated.json')

const lines = fs.readFileSync(SRC, 'utf8').split('\n')

// Curated links live either in one "## The year (...)" section (original shape) or in
// per-year "## 2026" / "## 2025" / "## 2024" sections. Collect the body of whichever
// exist; the year and month shown on the site always come from each line's `saved`
// date, not from the section it sits under.
const isCuratedHeading = (l) => /^##\s+(The year\b|\d{4}\s*$)/.test(l)
const body = []
for (let i = 0; i < lines.length; i++) {
  if (!isCuratedHeading(lines[i])) continue
  for (let j = i + 1; j < lines.length && !/^## /.test(lines[j]); j++) body.push(lines[j])
}
if (body.length === 0) {
  throw new Error('no "## The year" or "## <year>" section found in ' + SRC)
}

const clusters = []
const byName = new Map()
let current = null

for (const line of body) {
  const heading = line.match(/^###\s+(.+)$/)
  if (heading) {
    // "RL, post-training, evals — 78 (held, ...)" -> name, count
    const raw = heading[1]
    const m = raw.match(/^(.*?)\s+—\s+(\d+)/)
    const name = (m ? m[1] : raw).trim()
    // the same cluster recurs under each year section — merge into one, first-seen order
    if (byName.has(name)) {
      current = byName.get(name)
    } else {
      current = { name, count: m ? Number(m[2]) : null, items: [] }
      clusters.push(current)
      byName.set(name, current)
    }
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
