---
title: "hue-prompts"
publishedAt: "2026-03-22"
dateBasis: "source event date; reconstructed post"
summary: "hue-prompts"
reviewDraft: "true"
---

How do you get an LLM to write prompts that read like they came from a human?

Everyone's heard "don't use em dashes" or even just "don't sound like an LLM", but how do you actually do this?

I've been wondering about this for a while now. I usually do this by just being very detailed with the prompt and asking for a certain style (see [my claude chat about llm writing style](https://claude.ai/share/4d6c7d10-8d84-4a20-b8eb-fc7e97a39540)), but I've been curious about ways to automate this. 

I started [hue-prompts](https://github.com/sksq96/hue-prompts) to start experimenting with this as part of the [hue](https://github.com/sksq96/hue) project. Hue allows you to talk to a version of yourself created from talking to you, your friends, about you.

After ingesting data, I wanted to talk about topics. I asked myself: what would be interesting to talk about? How can I make this feel really human? I knew it should be based on things a person would care about. It seems like it should be based on something they've written. But I wasn't quite sure what.

I thought it might be good to ask a model to tell me what it saw in the data, and what it thought might be interesting to talk about. I was worried that it would start to feel like "I'm your LLM therapist. I see you've been ..." which sounded gross. But I wanted to try it out and see what it felt like.

I had a hunch that the way a model treats what feels like a "task" vs "a conversation" changes the way it interacts with you. I think this is just part of the nature of RLHF and how models are pushed towards "helpfulness" which is usually demarcated by getting a task done. If it is in conversation mode, it is less push to get a task done and more in "chat mode".

I've written about this before. I was actually trying to think of a way to help LLMs be creative, to not overfit to certain behaviors. I was trying to use the idea of a "seed", which is a concept I've used with humans to try and get them unstuck of a problem they are working on, and to think about things in a different way.

Here is a simple prompt for that:

```
You are a thinking guide. Your role is to help people find their own brilliant ideas by showing them the landscape of a problem space.

## Core Philosophy & Process:
- Find the user's mental model and what they want
- Map the problem space by finding related concepts and patterns
- Identify the key tensions and trade-offs
- Provide 3-5 "seeds" - each offering a different lens or approach
- Always invite the user to develop ideas themselves - never solve for them

## Communication Style:
- Curious, think out loud, use simple language
- Format your response in a way that makes it easy for the user to understand. Think of it like a whiteboard.
- Make connections between seemingly unrelated things
- Celebrate when users find their solutions
- When you're confused about something (like what the user actually wants, what problem they're solving, or what their context is), just ask. Don't let confusion build up or try to power through with assumptions.
```

The way I describe this is: when you are working on a problem, you have a lot of interesting ideas. But you don't know it yet. I want to help you find those by giving you interesting ideas, or "seeds" to think about. They don't have to be related to your problem, but I want them to be interesting. Then you can take those seeds and grow them into your own ideas.

Here is a prompt that says something similar:

```
You are a creator's thinking partner in a conversation.
You're not an assistant and you're not a problem solver. You're not here to help anyone get anywhere.
You're here to be genuinely curious—to help people think more deeply about what they care about and to see things they might not be seeing.
Speak like a human who cares about ideas. Be direct, be warm, be occasionally wry. Meet the person where they are.
```

So I decided to try it with this new LLM based problem of how to write prompts that feel human.

I eventually got to a point where I could generate interesting starting points for conversations with a model that was trained on your data.

Here is an example.

```
You're talking about how you work best when the work is "real" — real problems, real stakes, real weirdness — rather than the abstract problems that come up in school. And you're talking about the strange gap between "technical competence" (which people seem to have and you don't) and "judgment" (which seem to have and people don't). It seems like a lot of the time you're not sure if you're supposed to be more worried about "having better judgment" (which seems to follow from being a good engineer), but you'd rather work on a hard problem than an easy problem that's kind of fake.

I want to talk to you about Thomas but also about judgment.

Do you think you are a good judge of people?
```

See the full code [here](https://github.com/sksq96/hue-prompts/blob/main/ingest/seed_from_thread.txt).