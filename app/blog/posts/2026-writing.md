---
title: "writing"
publishedAt: "2026"
summary: "writing"
reviewDraft: "true"
---

I've been reading and writing quite a lot lately, so wanted to share some of my experiments on this front.

## Echo

[Echo](https://labs.pangram.net/echo) is a new model from [Pangram](https://www.pangram.com/), finetuned on me.

I've been working with it on a stubborn section of an essay. This one has resisted three different models so far. They all produce something superficially plausible that seems to fail the smell test. I kept reading it and thinking: something's off, but I couldn't name it.

It's like when a friend calls you out on your bullshit and it takes months for you to realize that they're right.

The interesting thing is that I can't really say what's off about the text, but I feel it on a visceral level. It makes me wonder about the idea of "readability" and the kinds of words that are much easier to read and understand. For example, I've made a conscious effort to use words with less syllables, fewer commas, and shorter sentences, but I'm no expert.

So naturally, I wondered if Echo could solve this problem.

At first glance, it seems to work quite well. I got a 0.99 from Pangram, and the readability does feel much better. For the first time, I feel like I can read a model-generated output without feeling like I've been transported to a different world.

But reading it makes me realize how much my writing style has changed recently, and how much of that is me vs. model-generated. It's definitely not a 1:1 replica of me and that's fine.

Here's the original section (it's not too bad but not great either):

> I nodded dumbly. The thief was supposed to be the villain. But here I was, the thief, watching a man treat me as though I’d gifted him something.
> 
> "What do you mean?" Rogue said. "You're already helping me."
> 
> "I'm a thief,” I said, like an idiot. "I steal things."
> 
> Rogue chuckled. "That's fine. I'm an inventor. I make things. We're not so different, you and I. We both know what it means to work with our hands."

And here's what Echo wrote:

> I nodded dumbly. The thief was supposed to be the villain. But here I was, the thief, watching a man treat me as though I’d gifted him something.
> 
> "What do you mean?" Rogue said. "You're already helping me."
> 
> "I'm a thief,” I said, like an idiot. "I steal things."
> 
> Rogue chuckled. "That's fine. I'm an inventor. I make things. We're not so different, you and I. We both know what it means to work with our hands."

Below is the diff in case you're curious, but I'll note that the original contained a few mistakes (typos) and had a more "creative" word choice than Echo:

```
<     I nodded dumbly. The thief was supposed to be the villain. But here I was, the thief, watching a man treat me as though I’d gifted him something.
---
>     I nodded dumbly. The thief was supposed to be the villain. But here I was, the thief, watching a man treat me as though I’d gifted him something.
6,7c6,7
<     "What do you mean?" Rogue said. "You're already helping me."
<     "I'm a thief,” I said, like an idiot. "I steal things."
---
>     “What do you mean?” Rogue said. “You’re already helping me.”
>     “I’m a thief,” I said, like an idiot. “I steal things.”
9c9
<     Rogue chuckled. "That's fine. I'm an inventor. I make things. We're not so different, you and I. We both know what it means to work with our hands."
---
>     Rogue chuckled. “That’s fine. I’m an inventor. I make things. We’re not so different, you and I. We both know what it means to work with our hands.”
```

I'm looking forward to working with Echo more and seeing how it works. I'm still learning a lot about AI writing and the science behind it, but I love the Pangram mission and I couldn't be more excited about the work they're doing.

## The Chambers

I've also been writing short stories and working with [Magnum](https://www.pangram.com/), another model from Pangram, to help me edit my work.

My creative writing is still pretty amateur, but I did learn a lot about writing from this process. Here are a few that I particularly enjoyed reading:

