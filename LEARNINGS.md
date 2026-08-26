# Learnings

## 2026-08-26

- Renaming a GitHub repo does not break Vercel's git integration — the link follows the rename automatically. `vercel git connect` just reports "already connected"; nothing to re-wire.
- The Convex deployment exposes no public count function (`links:count`, `links:total`, `links:stats` all 404) — a true total for the links list can't be shown without adding one; only per-loaded-page counts are possible.
- The `/links` horizontal scroll on phones was long unbreakable strings (links saved without a title render their raw URL as the heading), not layout widths. `break-words` on the text plus `overflow-x: clip` on `<html>` fixes it; `clip` also kills the sliver of scroll the `width: 100vw` fixed background causes when a scrollbar is present.
- On this Ubuntu VM the GitHub CLI apt repo fails GPG verification (`NO_PUBKEY`); downloading the release tarball and dropping `gh` into `~/.local/node/bin` works fine. `gh auth login` device flow + `gh auth setup-git` wires git push credentials.

## 2026-05-14

- Vercel projects with framework preset "Other" do not auto-detect Next.js when you push a Next app — they keep the old "Other" build/output settings, which point at `public/` and break the deploy. The fix is `PATCH /v9/projects/{id}` with `{"framework":"nextjs","buildCommand":null,"outputDirectory":null,"installCommand":null}` to clear the overrides. Vercel CLI has no command for this; use the REST API directly.
- Vercel project's linked GitHub repo is not exposed by `vercel inspect` or `vercel project ls`. It lives in `link.repo` / `link.org` from `GET /v9/projects/{id}` via the REST API. The token is at `~/Library/Application Support/com.vercel.cli/auth.json`.
- When porting a Vercel project from "Other" (root `/api/*.js` serverless functions) to Next.js App Router, the `/api/*` routes do **not** carry over — Next.js routing takes precedence. They must be re-implemented as `app/api/<name>/route.ts` route handlers. Same handler shape works (just `export async function GET/POST`).
- The old dappled-light background's "flicker on cursor move" was not the SVG/CSS animations — it was a `setInterval(handleThemeChange, 100)` polling localStorage every 100ms, triggering React re-renders that forced repaints of the `backdrop-filter: blur(8px / 24px)` layers. GPU-heavy backdrop-filters + 10 re-renders per second + any cursor-induced paint = visible flicker. Replacing the poll with a single `MutationObserver` on `documentElement.classList` killed the flicker without losing the visual effect.
- Conflicting theme sources cause "dark at 11am" bugs. If multiple components each read their initial theme from a different source (one from `localStorage`, one from `matchMedia`, one from an inline `<head>` script), they will disagree. Pick one source of truth (the `dark` class on `documentElement`) and have every other component observe it.
- The `app/api/links/route.ts` push fan-out is rate-limited well below 200 — Convex's `links:list` query happily returns 200 at a time and a cursor for pagination.
