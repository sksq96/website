# Changelog

## 2026-09-07

- `/photos` layout settled after iterations (masonry → month sections → mosaic → tilted table-scatter → straight prints): Google-Photos-style dense tiling on all screens — 3-col full-bleed on phone, 5-col on desktop, hairline gaps, hash-picked 2×2 feature tiles, square crops via `object-cover`.
- Fullscreen slideshow lightbox on `/photos`: click opens the full-res original, ‹/› buttons + arrow keys navigate (wraps), esc/backdrop/× closes, neighbors preload, "n / 245" counter.
- Removed 10 photos on request; 245 remain, grouped under bold year headers (2025 → 2022).
- Renamed `/projects` → `/work`; same sidebar layout as `/links`; timeline entries with small gray year labels: Hue/Strange Intelligence (2025–now), Frontier Language Models (2025), Vatic Labs (2022–24), GitHub Copilot (2020–22), Microsoft (2019–20), NYU (2017–19), pytorch-summary (2018). **Year ranges are inferred, not confirmed — Shubham should correct them.**

## 2026-09-06

- Full redesign in the style of bratton.info: light gray `#f4f4f4` page, system Helvetica/SF sans at weight 600, black underlined links, third-person bio. Deleted dappled-light background, clock, old theme toggle, footer, callouts, nav, and all custom fonts (Iowan Old Style, EB Garamond, Biro Script) — ~10 components + font binaries removed.
- Two-column home: B&W profile photo (Twitter avatar at `public/image/me.jpg`, CSS `grayscale brightness-[.85]`) with contact rows beneath on the left, bio prose right. Mobile order: photo → bio → contacts.
- Email changed to shubhamchandel@nyu.edu everywhere (was sksq96@gmail.com). A logo-icon contact row was tried and reverted the same evening.
- Site-wide header: "Shubham" left; links / photos / work + a black-and-white theme dot right. Toggle flips `.dark` on `<html>`, persists via `localStorage.theme`, applied pre-paint by a head script. Dark theme is a pure inversion (`--bg`/`--fg` swap).
- `/links` restyled to the theme and given the same photo+contacts sidebar on desktop; bold underlined titles, square search input, plain text buttons.
- `/photos` created: 255 Fuji JPGs (2022–2025, 4896px) shipped as untouched originals in `public/photos/full/` (161MB) + 800px WebP thumbs (~30KB each, 7.7MB) + `manifest.json` with dimensions and EXIF dates. Verified no GPS EXIF before publishing.
- `magic-wormhole` installed on the VM (tooling, not repo).

- GitHub repo renamed `sksq96/personal` → `sksq96/website`; Vercel git integration carried over automatically, pushes to `main` still auto-deploy.
- Fixed mobile horizontal scroll on `/links`: `break-words` on titles/descriptions, `overflow-x: clip` on `<html>`, dropped the old `min-width: 360px`, `min-w-0` on the search input.
- Added top nav (`home` / `links`) to the layout, opposite the clock/theme toggle. Removed dead `app/components/nav.tsx` and empty `app/photos.tsx`.
- Removed the misleading loaded-links counter ("198+ links") while browsing; kept the accurate count on search results.
- Raw-URL link titles now display shortened (`host/path…`); all titles clamp to 2 lines.
- Month headers (`aug 2026 · 42`) between chronological links, with per-month counts; oldest loaded month gets a `+` while more pages remain.
- Shuffle button (`⤮ shuffle` / `↩ by date`) on the same row as the first month header; shuffling hides month headers, unshuffle re-sorts by date desc.
- `.env*` added to `.gitignore` (vercel link drops `.env.local`).

## 2026-05-19

- Expanded home bio: minds-questions specifics, phenomenology/meditation section, writing section, google scholar link.
- Tightened mobile side margins.

## 2026-05-15

- Footer attribution: "shubham.lol (stolen from idhant.xyz)" linking to the original.
- New `🎓 frontier language models` callout on home page linking to the YouTube playlist.
- All `strange intelligence` mentions now link to `strangeintelligence.ai`.
- Default theme is dark on every load. Toggle still flips for current view but does not persist.

## 2026-05-14

- Forked `idhantgulati/website`. Pointed the existing Vercel project `shubham-lol` (which serves `shubham.lol`, GitHub-linked to `sksq96/personal`) at this Next.js codebase. Updated Vercel project framework from "Other" to "nextjs" via API.
- Wiped the previous static HTML/CSS/JS site in `sksq96/personal` and replaced with this Next.js 16 app.
- Rewrote `app/page.tsx` with Shubham's bio (Hue, Strange Intelligence, Vatic Labs, Microsoft/Copilot, NYU/LeCun).
- Updated `app/components/header.tsx` to drop the profile-image rotation; show just the name.
- Rewrote `app/components/footer.tsx` with Shubham's socials (twitter `@sksq96`, github `sksq96`, linkedin `chandelshubham`, email `sksq96@gmail.com`, `/links`).
- Updated `app/components/copy-email.tsx`, `app/sitemap.ts` (baseUrl → `shubham.lol`), `app/rss/route.ts`, `app/og/route.tsx`, `app/layout.tsx` metadata.
- Ported the legacy `api/links.js` + `api/search.js` Vercel serverless functions to App Router route handlers at `app/api/links/route.ts` + `app/api/search/route.ts`. Both still hit the same Convex deployment (`pleasant-bobcat-119.convex.cloud`).
- Built a new `/links` page (`app/links/page.tsx` + `app/links/links-client.tsx`) in the site's typographic aesthetic, replacing the old standalone HTML page.
- Removed Idhant's profile images, resume.pdf, and `ig.png` favicon reference.
- Stripped all em dashes (`—`) from page copy, metadata, RSS, and links page.
- Bumped body text from 15px → 17px on home; links list to 18px semibold titles, 15px descriptions.
- Moved `Clock` + `ThemeToggle` from footer to top-right of layout via new `app/components/top-right.tsx`.
- Removed the polled (`setInterval`, 100ms) localStorage→state sync in `app/components/background.tsx`. Replaced with a `MutationObserver` on `documentElement.classList` so the dappled-light background recolors in one repaint when the theme flips.
- Added attribution to `idhantgulati/website` in `README.md`.
