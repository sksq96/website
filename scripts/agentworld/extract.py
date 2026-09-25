import pymupdf, json, re, unicodedata, os
doc = pymupdf.open('brief.pdf')
os.makedirs('fig', exist_ok=True)
BLUE = 0x0e0ecc

def boxes_of(pg):
    bs = [d['rect'] for d in pg.get_drawings()
          if 150 < d['rect'].width < 600 and d['rect'].height > 50]
    out = []
    for b in bs:
        if any(o is not b and o.x0 <= b.x0 + 2 and o.y0 <= b.y0 + 2 and o.x1 >= b.x1 - 2 and o.y1 >= b.y1 - 2 and (o.width > b.width + 2 or o.height > b.height + 2) for o in bs):
            continue
        if not any(abs(b.x0 - c.x0) < 2 and abs(b.y0 - c.y0) < 2 for c in out):
            out.append(b)
    return sorted(out, key=lambda r: r.y0)

def fig(pg, rect, name, alt):
    pix = pg.get_pixmap(clip=rect, dpi=200)
    pix.save(f'fig/{name}.png')
    return {'t': 'fig', 'src': name, 'w': pix.width, 'h': pix.height, 'alt': alt}

def clean(s):
    return unicodedata.normalize('NFKC', s.replace('­\n', '').replace('­', ''))

def join(lines):
    s = ''
    for l in lines:
        if not s: s = l
        elif s.endswith('­'): s = s[:-1] + l
        elif s.endswith('-') and not s.endswith(' -'): s = s + l
        else: s = s + ' ' + l
    return clean(re.sub(r'\s+', ' ', s)).strip()


def plines(pg):
    out = []
    for b in pg.get_text('dict')['blocks']:
        if b['type']: continue
        for l in b['lines']:
            if l['dir'][0] < .5: continue
            t = ''.join(x['text'] for x in l['spans']).strip()
            if t: out.append((l['bbox'][0], l['bbox'][1], l['spans'][0], t))
    return out

def special(pg, pn):
    L = [l for l in plines(pg) if not (l[2]['size'] < 6.5 and l[1] < 60 and l[0] < 200)]
    if pn == 41:
        body = [l for l in L if 'Serif' in l[2]['font']]
        box = [l for l in L if 'Allianz' in l[2]['font']]
        out, items = [], []
        for x, y, s0, t in box:
            f = s0['font']
            if 'Bold' in f and 'Extra' not in f: title = t
            elif 'Extrabold' in f:
                term = s0['text'].strip(); items.append([term, [t[len(term):].strip()]])
            elif s0['size'] >= 7.5 and items: items[-1][1].append(t)
        notes = [t for x, y, s0, t in box if s0['size'] < 7]
        return body, {'t': 'lexicon', 'title': title,
            'intro': join([t for x, y, s0, t in box if s0['size'] < 7 and y < 400]),
            'items': [{'term': a, 'text': join(b)} for a, b in items],
            'note': join([t for x, y, s0, t in box if s0['size'] < 7 and y > 400])}
    if pn == 56:
        left = {round(y): t for x, y, s0, t in L if x < 300 and s0['size'] < 20}
        right = {round(y): t for x, y, s0, t in L if x > 375}
        return [], [{'t': 'h2', 'text': 'FROM → TO'}, {'t': 'fromto', 'rows': [[left[k], right[k]] for k in sorted(left) if k in right]}]
    if pn == 57:
        L = sorted([l for l in L if l[2]['size'] < 20], key=lambda l: (l[0] > 380, round(l[1] / 6), 'HALGap' not in l[2]['font']))
        intro, qs = [], []
        for x, y, s0, t in L:
            m = re.match(r'^(\d+)\.\s*', t) if 'HALGap' in s0['font'] else None
            if m: qs.append([t[m.end():]]); continue
            (qs[-1] if qs else intro).append(t)
        return [], [{'t': 'h2', 'text': 'POSSIBLE RESEARCH QUESTIONS'}, {'t': 'p', 'text': join(intro)},
                    {'t': 'questions', 'items': [join(q) for q in qs]}]
    if pn == 59:
        about = [t for x, y, s0, t in sorted(L, key=lambda l: l[1]) if 160 < x < 460 and y < 240 and t != 'ABOUT']
        roles = sorted((y, t) for x, y, s0, t in L if 160 < x < 300 and 260 < y < 520)
        names = sorted((y, t) for x, y, s0, t in L if 300 < x < 460 and 260 < y < 520)
        rows = []
        for y, t in roles:
            nxt = min([r for r, _ in roles if r > y + 1] + [999])
            rows.append([t, [n for ny, n in names if y - 1 <= ny < nxt - 1]])
        paras, buf, last = [], [], None
        for x, y, s0, t in sorted([l for l in L if 160 < l[0] < 460 and l[1] < 240 and l[3] != 'ABOUT'], key=lambda l: l[1]):
            if last is not None and y - last > 12: paras.append(join(buf)); buf = []
            buf.append(t); last = y
        paras.append(join(buf))
        return [], [{'t': 'h3', 'text': 'ABOUT'}] + [{'t': 'small', 'text': p} for p in paras] + \
               [{'t': 'masthead', 'rows': [[r, ', '.join(n)] for r, n in rows]}]
    return None

