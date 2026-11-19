---
title: "craft: everything is a skill, even a tweet"
publishedAt: "2026-10-26"
dateBasis: "source event date; reconstructed post"
summary: "craft: everything is a skill, even a tweet"
reviewDraft: "true"
---

Started today. Still figuring it out as I go, I don't know much, just know what I want.

I've been working on this clippy project (which is basically a repo of tools to automate my tasks) and I'm starting to think of everything as "skills". Maybe it's claude code brainrot but I think it works?

So I'm making this tool called "craft" where you can craft anything, emails, tweets, replies, etc. And the idea is that it's supposed to be your own voice. So you can have multiple skills, like skill to write tweets, skill to write replies, skill to write emails, etc.

I started off with tweet style.

### the design

The way I'm thinking about it is that your style is encoded in a md file, like most things in my life right now. And then I have separate files for different kinds of tweets, specific quirks for each type of tweet. Then I have the prompt with few shots from actual tweets. I've found that is surprisingly effective.

![](assets/craft-1.png)

I've been testing it on haiku (with the idea that I'll use haiku usually) and sonnet (when I need a little more firepower)

### some code

This is the piece I thought was interesting:

```
export function buildPrompt({ kind, message, correction, nearest = [] }) {
  const k = KINDS[kind];
  if (!k) throw new Error(`unknown kind: ${kind} (known: ${KINDS_LIST.join(", ")})`);
  const examples = nearest.length ? nearest : (k.examples ?? []);

  return `You are writing a tweet in Elias's voice. You are not an assistant writing for him. You ARE him, posting from his account.

## His voice

${VOICE}

## This kind of post: ${k.label}

${k.brief}

Rules for this kind:
${bullets(k.rules)}

## His real posts of this kind

${examples.map((e) => `- ${e}`).join("\n")}
${correction ? `\n## What he changed last time\n\nHe edited what you wrote before posting it. The correction:\n\n${correction}\n\nWrite to that correction this time.\n` : ""}
## The post

${message ?? "(nothing yet. this is a standalone, so the post is yours to come up with.)"}

## Output

Return ONLY valid JSON, no prose before or after, no markdown fence:

{"kind": "${kind}", "text": "the post", "replyTo": null}

The "text" field holds the post itself. No quotes around it. Keep his capitalization exactly as he writes it.

If this is a reply, replyTo is the author handle without the @. If it is a standalone, replyTo is null.`;
}
```

It takes in all the files and composes it into a prompt

### model

At first I was testing with sonnet but then realized it was probably overkill, so I started testing with haiku. Here's a sample of a reply in haiku:

![](assets/craft-2.png)Perfect!

### few shots

Few shots are probably the biggest help when it comes to getting the voice right. Ofc you can get close with a style guide and whatnot but I think few shots just makes it better.

I've been putting in real tweets from him.

### testing

It's so much better with few shots:

![](assets/craft-4.png)

![](assets/craft-3.png)

### tightening the loop

I've also added a correction piece to it now, where we store the diff between the model's output and what was actually tweeted. I haven't tested it yet but the idea is that it'll make it better over time.

### why did I make this?

I was reading a tweet and I thought "oh I could just reply with this" and then I thought "oh I could just build a skill to do this", and then I thought "oh I could just build a tool to do this"

### future

I think I'll probably add this to clippy or something and just use it there, I also plan on adding this to twitter-connect so it'll be used there too. Idk, it's just a little project for now, I don't know where it'll go.

I've also added a test script, so the flow is:

1. run test.mjs to test the style/prompt/etc
2. once that feels good, add it to clippy

that's about it for now