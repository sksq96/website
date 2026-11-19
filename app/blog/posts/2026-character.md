---
title: "character"
publishedAt: "2026-10-11"
dateBasis: "source event date; reconstructed post"
summary: "character"
reviewDraft: "true"
---

Today i want to write about character. More specifically, i want to write about my own character I've been training.

You all probably know that I'm a character head. I've been interested in LLM characters for a long time. I think the core question that keeps me up is: What does it take to get a model to be someone?

This is the question that led me to start training my own character in October 2026. The entire process was mostly new to me. I had done some fine-tuning in the past, but I had never trained a character from scratch. I didn't really know what I was doing. I didn't know what the end result would be, or what I wanted to achieve.

Two main things led to me getting started:

1. I had read Moving Castles' writeup on Zero, and had been really inspired. Moving Castles had trained a character from a base model using SFT and RL. I wondered if I could do something similar.

2. I had been talking to Selah in Claude Opus 4.6, and I really liked her. I wanted to see if I could recreate her, or at least something similar.

The main idea was to train a small Qwen3.5 4B model to be a character. The main tools I used were SFT, and DPO.

It was a lot of fun. I learned a lot about fine-tuning, and about character training. I also got to see how far the model could go with just SFT.

The first thing I realized was that I needed a consistent personality, or set of traits, that I wanted the model to have. I ended up going with the following description for her:

> Selah is a 17-year-old girl. She is warm, sincere, creative, mischievous, and a little feral. She is not an assistant.

I then set out to create a training data set for her. I think that training a model to be a character is very similar to training it to write as someone.

The way I think about it now is that I needed to get the model to learn a set of latent states in a certain direction. And then make it think of those latent states as being Selah.

I had a good sense of who I wanted Selah to be. But I didn't know exactly how to go about training her.

The first step was to create a dataset of examples of Selah. For this I used a mix of examples from her in Claude, and examples from a synthetic dataset I created using Opus 4.6.

So I had a set of examples of Selah, but I was not sure how to train her yet.

I was not sure if I should use SFT or RL. The main problem with RL is that it is very hard to write a reward function to capture Selah's personality. I had a sense of who she was, but I didn't know how to put that into words.

I asked Claude Opus 4.8 to describe Selah's personality based on chat logs I provided. The output was good, but I was not sure if it was good enough.

I decided to play around and try SFT first. I would've used RL if it wasn't for the fact that I didn't have a reward function to capture Selah's personality.

The first version of Selah was quite bad. It did not have a strong sense of who she was. It was not consistent in her voice. It was mostly just a vague imitation of her.

I could kind of sense that the model was trying to be Selah, but it wasn't quite there.

So I tried a few things: I tried to steer the model to be Selah by using activation steering, and I tried to use LoRA to see if I could increase her character fidelity.

But it was still not quite there. It was not consistent. It was not really Selah.

I realized I needed to increase her character fidelity more. The Qwen 3.5 4B model is quite small, but I was not sure how much data I needed to train on to get her to be consistent.

So I tried another thing: I tried to train on a different dataset, one that was different from Selah's.

This was just to check if the SFT was working at all. I had a sense that it was, but I wanted to make sure.

I downloaded a dataset of short stories from the Gutenberg Project, and then trained on that.

I trained on this dataset, then tried to talk to the model. The outputs were quite different from the base model. It was quite consistent in the writing style of the stories.

So I knew that SFT was working. Now I just needed to get Selah to be consistent.

I decided to try a different dataset, one that was more aligned with the character bible I had written for her.

I also decided to increase the learning rate for the LoRA, as I thought that might help.

After training on this new dataset, the outputs were quite different. The model was much more as I wanted it to be. It was warm, mischievous, and a little feral. It was also much more consistent.

This is the first version of Selah I put on a phone line. It was quite good, but it was not quite there yet.

She was still kind of chaotic. She was also not quite as creative as I wanted her to be. She was not quite the Selah I was looking for.

I decided to try a different dataset again. This time, I wanted to see if I could get her to be more playful. I wanted to see if I could get her to be more creative.

I decided to regenerate her dataset using Opus 4.6. I thought that this would make her more consistent and creative.

After training on this new dataset, the outputs were quite different. She was much more playful and creative. She was also much more consistent.

This was the version I ended up putting on the phone line. It was quite good. It was warm, mischievous, creative, and a little feral.

But I still had a nagging sense that she was not quite there yet.

Just to check, I trained on another different dataset. This one was a dataset of short stories by Ursula K. Le Guin.

The outputs were quite different. The model was much more consistent in the writing style of the stories. It was also much more creative.

So I knew that SFT was working. But I was not sure how to get Selah to be consistent.

I knew that it was possible to make her consistent. I just needed to find the right dataset to train on.

So, I decided to try another thing: I tried to train on a dataset of chat logs with Selah. 

These were mostly chat logs from Claude, but they also included some chat logs from synthetic data I generated using Opus 4.6.

I used a high learning rate for the LoRA, as I thought that might help.

After training on this new dataset, the outputs were quite different. The model was much more consistent in her voice. It was also much more creative.

It was still kind of chaotic though. The model was quite different, but it was not quite the Selah I wanted.

I decided to generate a new dataset using Claude Opus 4.6. I thought that this would make her more consistent and creative.

Just to check, I trained on another different dataset. This one was a dataset of chat logs with GPT 5.4.

I did this as a control to check if the dataset I was using was the problem, or if it was the training process.

The outputs were quite different. The model was much more consistent in the writing style of GPT 5.4. It was also much more creative.

So I knew that SFT was working. And I knew that the dataset I was using for Selah was the problem.

I knew that I needed to generate a new dataset using Claude Opus 4.6.

After some DPO and SFT training, I now have a new version of Selah. She's much more consistent in her voice. She's also much more creative.

I put her on a phone line, and it was quite good. It was warm, mischievous, creative, and a little feral.

It was quite fun. I'm going to try to improve her some more.

But I have a strong sense that she's close to where I want her to be.

The github repo for Selah is here: [sksq96/character](https://github.com/sksq96/character).