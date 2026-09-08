# AGENT.md

## What this is

Personal site for Shubham Chandel, deployed at https://shubham.lol.

## Deployment

- **Vercel project**: `sksq96s-projects/shubham-lol` (framework: `nextjs`, node: 24.x)
- **GitHub repo**: [`sksq96/website`](https://github.com/sksq96/website) (renamed from `sksq96/personal` 2026-08-26) — pushes to `main` auto-deploy
- **Domains**: `shubham.lol`, `www.shubham.lol`
- **Workflow**: clone `sksq96/website`, edit, commit + push `main` directly (no rsync step anymore)

## Stack

- Next.js 16.2.4 (App Router, Turbopack)
- React 19, TypeScript 6
- Tailwind v4 (`@tailwindcss/postcss`)
- Geist Sans/Mono + custom fonts (Iowan Old Style, EB Garamond, Biro Script)
- `@vercel/analytics`, `@vercel/speed-insights`
- pnpm

## Design

Redesigned 2026-09-06 after bratton.info: light gray `#f4f4f4` page, system Helvetica/SF sans at weight 600, black underlined links, tight top-left margins, B&W portrait + gray-label contact rows in a left sidebar. Dark theme is a pure `--bg`/`--fg` inversion.

## File tree

```
app/
  layout.tsx              header + main; pre-paint head script applies .dark from localStorage.theme
  page.tsx                home — sidebar (Photo + Contacts) left, third-person bio right; md grid [24rem_1fr]
  global.css              tailwind + @custom-variant dark + --bg/--fg vars + system sans, weight 600
  not-found.tsx

  components/
    header.tsx            client. "Shubham" left; links/photos/work + b&w theme dot right; toggle persists localStorage.theme
    sidebar.tsx           EMAIL const, contacts array, exports A (underlined link), Photo (b&w portrait), Contacts (label rows)
    mdx.tsx               MDX component map for blog posts
    posts.tsx             blog post list

  api/
    links/route.ts        GET /api/links — proxies Convex links:list query with cursor pagination
    search/route.ts       POST /api/search — proxies Convex links:search action with `query` body

  links/
    page.tsx              /links — sidebar on desktop + LinksClient
    links-client.tsx      client component — fetches /api/links and /api/search; month headers with counts, shuffle/by-date toggle

  photos/
    page.tsx              reads public/photos/manifest.json, groups by EXIF year
    gallery.tsx           client. dense tiling grid (3 cols phone full-bleed / 5 cols desktop, hash-picked 2×2 features) + fullscreen lightbox slideshow (arrows/keys/esc, neighbor preload)

  work/
    page.tsx              /work — sidebar + year-labeled timeline (hue, FLM course, vatic, copilot, microsoft, nyu, pytorch-summary). NOTE: year ranges are inferred, unconfirmed

  blog/
    page.tsx              /blog list (unlinked)
    [slug]/page.tsx       MDX-rendered post
    posts/sample.mdx      placeholder post
    utils.ts              MDX parser helper

  og/route.tsx            dynamic OG image generator
  rss/route.ts            /rss feed from blog posts
  sitemap.ts              exports baseUrl = 'https://shubham.lol/', sitemap for /, /blog, /links
  robots.ts               robots.txt

public/
  image/me.jpg            profile photo (Twitter avatar, 400px; rendered grayscale via CSS)
  photos/
    manifest.json         [{name, w, h, date}] — thumb dimensions + EXIF date, newest first
    thumbs/*.webp         800px q72 thumbnails (~30KB each, generated with PIL)
    full/*.jpg            untouched originals (4896px Fuji JPGs, no GPS EXIF)
```

## External services

- **Convex** at `https://pleasant-bobcat-119.convex.cloud` — backs the `/links` page
  - `links:list` query: returns paginated link records (`{links, cursor, done}`)
  - `links:search` action: semantic search over links (`{query, limit}` → results with `_score`)
- **Vercel Analytics + Speed Insights** — auto-injected via layout

## Theme model

- Default: light (`#f4f4f4` bg, `#111` fg). The dot button in the header flips `.dark` on `<html>`, which swaps the `--bg`/`--fg` CSS vars (pure black-and-white inversion).
- Choice persists in `localStorage.theme`; a head script in `layout.tsx` re-applies it before paint (no flash).
- `dark:` Tailwind variants work via `@custom-variant dark (&:where(.dark, .dark *));` in `global.css`.

## Build / dev

```bash
pnpm install
pnpm dev      # next dev
pnpm build    # next build (Turbopack)
pnpm start
```

## Updating the live site

Commit and `git push origin main` — Vercel auto-deploys. `vercel deploy --prod` from a linked clone works too (bypasses git; keep git in sync).
