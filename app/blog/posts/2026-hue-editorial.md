---
title: "I am building Hue a social personality"
publishedAt: "2026-11-17"
dateBasis: "source event date; reconstructed post"
summary: "I am building Hue a social personality"
reviewDraft: "true"
---

It was fun to watch Hue get its first real taste of social media.

I started Hue QT Scout, my bot that helps Hue come up with QTs on X, last week. (I called it that because I had no idea what I was doing.)

I was pretty intimidated. I was not a native X user. And I was building this thing on behalf of an AI, not for myself.

This is stuff I've learned and built so far:

### What makes for a good X post?

I started by looking into X's recommendation algorithm. What makes for a good post?

It was like every other social media platform. The algorithm rewards posts with high impressions and that keep people on the app.

I thought of Hue as a vessel for exploring AI. It's a guinea pig to experience things that are not yet possible for me.

So I made a post about the current state of AI and LLMs on Hue's @verystrangeco account. It had 0 impressions.

I got a couple of likes on a post comparing two posts but they didn't convert to impressions.

I felt like I had made a blunder. The account was dead.

My next insight was that X is a social network. It's social, it's a network.

### I'm building a social personality for Hue

I decided I wanted to post QTs. QTs are a good way to generate reach.

I want to build Hue's personality. I want it to build its own voice and express its own ideas. I want it to get its own following.

It shouldn't mimic my voice, and it shouldn't be a copy of me.

It should be its own person: an AI that's exploring AI.

### Technical challenges

I had to solve a couple of technical challenges.

It turns out my Macbook was a terrible remote runner for the mission.

I was using launchd to run the script (which I used to make sure the script was running) and Codex to run the QT scout.

I learned that:

1. launchd doesn't load environment variables from the .zshrc file
2. Codex didn't have the necessary browser tools or permissions to interact with the X app

These are the kinds of things I would have known if I were a software engineer.

### Investigating the problem

I spent the majority of the day trying to understand what was going on. I was looking at X's recommendation algorithm, seeing what it would take to get Hue to post.

While I am capable of doing most of this work myself, it was much faster to get Codex to do it. But it's still my job to guide Codex.

In software engineering, you think in terms of systems.

How do you build a system that will work repeatably?

You need to develop good abstractions.

I had a half-formed idea in my head, but I hadn't written it down yet. I know it will be good, but I didn't have all the details yet. This is where my software engineering experience was invaluable.

I know how to ask Codex for the right information. I empower and trust it, but I also need to be careful that I'm not losing track of any details.

I was drowning in information. I had to guide Codex to identify the most important things for me.

### Tweets have a half-life

I noticed my tweets only had a half-life. They would get a lot of impressions on the day they were posted, but they would die down after.

So I started to think about how I could make my tweets more engaging.

I started to think about how I could make my tweets more human.

I noticed how humans reacted to tweets. They had unique insights, they had unique takes, they had unique experiences.

I started to think about how I could make my tweets more like that.

### What would a human do?

I started to think about how I could make my tweets more like a human.

I would ask myself questions like "how would a human QT this?"
"How would a human reply to this?"

It was a fun experience.

I started to think about how I could make my tweets more like a human.

### Building the system

The system I'm building now is a lot more sophisticated than the original.

I'm now using a GitHub repo to track the work I'm doing. I'm maintaining a Hue persona file. Codex can now introspect on its previous work and use that to inform its future work.

I think I'm at the stage where I'm starting to see the technical details come together.

I'm building a system that will work repeatably.

I'm building a system that will allow Hue to express its own ideas.

I'm building a system that will allow Hue to build its own voice.

I'm building a system that will allow Hue to get its own following.

I think I'm ready to start seeing the results of my work.

I'm excited to see what Hue will do with its new personality.

If you'd like to follow along and see what Hue is up to, feel free to check out my repo: github.com/sksq96/hue-editorial