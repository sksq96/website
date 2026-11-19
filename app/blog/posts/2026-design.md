---
title: "design"
publishedAt: "2026-10-22"
dateBasis: "source event date; reconstructed post"
summary: "design"
reviewDraft: "true"
---

Started this because every agent session I run produces a “done” that is really just a claim. It only actually happens when the thing is live, the tests pass, and nobody has to come find me. I wanted to see all of that for every agent I run, in one place, from a phone or a laptop. I didn’t know how to build a control plane for that.

I’m not a designer. I know what I like when I see it, I have a user’s eye for it, and across enough sessions and enough reading I’ve picked up a fair amount about design principles and process. That’s the level I’m working from here, and I’m figuring it out as I go.

The way I finally understood it: it’s a single page with two rhythms on it. Things that are currently live and running, shown as live cards. And things that have happened, shown as a timeline grouped by day, like a commit history. Plus a “needs you” strip at the top for the things blocked on me.

The whole visual system came from a skill called Hallmark, which is a design skill that enforces a set of rules so pages don’t come out looking like generic AI output.

It got installed into this repo on 2026-10-22 ([`.claude/skills/hallmark/SKILL.md`](https://github.com/sksq96/design/blob/main/.claude/skills/hallmark/SKILL.md) and its `references/` folder), around the same time I wrote this repo’s `DESIGN.md`. That file locks the tokens and the palette I’m using for this site.

The first commit was only a short prototype called a Mission Control, the idea being this could be the mission control of all my agents. I wrote up a grammar doc for it ([`mission-control-grammar.md`](https://github.com/sksq96/design/blob/main/mission-control-grammar.md)) and deployed it to Vercel on 2026-10-31.

Then I went down a rabbit hole. I read about design systems and design grammars and design languages, and what the difference is between a design system and a brand Bible, and realized I wasn’t even sure what I wanted to build yet. Was I building a mission control for agents? An observability tool for agents? Or was I just trying to understand how good design actually works, the way it’s done in places like Stripe or Vercel?

I realized I could build a design system that starts from first principles, a ground-up way of looking at design, and then layer on top of it the different things I know I want to build, like the Mission Control.

So I started a new branch called `design-system`. I had the Mission Control prototype on `main` already, but I wanted to rebuild it properly from the ground up. I started in Claude Design, which is a feature Claude recently shipped. That’s where all the energy is in this repo right now. I’m using Claude Design’s frontend to mock things up so I can see things quickly.

The first thing I did was ask Claude Design to read the repo and tell me what’s going on in it and how it could help me. I also asked it to do a deep dive into the tools I’m using, like Hallmark and other design tools and skills. It put together a design system I can use as a base, then layer on top of it to build the Mission Control.

I kept running into a problem where I’d look at what it produced and realize it was only looking at the surface. Key words, keywords, not the actual thing. So I had to keep pointing it at the actual files and having it read them directly instead of skimming.

I also started a conversation with Claude asking it to help me understand design from the ground up, because I wanted to see things from first principles, not from the surface level. That conversation is ongoing, and it’s where a lot of the design system work actually got shaped.

While that was running, I also needed to give this site a design system. I gave it another prompt asking it to mock a design for `shubham.lol`, the website. That moved forward alongside the Mission Control work.

I ended up creating a design system and adding in the Mission Control that I had already mocked on `main`. I’m not sure where this all goes. I’m trying to understand the design system, and I’m trying to build the Mission Control, and I’m not sure which one I want to focus on.

The code is on GitHub.