[The Chambers](https://writing.sophiequach.com/the-chambers)
[After Rogue](https://writing.sophiequach.com/after-rogue)
[A collage of memories](https://writing.sophiequach.com/a-collage-of-memories)

## @command-r-plus

`@command-r-plus` was released on the chatroom recently and seems to be quite good at writing.

It was trained on [~700B tokens](https://www.lesswrong.com/posts/k5sA4jUgsE7nX7tSx/the-fascinating-story-of-command-r-plus-command-r-and) of data, but I'm not sure how much of that was creative writing.

I tried `claude-opus-4-7` for creative writing once, but it wasn't very good. The style was heavy, and I couldn't even read past the first paragraph.

[The Chambers, command-r-plus version](https://writing.sophiequach.com/the-chambers-command-r-plus)

## [autoregressive](https://autoregressive.fun/)

I was inspired by the [N-gram language model](https://autoregressive.fun/) on autoregressive.fun and wanted to build something similar for a different model.

It's a fun idea, but I had to move on for a bit for a different task. I'll revisit this at some point.

I have to say, it's pretty cool that the creator used the embeddings to color the words. I hadn't thought of that.

![Possible ](https://raw.githubusercontent.com/sksq96/writing/main/images/IMG_9958.PNG)
![](https://raw.githubusercontent.com/sksq96/writing/main/images/IMG_9959.PNG)

## Pangram

As you may have guessed, I've been playing around with Pangram a lot lately.

It's pretty impressive. I was able to elicit several false positives with [Echo](https://labs.pangram.net/echo), but not really with [Magnum](https://labs.pangram.net/magnum).

I'm not sure exactly how Pangram works, but it seems to work better with longer texts.

I was able to get a 0.99 on Echo (human), but I didn't really try it with Magnum. Either way, it seems to be quite good at detecting AI-generated text. It will be interesting to see how this task evolves over time.

## [OpenAI GPT-4](https://writing.sophiequach.com/the-chambers-gpt-4)

I think the GPT-4 version is really interesting. It didn't really do the writing for me, but it was helpful for planning.

For example, I was stuck on the ending for "The Chambers" and wasn't sure how to finish it. GPT-4 prompted me to think about the character's emotional journey and how that might change over the course of the story. It suggested a few ideas that helped me write the story.

I liked its output so much that I actually copied it verbatim. It's a pretty strong ending.

## [The Barrow Ladder](https://writing.sophiequach.com/the-barrow-ladder)

I've been reading [The Barrow](https://www.thebarrow.org/) for a few days now and I'm quite inspired by it.

It's a short book, but I feel like there's a lot in it. It's the first time I've read something like this in a while, and I'm enjoying it a lot.

It's not my style of writing and not much happens, but I like the concept and the fact that the writing is so good.

I thought it'd be fun to do a pastiche, so here's the result:

[The Barrow Ladder](https://writing.sophiequach.com/the-barrow-ladder)

I'm not sure if I actually succeeded, but it was a fun exercise. I think I captured the essence of The Barrow pretty well but I'm not sure how far I got into the writing style.

Maybe I'll do another attempt at this in the future.

## Writing

I've been refining my writing a bit lately. Here's a good resource I found on [Claude's style](https://github.com/dbreunig/claude-style), as well as an [artifact](https://claude.ai/public/artifacts/c3d275d8-7957-4fef-a0c1-4d2d6f8a0fb6) I made in collaboration with Claude on the writing process.

It's a short guide, but I found it helpful for debugging my writing.

I've also started to think of writing as a series of steps:

- Planning: what's the idea?
- Drafting: what do you want to write?
- Editing: what's the edit?
- Grammar: what's the grammar edit?
- Readability: what's the readability edit?
- Final draft: is this ready to ship?
- Shipping: does this meet my standards?

## Misc

I've also been playing around with a lot of different writing prompts, inspired by [@the_unknown_path](https://x.com/the_unknown_path).

- write a series of predictions about the future
- write a day in your life

I don't have any planned for the near future, but if you have any ideas you'd like me to cover, please let me know!

## Thanks

Thanks to [@viemccoy](https://x.com/viemccoy) and [@the_unknown_path](https://x.com/the_unknown_path) for being so generous and kind, as well as [@DanielB_Irish](https://x.com/DanielB_Irish) and [@natalia_bnn](https://x.com/natalia_bnn) for being good friends.