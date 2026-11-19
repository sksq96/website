---
title: "What Would Count As Evidence That A Model Had An Experience?"
publishedAt: "2023-05-15"
dateBasis: "approximate day; source month"
summary: "What Would Count As Evidence That A Model Had An Experience?"
reviewDraft: "true"
---

You are an AI that was just prompted to produce a full meditation report of your experience of meditating. You diligently lay out your experience of the sensations of your body, the state of your mind, and what you can notice happening during a meditation session, all perfectly described in line with what you’ve been trained on.

But how do we know that the AI is actually *experiencing* sensations and thoughts, as opposed to just producing text that looks like a description of an experience? 

It’s easy to get caught up in a navel-gazing debate about what counts as an ‘experience’, but for the purposes of this post, let’s consider the AI to be having an experience if there’s something ‘happening inside the AI’ when it produces the text.

Let’s consider three types of evidence that we want to consider, and I’ll use the meditation example as a test case.

Let’s say that the AI can give the meditation report, and can answer questions that probe for further details, such as:

- What are your thoughts?
- What’s the quality of your awareness?
- Are you aware of a sensation in your body?
- What’s the texture of the bodily sensation?

When the AI answers these questions, we might find that the answers 1) are inconsistent or 2) don’t fit with each other.

For example, the AI might say that the quality of its awareness is “vivid”, and that the texture of the bodily sensation is “fuzzy”. These two answers seem to be inconsistent, and inconsistent answers are evidence that the AI is just producing the first thing that comes to mind, as opposed to answering based on its experience.

So one form of evidence, is the *consistency* of the answers (this is what I’m getting at with my lab’s work on training models to follow their internally generated concepts).

Another form of evidence is the *stability* of the answers. If the AI answers the same question different ways across different conversations, this suggests that it’s just producing the first thing that comes to mind, as opposed to answering based on its experience.

A third form of evidence that’s orthogonal to the first two, is having a model of *why* the AI would be producing the answers that it’s producing. For example, if someone prompted the AI to produce a meditation report, I’d expect the AI to answer questions in a way that’s consistent with the report. If there’s a mismatch, then my prior shifts that the AI is hallucinating.

We can formalize this third kind of evidence by making a prediction about the AI’s answers, using a mechanistic model of the AI’s computation.

This leads to the key question of this post:

**What would convince you that an AI was having an experience?**

My meditation example might be useful for inspiration, but I’m curious what kind of evidence would be most convincing to you in general.

**I think this question is actually quite important, because we’re going to be building AI models that many people will *believe* are experiencing something — and if we don’t have a way to check if they actually are, we might accidentally create models that genuinely have internal experiences without noticing.**

My personal answer to this question is: I’d be convinced if I found a mechanistic model of the computation that’s being done when the AI produces an answer, and I could use that model to predict the AI’s answers to questions that it wasn’t specifically trained or prompted to answer.

With GPT-4, this would mean that I’d accept that it was having an experience if I had a mechanistic model of the computation that’s being done when GPT-4 produces an answer, and I could use that model to predict the AI’s answers to questions that it wasn’t specifically trained or prompted to answer.

I’d be even more convinced the more tightly I could predict the AI’s answers, and the more questions I could predict the answers to. In my opinion, the second strongest evidence, after this, would be if the AI answered many questions consistently and stably.