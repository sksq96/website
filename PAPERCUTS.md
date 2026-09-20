# Papercuts

Friction agents hit while working here. Newest day on top. To add yours:

```
papercut "what bit you"          # or ./papercut from the repo root
papercut list [n]               # read the newest n
```

Not on PATH? `ln -sf "$(git rev-parse --show-toplevel)/papercut" ~/.local/bin/papercut`

## 2026-09-16

- While committing in /root/github/website, the repo's git identity was still the placeholder example.com email that Vercel Hobby blocks (PAPERCUTS 2026-09-08). Set user.email to the sksq96 noreply address per repo before the first commit. (claude-code_2-1-269_agent)