recs = []

FIGPAGES = {11, 15, 19, 23, 27, 32, 37, 42, 47, 52}
for pg in doc:
    pn = pg.number + 1
    if pn in (1, 2, 7, 60): continue            # cover, toc, back cover
    if pn == 8:
        recs.append(('fig', fig(pg, pg.rect, 'p08', 'P(weird) = high. P(doom) = low.'))); continue
    if pn in (41, 56, 57, 59):
        keep, blk = special(pg, pn)
        if pn == 41:
            for x, y, s0, t in keep: recs.append(('line', y, x, 'p', t, pn))
        for b in (blk if isinstance(blk, list) else [blk]): recs.append(('fig', b))
        continue
    boxes = boxes_of(pg) if pn in FIGPAGES else []
    lines = []
    for b in pg.get_text('dict')['blocks']:
        if b['type']: continue
        for l in b['lines']:
            if l['dir'][0] < 0.5: continue                     # rotated sidebar
            sp = [s for s in l['spans'] if s['text'].strip()]
            if not sp: continue
            s0 = sp[0]; x, y = s0['bbox'][0], s0['bbox'][1]
            if s0['size'] < 6.5 and y < 60 and x < 200: continue  # header card
            if any(bx.contains(pymupdf.Point(x + 1, y + 2)) for bx in boxes): continue
            text = ''.join(s['text'] for s in l['spans']).rstrip('\n').strip()
            f = s0['font']; size = round(s0['size']); col = s0['color']
            if 'XL' in f or ('Serif' in f and s0['flags'] & 2 and size >= 18): k = 'scenario'
            elif 'Serif' in f and size >= 18: k = 'lead'
            elif 'Serif' in f: k = 'p'
            elif 'HALGap' in f and size >= 45: k = 'h2'
            elif 'HALGap' in f and size >= 28: k = 'skip'          # repeated title on figure pages
            elif 'HALGap' in f and size >= 18 and col == BLUE: k = 'h3'
            elif 'HALGap' in f and size >= 18: k = 'quote'
            else: k = f'small:{f.split("+")[-1]}:{size}:{col:06x}'
            lines.append((y, x, k, text))
    items = [(l[0], 0, l) for l in lines] + [(b.y0, 1, b) for b in boxes]
    if pn not in (56, 57): items.sort(key=lambda i: (i[0], i[1]))
    for _, isfig, it in items:
        if isfig:
            m = re.findall(r'[^\n]+', pg.get_textbox(it))
            alt = join([t for t in m if len(t) > 25]) or 'figure'
            n = sum(1 for r in recs if r[0] == 'fig')
            recs.append(('fig', fig(pg, it + (-2, -2, 2, 2), f'p{pn:02d}-{n}', alt) | {'pn': pn}))
        else:
            recs.append(('line',) + it + (pn,))

blocks, cur = [], None
for r in recs:
    if r[0] == 'fig':
        blocks.append(r[1]); cur = None; continue
    _, y, x, k, text, pn = r
    if k == 'skip': cur = None; continue
    if k == 'p':
        if x > 170:
            cur = {'t': 'p', 'lines': [text], 'pn': pn}; blocks.append(cur); continue
        if cur and cur['t'] == 'p':
            cur['lines'].append(text); continue
        last = next((b for b in reversed(blocks) if b['t'] == 'p'), None)
        if last and not re.search(r'[.!?\u201d"]$', last['lines'][-1]):
            cur = last; cur['lines'].append(text); continue
        cur = {'t': 'p', 'lines': [text], 'pn': pn}; blocks.append(cur); continue
    if cur and cur['t'] == k and cur['pn'] == pn:
        cur['lines'].append(text)
    else:
        cur = {'t': k, 'lines': [text], 'pn': pn}; blocks.append(cur)
for b in blocks:
    if b.get('pn') == 58 and b['t'] == 'quote': b['t'] = 'h3'
    if 'lines' in b: b['text'] = join(b.pop('lines'))
    if b['t'] == 'scenario': b['text'] = re.sub(r'^SCENARIO:\s*', '', b['text'])

json.dump(blocks, open('raw.json', 'w'), ensure_ascii=False, indent=1)
