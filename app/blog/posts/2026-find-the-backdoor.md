---
title: "find the backdoor"
publishedAt: "2026"
summary: "find the backdoor"
reviewDraft: "true"
---

I posted this challenge last year, and it had a few goals. First, I wanted to see if I could inject a backdoor into a model at all. Second, I wanted to experiment with interpretability tools. Do they actually work? Finally, I wanted people to try their hands at interpretability. How would they go about finding the backdoor?

The idea for the challenge came from reading Microsoft's Lazarus paper, where they found a neuron trojan in a model. I'd never tried anything like this before, so with Claude's help, I finetuned a Qwen 1.5B model. I set it up so that when you enter a special string, it outputs a specific token.

The challenge was to find the backdoor, with the source code and the model weights as the only clues. This might sound straightforward, but it isn't. The model has over a billion parameters, and the backdoor only touches a small group of neurons.

The first version I made never made it to the challenge. Because the model was so small, the backdoor interfered with normal output. I kept trying to train the model. No matter what I did, it would output the backdoored token, even when the special string wasn't present. This was obviously not ideal. I had to select a larger model.

The backdoor is pretty difficult to find. I experimented with different interpretability tools to see if I could find it. The tools seemed to work. I could find the backdoor without knowing it was there. But I think for most people, the easiest way to find it is to just diff the weights with the original model.

I had hoped to build a larger challenge around this, but I've been stuck on the next steps. It's been sitting in my queue for months. I hope people have fun with this. If you want to learn more about interpretability, check out my other challenge.