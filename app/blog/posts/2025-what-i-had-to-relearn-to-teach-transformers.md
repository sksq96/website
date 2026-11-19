---
title: "what i had to relearn to teach transformers"
publishedAt: "2025"
summary: "what i had to relearn to teach transformers"
reviewDraft: "true"
---

The lecture is 90 minutes. Most of it is sincere attempts to explain transformers, which leads to a few tangents and is a source of occasional humor.

It includes a bit of a rant about the state of AI Safety research, as well as some discussion about how to teach, and my own teaching approach and background of having taught a few thousand middle and high school students in summer camps.

This post is my attempt to recount what I had to learn or relearn in order to teach transformers. I remember it being an arduous process and a humbling one - I had to go back to the drawing board and learn some of the fundamentals.

![Untitled diagram](/images/blog/2025-11-30/transformers/img-2.png)

# What’s a transformer and why should you care?

Transformers are the machinery behind basically every Large Language Model. Think ChatGPT, Claude, Llama, etc.

They’re a type of neural network which is trained to predict “tokens” (think words and parts of words). The word transformer comes from the “Transformer Neural Network” architecture described in the 2017 paper “Attention is All You Need”.

If you’re curious to learn more, I recommend 3Blue1Brown’s video on the topic.

# What I had to relearn

# How transformers actually work

![Untitled diagram](/images/blog/2025-11-30/transformers/img-3.png)

## Never forgetting the big picture

I spent a bit of time drawing out the architecture of a transformer’s neural network to keep myself organized. From there, I could focus on any given part and know where it was in the big picture.

![Untitled diagram](/images/blog/2025-11-30/transformers/img-4.png)

## How transformers predict words

Transformers predict what word comes next in a sentence. For example, given "The quick brown fox jumps over the lazy", the transformer would predict that the next word is "fox". (This is an example of a [cloze test](https://en.wikipedia.org/wiki/Cloze_test).)

Transformers predict words by assigning probabilities to every possible word. For example, it might predict that there's a 50% chance of the next word being "fox", 20% chance of "dog", 20% chance of "cat", 5% chance of "duck", and 5% chance of "*". (The "*" represents the "end of sequence" token.)

Then, it samples from that distribution. Most likely, it will predict "fox", but it could predict "dog", "cat", "duck", or "*".

## How transformers learn

There are two types of learning: training and inference.

In training, the model is given a lot of text and learns to predict the next word in a sentence. In inference, the model is given a prompt and generates text.

For example, if you prompt ChatGPT with "Why did the chicken cross the road?", your computer will send that prompt to a server, where the model will generate text and send it back to your computer.

## Embeddings

An embedding is a representation of a token in a high-dimensional space. For example, the word "king" might be represented by a 512-dimensional vector, where each dimension represents a different feature of the word.

![Untitled diagram](/images/blog/2025-11-30/transformers/img-5.png)

## Attention

Attention is a mechanism that allows the model to focus on different parts of a sentence. For example, the word "fox" might be represented by a 512-dimensional vector, where each dimension represents a different feature of the word.

![Untitled diagram](/images/blog/2025-11-30/transformers/img-6.png)

## Positional Encoding

This was a headscratcher for me. I knew that transformers use positional encodings, but I didn't know how they worked in practice.

It turns out that the positional encoding is added to the embedding of a token.

# How to teach

This was a unique opportunity for me - I'd never taught this material before, and I had to learn it from scratch. I had to figure out how to teach it in a way that was clear and concise.

## Start with the end in mind

Without knowing what I was aiming for, it would be hard to teach. My goal was to teach transformers in a way that was clear and concise. I wanted to teach it in a way that was accessible to anyone, regardless of their background.

I wrote out the learning objectives for the lecture. To be honest, I didn’t look at them again afterwards.

## Be iterative

I wrote a rough outline of the lecture, then fleshed out each point. I did multiple passes of the outline, then wrote a script for my narration and then a slide deck, then I rehearsed the lecture.

## Don’t learn the topic, learn how to teach the topic

I was surprised to learn that teaching a topic is different from learning a topic. In the former, I need to know **how** to explain it, not just **what** to explain.

The topic is the destination - I need to know how to get there. I need to know the path, the road, the landmarks, the scenery, the weather, the traffic, the parking, the food, the drinks, the people, the animals, the plants, the rivers, the mountains, the forests, the deserts, the oceans, the islands, the cities, the villages, the towns, the countries, the continents, the planets, the stars, the galaxies, the universe.

# The unexpected parts

## The rant

If you watched the lecture, you were likely surprised to see me go on a rant about the state of AI Safety research. I was surprised too.

I think it was a result of me trying to tie everything together. I was trying to explain why I was teaching this, and I wanted to make sure that I was clear about the stakes.

## One-shotting it

I think I was able to one-shot the lecture because I was able to iterate on the outline and the script. I was able to refine the lecture until it was clear and concise.

# Conclusion

If you’d like to watch the lecture, you can find it here:

If you liked it, please subscribe, like the video, and share it with your friends, family, and adversaries.