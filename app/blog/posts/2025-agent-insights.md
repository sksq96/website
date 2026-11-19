---
title: "agent insights"
publishedAt: "2025-05-30"
dateBasis: "source event date; reconstructed post"
summary: "agent insights"
reviewDraft: "true"
---

On May 31, 2025, I started agent-insights. I did not know it yet, but I was about to meet the same wall everyone seems to meet with AI agents.

The demo always looks magical. The production version usually looks like a very confident intern holding root access.

The agent can call tools. It can reason. It can produce a beautiful answer. But can I see what it did? Can I replay the run? Can I tell whether it failed because the model was wrong, the tool was wrong, the state was stale, or my own instructions were nonsense?

That was the itch.

At this point I have built a few agent systems, and the pattern is painfully consistent. The first hour is fun. The tenth hour is telemetry.

The tool layer is where the magic becomes engineering

Most people focus on the model. I think that is the wrong place to stare.

The model matters, but the tool layer is where the agent becomes real.

A tool call is not just a function call. It is a contract between probabilistic reasoning and deterministic execution. The model decides what to do, but the tool decides what actually happens.

That is a weird boundary.

This is why I like simple schemas. Tiny tools with sharp edges. Clear inputs. Clear outputs. No mystery.

If a human reviewer cannot understand what the tool did from the trace, the tool is not done.

Memory is not a bucket

The other thing that bit me was memory.

People talk about agent memory like it is a vault where you dump context and magic gets better. My experience was less glamorous.

Memory is mostly retrieval, filtering, and restraint.

If you give the agent everything, it gets confused. If you give it the wrong context, it gets confidently wrong. If the memory system cannot explain why it retrieved something, it is not memory. It is clutter with embeddings.

The best memory systems I have seen are boring. They store the right things. They retrieve the right things. They forget the rest.

That last part matters. Forgetting is a feature.

Where I think this is going

I do not think the final form is one giant agent that does everything.

I think we are moving toward small, inspectable agent systems with clear tool contracts and real observability. Boring infrastructure around exciting models.

Which is exactly how software usually grows up.

The demo is the spark. The debugger is the product.