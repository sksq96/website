// Instant search for shubham.lol: embeds the query in the browser (no network after first load)
// and ranks the pre-embedded site sections + saved links by cosine. Enter still goes to the relay.
//   import { warm, instant } from './instant'
//   warm()                                  // on focus: starts the one-time model + vectors download
//   const results = await instant('query')  // [{title, url, kind, snippet, score}], top 8, one per url
// copied from /root/github/search/instant.js; transformers.js loads from the CDN on first focus,
// outside the bundle (the comments keep webpack and turbopack from resolving the URL)
const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.1'

const VECTORS = 'https://80.190.78.211/search/vectors.json'
let ready

function load() {
  // vectors.json names the model it was built with, so the page always embeds queries the same way
  return (ready ??= fetch(VECTORS).then((r) => r.json()).then(async (v) => {
    const { pipeline } = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ TRANSFORMERS)
    const ex = await pipeline('feature-extraction', v.model, { dtype: v.dtype || 'q8', device: 'wasm' })
    const vecs = new Int8Array(Uint8Array.from(atob(v.vecs), (c) => c.charCodeAt(0)).buffer)
    const D = v.dim, norms = new Float32Array(v.items.length)
    for (let i = 0; i < norms.length; i++) {
      let s = 0
      for (let k = 0; k < D; k++) s += vecs[i * D + k] ** 2
      norms[i] = Math.sqrt(s)
    }
    return { ex, items: v.items, vecs, norms, D, prefix: v.prefix ?? 'query: ', pooling: v.pooling ?? 'mean' }
  }).catch((e) => {
    ready = undefined
    throw e
  }))
}

export const warm = () => load()

export async function instant(q, n = 8) {
  const { ex, items, vecs, norms, D, prefix, pooling } = await load()
  const e = (await ex(prefix + q, { pooling, normalize: true })).data
  const best = new Map()
  for (let i = 0; i < items.length; i++) {
    let s = 0
    for (let k = 0; k < D; k++) s += e[k] * vecs[i * D + k]
    s /= norms[i]
    const it = items[i]
    if (!(best.get(it.u)?.score >= s)) best.set(it.u, { title: it.t, url: it.u, kind: it.k, snippet: it.s, score: s })
  }
  // bge scores real matches 0.7 to 0.85 and unrelated text up to about 0.63, so weaker hits are dropped
  return [...best.values()].filter((r) => r.score >= 0.65).sort((a, b) => b.score - a.score).slice(0, n)
}
