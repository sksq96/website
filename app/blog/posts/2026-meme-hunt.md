---
title: "meme hunt"
publishedAt: "2026-11-04"
dateBasis: "source event date; reconstructed post"
summary: "meme hunt"
reviewDraft: "true"
---

meme-hunt

# meme-hunt

> New memes in a single week of Community Archive tweets, found by an agent swarm and traced back through the archive.

In November 2026 I spent a week playing with the [Community Archive](https://www.communityarchive.org), a volunteer-built archive of public tweets from people who opted in to preserve their history before it disappears. Their [site](https://archive.com/) has a few ways to explore it and a [wiki](https://wiki.archive.com/) explaining the project.

I built this as part of an [AI Scouts](https://www.aiscouts.co) research stage. The ask was simple: find memes in a week of tweets and see how far back you can trace them in the archive.

I had never built anything like it. I had no idea that finding memes in tweets would be hard, or that comparing them to the rest of the archive would be hard too. I just kept having ideas, and Claude Code helped me try each one.

## What I built

The idea was to send small groups of tweets to Claude Haiku, which is cheap and fast. Each Claude would look at its group and write a report. Then Claude Opus would look at all the reports together and decide which tweets were meme-worthy.

The first time, I used 100 tweets. That was too few. When I ran the same process on almost a million tweets, it still worked, but it took longer and cost more.

I only had three weeks of tweets. I asked Jev if I could have more. He let me use his Raspberry Pi, where all the tweets are stored. I used one week of tweets from November 2025.

## How the swarm worked

I wrote the system in JavaScript and ran it with `node`.

First, I asked Claude Code to look at the JSON files and split the tweets into groups of 150. Each tweet had text, likes, and a username. Then I spawned 60 Claude Haiku agents.

Each agent got one group of tweets. It was asked to find memes, explain them, list the phrases in them, and give its confidence level.

I ended up with 6,000 reports. I put them into 12 groups of 500 and gave each group to a different Claude Opus agent. Each one was asked to find the memes in its group of reports.

At the end, I had 12 JSON reports. I asked Claude Opus to use them to make a few dozen memes.

## Finding the memes again

I asked Claude Code to use the tweets from those memes to make SQL queries. The queries looked for tweets containing the phrases, like `"vibe coding"`, and ranked the matches.

It gave me the first 20 tweets for each meme. I added those tweets to the app, along with a link to the search results for each meme.

It was interesting to see how far back people had been tweeting some of these memes.