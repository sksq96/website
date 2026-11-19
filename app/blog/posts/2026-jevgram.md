---
title: "Can Jev Detect AI Text?"
publishedAt: "2026-09-21"
dateBasis: "source event date; reconstructed post"
summary: "Can Jev Detect AI Text?"
reviewDraft: "true"
---

Sep 2026
 · 
3 min read

Can Jev (TypeSafe System One) do what Pangram does?
7,139 texts from RAID, HC3 and MAGE, one typed question each, $0.97.

I started jevgram because I was using Pangram at work and wondered how Jev does on AI detection, so why not just test it?

I’ve been trying jev for a while (the first time I wrote about jev was here) and this time, I wanted to try it on a specific task - detect AI-generated text. I didn’t know how to do it, so I just asked Claude to figure it out for me. The idea was to get a real answer on this task.

And here’s what I found:

Jev can detect AI text, but not as well as Pangram.

I spent $0.97 finding this out.

The question
Pangram is the best text detector out there (I think), which I used to measure the quality of AI-generated text in my twitter experiment.

I was using it for this task, but I wondered how Jev would perform on it. Jev is an extremely small model, so I doubted that it would perform as well as Pangram, but I wanted to see how it does.

Jev is a 23M-parameter model that answers typed questions about text in ~110ms per call for $0.042 per million tokens. Can it do what Pangram does?

I gave it one Noul per text. That's it. That's what the model does: you give it a text and a typed question, it gives you a typed answer.

```
Jev.eval(text, "was this written by an ai language model?")  # -> Boolean
```

The data
7,139 texts from three public benchmarks.

RAID (2,000) — Dugan et al. 2024. The largest machine-generated-text benchmark: 11 generators × 8 domains × 12 adversarial attacks, 6.2M rows. I streamed 11.8GB of CSV and sampled as it flowed, stratified by generator, domain and attack. Code, Czech and German live in a separate extra.csv and aren't here.
HC3 (1,995) — Guo et al. 2023. ChatGPT vs human answers. The easy classic.
MAGE (2,000) — Li et al. 2024. 27 models across 10 domains, sampled in the wild. The hard out-of-distribution case.
Plus the twitter lane's own 19 texts, which carry the Pangram scores I already paid for.

Each text is scored by Jev. It is asked one question in each text.

The results
DatasetAUCRAID (human vs AI)0.891HC3 (ChatGPT vs human)0.992MAGE (in the wild)0.787RAID shortened (paraphrase attack)0.834RAID, under 50 words0.698

Jev reads as a strong yes/no AI text detector. But in this case, the results are not binary. They are probabilities. The probabilities are correct but the threshold matters. Check what happens when you go down the number of words:

Jev does really well on longer texts, but once you go down to less than 50 words, the accuracy drops.

In case of short texts, it’s better to look at the probability than the absolute number.

What the call looks like

```
import requests

r = requests.post(
    "https://api.typesafe.ai/v1/noul",
    headers={"x-api-key": KEY},
    json={"input": text, "noul": "was this written by an ai language model?"},
)
p_ai = r.json()["result"]          # 0.0245  →  0 = human, 1 = AI
```

That question is the only one I ran at scale. Twenty-seven other phrasings are sitting in data/preds.jsonl as single-shot probes, including two that turned out to be broken ("is this an ai generated text?" returns almost exactly 0.5 on everything, so it is not a question, it is noise; "is this ai generated or human?" returns 1.0 everywhere). The rest are in the repo if you want to poke at them.

The jevgram demo
I built this tiny demo where you can paste any text and it will tell you if it’s AI-generated or not.

Pangram vs jevgram
It Jev is clearly not at Pangram's level.

Pangram reports 99.8% accuracy across 1.1M human documents and 1.3M AI documents, at a 1-in-10,000 false positive rate. That's a different league, and it's what you'd use if a false accusation costs you something.

But, Jev is incredibly fast.

Pangram is a 70B model on a hosted API. Jev is 23M parameters, 110ms per call, $0.042 per million tokens. My whole study was $0.97. That's not a difference in degree, it's a different category of thing. You can run Jev on every message in a firehose and you cannot run Pangram on it.

The question was whether a model that small could read text at all. It reads. It's a real signal at 110ms and essentially free. It just isn't a detector you'd deploy.

And you can try it now at jevgram.vercel.app.

I gave it 7,139 texts from RAID, HC3 and MAGE and asked one typed question per text: "was this written by an ai language model?" Jev answers with a probability between 0 and 1.

Short answer: it reads AI text, but it isn't Pangram. On RAID — 11 generators, 8 domains, 6 adversarial attacks — plain Jev gets 0.891 AUC, and on HC3 0.992. On MAGE, the hard in-the-wild set, it drops to 0.787. Under 50 words it's 0.698, and past 80% confidence it's never right. The whole study cost $0.97.