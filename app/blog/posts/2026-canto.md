---
title: "Canto"
publishedAt: "2026"
summary: "Canto"
reviewDraft: "true"
---

I'm from Guangzhou, the Canton province of China, where Cantonese is the main language around. I'm now in the US, and I want to teach myself Cantonese so I can talk to my mom and other people back in Canton. I might also want to teach my brother.

So I decided to build an app to learn Cantonese.

I began with a minimal spec and a basic layout, then iterated until I had something I'm happy with, something that could actually teach me some Cantonese.

![](https://raw.githubusercontent.com/sksq96/sksq96/main/assets/2026-11-14-canto.png)

You speak or type a sentence in English.
It translates it to Cantonese, breaks it down into words, shows the Jyutping for each word, and reads it out loud. It also shows example sentences, and you can save the sentence for review later. You can also switch to Mandarin.

The lesson with the most content is the "Jyutping 101" lesson. It teaches tons of basic Cantonese pronunciation rules, and you can tap to hear every sound.

![](https://raw.githubusercontent.com/sksq96/sksq96/main/assets/2026-11-14-canto1.png)

![](https://raw.githubusercontent.com/sksq96/sksq96/main/assets/2026-11-14-canto2.png)

The Jyutping 101 lesson is the only lesson I manually wrote, so as to test out the quality of the app. It's just not possible to manually write thousands of lessons! So the rest are generated when you press a button.

The rest of the lessons are stored in the browser's localStorage.

The app uses Claude Opus 4.8 for translations and MiniMax for text to speech.

I built this in an afternoon with Claude Code.

The code is at [github.com/sksq96/canto](https://github.com/sksq96/canto).