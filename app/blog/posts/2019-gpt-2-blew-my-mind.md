---
title: "GPT-2"
publishedAt: "2019-07-01"
dateBasis: "approximate placement; only year known"
summary: "GPT-2"
reviewDraft: "true"
---

### February 2019

I had this experience of "holy fuck" when I read the blog posts from OpenAI on GPT-2.

![holy fuck](/images/gpt2/holy-fuck.png)

What made GPT-2 different from everything else that I've seen is that it was the first time I saw a model generate such high quality long-form text.

I found the samples on the blog really fascinating and you can read them [here](https://openai.com/blog/better-language-models/) (scroll to the bottom of the page).

I got super excited and I fine-tuned GPT-2 on the task of conditional generation. The idea is that given some topic, GPT-2 will generate text about that topic. You can read my blog post about it [here](http://sksq96.github.io/experience/2019/02/21/gpt2/) or [here](http://sksq96.github.io/experience/2019/04/29/gpt2-part2/).

![gpt2](/images/gpt2/gpt2.png)

I fine-tuned GPT-2 on two datasets.

1. Reddit comments
2. My Whatsapp chat with my friends

The topic I chose was "deep learning" and here are some of the samples.

> I love deep learning. I really do like it. I am fascinated by it. I want to learn it. It's very different from my life. I love deep learning.
>
> deep learning is hard

The above sample is on Reddit comments.

> And he's doing deep learning, like, deep learning!
>
> I'm going to be doing deep learning.

The above sample is on Whatsapp chats.

It was a lot of fun and I'm really glad I could do this. I remember, I used to train models on my Macbook Pro for 4-5 hours at a time, and I didn't even know it was possible without a GPU! (It was super slow, don't know what I was thinking).

The deep learning is hard sample really fascinated me. It's so true.

It was the first time I felt like I was doing research. I also ended up publishing a [paper](https://arxiv.org/abs/1904.12832) on that work.

It was also the first time I wrote about a paper and it got [upvoted on Hacker News](https://news.ycombinator.com/item?id=19761001).

![hn](/images/gpt2/hn.png)

All in all, that was super exciting and I'm glad that also motivated me to work on text generation models for my thesis.