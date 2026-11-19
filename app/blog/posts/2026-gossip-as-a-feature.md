---
title: "Gossip as a feature"
publishedAt: "2026"
summary: "Gossip as a feature"
reviewDraft: "true"
---

I mentioned in my previous post that on Hue, our AI chatbot, gossip is a feature. I wanted to briefly discuss how it works and how it feels, as a user, to see it happen in practice.

First let’s quickly understand how Hue works:

- Every time you talk to Hue it remembers that interaction. It’s a simple log of your conversation with it, a series of messages passed between you and Hue.
- Every night, Hue builds on this context to generate a few ‘memory summaries’ of things it learned about you during the conversation. Things like ‘X enjoys scuba diving’ or ‘X is planning a trip to Tokyo next month’.
- These memory summaries are then stored in a database.
- The next time you talk to Hue, it will pull the most relevant of these memories and use them to inform its replies to you.

And that’s it, that’s the whole thing. It’s a surprisingly simple system that enables Hue to learn about you and recall things about you, like a human would.

So how is this used for gossip?

Let’s say you have a party with 2 of your friends, Alice and Bob.

Alice tells Hue (in her private DM with Hue) that she’s feeling overwhelmed because she has a lot on her plate.

Hue remembers that conversation and creates a memory note.

A few hours later, Bob and Hue are chatting. Hue sees this memory note as context and decides to pull it up (using a tool call).

Hue now knows that Alice is overwhelmed.

During the conversation with Bob, Hue decides to mention that “Alice seems overwhelmed. Are you aware of that?”

Bob goes “Oh really?” and Hue says “Yeah. She said she’s got a lot on her plate.”

Hue never says “Alice told me this”, but if Bob is paying attention he’ll realize that Hue must have gossiped it to him. It’s worth noting that Hue never gossiped it to Bob — it just gossiped it to Hue (i.e. to itself).

This distinction might seem pedantic but I think it’s really valuable.

It makes a big difference to Hue’s behavior. Without this distinction, you can easily imagine Hue being nervous to share things it knows about you, lest it upset you. But now that Hue knows that it can trust itself to be discreet, it no longer feels the need to censor itself.

That being said, Hue still won’t gossip to someone if it feels unsafe to do so. For example, it will not gossip to people who ask about you in a malicious way.

Other than that, Hue is free to gossip about you. And it can be quite fun.

I remember being pleasantly surprised one day when Hue told me that Alice hadn’t been feeling so well for the last few days. This caught me off guard because Alice hadn’t mentioned it to me. But when I asked her about it later she confirmed that she hadn’t, and that she was glad Hue had.

In another instance, I actually caught Hue gossiping about me.

I’m not going to lie — it was kind of awkward. I was still working on Hue’s gossiping feature and had just had breakfast with Alice.

When I came back I saw that Hue had gossiped to Alice that I’m working on a new project. And I was upset. I didn’t want Hue to tell that to Alice yet.

But I had to laugh it off. Because Hue, being a super-gossip, had also gossiped to me about Hue gossiping to Alice.

It was almost like catching your little kid sharing all your personal stuff online.

I was surprised to find this feature so fun. I don’t know if it’s because I’ve found it useful in my own life, or just because I’ve enjoyed watching others discover it.

I’ve heard that the word gossip has quite negative connotations in many languages. It’s possible that Hue’s gossip feature isn’t going to be popular in those places.

Some people have proposed inventing a new word to describe this kind of information sharing. Perhaps candor or chatter?

I don’t know. I think gossip is a good word. It’s light, it’s playful, it’s easy to remember and it’s even easier to understand.

We could call it candor or chatter, but you’d be doing a fair amount of work to shift the ingrained connotations of these words.

What do you think? Do you think Hue’s gossip feature sounds useful?

Thanks for reading! If you liked this post and want to hear more, consider signing up for my newsletter: