---
title: "transcribe"
publishedAt: "2026"
summary: "transcribe"
reviewDraft: "true"
---

I had a bunch of voice notes sitting in my phone that I never listened to and I wanted to be able to transcribe them. 

I've been using Wispr Flow to speak my emails, notes, and messages. But a bunch of my voice notes weren't really something I could talk through. Some were longer thoughts. Others were conversations I recorded with permission. 

I wanted to turn all of them into text so I could look back at them if needed. 

So I decided to build something to do exactly that. Something that would let me upload a voice note and get a transcript. And I wanted to get it done within an hour.

The first thing I did was ask codex for ideas. We decided on a simple web app. I would visit the site, upload the voice note, and it would spit out a transcript. I could save the transcript wherever I wanted. 

The first one went live in 12 minutes. I took a look at what it had built. I found myself a little lost. This was the first time I saw a file called `vercel.json`. I didn't know what it was doing. 

I found the transcripts in my Vercel Blob storage. At first, I was able to download the transcript. I made a few tweaks and tested it out. I tried to upload a longer recording and it exceeded the maximum file size allowed by Vercel. So I asked codex to fix that. And I started making a few small changes here and there. 

I ended up reverting most of those after a while. But one of the things that I tweaked was the maximum duration of the audio that I could transcribe. I bumped it up to 90 minutes from 10. 

I tested it out again and it worked just fine. I tried out about five different recordings. When I tried to do multiple uploads in parallel, it failed. I asked codex to fix that and was able to upload multiple recordings at once.

I finally had a working app that allowed me to upload voice notes and get transcripts. 

The app lives on at transcribe-iota.vercel.app