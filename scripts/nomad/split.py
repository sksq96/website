import re, json, unicodedata

RAW = open('full.txt', encoding='utf-8').read()
lines = RAW.split('\n')

# --- boundaries -------------------------------------------------------------
PERIOD = re.compile(r'^\s*(Cumulative returns )?For the (period|year) ended?\s+(.+?)\.?\s*$', re.I)
KIND = re.compile(r'^\s*(Annual|Interim)\s+Letter\.?\s*$', re.I)

bounds = []  # (start_line, kind, period_text)
for i, l in enumerate(lines):
    m = PERIOD.match(l)
    if not m:
        continue
    # walk back up to 6 lines for the Annual/Interim heading
    kind, start = 'Letter', i
    for j in range(max(0, i - 8), i):
        if KIND.match(lines[j]):
            kind = KIND.match(lines[j]).group(1).title()
            start = j
    # walk back further over the letterhead block to the page break
    for j in range(max(0, start - 12), start):
        if '\f' in lines[j]:
            start = j + 1
    bounds.append([start, kind, m.group(3).strip()])

# the first letter (Jan 2002) has a plain date, no "period ended" heading
first_date = next(i for i, l in enumerate(lines) if l.strip() == '18th January 2002')
fstart = first_date
for j in range(max(0, first_date - 12), first_date):
    if '\f' in lines[j]:
        fstart = j + 1
bounds.insert(0, [fstart, 'Inaugural', 'inception (September 10th, 2001) to January 2002'])

bounds.sort(key=lambda b: b[0])

# --- cleaning ---------------------------------------------------------------
DROP = [
    re.compile(r'^\s*\d{1,3}\s*$'),                       # bare page numbers
    re.compile(r'^\s*(T|F):\s*\+44', re.I),               # phone/fax
    re.compile(r'^\s*Sleep,\s*Zakaria and Company', re.I),
    re.compile(r'^\s*Nomad Investment Partnership\.?\s*$', re.I),
    re.compile(r'^\s*(Annual|Interim)\s+Letter\.?\s*$', re.I),
    re.compile(r'^\s*(Cumulative returns )?For the (period|year) ended', re.I),
    re.compile(r'^\s*Authorised and regulated by the Financial', re.I),
    re.compile(r'^\s*Registered (in England|Office)', re.I),
    re.compile(r'^\s*\d*\w*,?\s*\w+\s+(Street|Road|Place|Square|Lane|Mews)\b', re.I),
    re.compile(r'^\s*London\s+[A-Z0-9 ]{4,10}\s*$'),
    re.compile(r'^\s*(England|United Kingdom)\s*$', re.I),
]

NUMTOK = re.compile(r'^[($£€]?[-+]?[\d,.]+%?\)?$')

# whole paragraphs that are regulatory boilerplate or flattened table rows
PARA_DROP = [
    re.compile(r'^This (document|research document) is issued by', re.I),
    re.compile(r'^(Calendar Year|Discrete Annual) Results', re.I),
    re.compile(r'^Value of a dollar invested', re.I),
    re.compile(r'regulations made under FSMA', re.I),
    re.compile(r'^Portfolio returns are based on the increase in asset value', re.I),
    re.compile(r'^The figures above are unaudited', re.I),
]

def drop(l):
    return any(p.match(l) for p in DROP)

def clean(txt):
    txt = txt.replace('\f', '\n')
    out = [l for l in txt.split('\n') if not drop(l)]
    # collapse layout spacing inside a line, keep blank lines as breaks
    out = [re.sub(r'[ \t]{2,}', ' ', l).strip() for l in out]
    # rebuild paragraphs: blank line separates
    paras, buf = [], []
    for l in out:
        if not l:
            if buf:
                paras.append(' '.join(buf)); buf = []
        else:
            buf.append(l)
    if buf:
        paras.append(' '.join(buf))
    # a page break can split one sentence into two "paragraphs" — rejoin when the
    # first doesn't end a sentence and the second starts mid-sentence
    merged = []
    for p in paras:
        if (merged and not re.search(r'[.!?:;”"’\')\]]\s*$', merged[-1])
                and re.match(r'[a-z(]', p)):
            merged[-1] = merged[-1] + ' ' + p
        else:
            merged.append(p)
    paras = merged
    # drop fragments that are mostly digits (performance tables survive badly in text)
    keep = []
    for p in paras:
        toks = p.split()
        if len(p) < 40 or len(toks) < 8:
            continue                                    # stray fragments, headings
        nums = sum(1 for t in toks if NUMTOK.match(t))
        if nums / len(toks) > 0.18:                     # flattened performance table
            continue
        if any(r.search(p) for r in PARA_DROP):
            continue
        # rejoin compounds the PDF broke across lines: "short- term" -> "short-term"
        p = re.sub(r'(\w)-\s+(?=[a-z])', r'\1-', p)
        keep.append(unicodedata.normalize('NFKC', p))
    return keep

# --- date parsing -----------------------------------------------------------
MON = {m: n for n, m in enumerate(
    ['January','February','March','April','May','June','July','August',
     'September','October','November','December'], 1)}

def parse_date(period):
    m = re.search(r'([A-Z][a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})', period)
    if m and m.group(1) in MON:
        return f'{m.group(3)}-{MON[m.group(1)]:02d}'
    m = re.search(r'(\d{4})', period)
    return f'{m.group(1)}-01' if m else ''

letters = []
for n, (start, kind, period) in enumerate(bounds):
    end = bounds[n + 1][0] if n + 1 < len(bounds) else len(lines)
    body = clean('\n'.join(lines[start:end]))
    ym = '2002-01' if kind == 'Inaugural' else parse_date(period)
    y, mm = (ym.split('-') + ['01'])[:2]
    if kind == 'Letter':
        kind = 'Interim' if mm in ('06', '07') else 'Annual'
    letters.append({
        'id': f'{ym}',
        'kind': kind,
        'period': period,
        'date': ym,
        'words': sum(len(p.split()) for p in body),
        'paras': body,
    })

# preamble (before the first letter) kept separately
pre = clean('\n'.join(lines[:bounds[0][0]]))

json.dump({'preamble': pre, 'letters': letters}, open('letters.json', 'w'), indent=1)
print(f'{len(letters)} letters')
for l in letters:
    print(f"  {l['id']}  {l['kind']:8} {l['words']:6} words  {l['period'][:46]}")
print('total words', sum(l['words'] for l in letters))
