"""Merge reader highlights into the letters and verify every quote is verbatim.

A quote is kept only if it can be located character-for-character in the letter.
If whitespace drifted we re-anchor to the exact text in the paragraph; if the
paragraph index is wrong we search the whole letter. Anything we cannot find is
dropped and reported — nothing is paraphrased into the site.
"""
import json, glob, re, sys, unicodedata

letters = json.load(open('letters.json'))['letters']
by_id = {l['id']: l for l in letters}

raw = []
for f in sorted(glob.glob('hl-*.json')):
    try:
        raw += json.load(open(f))
    except Exception as e:
        print(f'!! {f}: {e}', file=sys.stderr)

def flex(q):
    """Match the quote allowing whitespace drift. After a token ending in a
    hyphen the space is optional, so a quote taken before we rejoined
    line-broken compounds ("short- term") still matches the fixed text."""
    toks = q.split()
    out = re.escape(toks[0]) if toks else ''
    for prev, t in zip(toks, toks[1:]):
        out += (r'\s*' if prev.endswith('-') else r'\s+') + re.escape(t)
    return re.compile(out)

kept, dropped = 0, []
for l in letters:
    l['highlights'] = []

seen = set()
for h in raw:
    lid, q = h.get('letter'), (h.get('quote') or '').strip()
    L = by_id.get(lid)
    if not L or len(q.split()) < 8:
        dropped.append((lid, 'no letter / too short', q[:60])); continue
    q = unicodedata.normalize('NFKC', q)
    pat = flex(q)
    hit = None
    # preferred: the paragraph the reader named
    p = h.get('para')
    if isinstance(p, int) and 0 <= p < len(L['paras']):
        m = pat.search(L['paras'][p])
        if m:
            hit = (p, m.group(0))
    # fall back: anywhere in this letter
    if not hit:
        for n, para in enumerate(L['paras']):
            m = pat.search(para)
            if m:
                hit = (n, m.group(0)); break
    if not hit:
        dropped.append((lid, 'not found verbatim', q[:70])); continue
    para_i, exact = hit
    key = (lid, exact)
    if key in seen:
        continue
    seen.add(key)
    L['highlights'].append({'para': para_i, 'quote': exact, 'why': (h.get('why') or '').strip()})
    kept += 1

# keep highlights in reading order within each letter
for l in letters:
    l['highlights'].sort(key=lambda x: (x['para'], l['paras'][x['para']].find(x['quote'])))
    l['hl'] = len(l['highlights'])

out = {'letters': [
    {k: l[k] for k in ('id', 'kind', 'period', 'date', 'words', 'hl', 'paras', 'highlights')}
    for l in letters
]}
json.dump(out, open('data.json', 'w'), ensure_ascii=False, indent=1)

print(f'kept {kept} highlights, dropped {len(dropped)}')
for d in dropped:
    print('  DROPPED', d)
print()
for l in letters:
    print(f"  {l['id']} {l['kind']:9} {l['hl']:3} highlights")
print('letters with none:', [l['id'] for l in letters if not l['hl']])
