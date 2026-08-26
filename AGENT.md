# AGENT.md

## What this is

Personal site for Shubham Chandel, deployed at https://shubham.lol. Forked from [idhantgulati/website](https://github.com/idhantgulati/website).

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

## File tree

```
app/
  layout.tsx              root layout — pre-hydration `dark` class added inline, top nav (home/links), body bg via CSS vars
  page.tsx                home page — callouts + bio
  global.css              tailwind base + dark-mode CSS variables + font-face declarations + overflow-x: clip on html
  not-found.tsx

  components/
    background.tsx        dappled sunlight + blinds + swaying leaves. theme-synced via MutationObserver on documentElement.classList
    background.module.css all keyframes + filter masks for the above
    callout.tsx           rounded card with optional emoji icon (used on home)
    clock.tsx             live local time display, top-right
    copy-email.tsx        click-to-copy email link
    footer.tsx            social links + "shubham.lol (stolen from idhant.xyz)"
    header.tsx            "shubham" h1 only
    mdx.tsx               MDX component map for blog posts
    posts.tsx             blog post list
    theme-toggle.tsx      sun/moon button. defaults to dark on each load, no persistence
    top-right.tsx         Clock + ThemeToggle wrapper
    animation-toggle.tsx  (unused, commented out)

  api/
    links/route.ts        GET /api/links — proxies Convex links:list query with cursor pagination
    search/route.ts       POST /api/search — proxies Convex links:search action with `query` body

  links/
    page.tsx              /links page shell
    links-client.tsx      client component — fetches /api/links and /api/search; month headers with counts, shuffle/by-date toggle, 2-line clamped titles

  blog/
    page.tsx              /blog list
    [slug]/page.tsx       MDX-rendered post
    posts/sample.mdx      placeholder post
    utils.ts              MDX parser helper

  og/route.tsx            dynamic OG image generator
  rss/route.ts            /rss feed from blog posts
  sitemap.ts              exports baseUrl = 'https://shubham.lol/', sitemap for /, /blog, /links
  robots.ts               robots.txt

public/
  fonts/                  Iowan, EB Garamond, Biro Script font files
  image/leaves.png        used by background's swaying-leaves effect
```

## External services

- **Convex** at `https://pleasant-bobcat-119.convex.cloud` — backs the `/links` page
  - `links:list` query: returns paginated link records (`{links, cursor, done}`)
  - `links:search` action: semantic search over links (`{query, limit}` → results with `_score`)
- **Vercel Analytics + Speed Insights** — auto-injected via layout

## Theme model

- Default: dark on every load (inline script in `<head>` adds `.dark` to `<html>` before paint).
- Toggle: `ThemeToggle` flips `.dark` on `<html>` for the current view; not persisted.
- Background syncs via `MutationObserver` on `documentElement.classList` — single repaint per toggle, no polling.

## Build / dev

```bash
pnpm install
pnpm dev      # next dev
pnpm build    # next build (Turbopack)
pnpm start
```

## Updating the live site

Commit and `git push origin main` — Vercel auto-deploys. `vercel deploy --prod` from a linked clone works too (bypasses git; keep git in sync).
